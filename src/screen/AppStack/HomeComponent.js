import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeComponent = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={{textAlign:'center', marginTop:20}}>Selamat Datang</Text>
            <Text style={{textAlign:'center', marginTop:10, marginBottom:10, fontWeight:'700'}}>Admin</Text>

            <View>
                <TouchableOpacity style={{borderRadius:25, backgroundColor:'#fff', elevation:2, margin:10, padding:20}} onPress={()=>navigation.navigate('PermintaanDarahScreen')}>
                    <Text style={{textAlign:'center'}}>Permohonan Permintaan Darah</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{borderRadius:25, backgroundColor:'#fff', elevation:2, margin:10, padding:20}} onPress={()=>navigation.navigate('ScanQRScreen')}>
                    <Text style={{textAlign:'center'}}>Scan QR</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{borderRadius:20, backgroundColor:'#fff', elevation:2, margin:10, padding:20}} onPress={()=>navigation.navigate('DataPermintaanScreen')}>
                    <Text style={{textAlign:'center'}}>Data Permintaan Darah</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeComponent;

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#fafafa',
        elevation:3,
        margin:20,
        borderRadius:25,
    }
})
