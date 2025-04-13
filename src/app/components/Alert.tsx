import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import {responsivePixel} from '../style/responsivePixel';

interface AlertButton {
  text: string;
  onPress: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface AlertProps {
  visible: boolean;
  title?: string;
  message: string;
  buttonText?: string;
  onClose?: () => void;
  confirm?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  visible,
  title,
  message,
  buttonText,
  onClose,
  confirm,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
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
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.alertContainer,
            {
              opacity: fadeAnim,
              transform: [{scale: scaleAnim}],
            },
          ]}>
          <View style={styles.alertContent}>
            {title && <Text style={styles.title}>{title}</Text>}
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {confirm ? (
              [
                {text: '취소', onPress: () => {}, style: 'cancel' as const},
                {text: '확인', onPress: () => {}, style: 'default' as const},
              ].map((button, index) => <AlertButton key={index} {...button} />)
            ) : (
              <AlertButton
                text={buttonText || '확인'}
                onPress={() => {
                  onClose?.();
                }}
                style="default"
                border
              />
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const AlertButton: React.FC<AlertButton & {border?: boolean}> = ({
  text,
  onPress,
  style,
  border,
}) => {
  const getButtonStyle = (type?: 'default' | 'cancel' | 'destructive') => {
    switch (type) {
      case 'cancel':
        return styles.cancelButton;
      case 'destructive':
        return styles.destructiveButton;
      default:
        return styles.defaultButton;
    }
  };

  const getButtonTextStyle = (type?: 'default' | 'cancel' | 'destructive') => {
    switch (type) {
      case 'cancel':
        return styles.cancelButtonText;
      case 'destructive':
        return styles.destructiveButtonText;
      default:
        return styles.defaultButtonText;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(style), border && styles.buttonBorder]}
      onPress={onPress}>
      <Text style={getButtonTextStyle(style)}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  alertContainer: {
    width: '80%',
    maxWidth: responsivePixel(300),
    backgroundColor: 'white',
    borderRadius: responsivePixel(14),
    overflow: 'hidden',
  },
  alertContent: {
    padding: responsivePixel(25),
    alignItems: 'center',
  },
  title: {
    fontSize: responsivePixel(18),
    fontWeight: 'bold',
    marginBottom: responsivePixel(12),
    textAlign: 'center',
  },
  message: {
    fontSize: responsivePixel(16),
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  verticalButtonContainer: {
    flexDirection: 'column',
  },
  defaultButton: {
    flex: 1,
    paddingVertical: responsivePixel(12),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: responsivePixel(44),
  },
  cancelButton: {
    flex: 1,
    paddingVertical: responsivePixel(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    minHeight: responsivePixel(44),
  },
  destructiveButton: {
    flex: 1,
    paddingVertical: responsivePixel(12),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: responsivePixel(44),
  },
  buttonBorder: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
  },
  verticalButton: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    borderLeftWidth: 0,
    width: '100%',
  },
  defaultButtonText: {
    fontSize: responsivePixel(16),
    fontWeight: '800',
    color: '#187da6',
  },
  cancelButtonText: {
    fontSize: responsivePixel(16),
    fontWeight: '600',
    color: '#717171',
  },
  destructiveButtonText: {
    fontSize: responsivePixel(16),
    fontWeight: '600',
    color: '#8f8f8f',
  },
});

export default Alert;
