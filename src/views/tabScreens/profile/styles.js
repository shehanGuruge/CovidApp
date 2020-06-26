import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1, 
        flexDirection: 'column', 
        backgroundColor: '#fff', 
        paddingTop: 50, 
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
        marginTop: 16, 
        textAlign: 'center', 
        fontWeight: 'bold' 
    },
    contentStyle: {
        color: '#999999', 
        textAlign: 'center', 
        marginTop: 30
    }
})

export {styles}