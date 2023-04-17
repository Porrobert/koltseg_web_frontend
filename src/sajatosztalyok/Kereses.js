import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity, TextInput, Button,} from 'react-native';
const IP = require('./Ipcim');


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      keresendo:""
    };
  }

  async getData() {
    try {
      const response = await fetch(IP.ipcim+'kiadas');
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
    this.getData();
  }

  
kereses=async()=>{
  var adatok={
    bevitel1:this.state.keresendo
  }
  const response = await fetch(IP.ipcim+'kereses',{
    method: "POST",
    body: JSON.stringify(adatok),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  });
  const json = await response.json();
      console.log(json)
      this.setState({ data: json });
    
}
levag=(datum2)=>{
let kecske=datum2.split('T')
return kecske[0]
}



  render() {

    


    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 ,backgroundColor:'lightblue'}}>
        {isLoading ? <ActivityIndicator/> : (

<View>
<TextInput
        style={{height: 40,border:"black",borderWidth:2,margin:5,borderRadius:10,padding:10,color:"blue"}}
        onChangeText={(beirtszoveg)=>this.setState({keresendo:beirtszoveg})}
        value={this.state.keresendo}
        />
<TouchableOpacity
          style={styles.button}
          onPress={async ()=>this.kereses()}
        >
          <Text style={{color:'white',fontSize:30}}>Keresés</Text>
        </TouchableOpacity>

          <FlatList
            data={data}
            keyExtractor={({ kiadas_id }, index) => kiadas_id}
            renderItem={({ item }) => (


              <View style={{marginBottom:30}}>

              <Text style={{fontSize:25}}>
                  
              </Text>

              
              
              <Text style={{fontSize:30,color:'blue',textAlign:'center',flex:1}}>
                {item.fajta_nev}
                </Text>
              <Text style={{fontSize:30,color:'black',textAlign:'center'}}>
                {item.kiadas_nev}
              </Text>
              <Text style={{fontSize:30,color:'green',textAlign:'center'}}>
                {item.kiadas_ar} ft
              </Text>
              <Text style={{fontSize:30,color:'purple',textAlign:'center'}}>
                {this.levag(item.kiadas_datum)}
              </Text>

              <Image source={{uri:item.fajta_kep}}
              style={{width:100,height:100,alignSelf:'center',color:'Red',margin:10}}/>
             <Text style={{borderBottomColor:'darkblue',borderBottomWidth:5,borderStyle:'dashed',margin:10}}></Text>
                 
              </View>
            )}
          />
          </View>
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
    backgroundColor: "#82AAE3",
    borderRadius:10,
    padding: 10,
    height:70,
    marginLeft:20,
    marginRight:20,
    textAlign:'center',
    borderRadius:10,
    borderWidth:3
    
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});
