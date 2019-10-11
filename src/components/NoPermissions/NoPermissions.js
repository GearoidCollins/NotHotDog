import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const NoPermissions = () => (
  <View style={styles.noPermissions}>
    <Text style={{ color: 'white' }}>
      Camera permissions not granted - cannot open camera preview.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  noPermissions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
