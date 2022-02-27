import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {EqualizerIcon, SearchIcon} from '../../../resources/icons/icons';
import {colorPalet} from '../../../resources/style/globalStyle';
import styles from './style';

interface Iprops {
  shearchFunc: (text: string) => void;
  options: {
    placeholder: string;
    autoFocus?: boolean;
  };
  filterPress: () => void;
}

const data = [
  {id: '0', name: 'Therapist'},
  {id: '1', name: 'Cardiologist '},
  {id: '2', name: 'Dentist'},
  {id: '3', name: 'Urologist'},
  {id: '4', name: 'Therapist'},
  {id: '5', name: 'Cardiologist '},
  {id: '6', name: 'Dentist'},
  {id: '7', name: 'Urologist'},
];

const Search: React.FC<Iprops> = props => {
  const {shearchFunc, options, filterPress} = props;

  const onTyping = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    shearchFunc(e.nativeEvent.text);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.search_container}>
          <View style={styles.icon_cont} pointerEvents="none">
            <SearchIcon width="16" height="16" color={colorPalet.black50} />
          </View>
          <TextInput
            style={styles.search}
            placeholder={options?.placeholder || ''}
            placeholderTextColor={colorPalet.black20}
            onChange={onTyping}
            autoFocus={options.autoFocus}
          />
        </View>
        <TouchableOpacity style={styles.sort_button} onPress={filterPress}>
          <EqualizerIcon width="16" height="16" color={colorPalet.black50} />
        </TouchableOpacity>
      </View>
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <FlatList
          style={styles.filter}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.filter_intem}>
                <Text style={styles.filter_text}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </Animated.View>
    </>
  );
};

export default Search;
