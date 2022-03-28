import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {Dispatch, useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {debounce} from '../../../hooks/debounce';
import {useAppSelector} from '../../../hooks/redux';
import {SpecialityModel} from '../../../models/ClassifiersModel';
import {
  CloseCircleIcon,
  CloseIcon,
  DeleteBackIcon,
  EqualizerIcon,
  SearchIcon,
} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import {SearchParams} from '../../../services/DoctorService';
import styles from './style';

interface Iprops {
  filterParams: SearchParams;
  setFilterParams: (data: SearchParams) => void;
  searchingText: string;
  setSearchingText: React.Dispatch<React.SetStateAction<string>>;
  options: {
    placeholder: string;
    autoFocus?: boolean;
    selected: {id: number; index: number; name: string} | undefined;
  };
  settingsPressed: () => void;
}

const Search: React.FC<Iprops> = props => {
  const {
    filterParams,
    setFilterParams,
    searchingText,
    setSearchingText,
    options,
    settingsPressed,
  } = props;
  const {t} = useTranslation();
  const {specialities} = useAppSelector(state => state.classifiersReucer);
  const {lang} = useAppSelector(state => state.globalReducer);
  const flatListRef = useRef<FlatList>(null);
  const textInputRef = useRef<TextInput>(null);
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    scrollToIndex();
  }, []);

  const onFilterItemPressed = (id: number) => {
    if (id != filterParams.speciality) {
      setFilterParams({...filterParams, speciality: id});
    } else {
      setFilterParams({...filterParams, speciality: undefined});
    }
  };

  /**
   * Gets input text value and call API to search
   * @param text
   */
  const onTyping = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    debounceTyping(e.nativeEvent.text);
    // onTextTyping(e.nativeEvent.text);
  };
  const debounceTyping = useCallback(
    debounce(text => {
      setSearchingText(text);
    }, 500),
    [],
  );

  const clearTextState = () => {
    if (searchingText.length) {
      textInputRef.current?.clear();
      setSearchingText('');
    } else {
      navigation.goBack();
    }
  };

  /**
   * Scroll filter list to selected item
   */
  const scrollToIndex = () => {
    if (options.selected && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: false,
        index: options.selected.index,
      });
    }
  };
  /**
   * Get items width for scroll
   * @param _ data
   * @param index index of item
   * @returns `length` `offset` `index`
   */
  const getItemLayout = (_: any, index: number) => ({
    length: 50,
    offset: 50 * index,
    index,
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.search_container}>
          <View style={styles.icon_cont} pointerEvents="none">
            <SearchIcon width="16" height="16" color={colorPalet.black50} />
          </View>
          <TextInput
            ref={textInputRef}
            style={styles.search}
            placeholder={t('search_doctor')}
            placeholderTextColor={colorPalet.black20}
            onChange={onTyping}
            autoFocus={options.autoFocus}
          />
          <TouchableOpacity style={styles.close_btn} onPress={clearTextState}>
            {searchingText.length > 0 ? (
              <DeleteBackIcon
                width="16"
                height="16"
                color={colorPalet.black50}
              />
            ) : (
              <CloseIcon width="16" height="16" color={colorPalet.black50} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sort_button} onPress={settingsPressed}>
          <EqualizerIcon width="16" height="16" color={colorPalet.black50} />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          ref={flatListRef}
          style={styles.filter}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          getItemLayout={getItemLayout}
          data={specialities}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <FilterItem
                item={item}
                lang={lang}
                onPress={() => onFilterItemPressed(item.id)}
                selected={filterParams.speciality == item.id}
              />
            );
          }}
        />
      </View>
    </>
  );
};

interface FilterProps {
  item: SpecialityModel;
  lang: 'ru' | 'uz' | 'en';
  selected: boolean;
  onPress: () => void;
}

const AnimTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const FilterItem = ({item, lang, selected, onPress}: FilterProps) => {
  const isSelected = useSharedValue(0);
  const width = useSharedValue(0);
  useEffect(() => {
    if (selected) {
      isSelected.value = withTiming(1);
    } else {
      isSelected.value = withTiming(0);
    }
  }, [selected]);

  const rStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      isSelected.value,
      [0, 1],
      [colorPalet.white100, colorPalet.black100],
    );
    return {
      backgroundColor: color,
    };
  });
  return (
    <AnimTouchableOpacity
      style={[rStyle, styles.filter_intem]}
      onPress={onPress}>
      <Text
        style={[
          styles.filter_text,
          {color: selected ? colorPalet.white100 : colorPalet.black50},
        ]}>
        {item[`name_${lang}`]}
      </Text>
      {selected && (
        <View style={{marginLeft: 10}}>
          <CloseCircleIcon width="16" height="16" color={colorPalet.white50} />
        </View>
      )}
    </AnimTouchableOpacity>
  );
};

export default Search;
