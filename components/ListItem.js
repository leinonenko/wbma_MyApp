import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.row}>
      <View style={styles.imagebox}>
        <Image
          source={{uri: props.singleMedia.thumbnails.w160}}
          style={styles.image}
          imageStyle={styles.backImage}
        />
      </View>
      <View style={styles.textbox}>
        <Text style={styles.listTitle}>{props.singleMedia.title}</Text>
        <Text style={styles.decsiption}>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#553863',
    borderRadius: 6,
    marginVertical: 10,
  },
  imagebox: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 10,
    width: 170,
    borderBottomRightRadius: 60
  },
  textbox: {
    flex: 1,
    padding: 10,
  },
  decsiption: {
    flex: 1,
    position: 'relative',
    fontSize: 20,
    color: 'grey',
  },
  listTitle: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 20,
    paddingBottom: 10,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
