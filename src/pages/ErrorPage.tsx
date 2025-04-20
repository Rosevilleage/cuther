import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {responsivePixel} from '../app/style/responsivePixel';
import {useErrorStore} from '../app/store/errorStore';
import {useQueryClient} from '@tanstack/react-query';
import NoData from '../assets/animation/noData.svg';
export default function ErrorPage() {
  const {customError, clearCustomError} = useErrorStore();
  const queryClient = useQueryClient();

  if (!customError) {
    return null;
  }

  const handleRetry = () => {
    clearCustomError();
    queryClient.removeQueries();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <NoData
          style={{
            width: responsivePixel(150),
            height: responsivePixel(180),
            marginBottom: responsivePixel(20),
          }}
        />
        <Text style={styles.title}>{customError.title}</Text>
        <Text style={styles.message}>{customError.message}</Text>
        <TouchableOpacity style={styles.button} onPress={handleRetry}>
          <Text style={styles.buttonText}>다시 시도</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
    padding: responsivePixel(20),
  },
  icon: {
    width: responsivePixel(60),
    height: responsivePixel(60),
    borderRadius: responsivePixel(30),
    backgroundColor: '#FFE5E5',
    marginBottom: responsivePixel(20),
  },
  title: {
    fontSize: responsivePixel(20),
    fontWeight: 'bold',
    marginBottom: responsivePixel(10),
    color: '#333',
  },
  message: {
    fontSize: responsivePixel(16),
    textAlign: 'center',
    marginBottom: responsivePixel(20),
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: responsivePixel(20),
    paddingVertical: responsivePixel(10),
    borderRadius: responsivePixel(5),
  },
  buttonText: {
    color: 'white',
    fontSize: responsivePixel(16),
    fontWeight: '500',
  },
});
