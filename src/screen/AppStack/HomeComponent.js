import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeComponent = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={{textAlign:'center', marginTop:20}}>WELCOME ADMIN</Text>

            <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', margin:20}}>
                <TouchableOpacity style={{borderRadius:25, backgroundColor:'#fff', elevation:2, margin:10, padding:20}} onPress={()=>navigation.navigate('PermintaanDarahScreen')}>
                    <Text>Permintaan Darah</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{borderRadius:25, backgroundColor:'#fff', elevation:2, margin:10, padding:20}} onPress={()=>navigation.navigate('ScanQRScreen')}>
                    <Text>SCAN QR</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{borderRadius:20, backgroundColor:'#fff', elevation:2, margin:10, padding:20}} onPress={()=>navigation.navigate('DataPermintaanScreen')}>
                    <Text style={{textAlign:'center'}}>Data Permintaan</Text>
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
