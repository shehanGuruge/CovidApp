import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'flex-end'
    },
    otpImageContainer: {
        alignSelf: 'center',
        marginTop: 100
    },
    textInputsContainer: {
        flexDirection: 'row', 
        paddingHorizontal: 60, 
        justifyContent: 'space-between' , 
        marginTop: 80
    },
    textInputStyle : {
        borderBottomColor: '#737373',  
        borderBottomWidth: 2, 
        fontSize: 30, 
        width: 50,
        color: '#000', 
        textAlign: 'center', 
        paddingBottom: 12
    },
    btnViewStyle: {
        backgroundColor: '#009999', 
        borderRadius: 8, 
        paddingVertical: 15, 
        paddingHorizontal: 20, 
        marginTop: 60, 
        marginHorizontal: 50,
        marginBottom: 50,
    },
    btnTextStyle: {
        color: '#ffffff', 
        fontSize: 20, 
        textAlign: 'center'
    },

});

export {styles}