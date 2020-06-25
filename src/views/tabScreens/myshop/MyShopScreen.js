import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {styles} from './styles';
import {ScreenDimensions} from '../../../utils/index';
import {ShopItem} from '../../../components/index'

export default class MyShopScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {{flex: 1, backgroundColor: '#ffffff', flexDirection: 'column'}}>

            {/* <View style = {{height: '100%', marginTop: 25, paddingHorizontal: 30}}>
                <Text style = {{color: '#666666', fontSize: 20,textAlign: 'center'}}>
                    You don't have any shops registered </Text>
                <Text style = {{color: '#666666', fontSize: 20,textAlign: 'center'}}>
                    Do you wish to add a shop ?</Text>
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Otp')}>
                    <View style = {[styles.btnViewStyle,{marginTop: ScreenDimensions.SCREEN_HEIGHT/3, marginHorizontal: 50}]}>
                        <Text style = {styles.btnTextStyle}>Add My First Shop</Text>
                    </View>
                </TouchableOpacity>
            </View> */}

            {/* <View style = {{height: '100%', marginTop: 25, paddingHorizontal: 30}}>
                <Text style = {{color: '#666666', fontSize: 20,}}>
                        Enter your shop details below</Text>
                <Text style = {[styles.textFieldText, {marginTop: 40}]}> Shop Name</Text>
                <TextInput style = {styles.textInputStyle}></TextInput>
            
                <Text style = {styles.textFieldText}>Shop Registered Number</Text>
                <TextInput style = {styles.textInputStyle}></TextInput>

                <Text style = {styles.textFieldText}>Mobile Number</Text>
                <View style = {styles.contactNumberView}>
                    <PhoneInput ref='phone' flagStyle = {{height: 30, width: 30, borderRadius: 20}}/>
                    <Text style = {styles.contactCode}> +94 </Text>
                    <Image source = {require('../../../../assets/menu.png')} style = {styles.dropdownImageStyle} />
                    <View style = {styles.verticalDividerStyle}></View>
                    <TextInput style = {{width: '100%'}} keyboardType = "number-pad"></TextInput>
                </View>
                
                <Text style = {styles.textFieldText}>Address</Text>
                <TextInput style = {styles.textInputStyle}></TextInput>
                
                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Otp')}>
                    <View style = {styles.btnViewStyle}>
                        <Text style = {styles.btnTextStyle}>Add My Shop</Text>
                    </View>
                </TouchableOpacity>
            </View> */}

            {/* <View style = {{height: '100%', marginTop: 25, paddingHorizontal: 30, flexDirection: 'column'}}>
                <Text style = {{color: '#666666', fontSize: 20,}}>My shops</Text>
            
                    <ShopItem/>

                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Otp')}>
                    <View style = {[styles.btnViewStyle,{}]}>
                        <Text style = {styles.btnTextStyle}>Add My Shop</Text>
                    </View>
                </TouchableOpacity>
            </View> */}

            <View style = {{height: '100%', marginTop: 35, paddingHorizontal: 30, flexDirection: 'column'}}>
                <Text style = {{color: '#666666', fontSize: 18,marginTop: 5 }}>SUNWAY PYRAMID</Text>
                <Text style = {{color: '#666666', fontSize: 18,marginTop: 5}}>3, JALAN PS-5 11-15, BUNDAR SUNWAY  </Text>
                <Text style = {{color: '#666666', fontSize: 18,marginTop: 5}}>KOL-2398475150364 </Text>
                <Text style = {{color: '#666666', fontSize: 18,marginTop: 5}}>+60 3 96478 24997 </Text>
            </View>


      </View>
    );
  }
}
