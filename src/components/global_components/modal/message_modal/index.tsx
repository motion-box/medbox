import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {CloseCircleIcon} from '../../../../resources/icons/icons';
import Button from '../../button';
import ModalCustom from '../index';
import styles from './style';

interface Iprops extends ModalVisibe, MessageModalTypes {}
type ModalVisibe = {isVisible: boolean};
export type MessageModalTypes = {
  title: string;
  description: string;
  closeBtn?: {
    onPress: () => void;
  };
  btn: {
    text: string;
    onPress: () => void;
  };
};

const MessageModal: React.FC<Iprops> = props => {
  const {isVisible, title, description, closeBtn, btn} = props;
  return (
    <ModalCustom isVisible={isVisible}>
      <View style={styles.line}>
        <Text style={styles.title}>{title}</Text>
        {closeBtn && (
          <TouchableOpacity onPress={closeBtn.onPress}>
            <CloseCircleIcon />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.description}>{description}</Text>
      <Button
        text={btn.text}
        onPress={btn.onPress}
        options={{
          buttonWidth: '100%',
          buttonHeight: 50,
          borderRadius: 10,
          textSize: 14,
        }}
      />
    </ModalCustom>
  );
};

export default MessageModal;
