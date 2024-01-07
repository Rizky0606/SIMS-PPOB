import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {priceTopup} from '../data/priceTopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from '../libs/api';
import {formatCurrency} from '../utils/currencyFormatter';
import {ActivityIndicator} from 'react-native-paper';
import Toast from 'react-native-toast-message';

const TopUp = () => {
  const [saldo, setSaldo] = useState<number>(0);
  const [inputTopup, setInputTopup] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const handleGetSaldo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await API.get('/balance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSaldo(response.data.data.balance);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleTopUp = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await API.post(
        '/topup',
        {
          top_up_amount: inputTopup,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Toast.show({
        type: 'success',
        text1: 'Topup Berhasil',
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Topup Gagal',
        text2: 'Silahkan periksa kembali inputan Anda',
      });
    }
  };

  useEffect(() => {
    handleGetSaldo();
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator animating={true} color={'red'} />
        </View>
      ) : (
        <View style={styles.container}>
          <Toast />
          <View style={styles.header}>
            <View>
              <Text style={{color: 'black', fontSize: 15}}>Kembali</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{textAlign: 'center', color: 'black', fontSize: 20}}>
                Top Up
              </Text>
            </View>
          </View>

          <View style={{width: '100%', marginTop: 40, marginBottom: 10}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/images/Background-Saldo.png')}
                style={{height: 110, borderRadius: 10}}
              />
            </View>
            <View style={{position: 'absolute', marginLeft: 30, marginTop: 20}}>
              <Text style={{color: 'white', fontSize: 18}}>Saldo anda</Text>
              <Text style={{color: 'white', fontSize: 25, marginTop: 15}}>
                {formatCurrency(saldo)}
              </Text>
            </View>
          </View>

          <View style={{paddingTop: 40, paddingBottom: 40}}>
            <Text style={{color: 'black', fontSize: 20}}>Silahkan masukan</Text>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 25}}>
              nominal Top Up
            </Text>
          </View>

          <View style={{width: '100%', alignItems: 'center'}}>
            <TextInput
              style={styles.boxInput}
              keyboardType="numeric"
              placeholder="masukan nominal Top Up"
              placeholderTextColor="black"
              value={`Rp. ${Number(inputTopup)}`}
              onChangeText={e => setInputTopup(Number(e))}
              //   onChange={e => setInputTopup(Number(e.nativeEvent.text))}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
              width: '100%',
              marginTop: 20,
            }}>
            {priceTopup.map(item => (
              <TouchableOpacity
                key={item.id}
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  padding: 15,
                  borderRadius: 3,
                  width: '31%',
                }}
                onPress={() => setInputTopup(item.price)}>
                <Text
                  style={{color: 'black', fontSize: 15, textAlign: 'center'}}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {inputTopup < 10000 && (
            <View style={{marginTop: 10}}>
              <Text style={{color: 'red', fontSize: 15}}>
                minimal top up 10.000
              </Text>
            </View>
          )}

          <View>
            {inputTopup < 10000 ? (
              <View
                style={{
                  backgroundColor: 'gray',
                  padding: 15,
                  borderRadius: 3,
                  width: '100%',
                  alignItems: 'center',
                  marginTop: 40,
                }}>
                {isLoadingButton ? (
                  <ActivityIndicator animating={true} color={'white'} />
                ) : (
                  <Text
                    style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                    Top Up
                  </Text>
                )}
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  padding: 15,
                  borderRadius: 3,
                  width: '100%',
                  alignItems: 'center',
                  marginTop: 50,
                }}
                onPress={() => {
                  setIsLoadingButton(true);
                  handleTopUp();
                }}>
                <Text
                  style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                  Top Up
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default TopUp;

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
