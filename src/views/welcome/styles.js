import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1, 
        flexDirection:'column',
        paddingTop: 60
    },
    welcomeTextStyles: {
        color: '#808080', 
        textAlign: 'center',
    },
    btnViewStyle: {
        backgroundColor: '#2b84a4', 
        borderRadius: 8, 
        paddingVertical: 15, 
        paddingHorizontal: 20, 
        marginTop: 50, 
        marginHorizontal: 35
    },
    btnTextStyle: {
        color: '#ffffff', 
        fontSize: 20, 
        textAlign: 'center'
    },
    btnRegisterStyle: {
        fontSize: 20, 
        textAlign:'center', 
        color: '#808080',
        marginTop: 20
    }

});

export {styles}