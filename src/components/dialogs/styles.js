import {StyleSheet} from  'react-native'

const popupStyles = StyleSheet.create({
    outerView: {
        flex: 1,
        backgroundColor:'rgba(43,132,164,0.6)',
        top: 0, 
        bottom: 0, 
        left: 0, 
        right: 0, 
        position: 'absolute',
        justifyContent:"center"
    },
    popupView: {
        backgroundColor: '#fff', 
        marginHorizontal: 25, 
        borderRadius: 15,
        paddingHorizontal: 25, 
        paddingVertical: 60
    },
    textStyles: {
        fontSize: 16, 
        color: "#a6a6a6", 
        letterSpacing: 0.7
    },
    textInputView:{
        width: "100%",
        flexDirection: 'row', 
        marginTop: 25
    },
    textInputStyles: {
        fontSize: 20,
        flex: 1
    },
    celciusTextStyles: {
        fontSize: 14, 
        color: "#a6a6a6", 
        alignSelf:'flex-end'
    },
    dividerStyles: {
        width:"100%", 
        height: 2, 
        backgroundColor: '#a6a6a6',
         marginTop: 10
    }
});

export {popupStyles}