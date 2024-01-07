import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {API} from '../libs/api';
import {userLogin} from '../redux/slices/userSlice';

const CheckingUser = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
      navigation.replace('HomeScreen');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      navigation.replace('LoginScreen');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      {isLoading && <ActivityIndicator animating={true} color={'red'} />}
    </View>
  );
};

export default CheckingUser;
