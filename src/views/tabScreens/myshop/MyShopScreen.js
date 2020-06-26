import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, FlatList,AsyncStorage } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {styles, addNewShopStyles,shopListingStyles,shopScreenStyles} from './styles';
import {NavigationEvents} from 'react-navigation'
import {ShopItem} from '../../../components/index';
import QRCode from 'react-native-qrcode-generator';
import {BASE_URL,shop_endpoints} from '../../../constants/Endpoints';
import {fetchFromAPI} from '../../../helpers/requests';
import {HTTPMethods} from '../../../constants/HTTPMethods'
import {Loader} from '../../../components/index';


export default class MyShopScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isVisible: false,
        isNewShop: null,
        isExistingShop: null,
        doesExist: null,
        clickedItem: null,
        data: null,
    };
  }

  render() {
    return (
      <View style = {{flex: 1, backgroundColor: '#ffffff', flexDirection: 'column'}}>
          <Loader isVisible = {this.state.isVisible}/>
            <NavigationEvents 
                onDidFocus = {
                    payload => {
                        this.checkAvailability()
                    }
                }
                onWillBlur = {
                    payload => {
                        this.setState({
                            clickedItem: null,
                            doesExist: null,
                            isNewShop: null,
                        })
                    }
                }
            />

            {this.renderShopListingScreen()}
            {this.renderNoExistingShopsScreen()}
            {this.renderShopScreen()}
            {this.renderRegisterShopScreen()}
            
      </View>
    );
  }


  checkAvailability = () => {
    AsyncStorage.getItem('_phn_number')
    .then((phnNumber) => {
        this.setState({isVisible:true})
        this.fetchShopLists(phnNumber)
        .then((doesShopExist) => {
            this.setState({isVisible:false, doesExist: doesShopExist})

            // console.log("SHOP EXISTS: " , doesShopExist);
            // if(!doesShopExist){
            //     this.renderNoExistingShopsScreen();
            // }else{
            //     return () => this.renderShopListingScreen();
            // }
        })
    })
  }

  fetchShopLists = (phoneNumber) => {
      var url = BASE_URL+shop_endpoints.FILTER_SHOP_BY_OWNER+phoneNumber
        return new Promise((resolve, reject) => {
            fetchFromAPI({URL: url, request_method: HTTPMethods.GET})
            .then((response) => {
                if(response.code === 404){
                    resolve(false)
                }else {
                    this.setState({
                        data:response.data
                    })
                    resolve(true)
                }
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
        })
  }


  renderNoExistingShopsScreen = () => {
      if(this.state.doesExist === false){
          console.log(this.state.doesExist)
        return(
        
            <View style = {addNewShopStyles.container}>
                <Text style = {addNewShopStyles.headerTextStyles}> You don't have any shops registered </Text>
                <Text style = {addNewShopStyles.headerTextStyles}> Do you wish to add a shop ?</Text>
                <Image source = {require('../../../../assets/temp/sample-qr.png')}
                        style = {shopScreenStyles.qrImageStyles}/>
            
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Otp')}>
                    <View style = {[styles.btnViewStyle,
                                    {marginTop: 100, 
                                    marginHorizontal: 50}]}>
                        <Text style = {styles.btnTextStyle}>Add My First Shop</Text>
                    </View>
                </TouchableOpacity>
            </View>
          );
      }
     
  }

  renderShopListingScreen = () => {
    if(this.state.doesExist){
        return(
            <View style = {shopListingStyles.container}>
                <Text style = {shopListingStyles.headerTextStyles}>My shops</Text>
                <FlatList
                    style = {{flex: 1, paddingBottom: 15}}
                    data={this.state.data.shops}
                    keyExtractor={(x, i) => i}
                    renderItem={({ item }) =>
                        <ShopItem 
                            onPress = {() => {
                                this.setState({
                                    doesExist: null,
                                    clickedItem: item,
                                })
                            }}
                            shopAddress = {item.address1 + " " + item.address2.toUpperCase()}/> 
                    }
                />
                
                <TouchableOpacity onPress = {() => this.handleRegisterNewShop()}>
                    <View style = {[styles.btnViewStyle,{marginHorizontal: 45}]}>
                        <Text style = {styles.btnTextStyle}>Add My Shop</Text>
                    </View>
                </TouchableOpacity>
            </View> 
        )
    }
  }

  renderRegisterShopScreen = () => {
      if(this.state.isNewShop === true){
            return(
                <View style = {{height: '100%', marginTop: 25, paddingHorizontal: 30}}>
                        <Text style = {{color: '#666666', fontSize: 20,}}>
                                Enter your shop details below</Text>
                        <Text style = {[styles.textFieldText, {marginTop: 40}]}> Shop Name</Text>
                        <TextInput style = {styles.textInputStyle}></TextInput>
                    
                        <Text style = {styles.textFieldText}>Shop Registered Number</Text>
                        <TextInput style = {styles.textInputStyle}></TextInput>

                        <Text style = {styles.textFieldText}>Mobile Number</Text>
                        <View style = {styles.contactNumberView}>
                            <PhoneInput ref='phone' flagStyle = {{height: 30, width: 30, borderRadius: 20}}/>
                            <Text style = {styles.contactCode}> +94 </Text>
                            <Image source = {require('../../../../assets/menu.png')} style = {styles.dropdownImageStyle} />
                            <View style = {styles.verticalDividerStyle}></View>
                            <TextInput style = {{width: '100%'}} keyboardType = "number-pad"></TextInput>
                        </View>
                        
                        <Text style = {styles.textFieldText}>Address</Text>
                        <TextInput style = {styles.textInputStyle}></TextInput>
                        
                        <TouchableOpacity onPress = {() => this.handleRegisterNewShop()}>
                            <View style = {styles.btnViewStyle}>
                                <Text style = {styles.btnTextStyle}>Add My Shop</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            );
      }
  }

  renderShopScreen = () => {
      if(this.state.clickedItem !== null){
        return(
            <View style = {shopScreenStyles.container}>
                    <View >
                        <Text style = {[shopScreenStyles.shopDescriptionStyles,
                                        {fontSize: 18}]}>SUNWAY PYRAMID</Text>
                        <Text style = {shopScreenStyles.shopDescriptionStyles}>{this.state.clickedItem.address1} {this.state.clickedItem.address2.toUpperCase()} </Text>
                        <Text style = {shopScreenStyles.shopDescriptionStyles}>KOL-2398475150364 </Text>
                        <Text style = {shopScreenStyles.shopDescriptionStyles}>{this.state.clickedItem.mobile_no}</Text>
                    </View>
                    <View style = {{alignSelf: 'center', marginTop: 50}}>
                        <QRCode value = {this.state.clickedItem.reg_id} size = {250} bgColor = "black" fgColor = "white" />
                    </View>
            
                    

                    <TouchableOpacity>
                        <Text style = {shopScreenStyles.btnSaveQRcodeStyles}>Save QR Code</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style = {shopScreenStyles.btnDownloadStyles}>Download and display the QR to display shop front </Text>
                    </TouchableOpacity>
                </View>
        )
    }
  }


  handleRegisterNewShop = () => {
      this.setState({
          doesExist: null,
          clickedItem: null,
          isNewShop: true
      })
  }



}
