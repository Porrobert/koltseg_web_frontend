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
      osszeg2:0,
      
      isLoading: true
    };
  }
  async adatok_Lekerdezese() {
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

  try {
    const response = await fetch(IP.ipcim+'bevetelfizetes');
    const json = await response.json();
    console.log(json)
    this.setState({ data2: json });
    this.setState({osszeg2:json[0].osszeg2})  
   } catch (error) {
    console.log(error);
   } finally {
    this.setState({ isLoading: false });
   }
   this.setState({osszeg3: this.state.osszeg2-this.state.osszeg})
  }}





 


 
 





  componentDidMount() {
    this.adatok_Lekerdezese();
  }


  render() {
    const { data, isLoading } = this.state;


    return (
      <View style={{ flex: 1, padding: 24 ,backgroundColor:'lightblue'}}>
        
        <Text style={{fontSize:30}}> Összes kiadás:</Text>
        <Text  style={{fontSize:30,color:"red"}}>{this.state.osszeg} ft {}</Text>
        <Text style={{borderBottomColor:'darkblue',borderBottomWidth:5,borderStyle:'dashed',margin:10}}></Text>

        <Text style={{fontSize:30}}> Összes bevétel:</Text>
        <Text  style={{fontSize:30,color:"green"}}>{}{this.state.osszeg2} ft</Text>
        <Text style={{borderBottomColor:'darkblue',borderBottomWidth:5,borderStyle:'dashed',margin:10}}></Text>

        <Text style={{fontSize:30}}> Egyenleg:</Text>
        <Text  style={{fontSize:30,color:"blue"}}>{this.state.osszeg3} ft</Text>
        


        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ kiadas_id }, index) => kiadas_id}
            renderItem={({ item }) => (
              <View style={{marginBottom:30}}>

                
              
                  
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