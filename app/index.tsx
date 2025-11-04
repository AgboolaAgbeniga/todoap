import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useTheme } from '../contexts/ThemeContext';
import { useTodos } from '../hooks/useTodos';
import { TodoInput } from '../components/TodoInput';
import { TodoItem } from '../components/TodoItem';
import { FilterTabs } from '../components/FilterTabs';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export default function Index() {
  const { colors, theme } = useTheme();
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
    reorderTodos,
    activeCount,
  } = useTodos();

  const renderTodo = ({ item, drag, isActive }: any) => (
    <TodoItem
      todo={item}
      onToggle={toggleTodo}
      onEdit={editTodo}
      onDelete={deleteTodo}
      drag={drag}
      isActive={isActive}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#fafafa' ? 'dark-content' : 'light-content'} />

      <View style={styles.header}>
        <Image
          source={theme === 'light' ? require('../assets/images/Light header.jpg') : require('../assets/images/dark header.png')}
          style={styles.headerBackground}
          contentFit="cover"
        />
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: 'white' }]}>TODO</Text>
          <ThemeSwitcher />
        </View>
      </View>

      <View style={styles.content}>
        <TodoInput onAddTodo={addTodo} />

        <View style={[styles.listContainer, { backgroundColor: colors.surface }]}>
          <DraggableFlatList
            data={todos}
            renderItem={renderTodo}
            keyExtractor={(item) => item._id}
            onDragEnd={({ data, from, to }) => {
              reorderTodos(from, to);
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={todos.length === 0 && styles.emptyList}
            style={styles.list}
            ListFooterComponent={
              todos.length > 0 ? (
                <View style={[styles.listFooter, { backgroundColor: colors.surface }]}>
                  <Text style={[styles.itemCount, { color: colors.textSecondary }]}>
                    {activeCount} item{activeCount !== 1 ? 's' : ''} left
                  </Text>

                  <TouchableOpacity
                    onPress={clearCompleted}
                    accessibilityLabel="Clear completed todos"
                    accessibilityRole="button"
                  >
                    <Text style={[styles.clearButton, { color: colors.textSecondary }]}>
                      Clear Completed
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null
            }
          />

          {todos.length === 0 && (
            <Text style={[styles.emptyText, { color: colors.textSecondary, paddingBottom: 20 }]}>
              No todos yet. Add one above!
            </Text>
          )}
        </View>



        <View style={[styles.filterContainer, { backgroundColor: colors.surface, borderColor: colors.border, justifyContent: 'center' }]}>
          <FilterTabs filter={filter} onFilterChange={setFilter} />
        </View>

        <Text style={[styles.instruction, { color: colors.textSecondary }]}>
          Long press to drag and reorder list
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48,
    
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    // paddingTop: ,
    // 393A4B
    marginTop: -95,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 48,
  },
  listContainer: {
    borderRadius: 5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxHeight: 400, // Fixed height to prevent pushing footer off screen
  },
  list: {
    maxHeight: 350, // Slightly less than container to account for footer
  },
  emptyList: {
    paddingVertical: 40,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  listFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    // borderTopWidth: 1,
    // borderTopColor: '#e3e4f1',
  },
  itemCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  footerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  clearButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  instruction: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 40,
    marginBottom: 20,
  },
});
