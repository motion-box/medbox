import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from './style';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import * as Icons from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';

interface Iprops {
  options: {
    icon: Icons.AllIconsType;
    text: string;
    disabled: boolean;
    onPress: () => void;
  }[];
}

const PopupMenu: React.FC<Iprops> = ({options}) => {
  return (
    <Menu>
      <MenuTrigger
        customStyles={{
          triggerWrapper: styles.trigger,
          TriggerTouchableComponent: TouchableOpacity,
          triggerTouchable: {
            activeOpacity: 0.5,
          },
        }}>
        <Icons.MoreIcon width="16" height="16" color={colorPalet.black50} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: styles.container,
          OptionTouchableComponent: TouchableOpacity,
          optionTouchable: {activeOpacity: 0.8},
        }}>
        {options.map((item, index) => (
          <MenuOption
            key={index}
            onSelect={item.onPress}
            disabled={item.disabled}
            customStyles={{
              optionWrapper: [
                styles.item_cont,
                {borderBottomWidth: options.length - 1 === index ? 0 : 0.2},
              ],
            }}>
            {React.createElement(Icons[item.icon], {
              width: '16',
              height: '16',
              color: colorPalet.black20,
            })}
            <Text
              style={[
                styles.item_text,
                {
                  color: item.disabled
                    ? colorPalet.black20
                    : colorPalet.black100,
                },
              ]}>
              {item.text}
            </Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};
export default PopupMenu;
