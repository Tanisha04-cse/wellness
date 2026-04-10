import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import QuickCard from '../components/QuickCards';

const QUICK_RELIEF_ITEMS = [
  { title: 'Headache', icon: '🧠' },
  { title: 'Neck Pain', icon: '⚡' },
  { title: 'Back Pain', icon: '🔥' },
  { title: 'Stress', icon: '💨' },
  { title: 'Anxiety', icon: '🫀' },
  { title: 'Sleep', icon: '😴' },
];

const WELLNESS_ITEMS = [
  { title: 'Yoga',       duration: '15 min', icon: '🧘'   },
  { title: 'Meditation', duration: '10 min', icon: '🧘‍♀️' },
  { title: 'Breathing',  duration: '5 min',  icon: '🤲'   },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1FA77A" />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.title}>M-Heal</Text>
          <Text style={styles.subtitle}>Your wellness companion</Text>

          <TouchableOpacity style={styles.banner} activeOpacity={0.9}>
            <Text style={styles.bannerIcon}>✨</Text>
            <View>
              <Text style={styles.bannerTitle}>How are you feeling today?</Text>
              <Text style={styles.bannerSub}>Let's find relief together</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Quick Relief ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Relief</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SelectSymptom')}>
             <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {QUICK_RELIEF_ITEMS.map((item, index) => (
              <QuickCard key={index} title={item.title} icon={item.icon} />
            ))}
          </View>
        </View>

        {/* ── Wellness ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Wellness</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Explore →</Text>
            </TouchableOpacity>
          </View>

          {WELLNESS_ITEMS.map((item, index) => (
            <View key={index} style={styles.wellnessRow}>
              <Text style={styles.wellnessIcon}>{item.icon}</Text>
              <View style={styles.wellnessInfo}>
                <Text style={styles.wellnessTitle}>{item.title}</Text>
                <Text style={styles.wellnessDuration}>{item.duration}</Text>
              </View>
              <TouchableOpacity style={styles.videoBtn}>
                <Text style={styles.videoBtnIcon}>🎥</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Face Glow Card */}
          <TouchableOpacity
  style={styles.faceGlowCard}
  activeOpacity={0.85}
  onPress={() => navigation.navigate('FaceGlow')}
>
            <View style={styles.faceGlowLeft}>
              <View style={styles.faceGlowIconCircle}>
                <Text style={{ fontSize: 22 }}>✨</Text>
              </View>
              <View>
                <Text style={styles.faceGlowTitle}>Face Glow</Text>
                <Text style={styles.faceGlowSub}>Radiant skin routine</Text>
              </View>
            </View>
            <Text style={styles.faceGlowArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* ── Book a Consultation ── */}
        <TouchableOpacity style={styles.consultBanner} activeOpacity={0.88}>
          <View style={styles.consultLeft}>
            <Text style={styles.consultIcon}>📅</Text>
            <View>
              <Text style={styles.consultTitle}>Book a Consultation</Text>
              <Text style={styles.consultSub}>Connect with expert doctors</Text>
            </View>
          </View>
          <View style={styles.consultArrowCircle}>
            <Text style={styles.consultArrow}>→</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1FA77A',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginBottom: 16,
  },
  banner: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bannerIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  bannerTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  bannerSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },
  seeAll: {
    fontSize: 13,
    color: '#1FA77A',
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wellnessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  wellnessIcon: {
    fontSize: 26,
    marginRight: 12,
  },
  wellnessInfo: {
    flex: 1,
  },
  wellnessTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  wellnessDuration: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  videoBtn: {
    backgroundColor: '#e8f8f2',
    borderRadius: 10,
    padding: 8,
  },
  videoBtnIcon: {
    fontSize: 16,
  },
  faceGlowCard: {
    backgroundColor: '#fdf0f5',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  faceGlowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faceGlowIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e8a0c0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  faceGlowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  faceGlowSub: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  faceGlowArrow: {
    fontSize: 18,
    color: '#d4789a',
  },
  consultBanner: {
    backgroundColor: '#1FA77A',
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 10,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  consultLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  consultIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  consultTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  consultSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  consultArrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  consultArrow: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});