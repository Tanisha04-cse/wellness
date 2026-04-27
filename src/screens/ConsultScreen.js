import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
// @ts-ignore
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import useDoctors from '../hooks/useDoctors';

// ── Shared header markup reused in loading/error states ──────────────────────
const ScreenHeader = ({ searchQuery, onChangeText, onClear, editable = true }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Book Consultation</Text>
    <Text style={styles.headerSubtitle}>Connect with expert doctors</Text>
    <View style={styles.searchContainer}>
      <MCIcon name="magnify" size={20} color="#9ca3af" style={{ marginRight: 8 }} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search doctors, specialties..."
        placeholderTextColor="#9ca3af"
        value={searchQuery}
        onChangeText={onChangeText}
        editable={editable}
      />
      {editable && searchQuery?.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <MCIcon name="close" size={18} color="#9ca3af" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const ConsultScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery]   = useState('');

  const {
    doctors,
    filterTabs,
    isLoading,
    isRefreshing,
    error,
    hasMore,
    loadMore,
    refresh,
    retry,
  } = useDoctors();

  // ── Client-side filtering on the loaded data ──────────────────────────────
  const filteredDoctors = doctors.filter(doctor => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      doctor.name.toLowerCase().includes(q) ||
      doctor.specialty.toLowerCase().includes(q) ||
      doctor.location.toLowerCase().includes(q);

    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Available Today' && doctor.availableToday) ||
      (activeFilter === 'Video Call'      && doctor.tags.includes('Video')) ||
      (activeFilter === 'Home Visit'      && doctor.tags.includes('Home Visit')) ||
      (activeFilter === 'Top Rated'       && doctor.rating >= 4.9);

    return matchesSearch && matchesFilter;
  });

  // ── Doctor card ───────────────────────────────────────────────────────────
  const renderDoctorCard = ({ item: doctor }) => (
    <TouchableOpacity
      style={styles.doctorCard}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('DoctorProfile', { doctor })}
    >
      <View style={styles.doctorTop}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarIcon}>{doctor.avatar}</Text>
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>

          <View style={styles.ratingRow}>
            <MCIcon name="star" size={14} color="#f59e0b" />
            <Text style={styles.rating}> {doctor.rating}</Text>
            <Text style={styles.reviews}> ({doctor.reviews})</Text>
            <Text style={styles.separator}>  •  </Text>
            <Text style={styles.experience}>{doctor.experience} years</Text>
          </View>

          <View style={styles.locationRow}>
            <MCIcon name="map-marker-outline" size={13} color="#9ca3af" />
            <Text style={styles.location}> {doctor.location}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tagsRow}>
        {doctor.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <MCIcon
              name={tag === 'Video' ? 'video-outline' : 'home-outline'}
              size={13}
              color="#6b7280"
            />
            <Text style={styles.tagText}> {tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.feeLabel}>Consultation fee</Text>
          <Text style={styles.feeAmount}>₹{doctor.fee}</Text>
        </View>
        <View style={[
          styles.availabilityBadge,
          doctor.availableToday ? styles.availableTodayBadge : styles.availableTomorrowBadge,
        ]}>
          <Text style={[
            styles.availabilityText,
            doctor.availableToday ? styles.availableTodayText : styles.availableTomorrowText,
          ]}>
            {doctor.availability}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // ── Pagination footer (spinner while loading next page) ───────────────────
  const renderFooter = () => {
    if (!isLoading || doctors.length === 0) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#1FA77A" />
      </View>
    );
  };

  // ── Empty list (after filtering) ──────────────────────────────────────────
  const renderEmpty = () => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyState}>
        <MCIcon name="doctor" size={60} color="#d1d5db" />
        <Text style={styles.emptyTitle}>No doctors found</Text>
        <Text style={styles.emptySubtitle}>Try a different search or filter</Text>
      </View>
    );
  };

  // ── Full-screen initial loading ───────────────────────────────────────────
  if (isLoading && doctors.length === 0) {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor="#1FA77A" />
        <ScreenHeader editable={false} />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#1FA77A" />
          <Text style={styles.loadingText}>Loading doctors...</Text>
        </View>
      </View>
    );
  }

  // ── Full-screen error ─────────────────────────────────────────────────────
  if (error && doctors.length === 0) {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="light-content" backgroundColor="#1FA77A" />
        <ScreenHeader editable={false} />
        <View style={styles.centered}>
          <MCIcon name="alert-circle-outline" size={60} color="#ef4444" />
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorSubtitle}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={retry} activeOpacity={0.85}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Main screen ───────────────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#1FA77A" />

      <ScreenHeader
        searchQuery={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />

      {/* ── Filter Tabs ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {filterTabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.filterTab, activeFilter === tab.label && styles.filterTabActive]}
            onPress={() => setActiveFilter(tab.label)}
          >
            <Text style={[styles.filterTabText, activeFilter === tab.label && styles.filterTabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Doctor List ── */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={item => item.id}
        renderItem={renderDoctorCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refresh}
            colors={['#1FA77A']}
            tintColor="#1FA77A"
          />
        }
      />
    </View>
  );
};

export default ConsultScreen;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f5f5f5' },

  // Header
  header: {
    backgroundColor: '#1FA77A',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
    padding: 0,
  },

  // Filter Tabs
  filterScroll: {
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: '#f5f5f5',
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  filterTabActive: {
    backgroundColor: '#1FA77A',
    borderColor: '#1FA77A',
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  filterTabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  // Doctor List
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 30,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  // Doctor Top
  doctorTop: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#f0faf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarIcon: { fontSize: 30 },
  doctorInfo: { flex: 1 },
  doctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  reviews: {
    fontSize: 12,
    color: '#9ca3af',
  },
  separator: {
    fontSize: 12,
    color: '#d1d5db',
  },
  experience: {
    fontSize: 12,
    color: '#9ca3af',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: '#6b7280',
  },

  // Tags
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },

  // Divider & Footer
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feeLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginBottom: 2,
  },
  feeAmount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1FA77A',
  },
  availabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  availableTodayBadge:    { backgroundColor: '#e8f8f2' },
  availableTomorrowBadge: { backgroundColor: '#f3f4f6' },
  availabilityText:       { fontSize: 12, fontWeight: '600' },
  availableTodayText:     { color: '#1FA77A' },
  availableTomorrowText:  { color: '#6b7280' },

  // Centered (loading / error full-screen)
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 14,
    fontSize: 14,
    color: '#6b7280',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 16,
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryBtn: {
    backgroundColor: '#1FA77A',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  retryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },

  // Pagination footer loader
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
