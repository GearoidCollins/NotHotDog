import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import isIPhoneX from 'react-native-is-iphonex';

const styles = StyleSheet.create({
  bottomBar: {
    paddingTop: isIPhoneX ? 40 : 20,
    width: '100%',
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  text: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 2,
  },
});

export const BannerNotHotDog = ({ show, text }) => (
  show && <View style={styles.bottomBar}>
    <Text style={styles.text}>{text}</Text>
    <Ionicons name="ios-close-circle" size={70} color="white" />
  </View>
);

BannerNotHotDog.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string,
};

BannerNotHotDog.defaultProps = {
  show: false,
  text: 'Not Hot Dog!',
};
