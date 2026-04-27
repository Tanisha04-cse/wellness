import { useState, useEffect, useCallback } from 'react';
import { DOCTORS, FILTER_TABS } from '../data/consultData';

const PAGE_SIZE = 10;

const useDoctors = () => {
  const [doctors, setDoctors]           = useState([]);
  const [filterTabs, setFilterTabs]     = useState([]);
  const [isLoading, setIsLoading]       = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError]               = useState(null);
  const [page, setPage]                 = useState(1);
  const [hasMore, setHasMore]           = useState(true);

  const fetchDoctors = useCallback(async (pageNum = 1, isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else           setIsLoading(true);
    setError(null);

    try {
      // ── API CALL (uncomment when ready) ──────────────────────────────────
      // const response = await fetch(
      //   `https://your-api.com/api/doctors?page=${pageNum}&limit=${PAGE_SIZE}`
      // );
      // if (!response.ok) throw new Error(`Server error: ${response.status}`);
      // const json = await response.json();
      //
      // const newDoctors = json.data.doctors;        // array of doctor objects
      // const tabs       = json.data.filterTabs;     // array of { id, label }
      // const totalCount = json.data.total;          // total number of doctors
      //
      // setDoctors(prev =>
      //   isRefresh || pageNum === 1 ? newDoctors : [...prev, ...newDoctors]
      // );
      // setFilterTabs(tabs);
      // setHasMore(pageNum * PAGE_SIZE < totalCount);
      // setPage(pageNum);
      // ─────────────────────────────────────────────────────────────────────

      // ── Fallback: local data from consultData.js ─────────────────────────
      const start      = (pageNum - 1) * PAGE_SIZE;
      const newDoctors = DOCTORS.slice(start, start + PAGE_SIZE);
      const more       = start + PAGE_SIZE < DOCTORS.length;

      setDoctors(prev =>
        isRefresh || pageNum === 1 ? newDoctors : [...prev, ...newDoctors]
      );
      setFilterTabs(FILTER_TABS);
      setHasMore(more);
      setPage(pageNum);
      // ─────────────────────────────────────────────────────────────────────
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors(1);
  }, [fetchDoctors]);

  const loadMore = useCallback(() => {
    if (!isLoading && !isRefreshing && hasMore) {
      fetchDoctors(page + 1);
    }
  }, [isLoading, isRefreshing, hasMore, page, fetchDoctors]);

  const refresh = useCallback(() => {
    fetchDoctors(1, true);
  }, [fetchDoctors]);

  const retry = useCallback(() => {
    fetchDoctors(1);
  }, [fetchDoctors]);

  return {
    doctors,
    filterTabs,
    isLoading,
    isRefreshing,
    error,
    hasMore,
    loadMore,
    refresh,
    retry,
  };
};

export default useDoctors;
