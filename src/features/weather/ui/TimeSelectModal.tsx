import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {responsiveFontSize} from '../../../app/style/responsivePixel';

interface TimeSelectModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (hour: number) => void;
  currentHour?: number;
}

const TimeSelectModal: React.FC<TimeSelectModalProps> = ({
  visible,
  onClose,
  onSelect,
  currentHour,
}) => {
  const hours = Array.from({length: 24}, (_, i) => i);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>시간 선택</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>취소</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.timeList}>
            {hours.map(hour => (
              <TouchableOpacity
                key={hour}
                style={[
                  styles.timeItem,
                  currentHour === hour && styles.selectedTime,
                ]}
                onPress={() => {
                  onSelect(hour);
                  onClose();
                }}>
                <Text
                  style={[
                    styles.timeText,
                    currentHour === hour && styles.selectedTimeText,
                  ]}>
                  {hour}시
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TimeSelectModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '80%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: responsiveFontSize(16),
    color: '#666',
  },
  timeList: {
    maxHeight: 300,
  },
  timeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedTime: {
    backgroundColor: '#eeeeee',
  },
  timeText: {
    fontSize: responsiveFontSize(16),
    textAlign: 'center',
  },
  selectedTimeText: {
    fontWeight: 'bold',
  },
});
