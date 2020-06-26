import {StyleSheet} from 'react-native';
import {ScreenDimensions} from '../../utils/index'

const styles = StyleSheet.create({
    parentContainer:{
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: ScreenDimensions.SCREEN_WIDTH, 
        position: "absolute", 
        top: 0, 
        marginTop: 0, 
        height: ScreenDimensions.SCREEN_HEIGHT , 
        justifyContent: 'center',
        alignItems: 'center', 
        zIndex: 5,
        bottom: 0, 
        left: 0, 
        right: 0
    }, 
    childContainer : {
        flex: 1, 
        height: 130, 
        width: 130, 
        alignContent: 'center',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignSelf: 'center', 
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 10,
        padding: 10,
    },
    textStyle : {
        color: '#fff',
        fontWeight: 'bold', 
        marginTop: 12, 
        alignSelf: 'center', 
        fontSize: 15
    }
});


export {styles}