import React, { Component } from 'react';
import { View, Text , TouchableOpacity} from 'react-native';
import WelcomeImage from '../../../assets/home.svg'
import {styles} from './styles'

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {styles.outerContainer}>
          <View style = {{alignSelf: 'center'}}>
            <WelcomeImage height = {290} width = {290}/>
          </View>
        <Text style = {[styles.welcomeTextStyles, {fontSize: 24,  marginTop: 25}]}>Track my shopping</Text>
        <Text style = {[styles.welcomeTextStyles, {fontSize: 16, marginTop: 15}]}>Now you can track your shopping destinations</Text>
        <Text style = {[styles.welcomeTextStyles,{fontSize: 16}]}>with us by simply scanning the QR Code</Text>
        <Text style = {[styles.welcomeTextStyles,{fontSize: 16}]}>at the shop</Text>

        <TouchableOpacity onPress = {() => this.props.navigation.navigate('MobileVerification')}>
            <View style = {styles.btnViewStyle}>
                <Text style = {styles.btnTextStyle}>Login</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => this.props.navigation.navigate('Registration')}>
            <Text style = {styles.btnRegisterStyle}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
