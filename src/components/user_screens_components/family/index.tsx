import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FamilyMemberModel, FamilyModel} from '../../../models/UserModal';
import Titler from '../../global_components/titler';
import styles from './style';

interface Iprops {
  data: FamilyModel;
}

const Family: React.FC<Iprops> = props => {
  const {data} = props;
  return (
    <View style={styles.container}>
      <Titler text="Family" />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
        style={styles.list}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <Item data={item} />;
        }}
      />
    </View>
  );
};

interface ItemProps {
  data: FamilyMemberModel;
}

const Item = ({data}: ItemProps) => {
  return (
    <TouchableOpacity
      style={styles.item_cont}
      onPress={() => Alert.alert(`Family member ID: ${data.id}`)}>
      <Image
        style={styles.image_cont}
        source={require('../../../resources/images/img5.png')}
      />
      <Text style={styles.item_title} numberOfLines={1}>
        {data.name}
      </Text>
      <Text
        style={styles.item_subtitle}
        numberOfLines={1}>{`${data.age} years old`}</Text>
    </TouchableOpacity>
  );
};
export default Family;
