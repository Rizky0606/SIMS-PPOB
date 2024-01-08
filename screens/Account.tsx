import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {ActivityIndicator} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {API} from '../libs/api';

const Account = ({navigation}: any) => {
  const dataUser = useSelector(state => state.user.user);

  const [editable, setEditable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateDataUser, setUpdateDataUser] = useState({
    first_name: dataUser.first_name,
    last_name: dataUser.last_name,
  });

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('LoginScreen');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDataUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await API.put('/profile/update', updateDataUser, {
        headers: {
          Authorization: `Bearer ${await token}`,
        },
      });
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Update Data Berhasil',
      });
      setEditable(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Update Data Gagal',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Toast />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <MaterialIcons name="arrow-back" size={25} color="black" />
          <Text style={{color: 'black', fontSize: 15}}>Kembali</Text>
        </TouchableOpacity>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 20,
              marginLeft: 70,
            }}>
            Akun
          </Text>
        </View>
      </View>

      <View style={{marginTop: 40}}>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <Image
            source={{
              uri: dataUser.profile_image,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: 'black',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 15,
          }}>{`${dataUser.first_name} ${dataUser.last_name}`}</Text>
      </View>

      <View style={{width: '100%', marginTop: 35}}>
        {editable === true ? (
          <>
            {/* Jika klik Edit Profile maka menampilkan input */}
            <Text style={{color: 'black', fontSize: 17}}>Email</Text>
            <View
              style={{
                borderWidth: 1,
                width: '100%',
                borderColor: 'black',
                marginVertical: 15,
                borderRadius: 6,
                backgroundColor: 'white',
                padding: 15,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                }}>
                {dataUser.email}
              </Text>
            </View>
            <Text style={{color: 'black', fontSize: 17}}>Nama Depan</Text>
            <TextInput
              style={styles.boxInput}
              placeholder="masukan nominal Top Up"
              placeholderTextColor="black"
              value={updateDataUser.first_name}
              onChangeText={e =>
                setUpdateDataUser({...updateDataUser, first_name: e})
              }
            />
            <Text style={{color: 'black', fontSize: 17}}>Nama Belakang</Text>
            <TextInput
              style={styles.boxInput}
              placeholder="masukan nominal Top Up"
              placeholderTextColor="black"
              value={updateDataUser.last_name}
              onChangeText={e =>
                setUpdateDataUser({...updateDataUser, last_name: e})
              }
            />
          </>
        ) : (
          <>
            {/* Jika tidak klik Edit Profile maka menampilkan view */}
            <Text style={{color: 'black', fontSize: 17}}>Email</Text>
            <View
              style={{
                borderWidth: 1,
                width: '100%',
                borderColor: 'black',
                marginVertical: 15,
                borderRadius: 6,
                backgroundColor: 'white',
                padding: 15,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                }}>
                {dataUser.email}
              </Text>
            </View>

            <Text style={{color: 'black', fontSize: 17}}>Nama Depan</Text>
            <View
              style={{
                borderWidth: 1,
                width: '100%',
                borderColor: 'black',
                marginVertical: 15,
                borderRadius: 6,
                backgroundColor: 'white',
                padding: 15,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                }}>
                {dataUser.first_name}
              </Text>
            </View>

            <Text style={{color: 'black', fontSize: 17}}>Nama Belakang</Text>
            <View
              style={{
                borderWidth: 1,
                width: '100%',
                borderColor: 'black',
                marginVertical: 15,
                borderRadius: 6,
                backgroundColor: 'white',
                padding: 15,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                }}>
                {dataUser.last_name}
              </Text>
            </View>
          </>
        )}
      </View>

      <View>
        {editable === true ? (
          <>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 15,
                borderRadius: 3,
                width: '100%',
                alignItems: 'center',
                marginTop: 30,
              }}
              onPress={() => {
                setIsLoading(true);
                handleUpdateDataUser();
              }}>
              {isLoading === true ? (
                <ActivityIndicator animating={true} color={'white'} />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Simpan
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: 3,
                width: '100%',
                alignItems: 'center',
                marginTop: 30,
                borderWidth: 1,
                borderColor: 'black',
              }}
              onPress={() => setEditable(!editable)}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 15,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Batalkan
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: 3,
                width: '100%',
                alignItems: 'center',
                marginTop: 30,
                borderWidth: 1,
                borderColor: 'black',
              }}
              onPress={() => setEditable(true)}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 15,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Edit Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 15,
                borderRadius: 3,
                width: '100%',
                alignItems: 'center',
                marginTop: 30,
              }}
              onPress={handleLogout}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 30,
  },
  boxInput: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'black',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 6,
    color: 'black',
    paddingLeft: 10,
  },
});
