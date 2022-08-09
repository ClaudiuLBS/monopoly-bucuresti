import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
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
  info = '',
  onlyInformative = false,
}) => {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    setPressed(false);
  }, [visible]);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.info}>{info}</Text>
          {children}
          <View style={styles.buttonsContainer}>
            {onlyInformative ? (
              <CustomButton style={styles.button} color={colors.white} onPress={onCancel}>
                Close
              </CustomButton>
            ) : (
              <>
                <CustomButton
                  active={!pressed}
                  style={styles.button}
                  color={colors.confirm}
                  onPress={() => {
                    setPressed(true);
                    onConfirm();
                  }}
                >
                  {confirmText}
                </CustomButton>
                <CustomButton
                  active={!pressed}
                  style={styles.button}
                  color={colors.cancel}
                  onPress={() => {
                    setPressed(true);
                    onCancel();
                  }}
                >
                  {cancelText}
                </CustomButton>
              </>
            )}
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
  info: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.blueGray,
    marginBottom: 10,
  },
});

export default PopUp;
