import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    listItemView: {
        flexDirection:'column', 
        backgroundColor: '#fff', 
        elevation: 6, 
        borderRadius: 6, 
        paddingVertical: 20, 
        paddingLeft: 15, 
        paddingRight: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: '#000',
        marginTop: 10,
    },
    shopName: {
        color:'#666666',
        fontSize:16, 
        fontWeight: 'bold'
    },
    checkedInDetails: {
        color:'#666666',
        fontSize:14, 
        marginTop: 12,
        flexWrap:'wrap',
        letterSpacing: 0.5,
    }
});

export {styles}