import React, { Component } from 'react';
import { View, Text , TextInput, TouchableOpacity, Alert, TouchableOpacityBase} from 'react-native';
import Firebase from 'firebase';
import OtpImage from '../../../assets/otp.svg'
import {Loader} from '../../components/index';
import {styles} from './styles'

var verificationId;
export default class OtpScreen extends Component {

  componentDidMount(){
    
  }

  constructor(props) {
    super(props);
    this.state = {
      otpNo1: "",
      otpNo2: "",
      otpNo3: "",
      otpNo4: "",
      otpNo5: "",
      otpNo6: "",
      isFetching: false,
    };

    verificationId = this.props.navigation.getParam("verificationId");
    console.log(verificationId);
  }

  render() {
    return (
      <View style  = {styles.outerContainer}>
        <Loader isVisible = {this.state.isFetching}/>
          <View style = {styles.otpImageContainer}>
            <OtpImage height = {300} width = {300} />
          </View>

          <View style = {styles.textInputsContainer}>
                <TextInput value = {this.state.otpNo1}
                            onChangeText = {value => {
                                    this.setState({otpNo1:value})
                                    if(value !== ""){
                                      this.secondInput.focus();
                                    }
                                  }
                                  }
                                    style = {styles.textInputStyle} 
                                    placeholder = "0" 
                                    keyboardType= "numeric" 
                                    placeholderTextColor = "#a6a6a6" 
                                    maxLength = {1} 
                                  
                                    />

                <TextInput ref = {ref => this.secondInput = ref}
                                    onChangeText = {value => {
                                      this.setState({otpNo2:value})
                                      if(value !== ""){
                                        this.thirdInput.focus();
                                      }
                                    }
                                    }
                                    value = {this.state.otpNo2}
                                    style = {styles.textInputStyle} 
                                    placeholder = "0" 
                                    keyboardType= "numeric"
                                    placeholderTextColor = "#a6a6a6" 
                                    maxLength = {1} />

                <TextInput ref = {ref => this.thirdInput = ref}
                                    style = {styles.textInputStyle} 
                                    onChangeText = {value => {
                                      this.setState({otpNo3:value})
                                      if(value !== ""){
                                        this.fourthInput.focus();
                                      }
                                    }
                                    }
                                    value = {this.state.otpNo3}
                                    placeholder = "0" 
                                    keyboardType= "numeric" 
                                    placeholderTextColor = "#a6a6a6" 
                                    maxLength = {1} />

                <TextInput  ref = {ref => this.fourthInput = ref}
                                    style = {styles.textInputStyle} 
                                    onChangeText = {value => {
                                      this.setState({otpNo4:value})
                                      if(value !== ""){
                                        this.fifthInput.focus();
                                      }
                                    }
                                    }
                                    value = {this.state.otpNo4}
                                    placeholder = "0" 
                                    keyboardType= "numeric" 
                                    placeholderTextColor = "#a6a6a6" 
                                    maxLength = {1} />
                
                <TextInput ref = {ref => this.fifthInput = ref}
                                    style = {styles.textInputStyle} 
                                    onChangeText = {value => {
                                      this.setState({otpNo5:value})
                                      if(value !== ""){
                                        this.sixthInput.focus();
                                      }
                                    }
                                    }
                                    value = {this.state.otpNo5}
                                    placeholder = "0" 
                                    keyboardType= "numeric" 
                                    placeholderTextColor = "#a6a6a6" 
                                    maxLength = {1} 
                                    />
                
                <TextInput ref = {ref => this.sixthInput = ref}
                                    style = {styles.textInputStyle} 
                                    onChangeText = {value => {
                                      this.setState({otpNo6:value})
                                    }
                                    }
                                    value = {this.state.otpNo6}
                                    placeholder = "0" 
                                    keyboardType= "numeric" 
                                    placeholderTextColor = "#a6a6a6" 
                                    maxLength = {1} />
          </View>


          <TouchableOpacity onPress = {() => this.handleVerification()}>
            <View style = {styles.btnViewStyle}>
                <Text style = {styles.btnTextStyle}>Verify</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }

  handleVerification = () => {
    var verificationCode = this.getOtp();
    if(verificationCode === null){
      Alert.alert("LetMeIn" ,"Invalid Verification Code")
    }else{
      this.setState({isFetching:true})
      const credential = Firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      )
      Firebase.auth().signInWithCredential(credential)
      .then((response) => {
        this.setState({isFetching:false})

        if(response !== null){
          this.props.navigation.navigate("tabScreens");
        }
      }).catch((err) => {
        this.setState({isFetching:false})

        console.log(err);
        Alert.alert("LetMeIn", "Your SMS verification code has been expired." ,[
          {
            text: "OK",
            onPress: () =>  this.props.navigation.pop()
          }
        ]);

      })
    }
    
  }

  getOtp = () => {
    if(this.state.otpNo1 !== "" && this.state.otpNo2 !== "" && this.state.otpNo3 !== "" && 
       this.state.otpNo4 !== "" && this.state.otpNo5 !== "" && this.state.otpNo6 !== ""){
        return this.state.otpNo1 + this.state.otpNo2 + this.state.otpNo3 + this.state.otpNo4 + this.state.otpNo5 + this.state.otpNo6
    }
    return null;
  }
}
