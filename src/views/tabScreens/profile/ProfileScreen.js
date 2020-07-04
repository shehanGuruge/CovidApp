import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, AsyncStorage, Alert, TextInput, KeyboardAvoidingView } from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {BASE_URL,user_endpoints} from '../../../constants/Endpoints';
import {fetchFromAPI} from '../../../helpers/requests';
import {HTTPMethods,statusCode} from '../../../constants/HTTPMethods'
import {Loader,DialogBox} from '../../../components/index';
import {styles} from './styles'
import {ScreenDimensions} from '../../../utils/index'

var userMobileNumber = null
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: null,
      doEdit: true,
      isEditable: false
    };
  }

  UNSAFE_componentWillMount(){
    this.fetchUserDetails();
  }

  render() {
    return (
      <View style = {styles.outerContainer} >
        <Text style = {{color: '#666666', fontSize: 20, marginTop: 15}}> Profile Information </Text>
         <Loader isVisible = {this.state.isFetching}/>
            <NavigationEvents 
                onDidFocus = {
                    payload => {
                        this.fetchUserDetails()
                    }
                }
            />
        
      {this.state.isVisible === false && this.state.data !== null && 
        <ScrollView style = {{ paddingTop: 20, paddingBottom: 20}} >
        
          <Text style = {[styles.textFieldText, {marginTop: 15}]}>Name</Text>
          <TextInput style = {[styles.textInputStyle, 
                        {color: this.state.isEditable ? "#000000" : "#bfbfbf",
                        borderBottomColor:  this.state.isEditable ? "#000000" : "#bfbfbf"
                        }]}
                      value = {this.state.data.name}
                      onChangeText = {value => {
                        this.setState(prevState => ({
                            data: {
                              ...prevState.data,
                              ["name"]: value
                            }
                        }))
                      }
                    }
                    editable = {this.state.isEditable}
                    >
          </TextInput>
        
          <Text style = {styles.textFieldText}>NIC / Passport</Text>
          <TextInput style = {[styles.textInputStyle, 
                        {color: this.state.isEditable ? "#000000" : "#bfbfbf",
                        borderBottomColor:  this.state.isEditable ? "#000000" : "#bfbfbf"
                        }]}
                      value = {this.state.data.nric}
                      onChangeText = {value => {
                        this.setState(prevState => ({
                            data: {
                              ...prevState.data,
                              ["nric"]: value
                            }
                        }))
                      }
                    }
                    editable = {this.state.isEditable}>
          </TextInput>
          

          <Text style = {styles.textFieldText}>Mobile Number</Text>
          <TextInput  style = {[styles.textInputStyle,{color: "#bfbfbf", borderBottomColor: "#bfbfbf"}]}
                    value = {userMobileNumber}
                    keyboardType = "number-pad"
                    editable = {false}>
          </TextInput>
          
          <Text style = {styles.textFieldText}>Address Line 1</Text>
          <TextInput style = {[styles.textInputStyle, 
                        {color: this.state.isEditable ? "#000000" : "#bfbfbf",
                        borderBottomColor:  this.state.isEditable ? "#000000" : "#bfbfbf"
                        }]}
                      value = {this.state.data.address1}
                      onChangeText = {value => {
                        this.setState(prevState => ({
                            data: {
                              ...prevState.data,
                              ["address1"]: value
                            }
                        }))
                      }
                    }
                    editable = {this.state.isEditable}>
          </TextInput>

          <Text style = {styles.textFieldText}>Address Line 2</Text>
          <TextInput style = {[styles.textInputStyle, 
                        {color: this.state.isEditable ? "#000000" : "#bfbfbf",
                        borderBottomColor:  this.state.isEditable ? "#000000" : "#bfbfbf"
                        }]}
                      value = {this.state.data.address2}
                      onChangeText = {value => {
                        this.setState(prevState => ({
                            data: {
                              ...prevState.data,
                              ["address2"]: value
                            }
                        }))
                      }
                    }
                    editable = {this.state.isEditable}>
          </TextInput>

          <Text style = {styles.textFieldText}>City</Text>
          <TextInput style = {[styles.textInputStyle, 
                        {color: this.state.isEditable ? "#000000" : "#bfbfbf",
                        borderBottomColor:  this.state.isEditable ? "#000000" : "#bfbfbf"
                        }]}
                      value = {this.state.data.city}
                      onChangeText = {value => {
                        this.setState(prevState => ({
                            data: {
                              ...prevState.data,
                              ["city"]: value
                            }
                        }))
                      }
                    }
                    editable = {this.state.isEditable}>
          </TextInput>

          <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style = {styles.textFieldText}>State</Text>
              <TextInput style = {[styles.textInputStyle, 
                        {color: this.state.isEditable ? "#000000" : "#bfbfbf",
                        borderBottomColor:  this.state.isEditable ? "#000000" : "#bfbfbf",
                        width: ScreenDimensions.SCREEN_WIDTH/2 - 50
                        }]}
                          value = {this.state.data.state}
                          onChangeText = {value => {
                            this.setState(prevState => ({
                                data: {
                                  ...prevState.data,
                                  ["state"]: value
                                }
                            }))
                          }
                        }
                        editable = {this.state.isEditable}>
              </TextInput>
            </View>

            <View style = {{marginBottom: 25}}>
              <Text style = {styles.textFieldText}>Postal Code</Text>
              <TextInput style = {[styles.textInputStyle, 
                        {color: this.state.isEditable ? "#000000" : "#bfbfbf",
                        borderBottomColor:  this.state.isEditable ? "#000000" : "#bfbfbf",
                        width: ScreenDimensions.SCREEN_WIDTH/2 - 50
                        }]}
                          value = {this.state.data.post_code}
                          onChangeText = {value => {
                            this.setState(prevState => ({
                                data: {
                                  ...prevState.data,
                                  ["post_code"]: value
                                }
                            }))
                          }
                        }
                        keyboardType = "number-pad"
                        editable = {this.state.isEditable}>
              </TextInput>
            </View>
          </View>
        </ScrollView>
      }
      {this.state.isVisible === false && this.state.data !== null &&
        <TouchableOpacity onPress = {
                  () => {
                        this.state.doEdit === true ? this.setState({isEditable: true, doEdit : false}) : this.handleSaveClicked()
                    }
                  }>
            <View style = {styles.btnViewStyle}>
                <Text style = {styles.btnTextStyle}>
                  {this.state.doEdit === true ? "Edit" : "Save"}</Text>
            </View>
        </TouchableOpacity>
      }
      </View>
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
          console.log(this.state.data)
      }else{
        Alert.alert("LetMeIn", "Network issue.Please try again later");
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

    this.setState({isFetching: true,});
    fetchFromAPI({URL: url, request_method: HTTPMethods.POST, body: JSON.stringify(_body)})
    .then((response) => {
        this.setState({isFetching: false})

        if(statusCode.SUCCESSFUL.includes(response.code)) {
          Alert.alert("LetMeIn" , "Profile updated successfully")
          this.setState({doEdit: true, isEditable: false})
          this.bindData();
        }else{
          Alert.alert("LetMeIn" , "Please recheck the mobile number and try again");
        }

    })
    .catch(err => {
      Alert.alert("LetMeIn" , "Network Issue. Please try again later");
    })
    // DialogBox.op
  }
}
