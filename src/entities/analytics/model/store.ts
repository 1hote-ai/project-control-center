import { create } from 'zustand'
import type { FilterState, PaginationState, SortState } from '@/shared/types'

type ActivityPeriod = 7 | 30 | 90

interface AnalyticsStore {
  activityPeriod: ActivityPeriod
  filters: FilterState
  pagination: PaginationState
  sort: SortState
  selectedRows: string[]
  setActivityPeriod: (period: ActivityPeriod) => void
  setFilters: (filters: Partial<FilterState>) => void
  setPagination: (pagination: Partial<PaginationState>) => void
  setSort: (sort: SortState) => void
  toggleRowSelection: (id: string) => void
  selectAllRows: (ids: string[]) => void
  clearSelection: () => void
  resetFilters: () => void
}

const initialFilters: FilterState = {
  userId: null,
  dateRange: null,
  priority: null,
  status: null,
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  activityPeriod: 30,
  filters: { ...initialFilters },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
  sort: {
    field: 'tasksCompleted',
    direction: 'desc',
  },
  selectedRows: [],
  setActivityPeriod: (period) => set({ activityPeriod: period }),
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
  })),
  setPagination: (pagination) => set((state) => ({
    pagination: { ...state.pagination, ...pagination },
  })),
  setSort: (sort) => set({ sort }),
  toggleRowSelection: (id) => set((state) => {
    const isSelected = state.selectedRows.includes(id)
    return {
      selectedRows: isSelected
        ? state.selectedRows.filter((rId) => rId !== id)
        : [...state.selectedRows, id],
    }
  }),
  selectAllRows: (ids) => set({ selectedRows: ids }),
  clearSelection: () => set({ selectedRows: [] }),
  resetFilters: () => set({ filters: { ...initialFilters } }),
}))
