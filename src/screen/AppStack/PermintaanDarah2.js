import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import database from '@react-native-firebase/database';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PermintaanDarah2 = ({route, navigation}) => {

    const {item_clicked} = route.params;
    const [dataPermintaan, setDataPermintaan] = useState({
        Id: null,
        NamaPeminta: null,
        NamaPenerima: null,
        GolonganDarah: null,
        JumlahDarah: null,
        KeteranganLain: null,
        NoHandphone: null,
        Alamat: null,
    });

    const Accept = () => {
        database()
        .ref(`/PermintaanDarahAccepted/${item_clicked}`)
        .set(dataPermintaan);

        database()
        .ref(`/PermintaanDarah/${item_clicked}`)
        .remove();
        ToastAndroid.show('Permintaan Berhasil Diterima !', ToastAndroid.SHORT);
    }

    const Decline = () => {
        database()
        .ref(`/PermintaanDarahRejected/${item_clicked}`)
        .set(dataPermintaan);

        database()
        .ref(`/PermintaanDarah/${item_clicked}`)
        .remove();
        ToastAndroid.show('Permintaan Berhasil Ditolak !', ToastAndroid.SHORT);
    }

    useEffect(() => {
        console.log(item_clicked);
        database()
            .ref(`/PermintaanDarah/${item_clicked}`)
            .once('value')
            .then(snapshot => {
                setDataPermintaan(snapshot.val());
            });
      }, []);

    return (
        <View style={styles.containerlist}>
            <View style={styles.item}>
                <Text style={styles.deskripsi}>Peminta Darah :{dataPermintaan.NamaPeminta}</Text>
                <Text style={styles.deskripsi}>Penerima Darah :{dataPermintaan.NamaPenerima}</Text>
                <Text style={styles.deskripsi}>Golongan Darah Dibutuhkan :{dataPermintaan.GolonganDarah}</Text>
                <Text style={styles.deskripsi}>Kantong Darah Dibutuhkan :{dataPermintaan.JumlahDarah}</Text>
                <Text style={styles.deskripsi}>Keterangan Lain : {dataPermintaan.KeteranganLain}</Text>
                <Text style={styles.deskripsi}>NoHandphone: {dataPermintaan.NoHandphone}</Text>
                <Text style={styles.deskripsi}>Alamat: {dataPermintaan.Alamat}</Text>
            </View>
            <View style={{justifyContent:'center', flexDirection:'row', alignContent:'center'}}>
                <TouchableOpacity 
                style={{justifyContent:'center',alignContent:'center',backgroundColor:'#fff', borderRadius:20, elevation:4, paddingHorizontal:25, paddingVertical:10, marginRight:20}}
                onPress={() => {Accept(); navigation.replace('PermintaanDarahScreen');} }
                >
                    <Text style={{fontWeight:'700', fontSize:20, textAlign:'center'}}>Setujui</Text>
                </TouchableOpacity>
            
                <TouchableOpacity 
                style={{justifyContent:'center',alignContent:'center',backgroundColor:'#fff', borderRadius:20, elevation:4, paddingHorizontal:30, paddingVertical:10, marginLeft:20}}
                onPress={() => {Decline(); navigation.replace('PermintaanDarahScreen');} }
                >
                    <Text style={{fontWeight:'700', fontSize:20, textAlign:'center'}}>Tolak</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PermintaanDarah2;

const styles = StyleSheet.create({

    containerlist: {
        flex:1,
        backgroundColor:'#fff',
        borderRadius:5,
        elevation:2,
        alignContent:'center',
        justifyContent:'center',
      },
      item: {
        padding: 10,
        margin:20,
        borderRadius:20,
        elevation:4,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignContent:'center',
      },
      deskripsi: {
          fontSize:15,
      },
})
