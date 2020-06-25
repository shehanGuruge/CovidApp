import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import {styles} from './styles';


export default class ShopItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const {onPress} = this.props;
    return (
      <View style = {styles.listItemView}>
        <View style = {{flexDirection: 'column'}}>
            <Text style = {styles.shopName}>SUNWAY PYRAMID</Text>
            <Text style = {styles.shopAddress} numberOfLines = {1} ellipsizeMode = "tail">JALAN COCHRAHNE, TAMAN MALURI SAMRUI</Text>
        </View>
        <TouchableOpacity onPress = {this.props.onPress}>
            <Image source = {require('../../../assets/tabbedScreenImages/myShopScreen/next.png')}
            style = {styles.moreIconStyle}/>
        </TouchableOpacity>
      </View>
    );
  }
}
