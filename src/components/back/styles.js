import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    backButtonImage: {
        height: 25, 
        width: 25, 
        resizeMode:"contain"
    },
    backButtonView:{
        flexDirection: 'row', 
        alignSelf:"flex-start"
    },
    backButtonText: {
        alignSelf: "flex-start", 
        marginLeft: 3, 
        color: "#2b84a4", 
        fontSize: 16, 
        textAlignVertical: 'center'
    }
})

export {styles}