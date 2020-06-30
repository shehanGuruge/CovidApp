import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {styles} from './styles'

var celciusDegreeSymbol = '°'



export default class CheckInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backColor: null
    };
  }

  


  render() {
    
    const {shopName, temperature, backColor = 'black', checkedInDateTime} = this.props;

    return (
      <View style = {[styles.listItemView,{borderLeftColor:this.props.backColor, borderLeftWidth: 5}]}>
        <Text style = {styles.shopName}> {this.props.shopName} </Text>
        <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style = {styles.checkedInDetails}> {this.props.checkedInDateTime}</Text>
            <Text style = {[styles.checkedInDetails,{color:this.props.backColor}]}> {this.props.temperature} C{celciusDegreeSymbol} </Text>
        </View>
      </View>
    );
  }
}
