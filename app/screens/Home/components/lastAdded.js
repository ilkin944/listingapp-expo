import React from 'react';
import {FlatList, StyleSheet, View, ScrollView} from 'react-native';
import {CategoryItem, SizedBox, Text} from '@components';
import PropTypes from 'prop-types';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {Divider} from '@components';
import {Image} from 'react-native';

export default function Locations(props) {
  const {t} = useTranslation();
  const {data, onPress} = props;

  const renderItem = ({item}) => (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <CategoryItem item={item} type="card" onPress={() => onPress(item)} />
    </View>
  );

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 22}} typography="h4" weight="bold">
          {t('last_added')}
        </Text>
        <SizedBox height={2} />
      </View>

      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: 15,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {data.length > 0 &&
          data.map(item => (
            <View
              onPress={() => onPress(item)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 5,
                marginBottom: 15,
                flex: 1,
              }}
              key={item._id}>
              <View style={{marginRight: 15}}>
                <Text>{item.listingTemle}</Text>
                <Image
                  source={{uri: `${item.image}`}}
                  style={{width: 400, height: 250, aspectRatio: 1}}
                />
                {/* Remove the fixed width and height props from Image and use style instead */}
              </View>
            </View>
          ))}
        <Divider />
      </ScrollView>
    </>
  );
}

Locations.propTypes = {
  onPress: PropTypes.func,
};

Locations.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 5,
  },
  item: {width: 250, height: 160, paddingHorizontal: 8},
});
