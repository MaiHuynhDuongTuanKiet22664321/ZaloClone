import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Stack, useRouter } from 'expo-router';
import { Search, X } from 'lucide-react-native';

const MOCK_RESULTS = [
  { id: '1', name: 'Media Box', subtitle: 'Zalo Video: Mua 4 tờ vé cào...', avatar: 'https://cdn-icons-png.flaticon.com/512/5968/5968933.png' },
  { id: '2', name: 'Thời Tiết', subtitle: 'Chúc một ngày tốt lành...', avatar: 'https://cdn-icons-png.flaticon.com/512/1163/1163763.png' },
  { id: '3', name: 'Phạm Hoàng Vũ', subtitle: '[Cuộc gọi thoại đi]', avatar: 'https://i.pravatar.cc/150?u=search-3' },
];

export default function SearchScreen() {
  const router = useRouter();
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return MOCK_RESULTS;
    return MOCK_RESULTS.filter((x) => x.name.toLowerCase().includes(query));
  }, [q]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Tìm kiếm',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        }}
      />

      <View style={styles.searchWrap}>
        <Search size={18} color="#8e8e93" />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Tìm kiếm"
          placeholderTextColor="#8e8e93"
          style={styles.searchInput}
          autoFocus
        />
        {!!q && (
          <TouchableOpacity onPress={() => setQ('')} style={styles.clearBtn}>
            <X size={18} color="#8e8e93" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.sectionTitle}>Gợi ý</Text>

      <FlashList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => router.push({ pathname: '/chat/[id]', params: { id: item.id, name: item.name } })}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.rowContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {item.subtitle}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#222',
  },
  searchInput: { flex: 1, color: '#fff', fontSize: 15, marginLeft: 8 },
  clearBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { color: '#8e8e93', fontSize: 13, marginHorizontal: 16, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#222' },
  rowContent: { flex: 1, marginLeft: 12, borderBottomWidth: 0.5, borderBottomColor: '#222', paddingBottom: 12 },
  name: { color: '#fff', fontSize: 16, fontWeight: '500' },
  subtitle: { color: '#8e8e93', fontSize: 13, marginTop: 2 },
});
