import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';
import database from '@react-native-firebase/database';
import { TextInput } from 'react-native-gesture-handler';

const PermintaanDarah = ({navigation}) => {
    const [selectedId, setSelectedId] = useState(null);
    const [dataPermintaan, setDataPermintaan] = useState([]);
    
    useEffect(() => {
      const onValueChange = database()
        .ref(`/PermintaanDarah/`)
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
                  NoHandphone: item.val().NoHandphone,
                  Alamat: item.val().Alamat,
                }      
                });
                return false;
              });
              setDataPermintaan(dataTemp);
        });
      return () =>
        database()
          .ref(`/PermintaanDarah/`)
          .off('value', onValueChange);
    }, []);

    const Item = ({ item, onPress, style }) => (
      
      <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.deskripsi}>Peminta Darah :{item.data.NamaPeminta}</Text>
        <Text style={styles.deskripsi}>Penerima Darah :{item.data.NamaPenerima}</Text>
        <Text style={styles.deskripsi}>Golongan Darah Dibutuhkan :{item.data.GolonganDarah}</Text>
        <Text style={styles.deskripsi}>Kantong Darah Dibutuhkan :{item.data.JumlahDarah}</Text>
        <Text style={styles.deskripsi}>Keterangan Lain : {item.data.KeteranganLain}</Text>
        <Text style={styles.deskripsi}>NoHandphone: {item.data.NoHandphone}</Text>
        <Text style={styles.deskripsi}>Alamat: {item.data.Alamat}</Text>
      </TouchableOpacity>
    );
    
    const renderItem = ({ item }) => {
      const backgroundColor = item === selectedId ? "#f2f2f2" : "#fff";
  
      return (
        <Item
          item={item}
          onPress={() => {setSelectedId(item.data.id); navigation.navigate('PermintaanDarah2Screen', {item_clicked: item.data.id})}}
          style={{ backgroundColor }}
        />
      );
    };

    return(
        <View style={styles.container}>
        <View style={{backgroundColor:'#efefef', padding:5, margin:20}}>
            <Text style={{fontSize:20, color:'black', fontWeight:'bold', textAlign:'center'}}>Data Permohonan Permintaan Darah</Text>
            <FlatList
                data={dataPermintaan}
                renderItem={renderItem}
                keyExtractor={item => item.data.id}
            />     
            </View>
        </View>       
    )
}

export default PermintaanDarah;

const styles = StyleSheet.create({
      item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:20,
        elevation:2,
      },
      deskripsi: {
          fontSize:15,
      },
      container:{
        flex:1,
        alignContent:'center',
        flexDirection:'column',
        margin:0
    },
})