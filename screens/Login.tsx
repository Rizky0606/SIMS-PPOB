import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import {API} from '../libs/api';

const Login = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [dataLogin, setDataLogin] = useState({
  //   email: '',
  //   password: '',
  // });
  const [dataLogin, setDataLogin] = useState({
    email: 'user@nutech-integrasi.com',
    password: 'abcdef1234',
  });

  const handleLogin = async () => {
    try {
      const response = await API.post('/login', dataLogin);
      const token = response.data.data.token;
      await AsyncStorage.setItem('token', token);
      navigation.replace('Checking');
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Login Success',
        text2: 'Silahkan Masuk ke Aplikasi',
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please check your email and password',
      });
    }
  };
  return (
    <View style={styles.container}>
      <Toast />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={styles.imageLogo}
          source={require('../assets/images/Logo.png')}
        />
        <Text style={styles.textLogo}>SIMS PPOB</Text>
      </View>
      <Text style={styles.textHeader}>Masuk atau buat akun untuk memulai</Text>

      <View style={{width: '100%', alignItems: 'center'}}>
        <TextInput
          keyboardType="email-address"
          inputMode="email"
          style={styles.boxInput}
          placeholder="Masukan email anda"
          placeholderTextColor="black"
          onChangeText={e => setDataLogin({...dataLogin, email: e})}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="visible-password"
          style={styles.boxInput}
          placeholder="Masukan password anda"
          placeholderTextColor="black"
          onChangeText={e => setDataLogin({...dataLogin, password: e})}
        />
      </View>

      {dataLogin.email === '' || dataLogin.password === '' ? (
        <View
          style={{
            width: '80%',
            backgroundColor: 'gray',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            marginVertical: 20,
          }}>
          {isLoading === true ? (
            <ActivityIndicator animating={true} color={'white'} />
          ) : (
            <Text style={{color: 'white', fontWeight: 'bold'}}>Masuk</Text>
          )}
        </View>
      ) : (
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => {
            setIsLoading(true);
            handleLogin();
          }}>
          {isLoading === true ? (
            <ActivityIndicator animating={true} color={'white'} />
          ) : (
            <Text style={{color: 'white', fontWeight: 'bold'}}>Masuk</Text>
          )}
        </TouchableOpacity>
      )}

      <View>
        <Text style={{color: 'black'}}>
          belum punya akun? registrasi{' '}
          <Text
            style={{color: 'red'}}
            onPress={() => navigation.navigate('RegisterScreen')}>
            di sini
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: 70,
    height: 70,
  },
  textLogo: {
    marginLeft: 10,
    color: 'black',
    fontSize: 40,
    fontWeight: 'normal',
  },
  textHeader: {
    paddingVertical: 10,
    margin: 10,
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxInput: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 6,
    color: 'black',
    paddingLeft: 10,
  },
  buttonLogin: {
    width: '80%',
    backgroundColor: 'red',
    color: 'white',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
});
