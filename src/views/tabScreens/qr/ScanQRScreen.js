import React, { Component } from 'react';
import { View, Text , Image, TextInput, AsyncStorage, Alert} from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'
import {popupStyles} from './styles'
import {BASE_URL,checkin_endpoints} from '../../../constants/Endpoints';
import {fetchFromAPI} from '../../../helpers/requests';
import {HTTPMethods} from '../../../constants/HTTPMethods'
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
                 <BarCodeScanner  style = {{height: 300, width: 300,  }}
                        onBarCodeScanned = {this.handleBarCodeScanned} ></BarCodeScanner>
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
      if(data !== null){
        this.setState({
            showTemperaturePopup: true,
            barcodeData: data,
        })
      }
      console.log(data)
  }

  handleTempSubmit = () => {
    this.setState({ showTemperaturePopup: false  })

    if(this.state.tempReading !== "" || this.state.tempReading !== "0"){
        AsyncStorage.getItem("_phn_number")
        .then((phnNumber) => {
            var url = BASE_URL + checkin_endpoints.CHECK_IN;
            var _body = {
                "phoneNumber" : phnNumber, 
                "shop_reg_id" : this.state.barcodeData, 
                "temp": this.state.tempReading, 
                "check_in_at" : new Date().toISOString(),
            }
    
            this.setState({isFetching: true})
            fetchFromAPI({URL:url, request_method: HTTPMethods.POST,body: JSON.stringify(_body)})
            .then((response) => {
                this.setState({ isFetching: false});
                if(response.code === 200){
                    Alert.alert("Let Me In", "QR Code scanned successfully");
                }else{
                    Alert.alert("Let Me In", "Invalid QR Code");
                }
            })
            .catch((err) => {Alert.alert("Let Me In", "Network Issue. Please try again")});
        })
    }else {
        Alert.alert("Let Me In", "Please recheck the temperature you have entered");
    }
    
   

  }
}
