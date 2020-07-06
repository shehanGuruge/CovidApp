import React, { Component } from 'react';
import { Image, TouchableOpacity, AsyncStorage } from 'react-native';
import {styles} from './styles'
import {withNavigation} from 'react-navigation'

class Logout extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity onPress = {() => this.handleOnLogoutPressed()}>
        <Image source = {require('../../../assets/switch.png')} style={styles.logoutImage}/>
      </TouchableOpacity>
    );
  }

  handleOnLogoutPressed = () => {
    AsyncStorage.setItem("_isLogged", "false")
    .then(() => {
      this.props.navigation.navigate("Welcome")
    })
  }
}


export default withNavigation(Logout)