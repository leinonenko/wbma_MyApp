import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Input} from 'react-native-elements';
import {Alert, View} from 'react-native';
import {useUser} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModifyForm = ({navigation}) => {

  const {checkUsername, putUser} = useUser();
  const {user, setUser} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: user.username,
      password: '',
      confirmPassword: '',
      email: user.email,
      full_name: user.full_name,
    },
    mode: 'onBlur',
  });


  const onSubmit = async (data) => {
    console.log(data);
    try {
      delete data.confirmPassword;
      if (data.password === '') {
        delete data.password;
      }
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = await putUser(data, userToken);
      if (userData){
        Alert.alert('Success', userData.message)
        delete data.password;
        setUser(data);
        navigation.navigate('Profile');
      }
      console.log('modify onSubmit', userData);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View>
      <Controller
        control={control}
        rules={{
          minLength: {value: 3, message: 'Username has to be at least 3 char'},
          validate: async (value) => {
            try {
              const available = await checkUsername(value);
              if(available || user.username === value) {
                return true;
              } else {
                return 'Username us already exists';
              }
            } catch (error) {
              throw new Error(error.message);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Username"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />
      <Controller
        control={control}
        rules={{
          minLength: {value: 5, message: 'Password has to be at least 5 char'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          validate: (value) => {
            const {password} = getValues();
            if (value === password) {
              return true;
            } else {
              return 'Passwords do not match';
            }
          }
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Confirm password"
            errorMessage={errors.confirmPassword && errors.confirmPassword.message}
          />
        )}
        name="confirmPassword"
      />

      <Controller
        control={control}
        rules={{
          pattern: {
            value: /^[a-z0-9_-]+(\.[a-z0-9_-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/,  // \S+@\S+\.\S+$ as well
            message: 'Not a email format',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Email"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      <Controller
        rules={{
          minLength: {value: 3, message: 'Full name has to be at least 3 char'},
        }}
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            placeholder="Full name"
            errorMessage={errors.full_name && errors.full_name.message}
          />
        )}
        name="full_name"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default ModifyForm;
