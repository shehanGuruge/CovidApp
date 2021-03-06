import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, FlatList,AsyncStorage, Alert, Picker } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {styles, addNewShopStyles,shopListingStyles,shopScreenStyles} from './styles';
import {NavigationEvents} from 'react-navigation'
import {ShopItem,ShopCheckingItem,BackButton} from '../../../components/index';
import QRCode from 'react-native-qrcode-generator';
import {BASE_URL,shop_endpoints,checkin_endpoints} from '../../../constants/Endpoints';
import {fetchFromAPI} from '../../../helpers/requests';
import {HTTPMethods, statusCode} from '../../../constants/HTTPMethods'
import {Loader} from '../../../components/index';
import {ScreenDimensions} from '../../../utils/index'
import {tempToColor} from '../../../helpers/converters/tempToColorConverter'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Permissions from 'expo-permissions';
import * as Print from 'expo-print'
import countryTelephoneCode from "country-telephone-code";


var ownerContactNumber = null;
var s = null;
var daysOfTheWeek = ["Sun" , "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var base64_qr = null;
const SCREENS = {FROM_REGISTER_NEW_SHOP : "FROM_REGISTER_NEW_SHOP", FROM_SHOP_DETAILS: "FROM_SHOP_DETAILS" , FROM_SHOP_CHECKING: "FROM_SHOP_CHECKING"}

export default class MyShopScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isVisible: false,
        isNewShop: null,
        viewWhoCheckedIn: null,
        isExistingShop: null,
        doesExist: null,
        clickedItem: null,
        initialState: null,
        data: null,
        shopName: null,
        shopRegistrationNumber: null,
        shopmobileNumber: null,
        country: "",
        natureOfBusiness: "",
        state: "",
        addressLine1: "",
        addressLine2: "",
        postalCode: "",
        city: "",
        doRenderShopScreen: false,
        whoCheckedIn : null,
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
                            whoCheckedIn: null,
                        })
                    }
                }
            />

            {this.renderShopListingScreen()}
            {this.renderNoExistingShopsScreen()}
            {this.renderShopScreen()}
            {this.renderRegisterShopScreen()}
            {this.renderShopCheckinScreen()}
            
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
            this.setState({isVisible:false, doesExist: doesShopExist, initialState: doesShopExist})
        })
    })
  }

  fetchShopLists = (phoneNumber) => {
      var url = BASE_URL+shop_endpoints.FILTER_SHOP_BY_OWNER+phoneNumber
        return new Promise((resolve, reject) => {
            fetchFromAPI({URL: url, request_method: HTTPMethods.GET})
            .then((response) => {
                if(statusCode.UNSUCCESSFUL.includes(response.code)){
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
            
                <TouchableOpacity onPress = {() => {this.setState({isNewShop : true, doesExist: null})}}>
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
                                    doRenderShopScreen: true,
                                })
                            }}
                            isEditable = {false}
                            shopName = {item.name}
                            addressLine1 = {item.address1 !== null ? item.address1.toUpperCase() : "-"}
                            addressLine2 = {item.address2 !== null ? item.address2.toUpperCase() : "-"}/> 
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
                    <BackButton onPress = {() => this.handleOnBackClicked(SCREENS.FROM_REGISTER_NEW_SHOP)}/>
                        <Text style = {{color: '#666666', fontSize: 20, marginTop: 15}}>
                                Enter your shop details below</Text>
                        
                        <ScrollView style = {{marginBottom: 30}}>
                            <Text style = {[styles.textFieldText, {marginTop: 40}]}> Shop Name</Text>
                            <TextInput value = {this.state.shopName}
                                onChangeText = {value => this.setState({shopName: value})}
                                style = {styles.textInputStyle}></TextInput>
                        
                            <Text style = {styles.textFieldText}>Shop Registered Number</Text>
                            <TextInput value = {this.state.shopRegistrationNumber}
                                onChangeText = {value => this.setState({shopRegistrationNumber: value})}
                                style = {styles.textInputStyle}></TextInput>

                            <Text style = {styles.textFieldText}>Address Line 1</Text>
                            <TextInput value = {this.state.addressLine1}
                                onChangeText = {value => this.setState({addressLine1: value})}
                                style = {styles.textInputStyle}></TextInput>

                            <Text style = {styles.textFieldText}>Address Line 2</Text>
                            <TextInput value = {this.state.addressLine2}
                                onChangeText = {value => this.setState({addressLine2: value})}
                                style = {styles.textInputStyle}></TextInput>

                        
                            <Text style = {styles.textFieldText}>City</Text>
                            <TextInput style = {styles.textInputStyle}
                                        value = {this.state.city}
                                        onChangeText = {value => this.setState({city: value})}>
                            </TextInput>

                            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style = {styles.textFieldText}>State</Text>
                                    <TextInput style = {[styles.textInputStyle, {width: ScreenDimensions.SCREEN_WIDTH/2 - 50}]}
                                                value = {this.state.state}
                                                onChangeText = {value => this.setState({state: value})}>
                                    </TextInput>
                                </View>

                                <View>
                                    <Text style = {styles.textFieldText}>Postal Code</Text>
                                    <TextInput style = {[styles.textInputStyle, {width: ScreenDimensions.SCREEN_WIDTH/2 - 50}]}
                                                value = {this.state.postalCode}
                                                onChangeText = {value => this.setState({postalCode: value})}
                                                keyboardType = "number-pad">
                                    </TextInput>
                                </View>
                            </View>

                            <Text style = {styles.textFieldText}>Country</Text>
                            <TextInput style = {styles.textInputStyle}
                                        value = {this.state.country}
                                        onChangeText = {value => this.setState({country: value})}>
                            </TextInput>

                            <Text style = {styles.textFieldText}>Nature of Business</Text>
                            <Picker selectedValue={this.state.natureOfBusiness}  
                                    onValueChange={(itemValue, itemPosition) =>  
                                        this.setState({natureOfBusiness: itemValue})}  
                                >  
                                <Picker.Item label="Restaurants and TakeAways" value="Restaurants and TakeAways" />  
                                <Picker.Item label="Education and Arts" value="Education and Arts" />  
                                <Picker.Item label="Retail and Wholesale" value="Retail and Wholesale" />  
                                <Picker.Item label="Clothing Manufacturing" value="Clothing Manufacturing" />  
                                <Picker.Item label="Cleaning Services" value="Cleaning Services" />  
                                <Picker.Item label="Business and Financial Services" value="Business and Financial Services" />
                                <Picker.Item label="Building and Central Heating" value="Building and Central Heating" />  
                            </Picker>  
                            <View style = {{flex:1, height: 2, backgroundColor:"#666666"}}></View>

                        </ScrollView>
                        
                        <TouchableOpacity onPress = {() => this.handleRegisterNewShop()}>
                            <View style = {[styles.btnViewStyle,{marginTop: 0, marginBottom: 50}]}>
                                <Text style = {styles.btnTextStyle}>Add My Shop</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            );
      }
  }

  renderShopScreen = () => {
      if(this.state.clickedItem !== null && this.state.doRenderShopScreen !== false){
          console.log("CLICKED ITEM: " , this.state.clickedItem)
        return(
            <View style = {shopScreenStyles.container}>
                <View style = {{flexDirection: "row", justifyContent: 'space-between'}}>
                    <BackButton onPress = {() => this.handleOnBackClicked(SCREENS.FROM_SHOP_DETAILS)}/>
                    <TouchableOpacity onPress = {() => this.getShopCheckedInDetails()}>
                        <Text style = {{alignSelf:'flex-end',color: "#2b84a4"}}>View Check in Details</Text>
                    </TouchableOpacity>
                </View>

                    <View>
                        <Text style = {[shopScreenStyles.shopDescriptionStyles,
                                        {fontSize: 18}]}>{this.state.clickedItem.name}</Text>
                        <Text style = {shopScreenStyles.shopDescriptionStyles}>
                            {this.state.clickedItem.address1 !== null ? this.state.clickedItem.address1.toUpperCase() : "-"} {" "}
                            {this.state.clickedItem.address2 !== null ? this.state.clickedItem.address2.toUpperCase() : "-"} 
                        </Text>

                        <Text style = {shopScreenStyles.shopDescriptionStyles}>
                            {this.state.clickedItem.reg_id}
                        </Text>

                        <Text style = {shopScreenStyles.shopDescriptionStyles}>{this.state.clickedItem.mobile_no}</Text>
                    </View>
                    <View style = {{alignSelf: 'center', marginTop: 30}}>
                        <QRCode value = {this.state.clickedItem.reg_id} ref = {ref => s = ref}
                                getImageOnLoad = {(value) => {base64_qr = value}}
                                size = {250} bgColor = "black" fgColor = "white"  />
                    </View>
                    <TouchableOpacity onPress = {() =>  this.downloadFile()}>
                        <Text style = {shopScreenStyles.btnSaveQRcodeStyles}>Download QR Code</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {() =>  this.share()}>
                        <Text style = {shopScreenStyles.btnSaveQRcodeStyles}>Share QR Code</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style = {shopScreenStyles.btnDownloadStyles}>Download and display the QR to display shop front </Text>
                    </TouchableOpacity>
                </View>
        )
    }
  }



  renderShopCheckinScreen = () => {
      if(this.state.whoCheckedIn !== null){
            return(
                <View style = {shopScreenStyles.container}>
                    <BackButton onPress = {() => this.handleOnBackClicked(SCREENS.FROM_SHOP_CHECKING)}/>
                    <Text style = {[shopListingStyles.headerTextStyles,{marginLeft: 0}]}> {this.state.clickedItem.name}</Text>
                    <FlatList
                        style = {{flex: 1, paddingBottom: 15}}
                        data={this.state.whoCheckedIn}
                        keyExtractor={(x, i) => i}
                        renderItem={({ item }) =>
                            <ShopCheckingItem
                                customerName = {item.cus_name}
                                backColor = {tempToColor(parseInt(item.temp))} 
                                temperature = {item.temp}
                                mobileNumber = {item.country !== null && item.country !== "" ? 
                                                "+" + countryTelephoneCode(item.country) + "-" + item.mobile_no
                                                : item.mobile_no} 
                                checkedInDateTime = {this.dateTimeConverter(item.check_in_at)}
                            />
                        }
                    />
                    
                </View>
            )
      }
  }



  getShopCheckedInDetails = () => {
    var url = BASE_URL + checkin_endpoints.GET_PERSONALIZED_CHECKINS + "\"" +this.state.clickedItem.reg_id + "\""
   
    this.setState({isVisible: true})

    fetchFromAPI({URL: url, request_method: HTTPMethods.GET})
    .then((response) => {
        this.setState({isVisible: false})
        if(statusCode.SUCCESSFUL.includes(response.code) && response.data.totalShopCheckIn > 0){
            console.log("CHECKED IN: " , response.data.shopCheckIn)
            this.setState({
                whoCheckedIn: response.data.shopCheckIn,
                doRenderShopScreen: false,
            })
        }else{
            Alert.alert("LetMeIn" , "There are no customers for this shop");
        }
    }).catch(err => console.log(err))
  }


  handleRegisterNewShop = () => {
      if(this.state.shopRegistrationNumber !== null && this.ownerContactNumber !== null){

            this.setState({isVisible: true})
            this.checkShopAvailabilityById(this.state.shopRegistrationNumber)
            .then((response) => {
                console.log("SHOP EXIST: " , response);
                if(response === false){
                    var url = BASE_URL + shop_endpoints.CREATE_NEW_SHOP;
                    var body = {
                        "phoneNumber": this.ownerContactNumber,
                        "reg_id": this.state.shopRegistrationNumber,
                        "name": this.state.shopName,
                        "address1": this.state.addressLine1,
                        "address2": this.state.addressLine2,
                        "city": this.state.city,
                        "state": this.state.state,
                        "post_code": this.state.postalCode,
                        "country": this.state.country !== null ? this.state.country.toUpperCase() : this.state.country,
                        "nature_of_business": this.state.natureOfBusiness,
                        "qr_code": "base-64"
                    }

                    fetchFromAPI({URL: url, request_method: HTTPMethods.POST, body: JSON.stringify(body)})
                    .then((response) => {
                        console.log(response)
                        this.setState({isVisible: false})
                        if(statusCode.UNSUCCESSFUL.includes(response.code)){
                            Alert.alert("Warning", "Please try again later");
                        }else{
                            Alert.alert("Success", "Shop Created Successfully",
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
                        Alert.alert("Warning", "Please try again later");
                    })
                }else{
                    this.setState({isVisible:false})
                    Alert.alert("Registration Id Exists!", "A shop with the same registration Id exists. \n\n Please try with a different registration id");
                }
            })

        }else{
            Alert.alert("Invalid Data!", "Please recheck the mobile number and the registration number");
        }

  }

  checkShopAvailabilityById = (reg_id) => {
    var url = BASE_URL + shop_endpoints.DOES_SHOP_EXISTS + "\"" + reg_id + "\"";
    return new Promise((resolve, reject) => {
        fetchFromAPI({URL:url, request_method: HTTPMethods.GET})
        .then((response) => {

            statusCode.UNSUCCESSFUL.includes(response.code) ? resolve(false) : resolve(true)
        })
        .catch((err) => {
            Alert.alert("Warning", "Please try again later");
            console.log(err);
            reject(err);
        })
    })
    
  }


  reloadScreen = () => {
    this.setState({
        isVisible: true,
        isNewShop: null,
        data: null,
        shopName: null,
        shopRegistrationNumber: null,
        shopmobileNumber: null,
        country: "",
        natureOfBusiness: "",
        state: "",
        addressLine1: "",
        addressLine2: "",
        postalCode: "",
        city: "",
    })

    this.fetchShopLists(this.ownerContactNumber)
    .then((doesShopExist) => {
        this.setState({isVisible:false, doesExist: doesShopExist, initialState: doesShopExist})
    })
    .catch((err) => console.log(err))
  }


  dateTimeConverter = (isoDateTime) => {

    if(isoDateTime !== null){
        var date = new Date(isoDateTime);

        var dateInStringFormat = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " " + 
                                months[date.getMonth()] + " " + date.getFullYear();
        var timeInStringFormat = (date.getUTCHours() < 10 ? "0"+date.getUTCHours() : date.getUTCHours()) + ":" + 
                                (date.getUTCMinutes() < 10 ? "0"+date.getUTCMinutes() : date.getUTCMinutes()) + "h"
        
        var stringDateTime = daysOfTheWeek[date.getDay()] + ", " + dateInStringFormat +" at "+ timeInStringFormat;

        return stringDateTime;
    }
  }


  handleOnBackClicked = (action) => {
    switch(action){
        case SCREENS.FROM_REGISTER_NEW_SHOP:
            this.setState({
                doesExist: this.state.initialState,
                isNewShop: false
            })
            break;
        case SCREENS.FROM_SHOP_CHECKING:
            base64_qr = null
            var _clickedItem = this.state.clickedItem
            this.setState({
                whoCheckedIn: null,
                doRenderShopScreen: true,
                clickedItem: null,
            })
            this.setState({
                clickedItem: _clickedItem,
            })
            break;
        case SCREENS.FROM_SHOP_DETAILS:
            this.setState({
                doRenderShopScreen: false,
                doesExist: true,
            })
            break;
    }
  }

  async downloadFile(){
      try {
          let filePath = await Print.printToFileAsync({
              html:' <div style = "margin-top: 40%; margin-left: 30%;"><h2 style = "margin-left: 50px; font-size: 45px;">LetMeIn</h2>'
                  +'<img src="' + base64_qr +'"'
                  + 'alt="Red dot" style = "margin-left: 20px; margin-top: 10px;" />'
                  + '<h2 style = "margin-top: 50px;">Scan the QR Code to check in</h2>'
                  + '</div>',
              width : 612,
              height : 792,
          });

          const pdfName = `${filePath.uri.slice(
              0,
              filePath.uri.lastIndexOf('/') + 1
          )}QRCode.pdf`

          await FileSystem.moveAsync({
              from: filePath.uri,
              to: pdfName,
          })

          console.log('PDF Generated', pdfName);
          this.saveFile(pdfName);

      } catch (error) {
          console.error(error);
      }

  }

  async share(){

      try {
          let filePath = await Print.printToFileAsync({
              html:' <div style = "margin-top: 40%; margin-left: 30%;"><h2 style = "margin-left: 50px; font-size: 45px;">LetMeIn</h2>'
                  +'<img src="' + base64_qr +'"'
                  + 'alt="Red dot" style = "margin-left: 20px; margin-top: 10px;" />'
                  + '<h2 style = "margin-top: 50px;">Scan the QR Code to check in</h2>'
                  + '</div>',
              width : 612,
              height : 792,
          });

          const pdfName = `${filePath.uri.slice(
              0,
              filePath.uri.lastIndexOf('/') + 1
          )}QRCode.pdf`

          await FileSystem.moveAsync({
              from: filePath.uri,
              to: pdfName,
          })

          console.log('PDF Generated', pdfName);
          Sharing.shareAsync(pdfName)
          .then(() => {
              base64_qr = null;
              this.setState({
                  doesExist: true,
                  doRenderShopScreen : false
              })
          })

      } catch (error) {
          console.error(error);
      }
  }

    saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            MediaLibrary.createAlbumAsync("LetMeIn", asset, false)
            .then((response) => {
                if(response !== null && response.assetCount === 1){
                    Alert.alert("LetMeIn", "Your QR Code is successfully downloaded to your device folder: LetMeIn")
                }
            })
            .catch(err => {
                Alert.alert("LetMeIn", "QR Code downloading failed. Please try again")
            })
        }
    }


    //Keep this comment code!!!

    // async pdfFile(){
    //
    //   try {
    //       let filePath = await Print.printToFileAsync({
    //           html:' <div style = "margin-top: 40%; margin-left: 30%;"><h2 style = "margin-left: 50px; font-size: 45px;">LetMeIn</h2>'
    //               +'<img src="' + base64_qr +'"'
    //               + 'alt="Red dot" style = "margin-left: 20px; margin-top: 10px;" />'
    //               + '<h2 style = "margin-top: 50px;">Scan the QR Code to check in</h2>'
    //               + '</div>',
    //           width : 612,
    //           height : 792,
    //       });
    //
    //       const pdfName = `${filePath.uri.slice(
    //           0,
    //           filePath.uri.lastIndexOf('/') + 1
    //       )}QRCode.pdf`
    //
    //       await FileSystem.moveAsync({
    //           from: filePath.uri,
    //           to: pdfName,
    //       })
    //
    //      console.log('PDF Generated', pdfName);
    //
    //       //return filePath;
    //
    //       // if (Platform.OS === "ios") {
    //       //     await Sharing.shareAsync(pdfName);
    //       // } else {
    //       //     await Sharing.shareAsync(pdfName);
    //       //     this.saveFile(pdfName);
    //       //     // const permission = await MediaLibrary.requestPermissionsAsync();
    //       //     // if (permission.granted) {
    //       //     //     await MediaLibrary.createAssetAsync(uri);
    //       //     // }
    //       // }
    //   } catch (error) {
    //       console.error(error);
    //   }

    // Print.printAsync({
    //    html:' <div style = "margin-top: 40%; margin-left: 30%;"><h2 style = "margin-left: 50px; font-size: 45px;">LetMeIn</h2>'
    //     +'<img src="' + base64_qr +'"'
    //     + 'alt="Red dot" style = "margin-left: 20px; margin-top: 10px;" />'
    //     + '<h2 style = "margin-top: 50px;">Scan the QR Code to check in</h2>'
    //     + '</div>',
    //     width : 612,
    //     height : 792,
    //
    //   }).then((response) => {
    //     console.log(response)
    //   })
// }


}
