import React, { useMemo, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import type { ChatMessage } from '@/src/types/chat';
import { MessageBubble } from '@/src/components/chat/MessageBubble';
import { ChatComposer } from '@/src/components/chat/ChatComposer';

export default function ChatDetailScreen() {
  const params = useLocalSearchParams<{ id?: string; name?: string }>();

  const title = useMemo(() => {
    if (typeof params?.name === 'string' && params.name.trim().length > 0) return params.name;
    return 'Trò chuyện';
  }, [params?.name]);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'm1', text: 'Chào bạn, mình có thể giúp gì?', fromMe: false, time: '09:00' },
    { id: 'm2', text: 'Mình đang làm app Zalo bằng Expo Router.', fromMe: true, time: '09:01' },
    { id: 'm3', text: 'Ok, mình gửi UI cơ bản nhé.', fromMe: false, time: '09:02' },
  ]);

  const onSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), text: trimmed, fromMe: true, time: '' },
    ]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title,
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        }}
      />

      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlashList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <MessageBubble item={item} />}
        />

        <ChatComposer value={input} onChangeText={setInput} onSend={onSend} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  body: { flex: 1 },
  listContent: { paddingHorizontal: 12, paddingVertical: 10 },
});
