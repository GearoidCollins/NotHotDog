import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import isIPhoneX from 'react-native-is-iphonex';

const styles = StyleSheet.create({
  bottomBar: {
    paddingBottom: isIPhoneX ? 25 : 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export const BottomBar = ({ takePicture, loading }) => (
  <View style={styles.bottomBar}>
    <View style={{ flex: 0.8 }}>
      <TouchableOpacity disabled={loading} onPress={takePicture} style={{ alignSelf: 'center' }}>
        <Ionicons name="ios-radio-button-on" size={70} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

BottomBar.propTypes = {
  takePicture: PropTypes.func.isRequired,
};
