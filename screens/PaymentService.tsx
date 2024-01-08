import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {formatCurrency} from '../utils/currencyFormatter';
import {API} from '../libs/api';

const PaymentService = ({navigation, route}: any) => {
  const [saldo, setSaldo] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);

  const dataService = route.params.item;

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
      navigation.replace('LoginScreen');
      await AsyncStorage.clear();
      setIsLoading(false);
    }
  };

  const handlePurchaseService = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await API.post(
        '/transaction',
        {
          service_code: dataService.service_code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setIsLoadingButton(false);
      navigation.replace('HomeScreen');
      Toast.show({
        type: 'success',
        text1: `Pembayaran ${dataService.service_name} Berhasil`,
      });
    } catch (error) {
      console.log(error);
      setIsLoadingButton(false);
      Toast.show({
        type: 'error',
        text1: `Pembayaran ${dataService.service_name} Gagal`,
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
            <TouchableOpacity
              onPress={() => navigation.replace('HomeScreen')}
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
                  marginLeft: 60,
                }}>
                Transaksi
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

          <View style={{marginTop: 50}}>
            <View style={{marginBottom: 20}}>
              <Text style={{color: 'black', fontSize: 20}}>Pembayaran</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{uri: dataService.service_icon}}
                style={{width: 40, height: 40}}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 23,
                  fontWeight: 'bold',
                  marginLeft: 20,
                }}>
                {dataService.service_name}
              </Text>
            </View>
          </View>

          <View style={{width: '100%', marginTop: 25}}>
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
                {formatCurrency(dataService.service_tariff)}
              </Text>
            </View>
          </View>

          <View style={{marginTop: 150}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 15,
                borderRadius: 3,
                width: '100%',
                alignItems: 'center',
              }}
              onPress={() => {
                setIsLoadingButton(true);
                handlePurchaseService();
              }}>
              {isLoadingButton === true ? (
                <ActivityIndicator animating={true} color={'white'} />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Bayar
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default PaymentService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 30,
    paddingRight: 30,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 30,
  },
});
