import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image,TextInput, Alert, ScrollView } from 'react-native';
import PhoneInput from 'react-native-phone-input'
import {styles} from './styles';
import {BASE_URL,user_endpoints} from '../../constants/Endpoints';
import {fetchFromAPI} from '../../helpers/requests';
import {HTTPMethods, statusCode} from '../../constants/HTTPMethods'
import {Loader} from '../../components/index';
import {ScreenDimensions} from '../../utils/index'

export default class RegistrationScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nic: "",
      contactNumber: null,
      state: "",
      city: "",
      addressLine1: "",
      addressLine2: "",
      postalCode: "",
      isVisible: false,
      countryCode: "+60",
      country: "my",
    };
  }

  render() {
    return (
      <View style = {styles.outerContainer} >
        <Loader isVisible = {this.state.isVisible}/>
        <Text style = {styles.headerText}>Enter below details to register </Text>
        
        <ScrollView>
        
          <Text style = {[styles.textFieldText, {marginTop: 40}]}>Name</Text>
          <TextInput style = {styles.textInputStyle}
                      value = {this.state.name}
                      onChangeText = {value => this.setState({name: value})}>
          </TextInput>
        
          <Text style = {styles.textFieldText}>NRIC / Passport</Text>
          <TextInput style = {styles.textInputStyle}
                      value = {this.state.nic}
                      onChangeText = {value => this.setState({nic: value})}>
          </TextInput>
          

          <Text style = {styles.textFieldText}>Mobile Number</Text>
          <View style = {styles.contactNumberView}>
              <PhoneInput ref={ref => { this.phone = ref; }}
                initialCountry = "my"
                onSelectCountry = {country => this.setState({countryCode: this.phone.getValue(), country: country})}
                flagStyle = {{height: 30, width: 30, borderRadius: 20}} />
              <Text style = {styles.contactCode}> {this.state.countryCode} </Text>
              <Image source = {require('../../../assets/menu.png')} style = {styles.dropdownImageStyle} />
              <View style = {styles.verticalDividerStyle}></View>
              <TextInput style = {{width: '100%'}} 
                        value = {this.state.contactNumber}
                        onChangeText = {value => this.setState({contactNumber: value})}
                        keyboardType = "number-pad">
              </TextInput>
          </View>
          
          <Text style = {styles.textFieldText}>Address Line 1</Text>
          <TextInput style = {styles.textInputStyle}
                      value = {this.state.addressLine1}
                      onChangeText = {value => this.setState({addressLine1: value})}>
          </TextInput>

          <Text style = {styles.textFieldText}>Address Line 2</Text>
          <TextInput style = {styles.textInputStyle}
                      value = {this.state.addressLine2}
                      onChangeText = {value => this.setState({addressLine2: value})}>
          </TextInput>

          <Text style = {styles.textFieldText}>City</Text>
          <TextInput style = {styles.textInputStyle}
                      value = {this.state.city}
                      onChangeText = {value => this.setState({city: value})}>
          </TextInput>

          <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style = {styles.textFieldText}>State</Text>
              <TextInput style = {[styles.textInputStyle, {width: ScreenDimensions.SCREEN_WIDTH/2 - 50}]}
                          value = {this.state.state}
                          onChangeText = {value => this.setState({state: value})}>
              </TextInput>
            </View>

            <View>
              <Text style = {styles.textFieldText}>Postal Code</Text>
              <TextInput style = {[styles.textInputStyle, {width: ScreenDimensions.SCREEN_WIDTH/2 - 50}]}
                          value = {this.state.postalCode}
                          onChangeText = {value => this.setState({postalCode: value})}
                          keyboardType = "number-pad">
              </TextInput>
            </View>
          </View>
        </ScrollView>
        
        <TouchableOpacity onPress = {() => this.handleRegistration()}>
            <View style = {styles.btnViewStyle}>
                <Text style = {styles.btnTextStyle}>Register</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }


  handleRegistration = () => {


      if(this.state.contactNumber !== null && this.state.name !== null && this.state.contactNumber !== "" && 
        this.state.name !== ""){

          this.checkUserExistence().
          then((response) => {
              if(response === false){
                var url = BASE_URL+user_endpoints.CREATE_NEW_USER;

                var body = {
                  "address1": this.state.addressLine1,
                  "address2": this.state.addressLine2,
                  "city": this.state.city,
                  "country": this.state.country.toUpperCase(),
                  "name": this.state.name,
                  "nric": this.state.nic,
                  "phoneNumber": parseInt(this.state.contactNumber),
                  "post_code": this.state.postalCode,
                  "state": this.state.state
                }
      
                fetchFromAPI({URL: url, request_method: HTTPMethods.POST, body: JSON.stringify(body)})
                .then((response) => {
                  console.log(response);
                  this.setState({isVisible:false})
                  statusCode.SUCCESSFUL.includes(response.code) ?
                        this.props.navigation.navigate('MobileVerification') 
                        : Alert.alert("LetMeIn", "Please try again later");

                }).catch(err => {this.setState({isVisible:false})})

              }else{
                Alert.alert("User Exists", "User already exists with the same contact number.Please login to the application");
              }
          })
          

      }else{
        Alert.alert("LetMeIn" , "Contact Number and Name are mandatory fields.");
      }
  }

  checkUserExistence = () => {
    var url = BASE_URL + user_endpoints.DOES_USER_EXIST+this.state.contactNumber;
    this.setState({isVisible:true})

    return new Promise((resolve, reject) => {
      fetchFromAPI({URL: url,request_method: HTTPMethods.GET, })
      .then((data) => {
          this.setState({
            isVisible: false
          })
          statusCode.SUCCESSFUL.includes(data.code) ? resolve(true) : resolve(false)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }


}
