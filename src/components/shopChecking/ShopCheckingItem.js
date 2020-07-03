import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {styles} from './styles';

var celciusDegreeSymbol = '°'
const ShopCheckingItem = (props) => {
    const {customerName, temperature, backColor, checkedInDateTime} = props;

    return(
        <View style = {[styles.listItemView,{borderLeftColor:props.backColor, borderLeftWidth: 5, marginRight: 5}]}>
            <Text style = {styles.shopName}> {props.customerName} </Text>
            <View style = {{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style = {styles.checkedInDetails}> {props.checkedInDateTime}</Text>
                <Text style = {[styles.checkedInDetails,{color:props.backColor}]}> {props.temperature} C{celciusDegreeSymbol} </Text>
            </View>
         </View>
        
    )
}



export {ShopCheckingItem}