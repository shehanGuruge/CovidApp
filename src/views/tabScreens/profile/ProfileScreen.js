import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {styles} from './styles'

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {styles.outerContainer}>
        <Image source = {require('../../../../assets/tabbedScreenImages/profileScreen/profile-pic.jpg')}
            style = {styles.profilePictureStyle}/>

        <TouchableOpacity>
            <Text style = {styles.editButtonStyle}>Edit Picture</Text>
        </TouchableOpacity>

        <Text style = {[{fontSize: 22}, styles.contentStyle]}>Ching Yan Tang</Text>

        <Text style = {[{fontSize: 20}, styles.contentStyle]}>Address goes here</Text>

        <Text style = {[{fontSize: 20}, styles.contentStyle]}>92854688921665</Text>

        <Text style = {[{fontSize: 20}, styles.contentStyle]}>+60 4014 877895</Text>
      </View>
    );
  }
}
