import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConsultScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🚧</Text>
      <Text style={styles.title}>Coming Soon</Text>
      <Text style={styles.subtitle}>Consult screen is under construction</Text>
    </View>
  );
};

export default ConsultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 48, marginBottom: 16 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
});