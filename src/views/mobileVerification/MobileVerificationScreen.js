import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import PhoneInput from 'react-native-phone-input'
import {styles} from './styles'
import MobileNumberVerificationImage from '../../../assets/phone-number2.svg'

export default class MobileVerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style= {styles.outerContainer}>
            <View style= {{alignSelf: 'center'}}>
                <MobileNumberVerificationImage height = {290} width = {290}/>
            </View>
            <Text style={styles.contactNumberTextStyle}>Enter your mobile Number</Text>
            <View style = {styles.contactNumberView}>
                <PhoneInput ref='phone' flagStyle = {{height: 30, width: 30, borderRadius: 20}}/>
                <Text style = {styles.contactCode}> +94 </Text>
                <Image source = {require('../../../assets/menu.png')} style = {styles.dropdownImageStyle} />
                <View style = {styles.verticalDividerStyle}></View>
                <TextInput style = {{width: '100%'}} keyboardType = "phone-pad"></TextInput>
            </View>
            <Text style = {styles.errorMessage}>Your number is not available in the app</Text>
            <TouchableOpacity>
                <Text style = {styles.registerButtonStyle}>Register Now</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.props.navigation.navigate('Otp')}>
                <View style = {styles.btnViewStyle}>
                    <Text style = {styles.btnTextStyle}>Get Verify Code</Text>
                </View>
            </TouchableOpacity>
      </View>
    );
  }
}
