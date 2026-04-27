import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

const DoctorProfileScreen = ({ navigation, route }) => {
  const { doctor } = route.params;

//   const handleBookAppointment = () => {
//     Alert.alert(
//       'Book Appointment',
//       `Booking appointment with ${doctor.name}`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Confirm',
//           onPress: () => Alert.alert('Success', 'Appointment booked successfully!'),
//         },
//       ]
//     );
//   };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* ── Doctor Card ── */}
        <View style={styles.doctorCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarIcon}>{doctor.avatar}</Text>
          </View>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.rating}>{doctor.rating}</Text>
            <Text style={styles.reviews}>({doctor.reviews} reviews)</Text>
          </View>

          <View style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.location}>{doctor.location}</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsRow}>
            {doctor.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagIcon}>
                  {tag === 'Video' ? '📹' : '🏠'}
                </Text>
                <Text style={styles.tagText}>
                  {tag === 'Video' ? 'Video Consult' : 'Home Visit'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── About ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.sectionCard}>
            <Text style={styles.aboutText}>{doctor.about}</Text>
          </View>
        </View>

        {/* ── Education ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.sectionCard}>
            <View style={styles.educationRow}>
              <Text style={styles.educationIcon}>🎓</Text>
              <View style={styles.educationInfo}>
                <Text style={styles.educationDegree}>{doctor.education}</Text>
                <Text style={styles.educationExp}>
                  {doctor.experience} years of experience
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Expertise ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expertise</Text>
          <View style={styles.chipRow}>
            {doctor.expertise.map((item, index) => (
              <View key={index} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Languages ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.chipRow}>
            {doctor.languages.map((lang, index) => (
              <View key={index} style={styles.chip}>
                <Text style={styles.chipText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Awards ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Awards & Recognition</Text>
          <View style={styles.sectionCard}>
            {doctor.awards.map((award, index) => (
              <View
                key={index}
                style={[
                  styles.awardRow,
                  index < doctor.awards.length - 1 && styles.awardBorder,
                ]}
              >
                <Text style={styles.awardIcon}>🏆</Text>
                <Text style={styles.awardText}>{award}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* ── Bottom Bar ── */}
      <View style={styles.bottomBar}>
        <View style={styles.feeSection}>
          <Text style={styles.feeLabel}>Consultation Fee</Text>
          <Text style={styles.feeAmount}>₹{doctor.fee}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('BookAppointment', { doctor })}
        >
          <Text style={styles.bookBtnText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default DoctorProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Header
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: '#1a1a1a',
  },

  // Doctor Card
  doctorCard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0faf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarIcon: {
    fontSize: 40,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 4,
  },
  star: { fontSize: 14 },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  reviews: {
    fontSize: 13,
    color: '#9ca3af',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 4,
  },
  locationIcon: { fontSize: 13 },
  location: {
    fontSize: 13,
    color: '#6b7280',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f8f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  tagIcon: { fontSize: 13 },
  tagText: {
    fontSize: 12,
    color: '#1FA77A',
    fontWeight: '500',
  },

  // Sections
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  aboutText: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 20,
  },

  // Education
  educationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  educationIcon: { fontSize: 20 },
  educationInfo: { flex: 1 },
  educationDegree: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  educationExp: {
    fontSize: 12,
    color: '#9ca3af',
  },

  // Chips
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },

  // Awards
  awardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  awardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  awardIcon: { fontSize: 18 },
  awardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  feeSection: {},
  feeLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 2,
  },
  feeAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1FA77A',
  },
  bookBtn: {
    backgroundColor: '#1FA77A',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
});