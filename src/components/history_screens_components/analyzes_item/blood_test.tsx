import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colorPalet, fonts} from '../../../resources/style/globalStyle';

interface Iprops {
  data: BloodTestItemProps[];
}

const BloodTest: React.FC<Iprops> = props => {
  const {data} = props;

  const mapItems = data.map((item, index) => (
    <React.Fragment key={item.id}>
      <Item {...item} />
      {index !== data.length - 1 && <View style={styles.line} />}
    </React.Fragment>
  ));

  return <View style={styles.container}>{mapItems}</View>;
};

export interface BloodTestItemProps {
  id: number;
  name: string;
  state: string;
  notation: string;
  level?: 'normal' | 'high' | 'above' | 'below';
}
const colors = {
  normal: ['#05F883', '#00D1FB'],
  high: ['#FF66A6', '#FF4444'],
  above: ['#E7FB00', '#F8C305'],
  below: ['#05F883', '#00D1FB'],
};
const Item = (props: BloodTestItemProps) => {
  const {t} = useTranslation();
  const {name, state, notation, level} = props;

  return (
    <View style={styles.item_cont}>
      <View style={styles.left_cont}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="clip">
          {name}
        </Text>
        <LinearGradient
          colors={['rgba(246,250,250,0)', 'rgba(246,250,250,1)']}
          useAngle={true}
          angle={90}
          angleCenter={{x: 0.2, y: 0}}
          style={styles.clipper}
        />
      </View>
      <View style={styles.right_cont}>
        <View style={styles.state_cont}>
          <Text style={styles.state_text}>{state}</Text>
          <Text style={styles.notation_text}>{notation}</Text>
        </View>
        {level && (
          <LinearGradient
            colors={colors[level]}
            style={styles.level_cont}
            useAngle={true}
            angle={120}>
            <Text style={styles.level_text}>{t(level)}</Text>
          </LinearGradient>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: colorPalet.bgColor,
    padding: 10,
    marginBottom: 10,
  },
  item_cont: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left_cont: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.sf_medium,
    color: colorPalet.black100,
  },
  clipper: {
    position: 'absolute',
    right: 0,
    height: 18,
    width: 20,
  },
  right_cont: {},
  state_cont: {
    flexDirection: 'row',
  },
  state_text: {
    fontSize: 12,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.black100,
  },
  notation_text: {
    fontSize: 10,
    fontFamily: fonts.sf_regular,
    color: colorPalet.black50,
    marginLeft: 2,
  },
  level_cont: {
    height: 14,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 5,
    marginTop: 2,
  },
  level_text: {
    fontSize: 10,
    fontFamily: fonts.sf_semibold,
    color: colorPalet.white100,
  },
  line: {
    borderBottomWidth: 0.3,
    borderBottomColor: colorPalet.black20,
    marginVertical: 5,
  },
});

export default BloodTest;
