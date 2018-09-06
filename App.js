import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Main from './containers/Main';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status:undefined,
    }
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus() {
    this.setState({status:true})
  }
  render() {
    if (this.state.status) {
      return (<Main />)
    } else {
      return (
        <View style={styles.container}>


          <Button title="press" onPress={this.changeStatus}></Button>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
