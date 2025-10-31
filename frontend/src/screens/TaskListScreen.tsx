import React from 'react';
import { View } from 'react-native';
import { Appbar, SegmentedButtons, Menu, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TaskContext';

export default function TaskListScreen() {
  const nav = useNavigation<any>();
  const { tasks, loading, updateTask, deleteTask, setSortBy, setFilter } = useTasks();
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Tasks" />
        <Appbar.Action icon="plus" onPress={() => nav.navigate('AddTask')} />
        <Appbar.Action icon="account" onPress={() => nav.navigate('Profile')} />
        <Menu visible={menuVisible} onDismiss={() => setMenuVisible(false)} anchor={<Appbar.Action icon="filter" onPress={() => setMenuVisible(true)} />}>
          <Menu.Item onPress={() => setFilter({ status: 'all' })} title="All" />
          <Menu.Item onPress={() => setFilter({ status: 'pending' })} title="Pending" />
          <Menu.Item onPress={() => setFilter({ status: 'completed' })} title="Completed" />
        </Menu>
      </Appbar.Header>

      <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
        <SegmentedButtons
          value={''}
          onValueChange={(v) => setSortBy((v as any) || 'createdAt')}
          buttons={[
            { value: 'createdAt', label: 'Created' },
            { value: 'deadline', label: 'Deadline' },
            { value: 'priority', label: 'Priority' }
          ]}
        />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : (
        <View>
          {tasks.map((t) => (
            <TaskCard
              key={t._id}
              task={t}
              onToggle={() => updateTask(t._id, { completed: !t.completed })}
              onPressDelete={() => deleteTask(t._id)}
              onPress={() => nav.navigate('TaskDetail', { id: t._id })}
            />
          ))}
        </View>
      )}
    </View>
  );
}


