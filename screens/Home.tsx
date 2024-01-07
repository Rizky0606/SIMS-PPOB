import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import {API} from '../libs/api';
import {formatCurrency} from '../utils/currencyFormatter';
import {userLogin} from '../redux/slices/userSlice';

type TypeServicesProps = {
  service_code: string;
  service_icon: string;
  service_name: string;
  service_tariff: number;
};

type TypeBannerProps = {
  banner_image: string;
  banner_name: string;
  description: string;
};

const Home = ({navigation}: any) => {
  const [dataServices, setDataServices] = useState<TypeServicesProps[] | null>(
    [],
  );
  const [dataBanner, setDataBanner] = useState<TypeBannerProps[] | null>([]);
  const [saldo, setSaldo] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const dataUser = useSelector(state => state.user.user);

  const handleGetSaldo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await API.get('/balance', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSaldo(response.data.data.balance);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleGetServices = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await API.get('/services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDataServices(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleGetBanner = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await API.get('/banner', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDataBanner(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await API.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(
          userLogin({
            first_name: response.data.data?.first_name,
            last_name: response.data.data?.last_name,
            email: response.data.data?.email,
            profile_image: response.data.data?.profile_image,
          }),
        );
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        navigation.replace('LoginScreen');
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    handleGetSaldo();
    handleGetServices();
    handleGetBanner();
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator animating={true} color={'red'} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.headers}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/images/Logo.png')}
                style={styles.imageLogo}
              />
              <Text style={styles.textLogo}>SIMS PPOB</Text>
            </View>
            <View>
              <Image
                source={
                  {
                    uri: dataUser.profile_image,
                  }
                    ? {
                        uri: dataUser.profile_image,
                      }
                    : require('../assets/images/Profile.png')
                }
                style={{width: 40, height: 40, borderRadius: 50}}
              />
            </View>
          </View>

          <View style={{padding: 20}}>
            <Text style={{color: 'black', fontSize: 27}}>Selamat datang,</Text>
            <Text
              style={{
                color: 'black',
                fontSize: 30,
                fontWeight: 'bold',
                paddingTop: 5,
              }}>
              {`${dataUser.first_name} ${dataUser.last_name}`}
            </Text>
          </View>

          <View style={{width: '100%'}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/images/Background-Saldo.png')}
              />
            </View>
            <View style={{position: 'absolute', marginLeft: 45, marginTop: 20}}>
              <Text style={{color: 'white', fontSize: 18}}>Saldo anda</Text>
              <Text style={{color: 'white', fontSize: 25, marginTop: 15}}>
                {formatCurrency(saldo)}
              </Text>
              <Text style={{color: 'white', marginTop: 20}}>Lihat Saldo </Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: 10,
              marginLeft: 20,
              marginRight: 20,
              gap: 10,
            }}>
            {dataServices?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  alignItems: 'center',
                  marginTop: 30,
                  width: 50,
                  height: 50,
                }}
                onPress={() => navigation.navigate('Service', {item})}>
                <Image
                  source={{uri: item.service_icon}}
                  style={{width: 50, height: 50}}
                  alt={item.service_name}
                />
                <Text
                  style={{
                    color: 'black',
                    marginTop: 10,
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  {item.service_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{marginTop: 20, marginBottom: 20}}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                marginLeft: 20,
                marginTop: 30,
                marginBottom: 10,
              }}>
              Temukan promo menarik
            </Text>
            <ScrollView
              horizontal={true}
              style={{marginTop: 10, marginLeft: 15, marginRight: 15}}>
              {dataBanner?.map((item, index) => (
                <View key={index} style={{marginLeft: 10}}>
                  <Image
                    source={{
                      uri: item.banner_image,
                    }}
                    style={{width: 250, height: 118, borderRadius: 8}}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headers: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  imageLogo: {
    width: 25,
    height: 25,
  },
  textLogo: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
