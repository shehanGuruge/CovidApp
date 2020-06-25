import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    btnViewStyle: {
        backgroundColor: '#009999', 
        borderRadius: 8, 
        paddingVertical: 15, 
        paddingHorizontal: 20, 
        marginTop: 50, 
        marginHorizontal: 15
    },
    btnTextStyle: {
        color: '#ffffff', 
        fontSize: 20, 
        textAlign: 'center'
    },
    textFieldText: {
        marginTop: 30, 
        fontSize: 16, 
        color: '#808080', 
        letterSpacing: 0.9
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
        marginTop: 15, 
        borderBottomColor: '#666666', 
        borderBottomWidth: 2,
        flexDirection: 'row', 
        paddingBottom: 5
    }

});

export {styles};