import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import isIPhoneX from 'react-native-is-iphonex';

const styles = StyleSheet.create({
  loader: {
    paddingTop: isIPhoneX ? 40 : 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '40%',
  },
});

export const Loader = ({ loading }) =>  (
    loading && <View style={styles.loader}>
      <ActivityIndicator size="large" color="#FFFF"/>
    </View>
  );

Loader.propTypes = {
  loading: PropTypes.bool,
};

Loader.defaultProps = {
  loading: false,
};
