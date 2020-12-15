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
                  NoHandphone: item.val().NoHandphone,
                  Alamat: item.val().Alamat,
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
                  NoHandphone: item.val().NoHandphone,
                  Alamat: item.val().Alamat,
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
        <Text style={styles.deskripsi}>NoHandphone: {item.data.NoHandphone}</Text>
        <Text style={styles.deskripsi}>Alamat: {item.data.Alamat}</Text>
      </TouchableOpacity>
    );

    const ItemRJC = ({ item, onPress, style }) => (
      
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
        <View style={{backgroundColor:'#fafafa', padding:5, justifyContent:'center', alignContent:'center', flex:1}}>
            <View style={{flexDirection:'row', backgroundColor:'#fff', justifyContent:'center', alignContent:'center', elevation:4,borderRadius:10, padding:5}}>
                <Text style={{textAlign:'center'}}>Data Permohonan Permintaan Darah Disetujui</Text>
            </View>
            <View style={{flex:1}}>
              <FlatList
                  data={dataPermintaanACC}
                  renderItem={renderItemACC}
                  keyExtractor={item => item.data.id}
              />
            </View>
            <View style={{flexDirection:'row', backgroundColor:'#fff', justifyContent:'center', alignContent:'center', elevation:4, borderRadius:10, padding:5}}>
                <Text style={{textAlign:'center'}}>Data Permohonan Permintaan Ditolak</Text>
            </View>
            <View style={{flex:1}}>
              <FlatList
                  data={dataPermintaanRJC}
                  renderItem={renderItemRJC}
                  keyExtractor={item => item.data.id}
              />
            </View>
            </View>
        </View>
       
    )
}

export default DataPermintaan;

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
        backgroundColor:'white',
        justifyContent:'center',
        alignContent:'center',
        margin:10
    },
})