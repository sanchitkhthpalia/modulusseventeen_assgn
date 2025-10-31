import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, RadioButton, Text } from 'react-native-paper';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from '../context/TaskContext';

export default function AddTaskScreen() {
  const nav = useNavigation<any>();
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await addTask({ title, description, priority, deadline: deadline ? new Date(deadline).toISOString() : undefined });
      nav.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => nav.goBack()} />
        <Appbar.Content title="Add Task" />
      </Appbar.Header>
      <View style={{ padding: 16, gap: 12 }}>
        <Input label="Title" value={title} onChangeText={setTitle} />
        <Input label="Description" value={description} onChangeText={setDescription} multiline />
        <Input label="Deadline (YYYY-MM-DD)" value={deadline} onChangeText={setDeadline} placeholder="2025-12-31" />
        <Text>Priority</Text>
        <RadioButton.Group onValueChange={(v) => setPriority(v as any)} value={priority}>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <RadioButton.Item label="Low" value="Low" />
            <RadioButton.Item label="Medium" value="Medium" />
            <RadioButton.Item label="High" value="High" />
          </View>
        </RadioButton.Group>
        <Button onPress={submit} loading={loading} disabled={!title}>Save</Button>
      </View>
    </View>
  );
}


