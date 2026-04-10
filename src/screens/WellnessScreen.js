import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { WELLNESS_STATS, WELLNESS_PROGRAMS } from '../data/wellnessData';

const LEVEL_COLORS = {
  'Beginner':     { bg: '#e8f5e9', text: '#2e7d32' },
  'All levels':   { bg: '#e3f2fd', text: '#1565c0' },
  'Intermediate': { bg: '#fff3e0', text: '#e65100' },
};

const WellnessScreen = () => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#7C3AED" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wellness</Text>
          <Text style={styles.headerSubtitle}>
            Daily routines for a healthier you
          </Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={[styles.statBox, styles.statBorder]}>
              <Text style={styles.statIcon}>🎯</Text>
              <Text style={styles.statValue}>{WELLNESS_STATS.sessions}</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={[styles.statBox, styles.statBorder]}>
              <Text style={styles.statIcon}>⏱️</Text>
              <Text style={styles.statValue}>{WELLNESS_STATS.minutes}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text style={styles.statValue}>{WELLNESS_STATS.streak}</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </View>
        </View>

        {/* ── Programs ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Programs</Text>
            <View style={styles.popularBadge}>
              <Text style={styles.popularText}>↑ Popular</Text>
            </View>
          </View>

          {WELLNESS_PROGRAMS.map((program) => (
            <View
              key={program.id}
              style={[styles.programCard, { backgroundColor: program.bgColor }]}
            >
              <View style={styles.programTop}>
                {/* Icon */}
                <Text style={styles.programIcon}>{program.icon}</Text>

                {/* Info */}
                <View style={styles.programInfo}>
                  <Text style={styles.programTitle}>{program.title}</Text>
                  <Text style={styles.programSubtitle}>{program.subtitle}</Text>

                  {/* Meta row */}
                  <View style={styles.metaRow}>
                    <Text style={styles.metaDuration}>🕐 {program.duration}</Text>
                    <View style={[
                      styles.levelBadge,
                      { backgroundColor: LEVEL_COLORS[program.level]?.bg || '#f3f4f6' }
                    ]}>
                      <Text style={[
                        styles.levelText,
                        { color: LEVEL_COLORS[program.level]?.text || '#6b7280' }
                      ]}>
                        {program.level}
                      </Text>
                    </View>
                    <Text style={styles.metaCompleted}>
                      {program.completed} completed
                    </Text>
                  </View>
                </View>

                {/* Play Button */}
                <TouchableOpacity
                  style={styles.playBtn}
                  activeOpacity={0.8}
                  // Later: onPress={() => navigation.navigate('ProgramDetail', { program })}
                >
                  <Text style={styles.playIcon}>▶</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

export default WellnessScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Header
  header: {
    backgroundColor: '#7C3AED',
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
    marginBottom: 20,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.3)',
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },

  // Section
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  popularBadge: {
    backgroundColor: '#f0faf6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  popularText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1FA77A',
  },

  // Program Cards
  programCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  programTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  programIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  programInfo: {
    flex: 1,
  },
  programTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  programSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaDuration: {
    fontSize: 12,
    color: '#6b7280',
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 11,
    fontWeight: '600',
  },
  metaCompleted: {
    fontSize: 12,
    color: '#6b7280',
  },

  // Play Button
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  playIcon: {
    fontSize: 14,
    color: '#7C3AED',
  },
});