import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image,TextInput, SafeAreaView } from 'react-native';
import PhoneInput from 'react-native-phone-input'
import {styles} from './styles'

export default class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {styles.outerContainer} >
        <Text style = {styles.headerText}>Enter below details to register </Text>
        
        <Text style = {[styles.textFieldText, {marginTop: 40}]}>Name</Text>
        <TextInput style = {styles.textInputStyle}></TextInput>
      
        <Text style = {styles.textFieldText}>NIC / Passport</Text>
        <TextInput style = {styles.textInputStyle}></TextInput>

        <Text style = {styles.textFieldText}>Mobile Number</Text>
        <View style = {styles.contactNumberView}>
            <PhoneInput ref='phone' flagStyle = {{height: 30, width: 30, borderRadius: 20}}/>
            <Text style = {styles.contactCode}> +94 </Text>
            <Image source = {require('../../../assets/menu.png')} style = {styles.dropdownImageStyle} />
            <View style = {styles.verticalDividerStyle}></View>
            <TextInput style = {{width: '100%'}} keyboardType = "number-pad"></TextInput>
        </View>
        

        <Text style = {styles.textFieldText}>Address</Text>
        <TextInput style = {styles.textInputStyle}></TextInput>
        
        <TouchableOpacity onPress = {() => this.props.navigation.navigate('Otp')}>
            <View style = {styles.btnViewStyle}>
                <Text style = {styles.btnTextStyle}>Register</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}
