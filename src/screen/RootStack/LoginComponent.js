import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput, 
} from 'react-native';
import {AuthContext} from '../../auth/AuthProvider';

const LoginComponent = ({navigation}) => {

    const {login} = useContext(AuthContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.action}>
                    <View style={styles.section}>
                        <TextInput
                            placeholder='Email'
                            style={styles.textInput}
                            onChangeText={(userEmail) => setEmail(userEmail)}
                            value={email}
                            >

                            </TextInput>
                    </View>
                    <View style={styles.section}>
                        <TextInput
                            placeholder='Password'
                            style={styles.textInput}
                            onChangeText={(userpassword) => setPassword(userpassword)}
                            value={password}
                            secureTextEntry>

                        </TextInput>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password? </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> login(email, password)}
                    style={styles.login}> 
                    <Text style={styles.textLogin}>Login</Text>
                </TouchableOpacity>
            </View>
        )
}

export default LoginComponent;

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        paddingHorizontal:30,
        paddingVertical:100
    },
    title:{
        color: '#8a0303',
        fontWeight :'bold',
        fontSize:30,
    },
    section: {
        flexDirection:'row',
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:15,
        paddingVertical:10,
        alignItems:'center',
        marginTop:10,
    }, 
    textInput:{
        flex:1,
        paddingLeft:10
    },
    forgot:{
        textAlign:'right',
        marginTop:15,
        color:'#8a0303'
    },
    textLogin:{
        color:'white',
        fontSize:15,
        fontWeight:'bold'
    },
    login:{
        width:'100%',
        height:40,
        backgroundColor:'#8a0303',
        justifyContent:'center',
        alignItems:'center',
        marginTop:25,
        borderRadius:50,
    },
    signUp:{
        textAlign:'center',
        marginTop:15,
        color:'grey'
    }
    

});