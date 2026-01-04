import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ChatMessage } from '@/src/types/chat';

export function MessageBubble({ item }: { item: ChatMessage }) {
  return (
    <View style={[styles.bubbleRow, item.fromMe ? styles.rowRight : styles.rowLeft]}>
      <View style={[styles.bubble, item.fromMe ? styles.bubbleMe : styles.bubbleOther]}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleRow: { marginVertical: 6, flexDirection: 'row' },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 16,
    borderWidth: 1,
  },
  bubbleOther: { backgroundColor: '#121212', borderColor: '#222' },
  bubbleMe: { backgroundColor: '#0b5cff', borderColor: '#0b5cff' },
  text: { fontSize: 14.5, lineHeight: 19, color: '#fff' },
});
