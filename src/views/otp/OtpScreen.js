import React, { Component } from 'react';
import { View, Text , TextInput, TouchableOpacity} from 'react-native';
import OtpImage from '../../../assets/otp.svg'
import {styles} from './styles'


export default class OtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style  = {styles.outerContainer}>
          <View style = {styles.otpImageContainer}>
            <OtpImage height = {300} width = {300} />
          </View>

          <View style = {styles.textInputsContainer}>
                <TextInput style = {styles.textInputStyle} 
                                    placeholder = "0" 
                                    keyboardType= "numeric" 
                                    placeholderTextColor = "#a6a6a6" 
                                    maxLength = {1} />

                <TextInput style = {styles.textInputStyle} 
                                    placeholder = "0" 
                                    keyboardType= "numeric"
                                    placeholderTextColor = "#a6a6a6" 
                                    maxLength = {1} />

                <TextInput style = {styles.textInputStyle} 
                                    placeholder = "0" 
                                    keyboardType= "numeric" 
                                    placeholderTextColor = "#a6a6a6" 
                                    maxLength = {1} />

                <TextInput style = {styles.textInputStyle} 
                                    placeholder = "0" 
                                    keyboardType= "numeric" 
                                    placeholderTextColor = "#a6a6a6" 
                                    maxLength = {1} />
          </View>


          <TouchableOpacity onPress = {() => this.props.navigation.navigate('tabScreens')}>
            <View style = {styles.btnViewStyle}>
                <Text style = {styles.btnTextStyle}>Verify</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}
