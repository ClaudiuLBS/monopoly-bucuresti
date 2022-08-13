import React, { useState } from 'react';

import CustomButton from './CustomButton';
import PopUp from './PopUp';
import colors from '../constants/colors';

const PopUpLouncher = ({
  style,
  color = colors.blueGray,
  children,
  active = true,
  title,
  onConfirm,
  onCancel,
  info,
  buttonText,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onConfirmHandler = () => {
    setModalVisible(false);
    onConfirm();
  };

  const onCancelHandler = () => {
    setModalVisible(false);
    if (onCancel) onCancel();
  };

  return (
    <>
      <CustomButton
        style={style}
        color={color}
        active={active}
        onPress={() => setModalVisible(true)}
      >
        {buttonText}
      </CustomButton>
      <PopUp
        visible={modalVisible}
        title={title}
        onConfirm={onConfirmHandler}
        onCancel={onCancelHandler}
        info={info}
      >
        {children}
      </PopUp>
    </>
  );
};

export default PopUpLouncher;
