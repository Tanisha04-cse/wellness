import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { RELIEF_ITEMS } from '../data/reliefData';

const ReliefScreen = () => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1FA77A" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Quick Relief</Text>
          <Text style={styles.headerSubtitle}>
            Instant acupressure therapy for common issues
          </Text>
        </View>

        {/* ── Grid ── */}
        <View style={styles.grid}>
          {RELIEF_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, { backgroundColor: item.bgColor }]}
              activeOpacity={0.8}
              // Later: onPress={() => navigation.navigate('ReliefDetail', { item })}
            >
              {/* Icon */}
              <Text style={styles.cardIcon}>{item.icon}</Text>

              {/* Title + Subtitle */}
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>

              {/* Sessions + Arrow */}
              <View style={styles.cardFooter}>
                <Text style={[styles.sessions, { color: item.iconColor }]}>
                  {item.sessions} sessions
                </Text>
                <Text style={[styles.arrow, { color: item.iconColor }]}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

export default ReliefScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Header
  header: {
    backgroundColor: '#1FA77A',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  card: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sessions: {
    fontSize: 12,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 16,
    fontWeight: '600',
  },
});