import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Filter } from 'lucide-react-native';
import type { ChatPreview } from '@/src/types/chat';
import { ChatSearchHeader } from '@/src/components/chat/ChatSearchHeader';
import { ChatListItem } from '@/src/components/chat/ChatListItem';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_CHATS: ChatPreview[] = [
    { id: '1', name: 'Media Box', lastMsg: 'Zalo Video: Mua 4 tờ vé cào...', time: '', avatar: 'https://cdn-icons-png.flaticon.com/512/5968/5968933.png', isOfficial: true, hasDot: true },
    { id: '2', name: 'Thời Tiết', lastMsg: 'Chúc một ngày tốt lành, thời tiết Tây Ninh...', time: '9 giờ', avatar: 'https://cdn-icons-png.flaticon.com/512/1163/1163763.png', hasDot: true },
    { id: '3', name: 'Phạm Hoàng Vũ', lastMsg: '[Cuộc gọi thoại đi]', time: '9 giờ', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Tấn Minh', lastMsg: 'Bạn: Chốt đề tài Kiến trúc phần mềm đi bn ơi', time: '9 giờ', avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: '5', name: 'Nhóm Lập Trình', lastMsg: 'Minh: Đã xong phần thiết kế UI', time: '10 giờ', avatar: 'https://i.pravatar.cc/150?u=5' },
    { id: '6', name: 'Nhóm Đồ Án', lastMsg: 'Hùng: Mình sẽ làm phần backend', time: '11 giờ', avatar: 'https://i.pravatar.cc/150?u=6' },
    { id: '7', name: 'Bạn Bè', lastMsg: 'Hà: Cùng đi chơi không?', time: '12 giờ', avatar: 'https://i.pravatar.cc/150?u=7' },
    { id: '8', name: 'Work Team', lastMsg: 'Linh: Đã gửi báo cáo tuần', time: '13 giờ', avatar: 'https://i.pravatar.cc/150?u=8' },
    { id: '9', name: 'Study Group', lastMsg: 'Nam: Bài tập về nhà ai làm xong chưa?', time: '14 giờ', avatar: 'https://i.pravatar.cc/150?u=9' },
    { id: '10', name: 'Family Chat', lastMsg: 'Mẹ: Tối nay ăn gì?', time: '15 giờ', avatar: 'https://i.pravatar.cc/150?u=10' },
    { id: '11', name: 'Hobby Group', lastMsg: 'Huy: Ai muốn chơi game không?', time: '16 giờ', avatar: 'https://i.pravatar.cc/150?u=11' },
    { id: '12', name: 'Sports Fan', lastMsg: 'Bình: Bầu cử xong chưa?', time: '17 giờ', avatar: 'https://i.pravatar.cc/150?u=12' },
];

export default function HomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
            <ChatSearchHeader onPressSearch={() => router.push('/search')}/>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                <View style={styles.activeTabContainer}>
                    <Text style={styles.activeTabText}>Ưu tiên</Text>
                    <View style={styles.activeLine} />
                </View>
                <Text style={styles.inactiveTabText}>Khác</Text>
                <Filter size={18} color="#8e8e93" style={{ marginLeft: 'auto' }} />
            </View>

            {/* Chat List */}
            <FlashList
                data={MOCK_CHATS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ChatListItem
                        item={item}
                        onPress={() => router.push({ pathname: '/chat/[id]', params: { id: item.id, name: item.name } })}
                    />
                )}
            />
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: '#000'
    },
    container: { flex: 1, backgroundColor: '#000' },
    filterContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#222' },
    activeTabContainer: { alignItems: 'flex-start' },
    activeTabText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
    activeLine: { height: 2, backgroundColor: '#fff', marginTop: 4 },
    inactiveTabText: { color: '#8e8e93', fontSize: 15, marginLeft: 25 },
});