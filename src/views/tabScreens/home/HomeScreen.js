import React, { Component } from 'react';
import { View, Text , TouchableOpacity} from 'react-native';
import {CheckInView} from '../../../components/index'
import {styles} from './styles'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tabClicked : [
            {
                'back' : '#009999',
                'text': '#ffffff',
            },
            {
                'back' : '#ffffff',
                'text': '#009999',
            },
            {
                'back' : '#ffffff',
                'text': '#009999',
            },
            {
                'back' : '#ffffff',
                'text': '#009999',
            },
        ],
        prevClickedID: 0,
    };
  }

  render() {
    return (
      <View style = {styles.outerContainer}>
        <Text style = {{color: '#666666', fontSize: 20, marginTop: 25}}> My Checkings </Text>

        <View style = {styles.tabsView}>

            <TouchableOpacity onPress = {() => this.handleOnTabPressed(0)}>
                <Text style={[styles.tab,
                        {backgroundColor: this.state.tabClicked[0].back, 
                        color: this.state.tabClicked[0].text, 
                        borderTopLeftRadius: 8, borderBottomLeftRadius: 8}]}>
                            All</Text>
            </TouchableOpacity>
            

            <TouchableOpacity onPress = {() => this.handleOnTabPressed(1)}>
                <Text style={[styles.tab, 
                        {backgroundColor: this.state.tabClicked[1].back, 
                        color: this.state.tabClicked[1].text}]}>
                            Today</Text>
            </TouchableOpacity>
            
            
            <TouchableOpacity onPress = {() => this.handleOnTabPressed(2)}>
                <Text style={[styles.tab, 
                        {backgroundColor: this.state.tabClicked[2].back, 
                        color: this.state.tabClicked[2].text}]}>
                            Last 3 days</Text>
            </TouchableOpacity>
            

            <TouchableOpacity onPress = {() => this.handleOnTabPressed(3)}>
                <Text style={[styles.tab, 
                        {backgroundColor: this.state.tabClicked[3].back, 
                        color: this.state.tabClicked[3].text,
                        borderTopRightRadius: 8, borderBottomRightRadius: 8}]}>
                            This Week</Text>
            </TouchableOpacity>
            
        </View>
        <CheckInView color = "green"/>
        <CheckInView color = "#ff9933"/>
        <CheckInView color = "red"/>
      </View>
    );
  }

  handleOnTabPressed = (id) => {
        if(this.state.prevClickedID !== id){
            var recentLog = this.state.tabClicked;
            recentLog[id].back = "#009999";
            recentLog[id].text = "#ffffff";
            recentLog[this.state.prevClickedID].text = "#009999";
            recentLog[this.state.prevClickedID].back = "#ffffff";
    
            this.setState({
                prevClickedID: id,
                tabClicked: recentLog,
            })
        }
        
  }
}
