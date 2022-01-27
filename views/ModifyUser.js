import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {MainContext} from '../contexts/MainContext';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import ModifyForm from '../components/ModifyForm';


const ModifyUser = () => {
  const [formToggle, setFormToggle] = useState(false)
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

    const checkToken = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('token value in async storage', userToken);
      if (!userToken) {
        return;
      }
      try {
        const userData = await getUserByToken(userToken);
        console.log('checkToken', userData);
        console.log('token', userToken);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      checkToken();
    }, []);

    return (
      <TouchableOpacity
        style={{flex: 1}}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={styles.container}
        >
          <View style={styles.appTitle}>
          </View>
          <View style={styles.form}>
              <Card>
                <Card.Title h4>Modify user</Card.Title>
                <Card.Divider />
                <ModifyForm setFormToggle={setFormToggle} />
              </Card>
          </View>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    appTitle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      flex: 8,
    },
  });

  ModifyUser.propTypes = {
    navigation: PropTypes.object,
  };

  export default ModifyUser;
