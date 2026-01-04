import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Video, ShoppingBag, Newspaper, Gamepad2, CircleDollarSign, MapPin } from 'lucide-react-native';

const FEATURES = [
  { id: '1', title: 'Zalo Video', icon: Video },
  { id: '2', title: 'ZaloPay', icon: CircleDollarSign },
  { id: '3', title: 'Mua sắm', icon: ShoppingBag },
  { id: '4', title: 'Tin tức', icon: Newspaper },
  { id: '5', title: 'Game', icon: Gamepad2 },
  { id: '6', title: 'Gần đây', icon: MapPin },
];

export default function DiscoveryScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Khám phá</Text>
      </View>

      <FlashList
        data={FEATURES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity style={styles.card}>
              <View style={styles.iconWrap}>
                <Icon size={22} color="#0091ff" />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
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
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  grid: { padding: 12 },
  card: {
    flex: 1,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 16,
    padding: 14,
    margin: 8,
    minHeight: 96,
    justifyContent: 'center',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#0e2236',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: '500' },
});
