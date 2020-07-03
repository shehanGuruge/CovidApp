import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage, Alert, TextInput, KeyboardAvoidingView } from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {BASE_URL,user_endpoints} from '../../../constants/Endpoints';
import {fetchFromAPI} from '../../../helpers/requests';
import {HTTPMethods,statusCode} from '../../../constants/HTTPMethods'
import {Loader,DialogBox} from '../../../components/index';
import {styles} from './styles'

var userMobileNumber = null
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: null,
    };
  }

  UNSAFE_componentWillMount(){
    this.fetchUserDetails();
  }

  render() {
    return (
      <KeyboardAvoidingView style = {styles.outerContainer} behavior='position'
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 40}>
        
         <Loader isVisible = {this.state.isFetching}/>
            <NavigationEvents 
                onDidFocus = {
                    payload => {
                        this.fetchUserDetails()
                    }
                }
            />
        
        <TouchableOpacity onPress = {() =>  this.handleSaveClicked()}>
          <Text  style = {[styles.editButtonStyle, {alignSelf: 'flex-end', width: 50 }]}>Save</Text>
        </TouchableOpacity>


        {this.state.isVisible === false &&
          <Image source = {require('../../../../assets/tabbedScreenImages/profileScreen/profile-pic.jpg')}
              style = {styles.profilePictureStyle}/>
        }

        <TouchableOpacity>
            <Text style = {styles.editButtonStyle}>Edit</Text>
        </TouchableOpacity>

        {this.state.isVisible === false && this.state.data !== null && 
            <TextInput  style = {[{fontSize: 20}, styles.contentStyle]} value = {this.state.data.name}
            onChangeText = {value => {
                            this.setState(prevState => ({
                                data: {
                                  ...prevState.data,
                                  ["name"]: value
                                }
                            }))
                          }
                        }
              />
        }
        
        {this.state.isVisible === false && this.state.data !== null && 
            <TextInput  style = {[{fontSize: 20}, styles.contentStyle]} value = {this.state.data.address1}
            onChangeText = {value => {
                            this.setState(prevState => ({
                                data: {
                                  ...prevState.data,
                                  ["address1"]: value
                                }
                            }))
                          }
                        }
              />
        }
        
        {this.state.isVisible === false && this.state.data !== null && 
            <TextInput  style = {[{fontSize: 20}, styles.contentStyle]} value = {this.state.data.nric}
            onChangeText = {value => {
                            this.setState(prevState => ({
                                data: {
                                  ...prevState.data,
                                  ["nric"]: value
                                }
                            }))
                          }
                        }
              />
        }

        {this.state.isVisible === false && this.state.data !== null && 
            <Text style = {[{fontSize: 20}, styles.contentStyle]}>{userMobileNumber}</Text>
        }

        
  
      </KeyboardAvoidingView>
    );
  }

  fetchUserDetails = () => {
    AsyncStorage.getItem("_phn_number")
    .then((phnNumber) => {
        userMobileNumber = phnNumber;
        try{
          this.bindData()
        }catch(err){
          console.log(err)
        }
    })
  }
  
  bindData = () => {
    this.setState({isVisible:true})
    
    var url = BASE_URL + user_endpoints.GET_USER_DETAILS + parseInt(userMobileNumber)
    fetchFromAPI({URL:url,request_method:HTTPMethods.GET})
    .then((response) => {
      this.setState({isVisible:false})
      if(statusCode.SUCCESSFUL.includes(response.code)){
          this.setState({
            data: response.data[0]
          })
          console.log(this.state.data["address1"])
      }else{
        Alert.alert("Let Me In", "Network issue.Please try again later");
      }

    })
    .catch(err => {
      this.setState({isVisible:false})
      console.log(err)
    })
  }

  handleSaveClicked = () => {
    var url = BASE_URL + user_endpoints.UPDATE_USER;
    var _body = this.state.data
    delete _body["mobile_no"]
    _body.phoneNumber = userMobileNumber

    this.setState({isFetching: true});
    fetchFromAPI({URL: url, request_method: HTTPMethods.POST, body: JSON.stringify(_body)})
    .then((response) => {
        this.setState({isFetching: false})

        if(statusCode.SUCCESSFUL.includes(response.code)) {
          Alert.alert("Let Me In" , "Profile updated successfully")
        }else{
          Alert.alert("Let Me In" , "Please recheck the mobile number and try again");
        }

    })
    .catch(err => {
      Alert.alert("Let Me In" , "Network Issue. Please try again later");
    })
    // DialogBox.op
  }
}
