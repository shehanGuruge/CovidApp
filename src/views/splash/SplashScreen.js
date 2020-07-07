import React, { Component } from 'react';
import { View, Text, Image , AsyncStorage, Alert} from 'react-native';
import {ScreenDimensions} from '../.././utils/index'
import {NavigationActions, StackActions} from 'react-navigation';
import {styles} from './styles'
import {BASE_URL,user_endpoints} from '../../constants/Endpoints';
import {fetchFromAPI} from '../../helpers/requests';
import {statusCode,HTTPMethods} from '../../constants/HTTPMethods'

export default class SplashScreen extends Component {

    componentDidMount(){
        try{
            this.checkUserLoggedIn()
            .then((isLogged) => {
                if(isLogged){
                    setTimeout(() => {
                        this.props.navigation.dispatch(this.toTabScreen)
                    },3000);
                }else{
                    setTimeout(() => {
                        this.props.navigation.dispatch(this.toWelcomeScreen)
                    },3000);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }catch(err){
            console.log(err)
        }
    }

  constructor(props) {
    super(props);
    this.state = {
        screenName: "Welcome"
    };
  }

  render() {
      const myImageUrl = require('../../../assets/SplashScreen/app_logo.png')
    return (
      <View style = {styles.outerView}>
          <View style = {styles.imageAndTextView}>
            <Image source = {myImageUrl}
                    style = {styles.logoImageStyle} />
            <Text style = {styles.captionStyle}> LetMeIn </Text>
          </View>
          <Text style = {styles.versionInfo}> v 1.0.0 </Text>
      </View>
    );
  }

  toTabScreen = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "tabScreens" })],
  });

  toWelcomeScreen = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "Welcome" })],
  });

  checkUserLoggedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("_isLogged")
      .then(response => {
        if(response === "true"){
          AsyncStorage.getItem("_phn_number")
          .then((response) => {
            if(response !== null && response !== undefined && response !== ""){
              this.checkUserExists(response)
              .then(isExist => {
                resolve(isExist)
              })
            }
          })
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


  checkUserExists = (phnNumber) => {

    var url = BASE_URL + user_endpoints.DOES_USER_EXIST+parseInt(phnNumber);

    return new Promise((resolve, reject) => {
      fetchFromAPI({URL: url, request_method: HTTPMethods.GET})
      .then((response) => {
          statusCode.SUCCESSFUL.includes(response.code)
          ? resolve(true) : resolve(false)
      })
      .catch(err => {
        Alert.alert("LetMeIn" , "An unexpected error occured. Please try again later");
        reject(err)
      })
    })
  }
 
}
