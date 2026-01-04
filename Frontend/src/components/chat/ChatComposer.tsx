import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Send } from 'lucide-react-native';

export function ChatComposer({
  value,
  onChangeText,
  onSend,
}: {
  value: string;
  onChangeText: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <View style={styles.composer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Nhắn tin"
        placeholderTextColor="#8e8e93"
        style={styles.input}
        multiline
      />
      <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
        <Send size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  composer: {
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#222',
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#222',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0091ff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
