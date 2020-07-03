import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {popupStyles} from './styles'

export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isVisible:false,
    };
  }

  render() {
    return (
        <View style = {popupStyles.outerView}>
            <View style = {popupStyles.popupView}>
                <Text style = {popupStyles.textStyles}>Enter your body temperature</Text>
                <Text style = {popupStyles.textStyles}>Enter your body temperature</Text>
                <TouchableOpacity>
                    <Text>OK</Text>
                </TouchableOpacity>
                <View style = {popupStyles.dividerStyles}/>
            </View>
        </View>
    );
  }

//   ope(title, message, onPress){
//       return(
//         <View style = {popupStyles.outerView}>
//             <View style = {popupStyles.popupView}>
//                 <Text style = {popupStyles.textStyles}>Enter your body temperature</Text>
//                 <Text style = {popupStyles.textStyles}>Enter your body temperature</Text>
//                 <TouchableOpacity>
//                     <Text>OK</Text>
//                 </TouchableOpacity>
//                 <View style = {popupStyles.dividerStyles}/>
//             </View>
//         </View>
//       )
//   }
}
