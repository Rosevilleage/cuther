import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {responsivePixel, responsiveFontSize} from '../style/responsivePixel';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  containerStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  label,
  containerStyle,
  checkboxStyle,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={[styles.checkbox, checked && styles.checked, checkboxStyle]}>
        {checked && <View style={styles.checkmark} />}
      </View>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: responsivePixel(22),
    height: responsivePixel(22),
    borderRadius: responsivePixel(4),
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsivePixel(8),
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    width: responsivePixel(12),
    height: responsivePixel(6),
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{rotate: '-45deg'}],
  },
  label: {
    fontSize: responsiveFontSize(14),
    color: '#333333',
  },
});

export default Checkbox;
