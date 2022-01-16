import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem';

const mediaArray = [
  {
    key: '0',
    title: 'Meaw 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    thumbnails: {
      w160: 'http://placekitten.com/160/161',
    },
    filename: 'http://placekitten.com/2048/1920',
  },
  {
    key: '1',
    title: 'Meaw 2',
    description:
      'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna.',
    thumbnails: {
      w160: 'http://placekitten.com/160/164',
    },
    filename: 'http://placekitten.com/2041/1922',
  },
  {
    key: '2',
    title: 'Meaw 3',
    description:
      'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna.',
    thumbnails: {
      w160: 'http://placekitten.com/160/167',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
];

const List = () => {
  return (
    <FlatList
      style={{backgroundColor: '#462E51'}}
      data={mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    ></FlatList>
  );
};


export default List;
