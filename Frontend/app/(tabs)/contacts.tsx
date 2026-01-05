import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Cake, Phone, UserPlus, Users } from 'lucide-react-native';
import { Colors } from '../../src/constants/Colors';
import { ContactsSearchHeader } from '@/src/components/contacts/contactsSearchHeader';
// 1. Tách Data ra ngoài để tránh khởi tạo lại
const DATA_FRIENDS = [
  { id: '1', name: 'Hoàng Vũ', subtitle: 'Đang hoạt động', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Thái', subtitle: 'Vừa truy cập', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Phạm Hoàng Vũ', subtitle: 'Đang hoạt động', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Tấn Minh', subtitle: 'Không hoạt động', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'Tấn Minh', subtitle: 'Không hoạt động', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: '6', name: 'Tấn Minh', subtitle: 'Không hoạt động', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: '7', name: 'Tấn Minh', subtitle: 'Không hoạt động', avatar: 'https://i.pravatar.cc/150?u=7' },
];
const DATA_GROUPS = [
  { id: 'g1', name: 'Nhóm Gia Đình', subtitle: '4 thành viên', avatar: 'https://i.pravatar.cc/150?u=g1' },
  { id: 'g2', name: 'Dự Án Zalo 2026', subtitle: '10 thành viên', avatar: 'https://i.pravatar.cc/150?u=g2' },
  { id: 'g3', name: 'Dự Án Zalo 2026', subtitle: '10 thành viên', avatar: 'https://i.pravatar.cc/150?u=g2' },
  { id: 'g4', name: 'Dự Án Zalo 2026', subtitle: '10 thành viên', avatar: 'https://i.pravatar.cc/150?u=g2' },
  { id: 'g5', name: 'Dự Án Zalo 2026', subtitle: '10 thành viên', avatar: 'https://i.pravatar.cc/150?u=g2' },
];



const DATA_OA = [
  { id: 'oa1', name: 'Thời Tiết', subtitle: 'Tài khoản chính thức', avatar: 'https://i.pravatar.cc/150?u=oa1' },
  { id: 'oa2', name: 'Thời Tiết', subtitle: 'Tài khoản chính thức', avatar: 'https://i.pravatar.cc/150?u=oa1' },
  { id: 'oa3', name: 'Thời Tiết', subtitle: 'Tài khoản chính thức', avatar: 'https://i.pravatar.cc/150?u=oa1' },
  { id: 'oa4', name: 'Thời Tiết', subtitle: 'Tài khoản chính thức', avatar: 'https://i.pravatar.cc/150?u=oa1' },
  { id: 'oa5', name: 'Thời Tiết', subtitle: 'Tài khoản chính thức', avatar: 'https://i.pravatar.cc/150?u=oa1' },
];

export default function ContactsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const tabs = ['Bạn bè', 'Nhóm', 'OA'];

  // 3. Dùng useMemo để tính toán data, tránh tính toán lại thừa thãi
  const currentData = useMemo(() => {
    let baseData = activeTab === 0 ? DATA_FRIENDS : activeTab === 1 ? DATA_GROUPS : DATA_OA;
    if (activeTab === 0 && filterType === 'recent') {
      return baseData.filter(item => item.subtitle === 'Vừa truy cập' || item.subtitle === 'Đang hoạt động');
    }
    return baseData;
  }, [activeTab, filterType]);


  const ContactItem = React.memo(function ContactItem({ item }: any) {
    const isOnline = item.subtitle === 'Vừa truy cập' || item.subtitle === 'Đang hoạt động' || item.subtitle === 'Online';

    return (
      <TouchableOpacity style={styles.row} activeOpacity={0.7}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          {/* Fix logic: Chấm xanh hiện ở tab Bạn bè khi online */}
          {isOnline && <View style={styles.onlineDot} />}
        </View>

        <View style={styles.rowContent}>
          <View style={styles.textWrapper}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {item.subtitle}
            </Text>
          </View>
          {activeTab === 0 && (
            <TouchableOpacity style={styles.callButton}>
              <Phone size={20} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  });

  ContactItem.displayName = 'ContactItem';

  const renderListHeader = () => {
    if (activeTab === 0) {
      return (
        <View style={styles.staticMenu}>
          <MenuOption icon={<Users size={22} color="#fff" />} title="Lời mời kết bạn" />
          <MenuOption icon={<Cake size={22} color="#fff" />} title="Sinh nhật" />

          <View style={styles.dividerSection} />

          <View style={styles.filterChipContainer}>
            <FilterChip
              label="Tất cả"
              count={DATA_FRIENDS.length}
              isActive={filterType === 'all'}
              onPress={() => setFilterType('all')}
            />
            <FilterChip
              label="Mới truy cập"
              count={DATA_FRIENDS.filter(i => i.subtitle === 'Vừa truy cập' || i.subtitle === 'Đang hoạt động').length}
              isActive={filterType === 'recent'}
              onPress={() => setFilterType('recent')}
            />
          </View>
        </View>
      );
    }
    if (activeTab === 1) {
      return (
        <View style={styles.staticMenu}>
          <MenuOption icon={<UserPlus size={22} color="#fff" />} title="Tạo nhóm mới" />
          <View style={styles.dividerSection} />
          <View
            style={styles.chip}
          >
            <Text style={styles.ChipTextGroup}>Nhóm đang tham gia ({DATA_GROUPS.length})</Text>
          </View>
        </View>
      )
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
    <View style={styles.container}>
      <ContactsSearchHeader onPressSearch={() => router.push('/search')} />

      <View style={styles.tabWrapper}>
        {tabs.map((tab, index) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(index)} style={styles.tabItem}>
            <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>{tab}</Text>
            {activeTab === index && <View style={styles.activeLine} />}
          </TouchableOpacity>
        ))}
      </View>

      <FlashList
        data={currentData}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderListHeader}
        renderItem={({ item }) => <ContactItem item={item} />}
      />
    </View>
    </SafeAreaView>
  );
}

const MenuOption = ({ icon, title }: any) => (
  <TouchableOpacity style={styles.staticItem}>
    <View style={styles.iconContainer}>{icon}</View>
    <Text style={styles.staticText}>{title}</Text>
  </TouchableOpacity>
);

const FilterChip = ({ label, count, isActive, onPress }: any) => (
  <TouchableOpacity
    style={[styles.chip, isActive ? styles.activeChip : styles.inactiveChip]}
    onPress={onPress}
  >
    <Text style={isActive ? styles.activeChipText : styles.inactiveChipText}>{label}</Text>
    <Text style={[styles.activeChipCount, !isActive && { color: '#8e8e93' }]}>({count})</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { 
        flex: 1, 
        backgroundColor: '#000'
    },
  container: { flex: 1, backgroundColor: '#000' },
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  avatarContainer: {
    position: 'relative', // Quan trọng để chấm xanh căn theo avatar
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50', // Màu xanh lá hoạt động
    borderWidth: 2,
    borderColor: '#000', // Viền đen để tách biệt với avatar
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row', // Để chữ và icon call nằm ngang
    alignItems: 'center',
    marginLeft: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#222',
    paddingBottom: 10,
  },
  textWrapper: {
    flex: 1, // Để phần chữ chiếm hết khoảng trống giữa
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    color: '#8E8E93',
    fontSize: 13,
    marginTop: 2,
  },
  callButton: {
    padding: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#8E8E93', // Màu xám cho tab chưa chọn
    fontWeight: '500',
  },
  activeTabText: {
    color: '#ffffffff', // Màu trắng cho tab đang chọn
    fontWeight: 'bold',
  },
  activeLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.zaloBlue,
  },
  specialActions: {
    backgroundColor: '#000',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#111', // Nền hơi xám nhẹ để tách biệt danh sách
  },
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#000',
    borderBottomWidth: 0.5,
    borderBottomColor: '#222',
  },
  tabItem: {
    paddingVertical: 15,
    marginRight: 30, // Khoảng cách giữa các chữ
    position: 'relative',
  },
  staticMenu: {
    backgroundColor: '#000',
  },
  staticItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#3e83ebff",
  },
  iconContainerGroup: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#a0a1a3ff",
  },
  staticTextContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  staticText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 10,
  },
  dividerSection: {
    height: 8,
    backgroundColor: '#111', // Tạo khối xám tách biệt
    marginVertical: 4,
  },
  filterChipContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25, // Tạo hình con nhộng tròn trịa
  },
  activeChip: {
    backgroundColor: '#333333', // Màu xám nòng súng (Gunmetal) theo ảnh
  },
  inactiveChip: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333', // Viền tối
  },
  activeChipText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  inactiveChipText: {
    color: '#8e8e93', // Chữ xám mờ cho tab inactive
    fontSize: 15,
  },
  ChipTextGroup:{
    color: '#fff', 
    fontSize: 15,
  },
  activeChipCount: {
    color: '#ffffff',
    fontSize: 15,
    marginLeft: 6,
  },
});
