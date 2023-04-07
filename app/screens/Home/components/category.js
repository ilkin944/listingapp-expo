import React, {useContext} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Application, ContentLoader, Icon, Text} from '@components';
import {convertIcon} from '@utils';
import {useTranslation} from 'react-i18next';
import {Divider} from '@rneui/themed';
import {ScrollView} from 'react-native';

export default function Categories(props) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const {onPress, onCategoryList, data} = props;

  /**
   * render content
   * @returns {JSX.Element}
   */
  const renderContent = () => {
    if (data?.length > 0) {
      return (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: 5,
          }}>
          {data
            .filter((item, index) => index < 7)
            .map(item => (
              <Pressable
                onPress={() => onPress(item)}
                key={item._id}
                style={[styles.item]}>
                <View style={[styles.iconContainer, {backgroundColor: 'blue'}]}>
                  <Icon
                    {...convertIcon(item.icon)}
                    size={18}
                    color="white"
                    type="AntDesign"
                  />
                </View>
                <Text
                  typography="caption"
                  style={styles.title}
                  numberOfLines={2}
                  ellipsizeMode="middle">
                  {item.name}
                </Text>
              </Pressable>
            ))}
          <Pressable onPress={onCategoryList} style={styles.item}>
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: theme.colors.primary},
              ]}>
              <Icon
                size={20}
                color="white"
                type="MaterialIcons"
                name="more-horiz"
              />
            </View>
            <Text
              typography="caption"
              style={styles.title}
              numberOfLines={2}
              ellipsizeMode="middle">
              {t('more')}
            </Text>
          </Pressable>
        </View>
      );
    }

    return (
      <>
        {Array.from(Array(8).keys()).map((item, index) => (
          <View key={index.toString()} style={styles.item}>
            <ContentLoader style={styles.iconContainer} />
            <ContentLoader style={styles.titleLoading} />
          </View>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderContent()}</View>
      <Divider />
    </View>
  );
}

Categories.propTypes = {
  onPress: PropTypes.func,
  onCategoryList: PropTypes.func,
  data: PropTypes.array,
};

Categories.defaultProps = {
  onPress: () => {},
  onCategoryList: () => {},
  data: [],
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    width: '16.5%',
    alignItems: 'center',
    padding: 4,
    marginBottom: 15,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {textAlign: 'center', fontSize: 13},
  titleLoading: {
    marginTop: 4,
    height: 8,
    width: 40,
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});
