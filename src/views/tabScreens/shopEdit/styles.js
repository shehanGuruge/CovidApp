import {StyleSheet} from 'react-native';


const shopListingStyles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 25, 
        flexDirection: 'column',
        marginBottom: 30,
    },
    headerTextStyles: {
        color: '#666666', 
        fontSize: 20,
        marginHorizontal:30
    }
});



const noResultsFoundScreen = StyleSheet.create({
    container: {
        height: '100%', 
        marginTop: 25, 
        paddingHorizontal: 30,
    },
    headerTextStyles: {
        color: '#666666', 
        fontSize: 20,
        textAlign: 'center'
    }
});



const editShopListingStyles = StyleSheet.create({
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
    btnViewStyle: {
        backgroundColor: '#2b84a4', 
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
});

export {shopListingStyles,noResultsFoundScreen,editShopListingStyles}