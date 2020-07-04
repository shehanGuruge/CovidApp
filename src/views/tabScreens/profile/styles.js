import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1, 
        flexDirection: 'column', 
        backgroundColor: '#fff', 
        paddingTop: 15, 
        paddingHorizontal: 25
    },
    profilePictureStyle: {
        height: 180, 
        width: 180, 
        borderRadius: 100, 
        resizeMode: 'cover', 
        alignSelf: 'center'
    },
    editButtonStyle: {
        fontSize: 16,
        color: '#2b84a4',
        textAlign: 'center', 
        fontWeight: 'bold' 
    },
    contentStyle: {
        color: '#999999', 
        textAlign: 'center', 
        marginTop: 30
    },
    textFieldText: {
        marginTop: 30, 
        fontSize: 16, 
        color: '#666666', 
        letterSpacing: 0.9
    },
    textInputStyle: {
        borderBottomColor: '#666666', 
        borderBottomWidth: 2, 
        width: '100%', 
        marginTop: 15
    },
    btnViewStyle: {
        backgroundColor: '#2b84a4', 
        borderRadius: 8, 
        paddingVertical: 15, 
        paddingHorizontal: 20, 
        marginTop: 20, 
        marginHorizontal: 15,
        marginBottom: 25
    },
    textFieldText: {
        marginTop: 30, 
        fontSize: 16, 
        color: '#808080', 
        letterSpacing: 0.9
    },
    btnTextStyle: {
        color: '#ffffff', 
        fontSize: 20, 
        textAlign: 'center'
    },
})

export {styles}