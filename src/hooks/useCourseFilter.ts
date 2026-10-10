import { useState, useEffect } from 'react';

export interface FilterableItem {
  id: number;
  name: string;
  description?: string | null;
  is_published?: boolean;
}

export function useCourseFilter<T extends FilterableItem>(
  items: T[],
  initialSearch = '',
  initialShowOnlyPublished = true
) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showOnlyPublished, setShowOnlyPublished] = useState(initialShowOnlyPublished);
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  useEffect(() => {
    let filtered = items;

    // Filter by published status
    if (showOnlyPublished) {
      filtered = filtered.filter(item => item.is_published !== false);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      );
    }

    setFilteredItems(filtered);
  }, [items, searchQuery, showOnlyPublished]);

  return {
    filteredItems,
    searchQuery,
    setSearchQuery,
    showOnlyPublished,
    setShowOnlyPublished,
  };
}
