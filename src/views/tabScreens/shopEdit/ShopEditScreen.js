import React, { Component } from 'react';
import { View, Text , FlatList, TouchableOpacity, AsyncStorage, TextInput, ScrollView, Picker, Alert} from 'react-native';
import {NavigationEvents} from 'react-navigation'
import {ShopItem,BackButton,Loader} from '../../../components/index';
import {BASE_URL,shop_endpoints} from '../../../constants/Endpoints';
import {fetchFromAPI} from '../../../helpers/requests';
import {HTTPMethods, statusCode} from '../../../constants/HTTPMethods'
import {shopListingStyles, noResultsFoundScreen, editShopListingStyles} from './styles';
import {ScreenDimensions} from '../../../utils/index'

var ownerContactNumber;
export default class ShopEditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFetching: false,
        doesExist: null,
        data : null,
        isShopListingScreenVisible: null,
        clickedItem: null,
    };
  }

  render() {
    return (
        <View style = {{flex: 1, backgroundColor: '#ffffff', flexDirection: 'column'}}>
            <Loader isVisible = {this.state.isFetching}/>
            <NavigationEvents 
                onDidFocus = {
                    payload => {
                        this.checkAvailability()
                    }
                }
                onWillBlur = {
                    payload => {
                        this.setState({
                            doesExist: true,
                            isShopListingScreenVisible: true,
                            clickedItem: null
                        })
                    }
                }
            />
            {this.renderNoExistingShopsScreen()}
            {this.renderShopEditScreen()}
            {this.renderShopListingScreen()}
        </View> 
    );
  }


  renderShopListingScreen = () => {
      if((this.state.doesExist === true || this.state.isShopListingScreenVisible === true) && this.state.data !== null){
          return(
            <View style = {shopListingStyles.container}>
                <Text style = {shopListingStyles.headerTextStyles}>My shops</Text>
                <FlatList
                    style = {{flex: 1, paddingBottom: 15}}
                    data={this.state.data.shops}
                    keyExtractor={(x, i) => i}
                    renderItem={({ item }) =>
                        <ShopItem 
                            onPress = {() => {
                                this.setState({
                                    clickedItem: item,
                                    isShopListingScreenVisible: false,
                                })
                            }}
                            isEditable = {true}
                            shopName = {item.name}
                            addressLine1 = {item.address1 !== null ? item.address1.toUpperCase() : "-"}
                            addressLine2 = {item.address2 !== null ? item.address2.toUpperCase() : "-"}/> 
                    }
                />
            </View> 
          )
      }
}


renderShopEditScreen = () => {
    if(this.state.clickedItem !== null && this.state.isShopListingScreenVisible === false){
        return(
            <View style = {{height: '100%', marginTop: 25, paddingHorizontal: 30}}>
                <BackButton onPress = {() => this.handleOnBackClicked()}/>
                <Text style = {{color: '#666666', fontSize: 20, marginTop: 15}}>
                        Edit your shop details below</Text>
                
                <ScrollView style = {{marginBottom: 30}}>
                    <Text style = {[editShopListingStyles.textFieldText, {marginTop: 40}]}> Shop Name</Text>
                    <TextInput value = {this.state.clickedItem.name}
                        style = {editShopListingStyles.textInputStyle}
                        onChangeText = {value => {
                            this.setState(prevState => ({
                                clickedItem: {
                                  ...prevState.clickedItem,
                                  ["name"]: value
                                }
                            }))
                          }
                        }></TextInput>
                

                    <Text style = {editShopListingStyles.textFieldText}>Shop Registered Number</Text>
                    <TextInput value = {this.state.clickedItem.reg_id}
                        style = {[editShopListingStyles.textInputStyle,{
                                    color: "#bfbfbf",
                                    borderBottomColor: "#bfbfbf"
                                }]}
                        editable = {false}></TextInput>



                    <Text style = {editShopListingStyles.textFieldText}>Address Line 1</Text>
                    <TextInput value = {this.state.clickedItem.address1}
                        style = {editShopListingStyles.textInputStyle}
                        onChangeText = {value => {
                            this.setState(prevState => ({
                                clickedItem: {
                                  ...prevState.clickedItem,
                                  ["address1"]: value
                                }
                            }))
                          }
                        }></TextInput>

                    <Text style = {editShopListingStyles.textFieldText}>Address Line 2</Text>
                    <TextInput value = {this.state.clickedItem.address2}
                        style = {editShopListingStyles.textInputStyle}onChangeText = {value => {
                            this.setState(prevState => ({
                                clickedItem: {
                                  ...prevState.clickedItem,
                                  ["address2"]: value
                                }
                            }))
                          }
                        }></TextInput>



                    <Text style = {editShopListingStyles.textFieldText}>Contact Number</Text>
                    <TextInput style = {[editShopListingStyles.textInputStyle,{
                                    color: "#bfbfbf",
                                    borderBottomColor: "#bfbfbf"
                                }]}
                                value = {this.state.clickedItem.mobile_no !== undefined ? this.state.clickedItem.mobile_no.toString(): ""}
                                editable = {false}>
                    </TextInput>
                


                    <Text style = {editShopListingStyles.textFieldText}>City</Text>
                    <TextInput style = {editShopListingStyles.textInputStyle}
                                value = {this.state.clickedItem.city}
                                onChangeText = {value => {
                                    this.setState(prevState => ({
                                        clickedItem: {
                                          ...prevState.clickedItem,
                                          ["city"]: value
                                        }
                                    }))
                                  }
                                }></TextInput>

                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style = {editShopListingStyles.textFieldText}>State</Text>
                            <TextInput style = {[editShopListingStyles.textInputStyle, {width: ScreenDimensions.SCREEN_WIDTH/2 - 50}]}
                                        value = {this.state.clickedItem.state}
                                        onChangeText = {value => {
                                            this.setState(prevState => ({
                                                clickedItem: {
                                                  ...prevState.clickedItem,
                                                  ["state"]: value
                                                }
                                            }))
                                          }
                                        }></TextInput>
                        </View>

                        <View>
                            <Text style = {editShopListingStyles.textFieldText}>Postal Code</Text>
                            <TextInput style = {[editShopListingStyles.textInputStyle, {width: ScreenDimensions.SCREEN_WIDTH/2 - 50}]}
                                        value = {this.state.clickedItem.post_code}
                                        keyboardType = "number-pad"
                                        onChangeText = {value => {
                                            this.setState(prevState => ({
                                                clickedItem: {
                                                  ...prevState.clickedItem,
                                                  ["post_code"]: value
                                                }
                                            }))
                                          }
                                        }></TextInput>
                        </View>
                    </View>

                    <Text style = {editShopListingStyles.textFieldText}>Country</Text>
                    <TextInput style = {editShopListingStyles.textInputStyle}
                                value = {this.state.clickedItem.country}
                                onChangeText = {value => {
                                    this.setState(prevState => ({
                                        clickedItem: {
                                          ...prevState.clickedItem,
                                          ["country"]: value
                                        }
                                    }))
                                  }
                                }></TextInput>

                    <Text style = {editShopListingStyles.textFieldText}>Nature of Business</Text>
                    <Picker selectedValue={this.state.clickedItem.nature_of_business}  
                            onValueChange={(itemValue, itemPosition) =>  {
                                    this.setState(prevState => ({
                                        clickedItem: {
                                        ...prevState.clickedItem,
                                        ["nature_of_business"]: itemValue
                                        }
                                    })) 
                                }
                            }>  
                        <Picker.Item label="Restaurants and TakeAways" value="Restaurants and TakeAways" />  
                        <Picker.Item label="Education and Arts" value="Education and Arts" />  
                        <Picker.Item label="Retail and Wholesale" value="Retail and Wholesale" />  
                        <Picker.Item label="Clothing Manufacturing" value="Clothing Manufacturing" />  
                        <Picker.Item label="Cleaning Services" value="Cleaning Services" />  
                        <Picker.Item label="Business and Financial Services" value="Business and Financial Services" />
                        <Picker.Item label="Building and Central Heating" value="Building and Central Heating" />  
                    </Picker>  
                    <View style = {{flex:1, height: 2, backgroundColor:"#666666"}}></View>

                </ScrollView>
                
                <TouchableOpacity onPress = {() => this.handleOnSaveClicked()}>
                    <View style = {[editShopListingStyles.btnViewStyle,{marginTop: 0, marginBottom: 50}]}>
                        <Text style = {editShopListingStyles.btnTextStyle}>Save Shop Details</Text>
                    </View>
                </TouchableOpacity>
        </View>
        )
    }
}


renderNoExistingShopsScreen = () => {
    if(this.state.doesExist === false){
      return(
          <View style = {noResultsFoundScreen.container}>
              <Text style = {noResultsFoundScreen.headerTextStyles}> You don't have any shops registered </Text>
              <Text style = {noResultsFoundScreen.headerTextStyles}> Do you wish to add a shop ?</Text>
          </View>
        );
    }   
}


checkAvailability = () => {
    AsyncStorage.getItem('_phn_number')
    .then((phnNumber) => {
        this.setState({isFetching:true})
        ownerContactNumber = parseInt(phnNumber)
        this.fetchShopLists(phnNumber)
        .then((doesShopExist) => {
            this.setState({isFetching:false, isShopListingScreenVisible: !doesShopExist, doesExist: doesShopExist})
        })
        .catch(err => {
            Alert.alert("LetMeIn", "Failed to retrieve the results.Please try again later.");
        })
    })
}



fetchShopLists = (phoneNumber) => {
    var url = BASE_URL+shop_endpoints.FILTER_SHOP_BY_OWNER+ phoneNumber
    return new Promise((resolve, reject) => {
        fetchFromAPI({URL: url, request_method: HTTPMethods.GET})
        .then((response) => {
            console.log("SHOPS: " , response)
            if(statusCode.UNSUCCESSFUL.includes(response.code)){
                resolve(false)
            }else {
                this.setState({
                    data:response.data
                })
                resolve(true)
            }
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}


handleOnSaveClicked = () => {
 
    if(this.state.clickedItem.name !== null && this.state.clickedItem.name !== ""){
        var url = BASE_URL + shop_endpoints.UPDATE_SHOP
        var _body = this.state.clickedItem
        delete _body["mobile_no"]
        delete _body["qr_code"]

        this.setState( prevState => ({
            isFetching: true
        }));

        console.log(_body)
        fetchFromAPI({URL: url, request_method: HTTPMethods.POST, body: JSON.stringify(_body)})
        .then((response) => {
            this.setState({
                isFetching: false
            })
            console.log(response)
            statusCode.SUCCESSFUL.includes(response.code) ? 
            Alert.alert("LetMeIn", "Shop Details successfully updated",[
                {
                    text: "OK",
                    onPress: () => this.handleOnBackClicked()
                }
            ])
            : Alert.alert("LetMeIn", "Network Issue. Please try again later");
        })
        .catch(err => {
            console.log(err)
            Alert.alert("LetMeIn", "An unexpected error occured. Please try again later");
        })

    }else{
        Alert.alert("LetMeIn", "Please enter a valid shop name and try again");
    }
}


handleOnBackClicked = () => {
    this.setState({
        doesExist: true,
        isShopListingScreenVisible: true
    })

    this.fetchShopLists(ownerContactNumber)
}
}


