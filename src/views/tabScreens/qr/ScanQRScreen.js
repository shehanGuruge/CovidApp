import React, { Component } from 'react';
import { View, Text , Image, TextInput, AsyncStorage, Alert} from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'
import {popupStyles} from './styles'
import {BASE_URL,checkin_endpoints, shop_endpoints} from '../../../constants/Endpoints';
import {fetchFromAPI} from '../../../helpers/requests';
import {HTTPMethods, statusCode} from '../../../constants/HTTPMethods'
import {Loader} from '../../../components/index';

var celciusDegreeSymbol = '°'
export default class ScanQRScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        hasCameraPermissions: null,
        isScanned: false,
        showTemperaturePopup: false,
        barcodeData : null,
        tempReading: null,
        isFetching: false,
        hideBarcodeReader: false
    };
  }

  async componentDidMount(){
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({
        hasCameraPermissions: status === "granted" ? true : false
    })
  }


  render() {
    return (
        <View style = {{flex: 1, backgroundColor: '#fff'}}>
            <Loader isVisible = {this.state.isFetching}/>
      
        {this.state.hasCameraPermissions === true &&
            <View style = {{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff'}}>
                <Text style = {{color: '#666666', fontSize: 20, marginTop: 40, textAlign: 'center'}}> Place the QR code at shop </Text>
                <Text style = {{color: '#666666', fontSize: 20, textAlign: 'center'}}> inside the area </Text>

                <Text style = {{color: '#999999', fontSize: 16, marginTop: 30, textAlign: 'center'}}> Scan will start automatically </Text>  

                <View style = {{flexDirection: 'column', marginTop: 20}}>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Image source = {require('../../../../assets/tabbedScreenImages/qrcodescreen/upper-left.png')} 
                    style = {{height: 50, width: 100, resizeMode: 'contain'}}></Image>
                    <Image source = {require('../../../../assets/tabbedScreenImages/qrcodescreen/upper-right.png')} 
                    style = {{height: 50, width: 100, resizeMode: 'contain'}}></Image>
                 </View>

                {this.state.hideBarcodeReader === true &&
                    <View style = {{height: 300, width: 300,}}>
                        <View  style = {{backgroundColor: "#000", height: 300, width: 170,alignSelf:'center'}}/>
                    </View>
                }

                {this.state.hideBarcodeReader === false &&
                     <BarCodeScanner  style = {{height: 300, width: 300,  }} 
                     onBarCodeScanned = {this.handleBarCodeScanned} ></BarCodeScanner>
                }
                
                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Image source = {require('../../../../assets/tabbedScreenImages/qrcodescreen/bottom-left.png')} 
                    style = {{height: 50, width: 100, resizeMode: 'contain'}}></Image>
                    <Image source = {require('../../../../assets/tabbedScreenImages/qrcodescreen/bottom-right.png')} 
                    style = {{height: 50, width: 100, resizeMode: 'contain'}}></Image>
                 </View>
                </View>
            </View>
        }
        {this.renderPopup()}
    </View>
      
    );
  }

  renderPopup = () => {
      if(this.state.showTemperaturePopup){
        return(
            <View style = {popupStyles.outerView}>
                <View style = {popupStyles.popupView}>
                    <Text style = {popupStyles.textStyles}>Enter your body temperature</Text>
                    <View style = {popupStyles.textInputView}>
                        <TextInput style = {[popupStyles.textInputStyles,{textAlign:'center'}]}
                            value = {this.state.tempReading}
                            onChangeText = {value => this.setState({tempReading:value})}
                            onSubmitEditing = {() => this.handleTempSubmit()} 
                            keyboardType = "numeric"></TextInput>
                        <Text style = {popupStyles.celciusTextStyles}>C {celciusDegreeSymbol}</Text>
                    </View>
                    <View style = {popupStyles.dividerStyles}/>
                </View>
            </View>
        )
      }  
  }

  handleBarCodeScanned = ({ data}) => {
      console.log(data)
      if(data !== null){
        this.setState({
            isFetching: true,
            barcodeData: data,
            hideBarcodeReader: true
        })
        this.checkShopAvailabilityById(data)
        .then((response) => {
            if(response === true){
                this.setState({
                    isFetching: false,
                    showTemperaturePopup: true
                })
            }else{
                Alert.alert("LetMeIn", "Invalid Registration id. Please scan a valid QR Code",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            this.setState({
                                isFetching: false,
                                hideBarcodeReader: false,
                            })
                        }
                    }
                ]);
            }
        })
      }
      console.log(data)
  }


  
  handleTempSubmit = () => {
    this.setState({ showTemperaturePopup: false  })

    if((this.state.tempReading !== "" || this.state.tempReading !== "0") && this.state.tempReading > 35 ){
        AsyncStorage.getItem("_phn_number")
        .then((phnNumber) => {
            var url = BASE_URL + checkin_endpoints.CHECK_IN;
            var _body = {
                "phoneNumber" : parseInt(phnNumber), 
                "shop_reg_id" : this.state.barcodeData, 
                "temp": this.state.tempReading, 
                "check_in_at" : new Date().toISOString(),
            }
            console.log(_body)
            console.log(url)
            this.setState({isFetching: true})
            fetchFromAPI({URL:url, request_method: HTTPMethods.POST,body: JSON.stringify(_body)})
            .then((response) => {
                console.log(response)
                this.setState({ isFetching: false, hideBarcodeReader: false});
                if(statusCode.SUCCESSFUL.includes(response.code)){
                    Alert.alert("Check In Successful!", "Please enter to the shop now!");
                }else{
                    Alert.alert("Check In Failed!", "Unable to check in. Please try again");
                }
            })
            .catch((err) => {Alert.alert("Network Error", "The network connection is lost.")});
        })
    }else if(this.state.tempReading < 35){
        Alert.alert("Warning", "You may be experiencing hypothermia.\n\nGet some help!");
    }else {
        Alert.alert("Invalid temperature", "Please make sure temperature is a proper number!");
    }
  }


  checkShopAvailabilityById = (data) => {
    var url = BASE_URL + shop_endpoints.DOES_SHOP_EXISTS + "\"" + data + "\"";
    return new Promise((resolve, reject) => {
        fetchFromAPI({URL:url, request_method: HTTPMethods.GET})
        .then((response) => {
            statusCode.UNSUCCESSFUL.includes(response.code) ? resolve(false) : resolve(true)
        })
        .catch((err) => {
            Alert.alert("LetMeIn", "Please try again later");
            console.log(err);
            reject(err);
        })
    })
    
  }
}
