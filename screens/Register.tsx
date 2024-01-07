import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {API} from '../libs/api';
import {ActivityIndicator} from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Register = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    try {
      await API.post('/registration', dataUser);
      navigation.navigate('LoginScreen');
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Register Success',
        text2: 'Please Login and check your email and password',
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Register Failed',
        text2: `${error}`,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Toast />
      <View style={styles.headerLogo}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.imageLogo}
        />
        <Text style={styles.textLogo}>SIMS PPOB</Text>
      </View>

      <View>
        <Text style={styles.textHeader}>Lengkapi data untuk membuat akun</Text>
      </View>

      <View style={{width: '100%', alignItems: 'center'}}>
        <TextInput
          keyboardType="email-address"
          style={styles.boxInput}
          placeholder="Masukan email anda"
          placeholderTextColor="black"
          value={dataUser.email}
          onChangeText={e => setDataUser({...dataUser, email: e})}
        />
        <TextInput
          inputMode="text"
          style={styles.boxInput}
          placeholder="Nama depan"
          placeholderTextColor="black"
          value={dataUser.first_name}
          onChangeText={e => setDataUser({...dataUser, first_name: e})}
        />
        <TextInput
          inputMode="text"
          style={styles.boxInput}
          placeholder="Nama belakang"
          placeholderTextColor="black"
          value={dataUser.last_name}
          onChangeText={e => setDataUser({...dataUser, last_name: e})}
        />
        <TextInput
          keyboardType="visible-password"
          style={styles.boxInput}
          placeholder="Buat password"
          placeholderTextColor="black"
          value={dataUser.password}
          onChangeText={e => setDataUser({...dataUser, password: e})}
        />
        {dataUser.password.length < 8 && (
          <View style={{width: '100%', paddingRight: 40}}>
            <Text style={{textAlign: 'right', color: 'red'}}>
              password minimal 8 huruf
            </Text>
          </View>
        )}
        <TextInput
          keyboardType="visible-password"
          style={styles.boxInput}
          placeholder="Konfirmasi password"
          placeholderTextColor="black"
          onChangeText={e => setConfirmPassword(e)}
        />
        {dataUser.password !== confirmPassword && (
          <View style={{width: '100%', paddingRight: 40}}>
            <Text style={{textAlign: 'right', color: 'red'}}>
              password tidak sama
            </Text>
          </View>
        )}
      </View>

      {dataUser.email === '' ||
      dataUser.first_name === '' ||
      dataUser.last_name === '' ||
      dataUser.password === '' ||
      dataUser.password.length < 8 ||
      dataUser.password !== confirmPassword ? (
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
            <Text style={{color: 'white', fontWeight: 'bold'}}>Registrasi</Text>
          )}
        </View>
      ) : (
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => {
            setIsLoading(true);
            handleRegister();
          }}>
          {isLoading === true ? (
            <ActivityIndicator animating={true} color={'white'} />
          ) : (
            <Text style={{color: 'white', fontWeight: 'bold'}}>Registrasi</Text>
          )}
        </TouchableOpacity>
      )}

      <View>
        <Text style={{color: 'black'}}>
          sudah punya akun? login{' '}
          <Text
            style={{color: 'red'}}
            onPress={() => navigation.navigate('LoginScreen')}>
            di sini
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '80%',
    borderColor: 'black',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 6,
    color: 'black',
    paddingLeft: 10,
  },
  buttonRegister: {
    width: '80%',
    backgroundColor: 'red',
    color: 'white',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
});
export default Register;
