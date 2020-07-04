import React, { Component } from 'react';
import { View, Text, Image , AsyncStorage} from 'react-native';
import {ScreenDimensions} from '../.././utils/index'
import {NavigationActions, StackActions} from 'react-navigation';
import {styles} from './styles'

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
    return (
      <View style = {styles.outerView}>
          <View style = {styles.imageAndTextView}>
            <Image source = {require('../../../assets/SplashScreen/app_logo.png')}
                    style = {styles.logoImageStyle} />
            <Text style = {styles.captionStyle}> LetMeIn </Text>
          </View>
          <Text style = {styles.versionInfo}> v 1.0.1 </Text>
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


  
}
