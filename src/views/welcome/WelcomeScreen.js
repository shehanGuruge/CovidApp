import React, { Component } from 'react';
import { View, Text , TouchableOpacity, CameraRoll, } from 'react-native';
import WelcomeImage from '../../../assets/home.svg'
import {styles} from './styles'
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import {WebView} from 'react-native-webview'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false
    };
  }

  async createPDF() {
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents',
    };
 
    RNHTMLtoPDF.convert(options)
    .then((response) => {
      console.log(response)
    })
    .catch(err => {console.log(err)})
    // console.log(file.filePath);
    // console.log(file.filePath);
  }

  render() {
    return (
      <View style = {styles.outerContainer}>
          <View style = {{alignSelf: 'center'}}>
            <WelcomeImage height = {290} width = {290}/>
          </View>
        <Text style = {[styles.welcomeTextStyles, {fontSize: 24,  marginTop: 25}]}>Track my shopping</Text>
        <Text style = {[styles.welcomeTextStyles, {fontSize: 16, marginTop: 15}]}>Now you can track your shopping destinations</Text>
        <Text style = {[styles.welcomeTextStyles,{fontSize: 16}]}>with us by simply scanning the QR Code</Text>
        <Text style = {[styles.welcomeTextStyles,{fontSize: 16}]}>at the shop</Text>

        {/* this.props.navigation.navigate('MobileVerification') */}
        <TouchableOpacity onPress = {() => this.props.navigation.navigate('MobileVerification')}>
            <View style = {styles.btnViewStyle}>
                <Text style = {styles.btnTextStyle}>Login</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => this.props.navigation.navigate('Registration')}>
            <Text style = {styles.btnRegisterStyle}>Register</Text>
        </TouchableOpacity>

        <WebView
          bounces={false}
          scrollEnabled={false} 
          source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }} />
          
      </View>
    );
  }

  handle = () => {
    console.log("HERE")
    // ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
    // return(
    // <WebView source={{ uri: 'https://github.com/facebook/react-native' }} >

    // </WebView>
    // )
    // const dirs = RNFetchBlob.fs.dirs
    // RNFetchBlob.fs.writeFile(dirs.DCIMDir, 
    // "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"
    // ,"base64")

  }


  downloadFile(){
    const uri = "http://techslides.com/demos/sample-videos/small.mp4"
    let fileUri = FileSystem.documentDirectory + "small.mp4";
    FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
        this.saveFile(uri);
        console.log(uri)
      })
      .catch(error => {
        console.error(error);
      })
  }

saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
}

  // pdf = () => {
  //   return(
  //     <PDFViewer>
  //       <Document>
  //         <Page size="A4" >
  //           <View>
  //             <Text>Section #1</Text>
  //           </View>
  //           <View>
  //             <Text>Section #2</Text>
  //           </View>
  //         </Page>
  //       </Document>
  //     </PDFViewer>
      
  //   )
  // }

  saveThePicture = async()=>{
    let filename = FileSystem.bundleDirectory + "gin.png"

    // console.log(this.state.base64);

    console.log("break");

    console.log(filename);
try {
console.log("Fliieeg")
await FileSystem.writeAsStringAsync(filename, 
  "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"
  ,{encoding: FileSystem.EncodingType.Base64}).then(
  ()=>{console.log("Yes it is fin!")}
);
} catch (error) {
console.log(error);
}
    
}
}
