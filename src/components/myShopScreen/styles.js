import {StyleSheet} from 'react-native';
import {ScreenDimensions} from '../../utils/index'

const styles = StyleSheet.create({
    listItemView: {
        flexDirection:'row', 
        backgroundColor: '#fff', 
        elevation: 6, 
        borderRadius: 5, 
        paddingVertical: 20, 
        paddingLeft: 15, 
        paddingRight: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: '#000',
        alignItems: 'center',
        marginTop: 10,
    },
    shopName: {
        color:'#666666',
        fontSize:16, 
        fontWeight: 'bold'
    },
    shopAddress: {
        color:'#666666',
        fontSize:13, 
        marginTop: 12,
        flexWrap:'wrap',
        letterSpacing: 0.5,
        width: ScreenDimensions.SCREEN_WIDTH - 130
    },
    moreIconStyle: {
        width: 32, 
        height: 32, 
        resizeMode: 'contain', 
        marginLeft: 10, 
        alignSelf:'center', 
        marginRight: 15
    }
});

export {styles}