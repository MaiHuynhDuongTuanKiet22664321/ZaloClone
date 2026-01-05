import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Video, CircleDollarSign, ShoppingBag, Newspaper, Gamepad2, MapPin, Sparkles } from 'lucide-react-native';
import CardFeatures from '@/src/components/discovery/cardFeatures';
import { DiscoverySearchHeader } from '@/src/components/discovery/discoverySearchHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const FEATURES = [
  { id: '1', title: 'Zalo Video', icon: Video, description: 'Xem video tuyệt vời' },
  { id: '2', title: 'ZaloPay', icon: CircleDollarSign, description: 'Thanh toán nhanh chóng' },
  { id: '3', title: 'Mua sắm', icon: ShoppingBag, description: 'Mua sắm trực tuyến' },
  { id: '4', title: 'Tin tức', icon: Newspaper, description: 'Cập nhật tin tức mới nhất' },
  { id: '5', title: 'Game', icon: Gamepad2, description: 'Chơi game hấp dẫn' },
  { id: '6', title: 'Gần đây', icon: MapPin, description: 'Vị trí gần đây' },
  { id: '7', title: 'Đề xuất', icon: Sparkles, description: 'Đề xuất cho bạn' },
  { id: '8', title: 'Zalo Mini App', icon: Sparkles, description: 'Trải nghiệm mini app mới' },
  { id: '9', title: 'Zalo Live', icon: Video, description: 'Xem live stream hấp dẫn' },
  { id: '10', title: 'Zalo Community', icon: Sparkles, description: 'Tham gia cộng đồng' },
  { id: '11', title: 'Zalo Groups', icon: Sparkles, description: 'Tham gia nhóm' },
  { id: '12', title: 'Zalo Events', icon: Sparkles, description: 'Tham gia sự kiện' },

];

export default function DiscoveryScreen() {



  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
    <View style={styles.container}>

      <DiscoverySearchHeader onPressSearch={() => { }} />

      <FlashList
        data={FEATURES}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => <CardFeatures FEATURES={item} />}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  safeArea: { flex: 1 ,
    backgroundColor: '#000',
  },
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
