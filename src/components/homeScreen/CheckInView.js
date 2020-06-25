import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {styles} from './styles'

var celciusDegreeSymbol = '°'

export default class CheckInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    
    const {shopName, checkedInDetails, temperature, color = 'red'} = this.props;

    return (
      <View style = {[styles.listItemView,{borderLeftColor:color, borderLeftWidth: 5}]}>
        <Text style = {styles.shopName}> FLEA MARKET AT AMCORP MALL </Text>
        <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style = {styles.checkedInDetails}> Wed, 10th June 2020 at 13:07h </Text>
            <Text style = {[styles.checkedInDetails,{color:color}]}> 32 C{celciusDegreeSymbol} </Text>
        </View>
      </View>
    );
  }
}
