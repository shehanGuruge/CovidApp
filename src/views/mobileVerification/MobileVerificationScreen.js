import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, AsyncStorage } from 'react-native';
import PhoneInput from 'react-native-phone-input'
import {styles} from './styles'
import MobileNumberVerificationImage from '../../../assets/phone-number2.svg';
import {BASE_URL,user_endpoints} from '../../constants/Endpoints';
import {fetchFromAPI} from '../../helpers/requests';
import {POSTTYPE,HTTPMethods} from '../../constants/HTTPMethods'
import {Loader} from '../../components/index';

export default class MobileVerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        contactNumber: "713769217",
        countryCode: 0,
        isErrorMessageVisible: false,
        isVisible: false,
    };  
  }

  render() {
    return (
      <View style= {styles.outerContainer}>
            <Loader isVisible = {this.state.isVisible}/>
            <View style= {{alignSelf: 'center'}}>
                <MobileNumberVerificationImage height = {290} width = {290}/>
            </View>
            <Text style={styles.contactNumberTextStyle}>Enter your mobile Number</Text>

            <View style = {styles.contactNumberView}>
                <PhoneInput ref='phone' flagStyle = {{height: 30, width: 30, borderRadius: 20}}/>
                <Text style = {styles.contactCode}> +94 </Text>
                <Image source = {require('../../../assets/menu.png')} style = {styles.dropdownImageStyle} />
                <View style = {styles.verticalDividerStyle}></View>
                <TextInput style = {{width: '100%'}} keyboardType = "phone-pad" 
                      value = {this.state.contactNumber}
                      onChangeText = {value => this.setState({ contactNumber: value})}></TextInput>
            </View>

            {this.state.isErrorMessageVisible &&
                  <Text style = {styles.errorMessage}>Your number is not available in the app</Text>
            }

            {this.state.isErrorMessageVisible &&
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Registration')}>
                    <Text style = {styles.registerButtonStyle}>Register Now</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity onPress = {() => this.handleVerification()}>
                <View style = {[styles.btnViewStyle,
                      {marginTop: this.state.isErrorMessageVisible ? 35 : 135}]}>
                    <Text style = {styles.btnTextStyle}>Get Verify Code</Text>
                </View>
            </TouchableOpacity>
      </View>
    );
  }

  handleVerification =  () => {
      var url = BASE_URL + user_endpoints.DOES_USER_EXIST;
      if(this.state.contactNumber !== null && this.state.contactNumber !== undefined){

          this.setState({
            isVisible: true
          })
          url = url + this.state.contactNumber;

          fetchFromAPI({URL: url,request_method: HTTPMethods.GET, })
          .then((data) => {
              this.setState({
                isVisible: false
              })
              if(data.code === 200){
                  AsyncStorage.setItem("_phn_number", this.state.contactNumber)
                  .then(() => {
                    this.props.navigation.navigate('tabScreens');
                  })
                  
              }else{
                  this.setState({
                      isErrorMessageVisible: true
                  });
              }
          }).catch(err => {
            console.log(err)
          })
      }
  }
}
