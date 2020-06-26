import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    outerContainer: {
        flex:1, 
        flexDirection: 'column', 
        paddingHorizontal: 25, 
        paddingTop: 60
    },
    errorMessage: {
        fontSize: 16, 
        color: 'red', 
        marginTop: 15 
    },
    registerButtonStyle: {
        fontSize: 18, 
        textAlign:'center', 
        color: '#3399ff', 
        marginTop: 40
    },
    textInputStyle: {
        borderBottomColor: '#666666', 
        borderBottomWidth: 2, 
        width: '100%', 
        marginTop: 15
    },
    verticalDividerStyle: {
        width: 2, 
        height: '80%', 
        marginLeft: 5, 
        marginRight: 10, 
        backgroundColor: '#a6a6a6'
    },
    dropdownImageStyle: {
        height: 20, 
        width: 20, 
        resizeMode: 'cover', 
        alignSelf: 'center', 
        marginHorizontal: 10
    },
    contactCode:{
        fontSize: 14, 
        color: '#808080', 
        alignSelf:'center'
    },
    contactNumberView: {
        width: "100%",  
        marginTop: 30, 
        borderBottomColor: '#666666', 
        borderBottomWidth: 2,
        flexDirection: 'row', 
        paddingBottom: 5,
    },
    contactNumberTextStyle: {
        color: '#808080', 
        fontSize: 24,  
        marginTop: 30
    },
    btnViewStyle: {
        backgroundColor: '#2b84a4', 
        borderRadius: 8, 
        paddingVertical: 15, 
        paddingHorizontal: 20, 
        marginTop: 35, 
        marginHorizontal: 35
    },
    btnTextStyle: {
        color: '#ffffff', 
        fontSize: 20, 
        textAlign: 'center'
    },
});

export {styles}