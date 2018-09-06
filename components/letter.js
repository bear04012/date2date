import React from 'react';
import { Text, View, TextInput, Dimensions,StyleSheet,TouchableOpacity } from 'react-native';
import { Constants } from 'expo'
import { Icon } from 'react-native-elements'
import moment from 'moment';


const screenHeight = Dimensions.get("window").height
const screenWidth = Dimensions.get("window").width

class Letter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
    };
  }

  render() {
    const { title, text } = this.props;
    return (
      <View style={styles.LetterContainer}>
        <View style={{ alignSelf: 'center',flexDirection:"row" }}>
          <TouchableOpacity onPress={this.props.tryStopWrite} style={{marginLeft:5,marginRight:5,}}>
          <Icon
            iconStyle={{position:'absolute',left:-50,top:2}}
            name='md-arrow-round-back'
            type='ionicon'
            color='black' />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, }}>{this.state.date.format("MMM Do YYYY, dddd")}</Text>  
        </View>
        
        <TextInput
          style={styles.Title}
          onChangeText={(title) => this.setState({ title })}
          value={title}
          maxLength={30}
          placeholder={"Title"}
        />
        <TextInput
          style={styles.Letter}
          multiline={true}
          onChangeText={(text) => this.setState({ text })}
          value={text}
          placeholder={"Write Here"}
        />
        
        <TouchableOpacity onPress={this.props.fillLetter} style={{position:'absolute',bottom:10, alignSelf: "center" }}><Text style={{color:"dodgerblue",fontSize:20}}>Done</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  LetterContainer: {
    position: 'absolute',
    height: screenHeight - 200,
    width: screenWidth,
    zIndex: 10,
    padding: 10,
    backgroundColor: '#FAF87C',
    borderWidth: 1,
  },
  Title: {
    fontSize:30,
    paddingTop: Constants.statusBarHeight,
    textDecorationLine: 'underline',
    marginBottom:30
  },
  Letter: { 
    borderColor: 'black',
    fontSize: 20,  
  },
});


export default Letter;