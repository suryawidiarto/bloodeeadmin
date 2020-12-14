import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ImageBackgroundBase,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Button,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import database from '@react-native-firebase/database';
import { TextInput } from 'react-native-gesture-handler';

const DataPermintaan = ({navigation}) => {
    const [selectedIdACC, setSelectedIdACC] = useState();
    const [selectedIdRJC, setSelectedIdRJC] = useState();
    const [dataPermintaanACC, setDataPermintaanACC] = useState([]);
    const [dataPermintaanRJC, setDataPermintaanRJC] = useState([]);
    
    useEffect(() => {
      const onValueChangeACC = database()
        .ref(`/PermintaanDarahAccepted/`)
        .on('value', snapshot => {
          const dataTemp = []
              snapshot.forEach(item => {
                dataTemp.push({ data : {
                  id: item.key,
                  Id: item.val().Id,
                  NamaPeminta: item.val().NamaPeminta,
                  NamaPenerima: item.val().NamaPenerima,
                  GolonganDarah: item.val().GolonganDarah,
                  JumlahDarah: item.val().JumlahDarah,
                  KeteranganLain: item.val().KeteranganLain,
                  NoHandphone: item.val().NoHandphone
                }      
                });
                return false;
              });
              //console.log('Data Permintaan :',dataTemp);
              setDataPermintaanACC(dataTemp);
        });

        const onValueChangeRJC = database()
        .ref(`/PermintaanDarahRejected/`)
        .on('value', snapshot => {
          const dataTemp = []
              snapshot.forEach(item => {
                dataTemp.push({ data : {
                  id: item.key,
                  Id: item.val().Id,
                  NamaPeminta: item.val().NamaPeminta,
                  NamaPenerima: item.val().NamaPenerima,
                  GolonganDarah: item.val().GolonganDarah,
                  JumlahDarah: item.val().JumlahDarah,
                  KeteranganLain: item.val().KeteranganLain,
                  NoHandphone: item.val().NoHandphone
                }      
                });
                return false;
              });
              //console.log('Data Permintaan :',dataTemp);
              setDataPermintaanRJC(dataTemp);
        });
      return () =>
        database()
          .ref(`/PermintaanDarah/`)
          .off('value', onValueChangeACC);

        database()
          .ref(`/PermintaanDarah/`)
          .off('value', onValueChangeRJC);
    }, []);

    const ItemACC = ({ item, onPress, style }) => (
      
      <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.deskripsi}>Peminta Darah :{item.data.NamaPeminta}</Text>
        <Text style={styles.deskripsi}>Penerima Darah :{item.data.NamaPenerima}</Text>
        <Text style={styles.deskripsi}>Golongan Darah Dibutuhkan :{item.data.GolonganDarah}</Text>
        <Text style={styles.deskripsi}>Kantong Darah Dibutuhkan :{item.data.JumlahDarah}</Text>
        <Text style={styles.deskripsi}>Keterangan Lain : {item.data.KeteranganLain}</Text>
        <Text style={styles.deskripsi}>Alamat:</Text>
      </TouchableOpacity>
    );

    const ItemRJC = ({ item, onPress, style }) => (
      
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
          <Text style={styles.deskripsi}>Peminta Darah :{item.data.NamaPeminta}</Text>
          <Text style={styles.deskripsi}>Penerima Darah :{item.data.NamaPenerima}</Text>
          <Text style={styles.deskripsi}>Golongan Darah Dibutuhkan :{item.data.GolonganDarah}</Text>
          <Text style={styles.deskripsi}>Kantong Darah Dibutuhkan :{item.data.JumlahDarah}</Text>
          <Text style={styles.deskripsi}>Keterangan Lain : {item.data.KeteranganLain}</Text>
          <Text style={styles.deskripsi}>Alamat:</Text>
        </TouchableOpacity>
      );
    
    const renderItemACC = ({ item }) => {
      const backgroundColor = item === selectedIdACC ? "#f2f2f2" : "#fff";
  
      return (
        <ItemACC
          item={item}
          onPress={() => {setSelectedIdACC(item.data.id);}}
          style={{ backgroundColor }}
        />
      );
    };

    const renderItemRJC = ({ item }) => {
        const backgroundColor = item === selectedIdRJC ? "#f2f2f2" : "#fff";
    
        return (
          <ItemRJC
            item={item}
            onPress={() => {setSelectedIdRJC(item.data.id);}}
            style={{ backgroundColor }}
          />
        );
      };

    return(
        <View style={styles.container}>
        <View style={{backgroundColor:'#efefef', padding:5,flex:15, marginTop:40}}>
            <Text style={{fontSize:20, color:'black', fontWeight:'bold', textAlign:'center'}}>DATA PERMINTAAN</Text>
            <TextInput placeholder="Cari" style={{textAlign:'center'}}></TextInput>
            <View style={{flexDirection:'row', backgroundColor:'#fff', justifyContent:'center', alignContent:'center'}}>
                <Text style={{textAlign:'center'}}>DATA ACC</Text>
            </View>
            <FlatList
                data={dataPermintaanACC}
                renderItem={renderItemACC}
                keyExtractor={item => item.data.id}
            />
            <View style={{flexDirection:'row', backgroundColor:'#fff', justifyContent:'center', alignContent:'center'}}>
                <Text style={{textAlign:'center'}}>DATA REJECT</Text>
            </View>
            <FlatList
                data={dataPermintaanRJC}
                renderItem={renderItemRJC}
                keyExtractor={item => item.data.id}
            />    
            </View>
        </View>

            
            
            
            
    )
}


export default DataPermintaan;

const width = Dimensions.get('screen').width
const width_button = width * 0.2;
const styles = StyleSheet.create({

    containerlist: {
        flex:1,
        marginTop: 5,
        backgroundColor:'#fafafa',
        borderRadius:5,
        paddingTop:2,
        elevation:2
      },
      item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:20,
        elevation:2,
      },
      transaksi: {
        fontSize: 15,
        color:'#000'
      },
      deskripsi: {
          fontSize:15,
      },
      title: {
        fontSize:20,
        color:'white',
        fontWeight:'bold',
        marginBottom:10
      },


    container:{
        flex:1,
        backgroundColor:'white',
    },
    header: {
        marginTop:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    footer2:{
        flex:1,
        paddingHorizontal:20,
        },
    tabbar: {
        flex:1
    },
    imageBackground:{
        width: width*0.5,
        height: width*0.5 ,
        alignItems:'center'
    },
    imageBackground2:{
        width: width*0.25,
        height: width*0.25,
        alignItems:'center',
        justifyContent:'center'
    },
    title: {
        color:'black',
        marginTop:10,
        marginLeft:10,
        fontWeight:'bold',
        fontSize:20,
        alignItems:'center'
    },
    money: {
        color:'black',
        marginTop:10,
        marginLeft:10,
        fontWeight:'bold',
        fontSize:25,
        alignItems:'center'
    },
    topUp:{
        flex:2,
        alignItems:'center'
    },
    button: {
    width:width_button,
    height:40,
    justifyContent:'center',
    alignItems:'center'
    },
    imageTopup:{
    width: width*0.1,
    height: width*0.1,
    alignItems:'center'  
    }
})