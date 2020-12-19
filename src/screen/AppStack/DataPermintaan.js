import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import database from '@react-native-firebase/database';

const DataPermintaan = () => {
  const [selectedIdACC, setSelectedIdACC] = useState();
  const [selectedIdRJC, setSelectedIdRJC] = useState();
  const [dataPermintaanACC, setDataPermintaanACC] = useState([]);
  const [dataPermintaanRJC, setDataPermintaanRJC] = useState([]);

  useEffect(() => {
    try {
      const onValueChangeACC = database()
        .ref(`/PermintaanDarahAccepted/`)
        .on('value', (snapshot) => {
          const dataTemp = [];
          snapshot.forEach((item) => {
            item.forEach((item2) => {
              dataTemp.push({
                data: {
                  IdItem: `${item2.val().Id}-${item2.key}`,
                  IdUser: item2.val().Id,
                  IdBranch: item2.key,
                  NamaPeminta: item2.val().NamaPeminta,
                  NamaPenerima: item2.val().NamaPenerima,
                  GolonganDarah: item2.val().GolonganDarah,
                  JumlahDarah: item2.val().JumlahDarah,
                  KeteranganLain: item2.val().KeteranganLain,
                  NoHandphone: item2.val().NoHandphone,
                  Alamat: item2.val().Alamat,
                },
              });
              return false;
            });
            return false;
          });
          setDataPermintaanACC(dataTemp);
        });

      const onValueChangeRJC = database()
        .ref(`/PermintaanDarahRejected/`)
        .on('value', (snapshot) => {
          const dataTemp = [];
          snapshot.forEach((item) => {
            item.forEach((item2) => {
              dataTemp.push({
                data: {
                  IdItem: `${item2.val().Id}-${item2.key}`,
                  IdUser: item2.val().Id,
                  IdBranch: item2.key,
                  NamaPeminta: item2.val().NamaPeminta,
                  NamaPenerima: item2.val().NamaPenerima,
                  GolonganDarah: item2.val().GolonganDarah,
                  JumlahDarah: item2.val().JumlahDarah,
                  KeteranganLain: item2.val().KeteranganLain,
                  NoHandphone: item2.val().NoHandphone,
                  Alamat: item2.val().Alamat,
                },
              });
              return false;
            });
            return false;
          });
          setDataPermintaanRJC(dataTemp);
        });
      return () => {
        database()
          .ref(`/PermintaanDarahAccepted/`)
          .off('value', onValueChangeACC);
        database()
          .ref(`/PermintaanDarahRejected/`)
          .off('value', onValueChangeRJC);
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  const ItemACC = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.deskripsi}>
        Peminta Darah :{item.data.NamaPeminta}
      </Text>
      <Text style={styles.deskripsi}>
        Penerima Darah :{item.data.NamaPenerima}
      </Text>
      <Text style={styles.deskripsi}>
        Golongan Darah Dibutuhkan :{item.data.GolonganDarah}
      </Text>
      <Text style={styles.deskripsi}>
        Kantong Darah Dibutuhkan :{item.data.JumlahDarah}
      </Text>
      <Text style={styles.deskripsi}>
        Keterangan Lain : {item.data.KeteranganLain}
      </Text>
      <Text style={styles.deskripsi}>NoHandphone: {item.data.NoHandphone}</Text>
      <Text style={styles.deskripsi}>Alamat: {item.data.Alamat}</Text>
    </TouchableOpacity>
  );

  const ItemRJC = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.deskripsi}>
        Peminta Darah :{item.data.NamaPeminta}
      </Text>
      <Text style={styles.deskripsi}>
        Penerima Darah :{item.data.NamaPenerima}
      </Text>
      <Text style={styles.deskripsi}>
        Golongan Darah Dibutuhkan :{item.data.GolonganDarah}
      </Text>
      <Text style={styles.deskripsi}>
        Kantong Darah Dibutuhkan :{item.data.JumlahDarah}
      </Text>
      <Text style={styles.deskripsi}>
        Keterangan Lain : {item.data.KeteranganLain}
      </Text>
      <Text style={styles.deskripsi}>NoHandphone: {item.data.NoHandphone}</Text>
      <Text style={styles.deskripsi}>Alamat: {item.data.Alamat}</Text>
    </TouchableOpacity>
  );

  const renderItemACC = ({item}) => {
    const backgroundColor = item === selectedIdACC ? '#f2f2f2' : '#fff';

    return (
      <ItemACC
        item={item}
        onPress={() => {
          setSelectedIdACC(item.data.IdItem);
        }}
        style={{backgroundColor}}
      />
    );
  };

  const renderItemRJC = ({item}) => {
    const backgroundColor = item === selectedIdRJC ? '#f2f2f2' : '#fff';

    return (
      <ItemRJC
        item={item}
        onPress={() => {
          setSelectedIdRJC(item.data.IdItem);
        }}
        style={{backgroundColor}}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#fafafa',
          padding: 5,
          justifyContent: 'center',
          alignContent: 'center',
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignContent: 'center',
            elevation: 4,
            borderRadius: 10,
            padding: 5,
          }}>
          <Text style={{textAlign: 'center'}}>
            Data Permohonan Permintaan Darah Disetujui
          </Text>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={dataPermintaanACC}
            renderItem={renderItemACC}
            keyExtractor={(item) => item.data.IdItem}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignContent: 'center',
            elevation: 4,
            borderRadius: 10,
            padding: 5,
          }}>
          <Text style={{textAlign: 'center'}}>
            Data Permohonan Permintaan Ditolak
          </Text>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={dataPermintaanRJC}
            renderItem={renderItemRJC}
            keyExtractor={(item) => item.data.IdItem}
          />
        </View>
      </View>
    </View>
  );
};

export default DataPermintaan;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    elevation: 2,
  },
  deskripsi: {
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
  },
});
