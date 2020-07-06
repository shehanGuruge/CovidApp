import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, AsyncStorage, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-input'
import Firebase from 'firebase'
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha'
import {styles} from './styles'
import MobileNumberVerificationImage from '../../../assets/phone-number2.svg';
import {BASE_URL,user_endpoints} from '../../constants/Endpoints';
import {fetchFromAPI} from '../../helpers/requests';
import {POSTTYPE,HTTPMethods} from '../../constants/HTTPMethods'
import {Loader} from '../../components/index';
import {initFirebase} from '../../config/index';


var firebaseConfig;
export default class MobileVerificationScreen extends Component {

  UNSAFE_componentWillMount(){
    try{
      initFirebase();
      

    }catch(err){
      console.log(err)
    }
    firebaseConfig = Firebase.apps.length ? Firebase.app().options : undefined;
  }

  
  constructor(props) {
    super(props);
    // 713769217
    this.state = {
        contactNumber: "",
        phoneCode: "+94",
        isErrorMessageVisible: false,
        isVisible: false,
        country: null,
        verificationId: null,
        recaptchaVerifier: null,
    };  
  }

  render() {
    return (
      <View style= {styles.outerContainer}>
            <Loader isVisible = {this.state.isVisible}/>
            <FirebaseRecaptchaVerifierModal ref = {ref => {this.recaptcha = ref}}
              firebaseConfig = {firebaseConfig}
              
            />
            <View style= {{alignSelf: 'center'}}>
                <MobileNumberVerificationImage height = {290} width = {290}/>
            </View>
            <Text style={styles.contactNumberTextStyle}>Enter your mobile Number</Text>

            <View style = {styles.contactNumberView}>
                <PhoneInput ref={ref => { this.phone = ref; }}
                          initialCountry = "lk"
                          onSelectCountry = {country => this.setState({phoneCode: this.phone.getValue(), country: country})} 
                          flagStyle = {{height: 30, width: 30, borderRadius: 20}}/>
                <Text style = {styles.contactCode}> {this.state.phoneCode} </Text>
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


  verifyNumber = () => {
    this.checkUserLoggedIn()
    .then((isLogged) => {
      if(isLogged){
        this.props.navigation.navigate("tabScreens");
      }else{
        this.handleVerification();
      }
    })
    .catch(err => {
      console.log(err);
    })
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
                      this.handleMobileAuthentication();
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


  checkUserLoggedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("_isLogged")
      .then(response => {
        if(response === "true"){
          resolve(true)
        }else {
          resolve(false)
        }
      })
      .catch(err => {
        AsyncStorage.setItem("_isLogged", "false")
        resolve(false)
      })
    })
    
  }

  handleMobileAuthentication = () => {
      const phoneProvider = new Firebase.auth.PhoneAuthProvider();
      phoneProvider.verifyPhoneNumber(
          this.state.phoneCode+this.state.contactNumber,
          this.recaptcha
      ).then((id) => {
          console.log("ID: " ,id);
          this.setState({verificationId:id})
          AsyncStorage.setItem("_isLogged","true")
          .then(() => {
            this.props.navigation.navigate("Otp", {"verificationId": id})
          })
          
      }).catch(err => {
          console.log(err);
          Alert.alert("Invalid Contact Number", "Invalid contact number. Please recheck the mobile number and try again");
      });
  }
}
