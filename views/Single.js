import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import List from '../components/List';
import {uploadsUrl} from '../utils/variables';


const Single = ({route}) => {
  //console.log(route);
  const {file} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: uploadsUrl + file.filename}}
        style={{width: '90%', height: '70%'}}
        resizeMode="contain"
      />
      <Text>{file.title}</Text>
      <Text>{file.description}</Text>
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

Single.propTypes = {
  navigation: PropTypes.object
}

export default Single;
