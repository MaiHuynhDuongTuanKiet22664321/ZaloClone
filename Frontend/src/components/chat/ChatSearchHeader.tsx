import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Search, Plus, QrCode } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export function ChatSearchHeader({
  onPressSearch,
}: {
  onPressSearch: () => void;
}) {
    const router = useRouter();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPressSearch}>
        <Search size={20} color="#fff" style={styles.searchIcon} />
      </TouchableOpacity>
      <TextInput
        placeholder="Tìm kiếm"
        placeholderTextColor="#8e8e93"
        style={styles.searchInput}
        showSoftInputOnFocus={false}
        onFocus={onPressSearch}
      />
      <QrCode size={22} color="#fff" style={styles.iconRight} onPress={() => router.push('/scanner')}/>
      <Plus size={26} color="#fff" style={styles.iconRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#1a1a1a',
  },
  searchIcon: { marginRight: 2 },
  searchInput: { flex: 1, color: '#fff', fontSize: 16, marginLeft: 10 },
  iconRight: { marginLeft: 20 },
});
