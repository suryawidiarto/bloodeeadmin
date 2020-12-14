import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  ToastAndroid
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import database from '@react-native-firebase/database';


const ScanQR = () => {
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState();
  const [counter, setCounter] = useState();

  const onSuccess = e => {
    setResult(e.data);
    setScan(true);
  }
  
  useEffect(()=>{
    getData();
  },[result])

  const Post = () => {
    console.log('REF :', counter);
    database().ref(`History/${result}/DonorKe-${counter}`).update({
        Id: result,
        Donor: 'YA',
        Lokasi: 'PURWOKERTO',
        GolonganDarah: 'A',
        JumlahDarah: '1',
        KeteranganLain: '',
    }).then(() => {
        ToastAndroid.show('Submit Data Berhasil !', ToastAndroid.SHORT);
    });
    
  }

  const storeData = () => {
    try {

        database().ref(`/counter/users/${result}`).update({
            key_history: counter,
        });
        console.log('key counter store firebase sukses');
    } catch (e) {
      console.log(e);
    }
  }

  const getData = () => {
    try {
        database()
        .ref(`/counter/users/${result}`)
        .on('value', datadb => {
          console.log(datadb.val());
            if(datadb.val() !== null) {
                const data = datadb.val().key_history;
                setCounter(data+1);
                console.log('key counter get firebase sukses');
                
            }else{
                setCounter(1);
                console.log('key counter get firebase kosong');
            }
        });
    
    } catch(e) {
        console.log(e);
        setCounter(1);
    }
}

    return scan ? (
      <View style={styles.container}>
          { result && <Text>{result}</Text> }
          <TouchableOpacity style={styles.buttonTouchable} onPress={()=> setScan(false)}>
            <Text style={styles.buttonText}>SCAN LAGI</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={()=> {Post();setCounter(counter+1);storeData();} }
            style={styles.buttonTouchable}> 
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
      </View>

    ) : (
      <QRCodeScanner
        onRead={onSuccess}
        reactivate={true}
        showMarker={true}
      />
    )
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column'
  },  
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default ScanQR;