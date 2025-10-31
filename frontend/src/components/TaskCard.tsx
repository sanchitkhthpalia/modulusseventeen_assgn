import React from 'react';
import { List, IconButton } from 'react-native-paper';
import { Task } from '../types';

export default function TaskCard({ task, onToggle, onPressDelete, onPress }: {
  task: Task;
  onToggle: () => void;
  onPressDelete: () => void;
  onPress: () => void;
}) {
  return (
    <List.Item
      title={task.title}
      description={`${task.priority}${task.deadline ? ' • due ' + new Date(task.deadline).toLocaleDateString() : ''}`}
      onPress={onPress}
      left={() => (
        <IconButton icon={task.completed ? 'checkbox-marked' : 'checkbox-blank-outline'} onPress={onToggle} />
      )}
      right={() => <IconButton icon="delete" onPress={onPressDelete} />}
    />
  );
}


