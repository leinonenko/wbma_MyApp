import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Heart} from 'react-native-feather';

const image = { uri: "https://dailylolpics.com/wp-content/uploads/2018/06/Fat-Cat-Memes-23.jpg" };

const Header = () => {
  return (
    <View style={{ height:280}}>
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={styles.bgImage}
      />
      <Heart stroke="white" width={32} height={32} style={styles.heart}/>
      <Text style={styles.hello}>Random cat meme background</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'space-around',
    height: '100%',
    paddingTop: 0
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
    width: Dimensions.get('window').width,
  },
  hello: {
    position: 'absolute',
    top: 190 ,
    left: 20,
    height: 40,
    textAlignVertical: 'center', // why is not working?
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'grey',
    fontSize: 25
  },
  heart: {
    position: 'absolute',
    top: 60,
    right: 20,
  }
});

export default Header;
