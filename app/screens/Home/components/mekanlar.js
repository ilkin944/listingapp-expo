import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CategoryItem, SizedBox, Text} from '@components';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native';
import {Styles} from '@configs';
import {Divider} from '@components';

export default function Mekanlar(props) {
  const {t} = useTranslation();
  const {data, onPress} = props;

  /**
   * render content
   * @returns {unknown[]}
   */
  const renderItem = ({item, index}) => (
    <View style={styles.item}>
      <CategoryItem
        key={(item?.id ?? index).toString()}
        item={item}
        style={styles.item}
        onPress={() => onPress(item)}
        type="small"
      />
    </View>
  );

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 22}} typography="h4" weight="bold">
          {t('onə_cıxanlar')}
        </Text>
        <SizedBox height={2} />
      </View>
      <Divider />
    </>
  );
}

Mekanlar.propTypes = {
  data: PropTypes.array,
  onPress: PropTypes.func,
};

Mekanlar.defaultProps = {
  data: Array.from({length: 10}, () => {
    return {};
  }),
  onPress: () => {},
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 15,
  },
  item: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    marginRight: 5,
    height: 230,
    width: 320,
    marginLeft: 10,
    borderRadius: 10,
  },
  contentList: {paddingHorizontal: 16, paddingVertical: 8},
});
