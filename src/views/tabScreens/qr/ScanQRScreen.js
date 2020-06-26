import React, { Component } from 'react';
import { View, Text , Image, TextInput} from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'
import {popupStyles} from './styles'

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
    this.setState({
        showTemperaturePopup: false
    })
  }
}
