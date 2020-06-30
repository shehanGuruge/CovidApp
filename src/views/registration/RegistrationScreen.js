import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image,TextInput, Alert } from 'react-native';
import PhoneInput from 'react-native-phone-input'
import {styles} from './styles';
import {BASE_URL,user_endpoints} from '../../constants/Endpoints';
import {fetchFromAPI} from '../../helpers/requests';
import {HTTPMethods} from '../../constants/HTTPMethods'
import {Loader} from '../../components/index';

export default class RegistrationScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      nic: null,
      contactNumber: null,
      address: null,
      isVisible: false,
      countryCode: "+94",
      country: "lk",
    };
  }

  render() {
    return (
      <View style = {styles.outerContainer} >
        <Loader isVisible = {this.state.isVisible}/>
        <Text style = {styles.headerText}>Enter below details to register </Text>
        
        <Text style = {[styles.textFieldText, {marginTop: 40}]}>Name</Text>
        <TextInput style = {styles.textInputStyle}
                    value = {this.state.name}
                    onChangeText = {value => this.setState({name: value})}>
        </TextInput>
      
        <Text style = {styles.textFieldText}>NIC / Passport</Text>
        <TextInput style = {styles.textInputStyle}
                    value = {this.state.nic}
                    onChangeText = {value => this.setState({nic: value})}>
        </TextInput>
        

        <Text style = {styles.textFieldText}>Mobile Number</Text>
        <View style = {styles.contactNumberView}>
            <PhoneInput ref={ref => { this.phone = ref; }}
              initialCountry = "lk"
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
        
        <Text style = {styles.textFieldText}>Address</Text>
        <TextInput style = {styles.textInputStyle}
                    value = {this.state.address}
                    onChangeText = {value => this.setState({address: value})}>
        </TextInput>
        
        <TouchableOpacity onPress = {() => this.handleRegistration()}>
            <View style = {styles.btnViewStyle}>
                <Text style = {styles.btnTextStyle}>Register</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }


  handleRegistration = () => {


      if(this.state.name !== null && this.state.nic !== null && this.state.contactNumber !== null &&
        this.state.address !== null){

          this.checkUserExistence().
          then((response) => {
              if(response === false){
                var url = BASE_URL+user_endpoints.CREATE_NEW_USER;

                var body = {
                  "address1": this.state.address,
                  "address2": "",
                  "city": "",
                  "country": this.state.country.toUpperCase(),
                  "name": this.state.name,
                  "nric": this.state.nic,
                  "phoneNumber": parseInt(this.state.contactNumber),
                  "post_code": "",
                  "state": ""
                }
      
                fetchFromAPI({URL: url, request_method: HTTPMethods.POST, body: JSON.stringify(body)})
                .then((response) => {
                  console.log(response);
                  this.setState({isVisible:false})
                  response.code === 201 ? 
                        this.props.navigation.navigate('MobileVerification') 
                        : Alert.alert("Let Me In", "Please try again later");

                }).catch(err => {this.setState({isVisible:false})})

              }else{
                Alert.alert("Let Me In", "User already exists with the same contact number.Please login to the application");
              }
          })
          

      }else{
        Alert.alert("Let Me In" , "Please note that all the fields were required for registration");
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
          data.code === 200 ? resolve(true) : resolve(false)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }


}
