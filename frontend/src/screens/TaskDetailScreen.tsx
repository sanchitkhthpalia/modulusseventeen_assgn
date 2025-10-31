import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Appbar, Checkbox, Text } from 'react-native-paper';
import Input from '../components/Input';
import Button from '../components/Button';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTasks } from '../context/TaskContext';

export default function TaskDetailScreen() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const { tasks, updateTask, deleteTask } = useTasks();
  const task = useMemo(() => tasks.find((t) => t._id === route.params?.id), [tasks, route.params]);
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  if (!task) return null;

  const save = async () => {
    await updateTask(task._id, { title, description });
    nav.goBack();
  };

  const toggle = async () => {
    await updateTask(task._id, { completed: !task.completed });
  };

  const onDelete = async () => {
    await deleteTask(task._id);
    nav.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => nav.goBack()} />
        <Appbar.Content title="Task" />
        <Appbar.Action icon="delete" onPress={onDelete} />
      </Appbar.Header>
      <View style={{ padding: 16, gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Checkbox status={task.completed ? 'checked' : 'unchecked'} onPress={toggle} />
          <Text>{task.completed ? 'Completed' : 'Pending'}</Text>
        </View>
        <Input label="Title" value={title} onChangeText={setTitle} />
        <Input label="Description" value={description} onChangeText={setDescription} multiline />
        <Button onPress={save} disabled={!title}>Save</Button>
      </View>
    </View>
  );
}


