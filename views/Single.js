import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Card, ListItem, Text, Button} from 'react-native-elements';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFavorite, useFavourite, useTag, useUser} from '../hooks/ApiHooks';

const Single = ({route}) => {
  // console.log('route:', route);
  const {file} = route.params;
  //const [videoRef, setVideoRef] = useState(null);
  const videoRef = useRef(null);
  const {postFavourite, getFavouritesByFileId, deleteFavourite} = useFavourite();
  const {getFilesByTag} = useTag();
  const {getUserById} = useUser();
  const [owner, setOwner] = useState({username: 'fetching...'});
  const [avatar, setAvatar] = useState('http://placekitten.com/180')
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false)

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

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      if (avatarArray.length === 0) {
        return;
      }
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesByFileId(file.file_id);
      setLikes(likesData);
      //TODO check if user id of logged in user is included in data and set state userLike accrdingly
      likesData.forEach(like => {
        if (like.user_id === user.user_id) {
          setUserLike(true);
        }
      })
    } catch (error) {
      console.log(error.message);
    }
  };

  const createFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite(file.file_id, token);
      response && setUserLike(false);
    } catch (error) {
      //TODO: if user already liked?
      console.error('createFavourite() error', error)
    }
  };

  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavourite(file.file_id, token);
    } catch (error) {
      //TODO: if user not liked yet?
      console.error('removeFavourite() error', error)
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [userLike]);


  return (
    <ScrollView>
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
          <Avatar source={{uri: avatar}} />
          <Text>{owner.username}</Text>
        </ListItem>
        <ListItem>
          <Text>Likes count: {likes.length}</Text>
          <Button
            title="Like"
            style={styles.likes}
            disabled={userLike}
            onPress={() => {
              createFavourite();
              //fetchLikes();
            }}
          />
          <Button
            title="Dislike"
            style={styles.likes}
            disabled={userLike}
            onPress={() => {
              removeFavourite()
            }}
          />
        </ListItem>
      </Card>
    </ScrollView>
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
  likes: {
    margin: 5
  }
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
