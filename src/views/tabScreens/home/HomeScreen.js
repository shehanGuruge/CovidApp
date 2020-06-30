import React, { Component } from 'react';
import { View, Text , TouchableOpacity, AsyncStorage, FlatList} from 'react-native';
import {CheckInView} from '../../../components/index'
import {styles} from './styles'
import {BASE_URL,checkin_endpoints} from '../../../constants/Endpoints';
import {fetchFromAPI} from '../../../helpers/requests';
import {HTTPMethods} from '../../../constants/HTTPMethods'
import {Loader} from '../../../components/index';
import {tempToColor} from '../../../helpers/converters/tempToColorConverter';
import {filterByDate} from '../../../helpers/filters/dateFilter'

var phoneNumber = null;
var daysOfTheWeek = ["Sun" , "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tabClicked : [
            {
                'back' : '#2b84a4',
                'text': '#ffffff',
            },
            {
                'back' : '#ffffff',
                'text': '#2b84a4',
            },
            {
                'back' : '#ffffff',
                'text': '#2b84a4',
            },
            {
                'back' : '#ffffff',
                'text': '#2b84a4',
            },
        ],
        isFetching : false,
        prevClickedID: 0,
        data: null,
        checkindetails : null,
        filterData: null
    };
  }

  UNSAFE_componentWillMount(){
    this.loadCheckins()
  }

  

  render() {
    return (
      <View style = {styles.outerContainer}>
          <Loader  isVisible = {this.state.isFetching}/>
        <Text style = {{color: '#666666', fontSize: 20, marginTop: 25}}> My Checkings </Text>

        <View style = {styles.tabsView}>

            <TouchableOpacity onPress = {() => this.handleOnTabPressed(0,0)}>
                <Text style={[styles.tab,
                        {backgroundColor: this.state.tabClicked[0].back, 
                        color: this.state.tabClicked[0].text, 
                        borderTopLeftRadius: 8, borderBottomLeftRadius: 8}]}>
                            All</Text>
            </TouchableOpacity>
            

            <TouchableOpacity onPress = {() => this.handleOnTabPressed(1,1)}>
                <Text style={[styles.tab, 
                        {backgroundColor: this.state.tabClicked[1].back, 
                        color: this.state.tabClicked[1].text}]}>
                            Today</Text>
            </TouchableOpacity>
            
            
            <TouchableOpacity onPress = {() => this.handleOnTabPressed(2,3)}>
                <Text style={[styles.tab, 
                        {backgroundColor: this.state.tabClicked[2].back, 
                        color: this.state.tabClicked[2].text}]}>
                            Last 3 days</Text>
            </TouchableOpacity>
            

            <TouchableOpacity onPress = {() => this.handleOnTabPressed(3,7)}>
                <Text style={[styles.tab, 
                        {backgroundColor: this.state.tabClicked[3].back, 
                        color: this.state.tabClicked[3].text,
                        borderTopRightRadius: 8, borderBottomRightRadius: 8}]}>
                            This Week</Text>
            </TouchableOpacity>
            
        </View>
        
        {/* {this.renderCheckInList(false)} */}
        {this.state.data !== null && this.state.isFetching === false &&
        <FlatList
                style = {{flex: 1, paddingBottom: 15}}
                data={this.state.checkindetails}
                keyExtractor={(x, i) => i}
                renderItem={({ item }) =>
                    <CheckInView shopName = {item.shop_name}
                                 checkedInDateTime = {this.dateTimeConverter(item.check_in_at)}
                                 temperature = {item.temp}
                                 backColor = {tempToColor(parseInt(item.temp))}/>
                }
            />
            }
        
      </View>
    );
  }


  loadCheckins = () => {
    AsyncStorage.getItem("_phn_number")
    .then((phnNumber) => {
        phoneNumber = phnNumber;
        var url = BASE_URL + checkin_endpoints.GET_CHECKING_DETAILS + 112898395
        this.setState({isFetching:true})

        fetchFromAPI({URL: url, request_method: HTTPMethods.GET})
        .then((response) => {
              console.log(response);
              this.setState({ isFetching: false })
              if(response.data !== null && response.code === 200){
                  this.setState({
                      data: response.data,
                      checkindetails: response.data.userCheckIn
                  })
              }
        })
        .catch(err => console.log(err)) 
    })
  }


  dateTimeConverter = (isoDateTime) => {

    if(isoDateTime !== null){
        var date = new Date(isoDateTime);


        var dateInStringFormat = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " " + 
                                months[date.getMonth()] + " " + date.getFullYear();
        var timeInStringFormat = (date.getUTCHours() < 10 ? "0"+date.getUTCHours() : date.getUTCHours()) + ":" + 
                                (date.getUTCMinutes() < 10 ? "0"+date.getUTCMinutes() : date.getUTCMinutes()) + "h"
        
        var stringDateTime = daysOfTheWeek[date.getDay()] + ", " + dateInStringFormat +" at "+ timeInStringFormat;

        return stringDateTime;
    }
  }


  handleOnTabPressed = (id, filterByDays) => {
        if(this.state.prevClickedID !== id){
            var recentLog = this.state.tabClicked;
            recentLog[id].back = "#2b84a4";
            recentLog[id].text = "#ffffff";
            recentLog[this.state.prevClickedID].text = "#2b84a4";
            recentLog[this.state.prevClickedID].back = "#ffffff";
    
            this.setState({
                prevClickedID: id,
                tabClicked: recentLog,
            })
            console.log(filterByDays)

            var array = this.state.data.userCheckIn.slice();
            if(filterByDays === 0){
                this.loadCheckins();
            }else{
                for(var i = 0; i < array.length; i++){
                    var checkedInDate =  array[i].check_in_at;
                    var doFilter = filterByDate({filter:filterByDays, isoDateTime: checkedInDate})
    
                    if(!doFilter){
                        array.splice(i)
                    }
                }
    
                console.log(array)
                this.setState({
                    checkindetails: array
                })
            }
            
        }
        
  }
}
