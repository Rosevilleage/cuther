import React, {useEffect, useRef} from 'react';
import {
  View,
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import {responsivePixel} from '../style/responsivePixel';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
}

const Modal = ({
  visible,
  onClose,
  children,
  title,
  showCloseButton = true,
}: ModalProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalBackground,
            {
              opacity: fadeAnim,
            },
          ]}>
          <TouchableOpacity
            style={styles.overlayTouchable}
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.modalContent,
            {
              opacity: fadeAnim,
              transform: [{scale: scaleAnim}],
            },
          ]}>
          <View style={styles.modalHeader}>
            {title && <Text style={styles.modalTitle}>{title}</Text>}
            {showCloseButton && (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.modalBody}>{children}</View>
        </Animated.View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  overlayTouchable: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: responsivePixel(14),
    padding: responsivePixel(25),
    width: '80%',
    // maxWidth: responsivePixel(300),
    maxWidth: '90%',
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsivePixel(15),
  },
  modalTitle: {
    fontSize: responsivePixel(18),
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    paddingInline: responsivePixel(5),
    marginLeft: 'auto',
  },
  closeButtonText: {
    fontSize: responsivePixel(20),
    fontWeight: '900',
    color: '#666',
  },
  modalBody: {
    width: '100%',
  },
});

export default Modal;
