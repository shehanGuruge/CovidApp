import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import {styles} from './styles';
import { ScreenDimensions } from '../../utils';


export default class ShopItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const {onPress, shopName, addressLine1, addressLine2, isEditable = false} = this.props;
    return (
      <View style = {styles.listItemView}>
        <View style = {{flexDirection: 'column', 
              width: this.props.isEditable === false ? ScreenDimensions.SCREEN_WIDTH - 130 : 
              ScreenDimensions.SCREEN_WIDTH - 150 }}>
            <Text style = {styles.shopName}>{this.props.shopName}</Text>
            <Text style = {styles.shopAddress} numberOfLines = {1} ellipsizeMode = "tail">{this.props.addressLine1} {this.props.addressLine2} </Text>
        </View>


        {this.props.isEditable === false &&
            <TouchableOpacity onPress = {this.props.onPress}>
                <Image source = {require('../../../assets/tabbedScreenImages/myShopScreen/next.png')}
                style = {styles.moreIconStyle}/>
            </TouchableOpacity>
        }
        { this.props.isEditable === true &&
            <TouchableOpacity onPress = {this.props.onPress}>
                <View style = {{backgroundColor: "#2b84a4", borderRadius: 5, paddingVertical: 10, 
                  alignSelf: "center", paddingHorizontal: 15, marginRight: 100,}}>
                  <Text style = {{color: "#fff", textAlign: 'center', textAlignVertical: 'center'}}>Edit</Text>
                </View>
            </TouchableOpacity>
        }
      </View>
    );
  }
}
