import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuickCard = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.boxTitle}>{title}</Text>
      <Text style={styles.boxSub}>Instant relief</Text>
    </TouchableOpacity>
  );
};

export default QuickCard;

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: '47%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: {
    fontSize: 28,
    marginBottom: 10,
  },
  boxTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  boxSub: {
    fontSize: 12,
    color: '#9ca3af',
  },
});