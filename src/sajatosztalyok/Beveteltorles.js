import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput } from 'react-native';

const IP=require('./Ipcim')

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      szo:"",
      dataSource:[]

    }
  }

  torles=(szam)=>{
    alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch(IP.ipcim + "beveteltorles", {
      method: "DELETE",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => {
  
    alert(y)
    fetch(IP.ipcim +  'bevetel')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });


  });

  }


  componentDidMount(){
    return fetch(IP.ipcim +  'bevetel')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  keres=()=>{
    //alert("hello")
    var bemenet={
      bevitel1:this.state.szo
    }

  fetch(IP.ipcim + "keres", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.json())
  .then(y => {
    //alert(JSON.stringify(y))
    this.setState({ dataSource   :  y   })
  }
  );
  }


  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20,backgroundColor:"lightblue"}}>
        
{/*--------------------------------------------------------- Találatok */}       
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
          <Text style={{color:"green",fontSize:20,textAlign:"center",backgroundColor:"lightblue"}}   >{item.fajta_fajta}Fizetés </Text>
          <Text style={{color:"green",fontSize:20,textAlign:"center",marginBottom:5}}   >{item.bevetel_osszeg} Ft </Text>
          
          <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.torles(item.bevetel_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Törlés</Text>
      </TouchableOpacity>
      

      <Text style={{borderBottomColor:'darkblue',borderBottomWidth:5,borderStyle:'dashed',margin:15}}>

              </Text>
          </View>
        
        }

        
          keyExtractor={({film_id}, index) => film_id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "#FF2626",
    borderRadius:10,
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
    marginBottom:5,
    borderRadius:10,
    borderWidth:3
  }
});