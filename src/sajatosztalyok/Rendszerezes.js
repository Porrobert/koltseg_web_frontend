import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity,} from 'react-native';
const IP = require('./Ipcim');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      osszeg:0,
      isLoading: true
    };
  }

  async getMovies() {
//kiadas összegzese
try {
  const response = await fetch(IP.ipcim+'osszegzes');
  const json = await response.json();
  console.log(json)
  this.setState({ data2: json });
  this.setState({osszeg:json[0].osszeg})  
} catch (error) {
  console.log(error);
} finally {
  this.setState({ isLoading: false });
}

    //kiadas lekerdezese
    try {
      const response = await fetch(IP.ipcim+'rendszerezes');
      const json = await response.json();
      console.log(json)
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getMovies();
  }

osszeg=()=>{

}

  render() {
    const { data, isLoading } = this.state;


    return (
      <View style={{ flex: 1, padding: 24 , marginTop:40,backgroundColor:'lightblue'}}>
        
        <Text  style={{fontSize:20,color:"green"}}>Összeg: {this.state.osszeg} ft</Text>

        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ kiadas_id }, index) => kiadas_id}
            renderItem={({ item }) => (
              <View style={{marginBottom:30}}>

                
              <Text style={{fontSize:30,color:'blue',textAlign:'center',flex:1}}>
                {item.fajta_nev}
              </Text>

              <Text style={{fontSize:20,color:'green',textAlign:'center',flex:1}}>
                {item.osszeg} ft
              </Text>


              <Image source={{uri:item.fajta_kep}}
              style={{width:100,height:100,alignSelf:'center',color:'Red',margin:5}}/>

              <Text style={{borderBottomColor:'darkblue',borderBottomWidth:5,borderStyle:'dashed',margin:10}}>

              </Text>
                  
              </View>
            )}
          />
        )}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    marginLeft:30,
    marginRight:30
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});