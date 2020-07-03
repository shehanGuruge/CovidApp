import React, { Component } from 'react';
import { View, Text , TouchableOpacity} from 'react-native';
import WelcomeImage from '../../../assets/home.svg'
import {styles} from './styles'
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false
    };
  }

  async createPDF() {
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents',
    };
 
     RNHTMLtoPDF.convert(options)
    .then((response) => {
      console.log(response)
    })
    // console.log(file.filePath);
    // console.log(file.filePath);
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

        {/* this.props.navigation.navigate('MobileVerification') */}
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
