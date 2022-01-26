import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {useTag} from '../hooks/ApiHooks';

const Profile = () => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFilesByTag} = useTag();
  console.log('Profile', user);

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id).pop();
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.error(error.message);
    }
  };

  //quick 'n' dirty testing postTag
  //not needed yet
  const postAvatar = async (mediaId) => {
    const data = {
      file_id: mediaId,
      tag: 'avatar_' + user.user_id
    };
    try {
      const result = await postTag(data, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyOCwidXNlcm5hbWUiOiJwYXZsb2wiLCJlbWFpbCI6InBhdmxvbEBtZXRyb3BvbGlhLmZpIiwiZnVsbF9uYW1lIjoiUGF2bG8gTGVpbm9uZW4iLCJpc19hZG1pbiI6bnVsbCwidGltZV9jcmVhdGVkIjoiMjAyMi0wMS0xMFQxMzo0MDoxMS4wMDBaIiwiaWF0IjoxNjQzMTgxNDEwLCJleHAiOjE2NDMyNjc4MTB9.go5EM6Q4_59slFR6WEikYEl8RGr7TKm5ov9X50rA-00')
      console.log(result)
    } catch (error) {
      console.error(error.message);
    }

  };


  useEffect(() => {
    fetchAvatar();
    postAvatar();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Image
        source={{uri: avatar}}
        style={{width: '80%', height: '50%'}}
        resizeMode="contain"
      />
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
      <Text>{user.full_name}</Text>
      <Button
        title="Log out!"
        onPress={async () => {
          await AsyncStorage.clear();
          setIsLoggedIn(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;
