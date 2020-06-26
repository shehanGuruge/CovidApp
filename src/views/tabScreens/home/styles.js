import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1, 
        backgroundColor: '#fff', 
        flexDirection: 'column', 
        paddingHorizontal: 25
    },
    tabsView: {
        marginTop: 20, 
        borderRadius: 10, 
        marginBottom: 25,
        flexDirection:'row', 
        justifyContent:'center',
    },
    tab: {
        fontSize: 16, 
        paddingVertical: 8, 
        paddingHorizontal: 15, 
        letterSpacing: 0.5,
        borderWidth: 1, 
        borderColor: '#2b84a4'
    }
});

export {styles}