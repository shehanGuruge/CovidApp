import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, FlatList,AsyncStorage, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {styles, addNewShopStyles,shopListingStyles,shopScreenStyles} from './styles';
import {NavigationEvents} from 'react-navigation'
import {ShopItem} from '../../../components/index';
import QRCode from 'react-native-qrcode-generator';
import {BASE_URL,shop_endpoints} from '../../../constants/Endpoints';
import {fetchFromAPI} from '../../../helpers/requests';
import {HTTPMethods} from '../../../constants/HTTPMethods'
import {Loader} from '../../../components/index';

var ownerContactNumber = null;
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
        shopName: null,
        shopRegistrationNumber: null,
        shopmobileNumber: null,
        shopaddress: null,
        countryCode: null,
        country: "lk"
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
        this.ownerContactNumber = parseInt(phnNumber)
        this.fetchShopLists(phnNumber)
        .then((doesShopExist) => {
            this.setState({isVisible:false, doesExist: doesShopExist})
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
                
                <TouchableOpacity onPress = {() => 
                    this.setState({
                        doesExist: null,
                        clickedItem: null,
                        isNewShop: true
                    })}>
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
                        <TextInput value = {this.state.shopName}
                            onChangeText = {value => this.setState({shopName: value})}
                            style = {styles.textInputStyle}></TextInput>
                    
                        <Text style = {styles.textFieldText}>Shop Registered Number</Text>
                        <TextInput value = {this.state.shopRegistrationNumber}
                            onChangeText = {value => this.setState({shopRegistrationNumber: value})}
                            style = {styles.textInputStyle}></TextInput>

                        <Text style = {styles.textFieldText}>Mobile Number</Text>
                        <View style = {styles.contactNumberView}>

                            <PhoneInput ref={ref => { this.phone = ref; }}
                                initialCountry = "lk"
                                onSelectCountry = {country => this.setState({countryCode: this.phone.getValue(), 
                                    country:country})} 
                                flagStyle = {{height: 30, width: 30, borderRadius: 20}}/>

                            <Text style = {styles.contactCode}> {this.state.countryCode} </Text>
                            <Image source = {require('../../../../assets/menu.png')} style = {styles.dropdownImageStyle} />
                            <View style = {styles.verticalDividerStyle}></View>
                            <TextInput value = {this.state.shopmobileNumber}
                                onChangeText = {value => this.setState({shopmobileNumber: value})}
                                style = {{width: '100%'}} 
                                keyboardType = "number-pad"></TextInput>
                        </View>
                        
                        <Text style = {styles.textFieldText}>Address</Text>
                        <TextInput value = {this.state.shopAddress}
                            onChangeText = {value => this.setState({shopAddress: value})}
                            style = {styles.textInputStyle}></TextInput>
                        
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
      if(this.state.shopName !== null && this.state.shopRegistrationNumber !== null && 
        this.state.shopmobileNumber !== null && this.state.shopAddress !== null){

            this.setState({isVisible: true})
            this.checkShopAvailabilityById(this.state.shopRegistrationNumber)
            .then((response) => {
                console.log("SHOP EXIST: " , response);
                if(response === false){
                    var url = BASE_URL + shop_endpoints.CREATE_NEW_SHOP;
                    var body = {
                        "phoneNumber": this.ownerContactNumber,
                        "reg_id": this.state.shopRegistrationNumber,
                        "name": "Malith",
                        "address1": this.state.shopaddress,
                        "address2": "Gorakana",
                        "city": "Moratuwa",
                        "state": "Western",
                        "post_code": "13500",
                        "country": this.state.country.toUpperCase(),
                        "nature_of_business": "Food",
                        "qr_code": "base-64"
                    }

                    fetchFromAPI({URL: url, request_method: HTTPMethods.POST, body: JSON.stringify(body)})
                    .then((response) => {
                        console.log(response)
                        this.setState({isVisible: false})
                        if(response.code === 500){
                            Alert.alert("Covid app", "Please try again later");
                        }else{
                            Alert.alert("Covid App", "Shop Created Successfully",
                            [
                                {
                                    text: "OK",
                                    onPress: () => {this.reloadScreen()}
                                }
                            ]
                            );
                        }
                    })
                    .catch((err) => {
                        this.setState({isVisible: false})
                        console.log(err)
                        Alert.alert("Covid app", "Please try again later");
                    })
                }else{
                    this.setState({isVisible:false})
                    Alert.alert("Covid app", "A shop with the same registration Id exists. Please try with a different registration id");
                }
            })

        }else{
            Alert.alert("Covid App", "Please make sure you have filled all the required fields.");
        }

  }

  checkShopAvailabilityById = (reg_id) => {
    var url = BASE_URL + shop_endpoints.DOES_SHOP_EXISTS + "\"" + reg_id + "\"";
    return new Promise((resolve, reject) => {
        fetchFromAPI({URL:url, request_method: HTTPMethods.GET})
        .then((response) => {

            response.code === 404 ? resolve(false) : resolve(true)
        })
        .catch((err) => {
            Alert.alert("Covid App", "Please try again later");
            console.log(err);
            reject(err);
        })
    })
    
  }


  reloadScreen = () => {
    this.setState({
        isVisible: true,
        isNewShop: null,
        data: null
    })

    this.fetchShopLists(this.ownerContactNumber)
    .then((doesShopExist) => {
        this.setState({isVisible:false, doesExist: doesShopExist})
    })
    .catch((err) => console.log(err))
  }



}
