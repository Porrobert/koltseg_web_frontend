import React, { Component } from 'react';
import {StyleSheet, ActivityIndicator, FlatList, Text, View, Image,ScrollView,StatusBar ,TouchableOpacity,TextInput,onChangeText,Button,SafeAreaView} from 'react-native';


const IP = require('./Ipcim');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      datafajta:[],
      osszeg:0,
      isLoading: true,
      nev:"",
      ar:"",
      datum:"",
      kiadas_reszletek:"",
      valaszto:1,
      date:new Date(),
      show:false

    };
  }

  async getData() {
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

    //Fajta lekerdezese
    try {
      const response = await fetch(IP.ipcim+'koltsegfajta');
      const json = await response.json();
      console.log(json)
      this.setState({ datafajta: json });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }

    //kiadas lekerdezese
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


valfajta=(ertek)=>{
  this.setState({valaszto:ertek})
  //alert(ertek)
}

felvitel=async ()=>{
  //alert(this.props.akttema)
  try {
    let adatok={
      bevitel1:this.state.valaszto,
      bevitel2:this.state.ar,
      bevitel3:this.state.date.getFullYear()+"-"+(this.state.date.getMonth()+1)+"-"+this.state.date.getDate(),
      bevitel4:this.state.kiadas_reszletek
    }
    const response = await fetch(IP.ipcim+'felvitel',
    {
      method: "POST",
      body: JSON.stringify(adatok),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
    );
    const szoveg = await response.text();
    alert(szoveg)
   
  } catch (error) {
    console.log(error);
  } finally {
    
  }

}


levag=(datum2)=>{
  let split=datum2.split('T')
  return split[0]
  }




/*-------------------------------------------- Datitempicker függvényei */
onChange = (event, selectedDate) => {
  const currentDate = selectedDate;
  this.setState({show:false});
  this.setState({date:currentDate});
  

};

torles=()=>{
  this.setState({ar:""})
  this.setState({kiadas_reszletek:""})
}



  render() {
    const { data, isLoading } = this.state;


    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <Text  style={{fontSize:30,color:"green"}}>Összeg:{this.state.osszeg} ft</Text>



        <View style={{backgroundColor:"lightblue"}}>
        <View style={styles.buttonContainer}>

        
        <Text style={{fontSize:25,color:"green"}}>Ár:</Text>
        <TextInput
        style={{color:"green",fontSize:20,borderWidth:2,borderColor:"black",borderRadius:10,padding:10,height:50}}
        onChangeText={(beirtszoveg)=>this.setState({ar:beirtszoveg})}
        value={this.state.ar}
        />
        
        <Text style={{fontSize:25}}>Kiadás neve:</Text>
        <TextInput
        style={{color:"black",fontSize:20,borderWidth:2,borderColor:"black",borderRadius:10,padding:10,height:50,marginBottom:10}}
        onChangeText={(beirtszoveg)=>this.setState({kiadas_reszletek:beirtszoveg})}
        value={this.state.kiadas_reszletek}
        />

        <Text style={{fontSize:25,color:"purple"}}>Kiadás dátuma:</Text>
        <TextInput
        style={{color:"purple",fontSize:20,borderWidth:2,borderColor:"black",borderRadius:10,padding:10,height:50,marginBottom:10}}
        onChangeText={(beirtszoveg)=>this.setState({kiadas_datum:beirtszoveg})}
        value={this.state.kiadas_datum}
        />

        <Text style={{fontSize:25,color:"blue"}}>Kiadás fajtája:</Text>
        <TextInput
        style={{color:"blue",fontSize:20,borderWidth:2,borderColor:"black",borderRadius:10,padding:10,height:50,marginBottom:10}}
        onChangeText={(beirtszoveg)=>this.setState({kiadas_:beirtszoveg})}
        value={this.state.kiadas_datum}
        />


    

          

              <Button style={{backgroundColor:"#82AAE3"}} onPress={()=>this.felvitel()} title="Felvitel"/>
              <Button onPress={()=>this.torles()} title="Törlés"/>
              
        </View>

      </View>

        

        {isLoading ? <ActivityIndicator/> : (

          <FlatList
            data={data}
            keyExtractor={({ kiadas_id }, index) => kiadas_id}
            renderItem={({ item }) => (
              <View style={{marginBottom:30}}>

                
              <Text style={{fontSize:30,color:'blue',textAlign:'center',flex:1}}>
                {item.fajta_nev}
              </Text>

              <Text style={{fontSize:20,color:'black',textAlign:'center'}}>
                {item.kiadas_nev}
              </Text>

              <Text style={{fontSize:20,color:'green',textAlign:'center'}}>
                {item.kiadas_ar} ft
              </Text>

              <Text style={{fontSize:20,color:'purple',textAlign:'center'}}>
                {this.levag(item.kiadas_datum)}
              </Text>


              <Image source={{uri:item.fajta_kep}}
              style={{width:100,height:100,alignSelf:'center',color:'Red',margin:10}}/>
            <Text style={{borderBottomColor:'darkblue',borderBottomWidth:5,borderStyle:'dashed',margin:10}}></Text>
                  
              </View>
            )}
          />
          //s
        )}
      </ScrollView>
      </SafeAreaView>
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
    padding: 10,
    marginLeft:30,
    marginRight:30,
    marginBottom:30
  },
  countContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView:{
    backgroundColor: 'lightblue',
    
  }
  
});