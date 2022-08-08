import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';
import CustomButton from './CustomButton';

const PopUp = ({
  visible,
  title = 'modal title',
  onConfirm,
  onCancel,
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {children}
          <View style={styles.buttonsContainer}>
            <CustomButton style={styles.button} color={colors.confirm} onPress={onConfirm}>
              {confirmText}
            </CustomButton>
            <CustomButton style={styles.button} color={colors.cancel} onPress={onCancel}>
              {cancelText}
            </CustomButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 20,
    width: '90%',
  },
  title: {
    fontFamily: 'bold',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: colors.white,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default PopUp;
