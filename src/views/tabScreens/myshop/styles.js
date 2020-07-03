import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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


const addNewShopStyles = StyleSheet.create({
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

const shopScreenStyles = StyleSheet.create({
    container: {
        flex:1, 
        marginTop: 15, 
        paddingHorizontal: 30, 
        flexDirection: 'column', 
        justifyContent: 'space-between'
    },
    shopDescriptionStyles: {
        color: '#666666', 
        fontSize: 16,
        marginTop: 5
    },
    qrImageStyles: {
        height: 250, 
        width: 250, 
        resizeMode: "contain", 
        alignSelf:'center',
        marginTop: 50,
    },
    btnSaveQRcodeStyles: {
        fontSize: 20, 
        color: '#2b84a4',
        textAlign: 'center', 
        fontWeight: "bold"
    },
    btnDownloadStyles: {
        fontSize: 18, 
        color: '#b3b3b3',
        textAlign: 'center', 
        paddingHorizontal: 20, 
        marginBottom: 20 
    }
});
export {styles,addNewShopStyles, shopListingStyles,shopScreenStyles};