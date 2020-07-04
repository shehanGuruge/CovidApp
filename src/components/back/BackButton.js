import React from 'react'
import {TouchableOpacity, Text, View, Image} from 'react-native'
import {styles} from './styles'

export const BackButton = (props) => {

    const {onPress} = props

    return(
        <TouchableOpacity  onPress = {props.onPress}>
            <View style = {styles.backButtonView}>
                <Image source ={require('../../../assets/back.png')} 
                    style = {styles.backButtonImage}/>
                {/* <Text style = {styles.backButtonText}>Back</Text> */}
            </View>
        </TouchableOpacity>
    )
}
