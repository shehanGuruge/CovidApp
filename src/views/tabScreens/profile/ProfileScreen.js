import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {BASE_URL,user_endpoints} from '../../../constants/Endpoints';
import {fetchFromAPI} from '../../../helpers/requests';
import {HTTPMethods} from '../../../constants/HTTPMethods'
import {Loader} from '../../../components/index';
import {styles} from './styles'

var userMobileNumber = null
export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      data: []
    };
  }

  UNSAFE_componentWillMount(){
    this.fetchUserDetails();
  }

  render() {
    return (
      <View style = {styles.outerContainer}>
         <Loader isVisible = {this.state.isVisible}/>
            <NavigationEvents 
                onDidFocus = {
                    payload => {
                        this.fetchUserDetails()
                    }
                }
            />
        <Image source = {require('../../../../assets/tabbedScreenImages/profileScreen/profile-pic.jpg')}
            style = {styles.profilePictureStyle}/>

        <TouchableOpacity>
            <Text style = {styles.editButtonStyle}>Edit Picture</Text>
        </TouchableOpacity>

        {this.state.isVisible === false && this.state.data.length > 0 && 
            <Text style = {[{fontSize: 22}, styles.contentStyle]}>{this.state.data[0].name}</Text>
        }
        
        {this.state.isVisible === false && this.state.data.length > 0 && 
            <Text style = {[{fontSize: 20}, styles.contentStyle]}>{this.state.data[0].address1}</Text>
        }
        
        {this.state.isVisible === false && this.state.data.length > 0 && 
            <Text style = {[{fontSize: 20}, styles.contentStyle]}>92854688921665</Text>
        }

        {this.state.isVisible === false && this.state.data.length > 0 && 
            <Text style = {[{fontSize: 20}, styles.contentStyle]}>{this.state.data[0].mobile_no}</Text>
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
      if(response.code === 200){
          this.setState({
            data: response.data
          })

          
      }else{
        Alert.alert("Let Me In", "Network issue.Please try again later");
      }

    })
    .catch(err => {
      this.setState({isVisible:false})
      console.log(err)
    })
  }
}
