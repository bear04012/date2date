import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, Animated, PanResponder,TouchableOpacity,TextInput } from 'react-native';
import { Svg, LinearGradient } from 'expo';
import Letter from '../components/letter';
const screenHeight = Dimensions.get("window").height
const screenWidth = Dimensions.get("window").width

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0,
      filled: false,
      writeLetter: false,
      title:'',
      text: '',
    }
    this.rotateAndTranslate = {
      transform: this.position.getTranslateTransform()
    }

    this.likeOpacity = this.position.y.interpolate({
      inputRange: [-screenWidth / 2, 0, screenWidth / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.nopeOpacity = this.position.y.interpolate({
      inputRange: [-screenWidth / 2, 0, screenWidth / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })
    this.nextCardOpacity = this.position.y.interpolate({
      inputRange: [-screenWidth / 2, 0, screenWidth / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.y.interpolate({
      inputRange: [-screenWidth / 2, 0, screenWidth / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

    this.renderUsers = this.renderUsers.bind(this);
    this.tryStopWrite = this.tryStopWrite.bind(this);
    this.fillLetter = this.fillLetter.bind(this);

  }

  componentWillMount() {

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: 0, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -500) {
          Animated.spring(this.position, {
            toValue: { x: gestureState.dx, y: -screenHeight - 100 }
          }).start(() => {
            this.setState({ filled:false }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }

  renderUsers() {
    return (
      <Animated.View
        {...this.PanResponder.panHandlers}
        style={[this.rotateAndTranslate, ]}
      >
        <Svg height={75} width={150}>
          <Svg.Rect
            x="0"
            y="0"
            width="150"
            height="75"
            stroke="black"
            strokeWidth="2"
            fill="#FEF08F"
          />
          <Svg.Line
            x1={0}
            y1={0}
            x2={75}
            y2={37.5}
            stroke="black"
            strokeWidth="2"
          />
          <Svg.Line
            x1={75}
            y1={37.5}
            x2={150}
            y2={0}
            stroke="black"
            strokeWidth="2"
          />
          <Svg.Circle
            cx="75"
            cy="38"
            r="10"
            stroke="black"
            strokeWidth="2"
            fill="red" />
        </Svg>
      </Animated.View>
    )
  }

  tryStopWrite() {
    this.setState({writeLetter:false})
  }

  fillLetter() {
    this.setState({
      filled: true,
      writeLetter: false
    });
  }

  render() {
    
    let greens = ['#8BE5D1', '#1CA197']
    let blues = ['#24AFD6', '#4077B4', '#5E4D87']
    return (
      <LinearGradient
        style={styles.container}
        colors={greens}
        start={[0, 0]}
        end={[1, 1]}
      >
        <View style={{position:"absolute",top:80}}>
          <Text style={{fontSize:40,alignSelf:"center",color:"white",marginBottom:10}}>Range of Day</Text>
          <TextInput style={styles.day} textAlign="center" placeholder="00" placeholderTextColor="white" keyboardType="numeric" />
        </View>
        <Text style={{marginTop:-40,color:"white"}}>Your letter will be sent randomly in a range of the number</Text>
        
        {this.state.writeLetter && <Letter text={this.state.text} title={this.state.title} tryStopWrite={this.tryStopWrite} fillLetter={this.fillLetter} />}

        <LinearGradient
          colors={blues}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.bottom}>
          
          {this.state.filled ?
            <Text style={{ marginTop: -100, marginBottom: 20, fontSize: 50, color: "white" }}>^ Swipe Up ^</Text> :
            <TouchableOpacity onPress={()=>this.setState({writeLetter:true})}style={{ marginTop: -100, marginBottom: 20, }}><Text style={{ color: "white", fontSize: 40 }}>Write a Letter</Text></TouchableOpacity>}
            
          
            {this.state.filled ? this.renderUsers() : <Text>Letter Needed</Text>}
        </LinearGradient>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00D3CD',

  },
  day: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#3496D2',
    fontSize: 100,
    alignSelf:"center",
    color:"white"
  },
  bottom: {
    backgroundColor: "#00D3CD",
    position:'absolute',
    bottom:-100,
    width: Dimensions.get("window").width,
    height: Dimensions.get('window').height / 2,
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});



export default Main;