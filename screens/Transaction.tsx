import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {API} from '../libs/api';
import {formatCurrency} from '../utils/currencyFormatter';
import dateFormatter from '../utils/dateFormatter';
import timeFormatter from '../utils/timeFormatter';

type TypeTransactionProps = {
  created_on: string;
  description: string;
  invoice_number: string;
  total_amount: number;
  transaction_type: string;
};

const Transaction = ({navigation}: any) => {
  const [dataTransaction, setDataTransaction] = useState<
    TypeTransactionProps[]
  >([]);
  const [saldo, setSaldo] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const handleGetTransaction = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await API.get('/transaction/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDataTransaction(response.data.data.records);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetTransaction();
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
              <Text style={{textAlign: 'center', color: 'black', fontSize: 20}}>
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

          <View style={{paddingTop: 20, paddingBottom: 10}}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
              Transaksi
            </Text>
          </View>

          <View>
            {dataTransaction.slice(0, 4).map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 10,
                  width: '100%',
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 5,
                  padding: 20,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {item.transaction_type === 'TOPUP' ? (
                    <Text
                      style={{
                        color: 'green',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      + {formatCurrency(item.total_amount)}
                    </Text>
                  ) : (
                    <Text
                      style={{color: 'red', fontSize: 20, fontWeight: 'bold'}}>
                      - {formatCurrency(item.total_amount)}
                    </Text>
                  )}
                  <Text style={{color: 'black'}}>{item.description}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: 'black'}}>
                    {dateFormatter(new Date(item.created_on))}
                  </Text>
                  <Text style={{color: 'black', marginLeft: 10}}>
                    {timeFormatter(new Date(item.created_on))}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {dataTransaction.length < 1 && (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Text style={{textAlign: 'center', color: 'gray'}}>
                Tidak ada transaksi
              </Text>
            </View>
          )}

          {dataTransaction.length > 4 && (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: 'transparent',
                  padding: 15,
                  borderRadius: 3,
                  width: '100%',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 15,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Show More
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default Transaction;

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
