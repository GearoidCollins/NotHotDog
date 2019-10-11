import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import isIPhoneX from 'react-native-is-iphonex';

const styles = StyleSheet.create({
  bottomBar: {
    paddingTop: isIPhoneX ? 40 : 20,
    width: '100%',
    backgroundColor: '#00BF6F',
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

export const BannerHotDog = ({ show, text }) =>
  (show && <View style={styles.bottomBar}>
    <Text style={styles.text}>{text}</Text>
    <Ionicons name="ios-checkmark-circle" size={70} color="white" />
  </View>
  );

BannerHotDog.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string,
};

BannerHotDog.defaultProps = {
  show: false,
  text: 'Hot Dog!',
};
