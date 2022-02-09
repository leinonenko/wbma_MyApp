import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Card, ListItem, Text} from 'react-native-elements';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Single = ({route}) => {
  // console.log('route:', route);
  const {file} = route.params;
  //const [videoRef, setVideoRef] = useState(null);
  const videoRef = useRef(null);
  const [owner, setOwner] = useState({username: 'fetching...'});

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(file.user_id, token)
      setOwner(userData);
    } catch (error) {
      //TODO: how shoul user be notified?
      console.error('fetch owner error', error)
    }
  };

  useEffect(() => {
    fetchOwner();
  }, []);

  return (
    <Card>
      <Card.Title h4>{file.title}</Card.Title>
      <Card.Title>{file.time_added}</Card.Title>
      <Card.Divider />
      {file.media_type === 'image' ? (
        <Card.Image
          source={{uri: uploadsUrl + file.filename}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
      ) : (
         <Video
          ref={videoRef}
          style={styles.image}
          source={{
            uri: uploadsUrl + file.filename,
          }}
          posterSource={{
            uri: uploadsUrl + file.screenshot,
          }}
          useNativeControls
          resizeMode="contain"
         >
         </Video>
      )}

      <Card.Divider />
      <Text style={styles.description}>{file.description}</Text>
      <ListItem>
        <Avatar source={{uri: 'http://placekitten.com/180'}} />
        <Text>{owner.username}</Text>
      </ListItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  description: {
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
