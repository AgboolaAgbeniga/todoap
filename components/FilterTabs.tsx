import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { FilterType } from '../hooks/useTodos';

interface FilterTabsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ filter, onFilterChange }) => {
  const { colors } = useTheme();

  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {filters.map((filterType) => {
        const isActive = filter === filterType;

        return (
          <TouchableOpacity
            key={filterType}
            style={styles.tab}
            onPress={() => onFilterChange(filterType)}
            accessibilityLabel={`Filter ${filterType} todos`}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: isActive ? '#3A7CFD' : colors.textSecondary,
                },
              ]}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: ,
    borderRadius: 8,
    
  },
  tab: {
    paddingHorizontal: 16,
    // paddingVertical: 8,
    marginHorizontal: 4,
    flexDirection: 'row',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
