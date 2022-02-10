import React, {useContext} from 'react';
import {PropTypes} from 'prop-types';
import {Alert, ScrollView, StyleSheet, Text, TextInput} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Card, Button} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Modify = ({navigation, route}) => {
  const {file} = route.params;
  console.log('Modify', file);
  const {putMedia, loading} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: file.title,
      description: file.description,
    },
  });

  const onSubmit = async (data) => {
    console.log('Modify', data);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await putMedia(data, token, file.file_id);
      console.log('Modify response', response);

      response &&
      Alert.alert('File', 'uploaded', [
        {
          text: 'Ok',
          onPress: () => {
            // TODO: clear the form values here after submission
            setUpdate(update + 1);
            navigation.navigate('My Files');
          },
        },
      ]);
    } catch (error) {
      // You should notify the user about problems here
      console.log('onSubmit upload image problem');
    }
  };

  return (
    <ScrollView>
      <Card>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.inputStyle}
              autoCapitalize="none"
              placeholder="Title"
            />
          )}
          name="title"
        />
        {errors.title && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.inputStyle}
              autoCapitalize="none"
              placeholder="Description"
            />
          )}
          name="description"
        />

        {errors.description && <Text>This is required.</Text>}

        <Button
          loading={loading}
          title="Modify"
          titleStyle={{fontWeight: 'bold'}}
          onPress={handleSubmit(onSubmit)}
        />
      </Card>
    </ScrollView>
  );
};

Modify.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  inputStyle: {
    marginBottom: 2,
    padding: 5,
    borderEndWidth: 1,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 5,
  },
});

export default Modify;
