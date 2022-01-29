import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Button, Avatar, ListItem as RNEListItem} from 'react-native-elements';

const ListItem = ({navigation, singleMedia}) => {
  return (
    <RNEListItem
    >
      <Avatar
          size="large"
          rounded
          source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
      />
      <RNEListItem.Content>
        <RNEListItem.Title numberOfLines={1} h4>
          {singleMedia.title}
        </RNEListItem.Title>
        <RNEListItem.Subtitle numberOfLines={1}>
          {singleMedia.description}
        </RNEListItem.Subtitle>
      </RNEListItem.Content>
      <Button
        title="View"
        buttonStyle={{backgroundColor: 'rgba(78, 116, 289, 1)', borderRadius: 8}}
        containerStyle={{
          width: 100,
          height: 50,
          marginHorizontal: 10,
          marginVertical: 5,
        }}
        titleStyle={{color: 'white', marginHorizontal: 20}}
        bottomDivider
        onPress={() => {
          navigation.navigate('Single', {file: singleMedia});
        }}
      />
    </RNEListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
