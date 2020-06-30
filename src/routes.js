import React from 'react'
import {Image, TouchableOpacity} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import {MobileVerificationScreen,RegistrationScreen,OtpScreen, ScanQRScreen, HomeScreen,MyShopScreen,
    ProfileScreen, WelcomeScreen} from './views/index'

const MainStackNavigator = createStackNavigator({
    Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    Registration: {
        screen: RegistrationScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    Otp: {
        screen: OtpScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    MobileVerification: {
        screen: MobileVerificationScreen,
        navigationOptions: {
            headerShown: false,
        }
    },
    tabScreens: {
        screen: createBottomTabNavigator({
            Home : {
                screen: HomeScreen,
                navigationOptions:{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({tintColor}) => (
                        <Image source = {require('../assets/tabbarIcons/browser.png')} style = {{resizeMode: 'contain',height: 21,width: 21, tintColor : tintColor}}/>
                    )
                }
            },
            ScanQR : {
                screen: ScanQRScreen,
                navigationOptions:{
                    tabBarLabel: 'Scan QR',
                    tabBarIcon: ({tintColor}) => (
                        // <QRIcon height = {21}  width =  {21} tintColor = {tintColor} />
                        <Image source = {require('../assets/tabbarIcons/qr.png')} style = {{resizeMode: 'contain',height: 21,width: 21, tintColor : tintColor}}/>
                    )
                }
            },
            MyShop : {
                screen: MyShopScreen,
                navigationOptions:{
                    tabBarLabel: 'My Shop',
                    tabBarIcon: ({tintColor}) => (
                        <Image source = {require('../assets/tabbarIcons/shop.png')} 
                        style = {{resizeMode: 'contain',height: 21,width: 21, tintColor : tintColor}}/>
                    )
                }
            },
            Profile : {
                screen: ProfileScreen,
                navigationOptions:{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({tintColor}) => (
                        <Image source = {require('../assets/tabbarIcons/profile.png')} style = {{resizeMode: 'contain',height: 21,width: 21, tintColor : tintColor}}/>
                    ),
                }
            }

        },
        {
            tabBarOptions: {
                activeTintColor: '#2b84a4',
            }
        }
        ),
        navigationOptions: {
            headerTitle: 'Let Me In',
            headerLeft: null,
            headerTitleStyle: {
                textAlign:'center',
                color: '#fff',
                fontWeight: '100'
            },
            headerStyle: {
                backgroundColor: '#2b84a4'
            },
            headerRight : () => 
                <TouchableOpacity>
                    <Image source= {require('../assets/topNavBarIcons/more.png')} 
                    style = {{height: 25, width: 25, resizeMode: 'contain', marginRight: 30}}/>
                </TouchableOpacity>
        }
    }
})


const AppContainer = createAppContainer(MainStackNavigator)
export {AppContainer}