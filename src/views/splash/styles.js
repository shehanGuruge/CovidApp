import {StyleSheet} from 'react-native';
import {ScreenDimensions} from '../../utils/index'

const styles = StyleSheet.create({
    outerView: {
        flex: 1, 
        backgroundColor: "#ffffff",
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent:"space-between"
    },
    imageAndTextView: {
        alignSelf: 'center', 
        marginTop: (ScreenDimensions.SCREEN_HEIGHT/2)-150
    },
    captionStyle: {
        color: "#2b84a4", 
        fontSize: 40, 
        fontWeight: 'bold', 
        marginTop: 45
    },
    logoImageStyle: {
        height: 160, 
        width: 160,
        resizeMode: 'contain'
    },
    versionInfo: {
        color: "#2b84a4", 
        fontSize: 18, 
        fontWeight: "bold", 
        marginBottom: 15,
        textAlign: 'center'
    }
});


export {styles};