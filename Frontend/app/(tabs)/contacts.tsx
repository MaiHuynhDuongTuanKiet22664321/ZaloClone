import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Search, UserPlus, Users } from 'lucide-react-native';

const MOCK_CONTACTS = [
  { id: '1', name: 'Hoàng Vũ', subtitle: 'Đang hoạt động', avatar: 'https://i.pravatar.cc/150?u=contact-1' },
  { id: '2', name: 'Thái', subtitle: 'Vừa truy cập', avatar: 'https://i.pravatar.cc/150?u=contact-2' },
  { id: '3', name: 'Minh', subtitle: 'Online', avatar: 'https://i.pravatar.cc/150?u=contact-3' },
  { id: '4', name: 'Huỳnh ', subtitle: 'Đang hoạt động', avatar: 'https://i.pravatar.cc/150?u=contact-4' },
];

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh bạ</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Users size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <UserPlus size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <Search size={18} color="#8e8e93" />
        <TextInput placeholder="Tìm kiếm" placeholderTextColor="#8e8e93" style={styles.searchInput} />
      </View>

      <FlashList
        data={MOCK_CONTACTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}>
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
  header: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  headerActions: { flexDirection: 'row', gap: 10 },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#262626',
  },
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
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#222' },
  rowContent: { flex: 1, marginLeft: 12, borderBottomWidth: 0.5, borderBottomColor: '#222', paddingBottom: 12 },
  name: { color: '#fff', fontSize: 16, fontWeight: '500' },
  subtitle: { color: '#8e8e93', fontSize: 13, marginTop: 2 },
});
