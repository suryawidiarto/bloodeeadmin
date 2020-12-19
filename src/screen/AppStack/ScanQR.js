import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  ToastAndroid,
  TextInput,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import database from '@react-native-firebase/database';

const ScanQR = () => {
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState();
  const [counter, setCounter] = useState();
  const [lokasi, setLokasi] = useState();
  const [tanggal, setTanggal] = useState();

  const onSuccess = (e) => {
    setResult(e.data);
    setScan(true);
  };

  const Post = () => {
    console.log('REF :', counter);
    database()
      .ref(`History/${result}/DonorKe-${counter}`)
      .update({
        Id: result,
        Tanggal: tanggal,
        Lokasi: lokasi,
      })
      .then(() => {
        ToastAndroid.show('Submit Data Berhasil !', ToastAndroid.SHORT);
      });
  };

  const storeData = () => {
    try {
      database().ref(`/counter/users/${result}/key-history`).update({
        key: counter,
      });
      console.log('key counter store firebase sukses');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      const onValueChange = database()
        .ref(`/counter/users/${result}/key-history`)
        .on('value', (datadb) => {
          console.log(result);
          console.log(datadb.val());
          if (datadb.val()) {
            const data = datadb.val().key;
            console.log('MASUK SINI G:', data);
            setCounter(data + 1);
            console.log('key counter get firebase sukses');
          } else {
            setCounter(1);
            console.log('key counter get firebase kosong');
          }
        });
      return () =>
        database().ref(`/counter/users/${result}`).off('value', onValueChange);
    } catch (e) {
      console.log(e);
    }
  }, [result]);

  return scan ? (
    <View style={styles.container}>
      {result && (
        <Text>
          {result} {counter}
        </Text>
      )}

      <TextInput
        placeholder="Tanggal"
        onChangeText={(input) => setTanggal(input)}
        style={{borderWidth: 1, marginVertical: 20}}
      />

      <TextInput
        placeholder="Lokasi"
        onChangeText={(input) => setLokasi(input)}
        style={{borderWidth: 1}}
      />

      <TouchableOpacity
        onPress={() => {
          Post();
          setCounter(counter + 1);
          storeData();
          setScan(false);
        }}
        style={{
          margin: 20,
          backgroundColor: '#fff',
          elevation: 3,
          padding: 10,
          borderRadius: 15,
        }}>
        <Text style={{textAlign: 'center'}}>SUBMIT</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setScan(false)}
        style={{
          margin: 20,
          backgroundColor: '#fff',
          elevation: 3,
          padding: 10,
          borderRadius: 15,
        }}>
        <Text style={{textAlign: 'center'}}>SCAN LAGI</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <QRCodeScanner onRead={onSuccess} reactivate={true} showMarker={true} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    margin: 25,
  },
});

export default ScanQR;
