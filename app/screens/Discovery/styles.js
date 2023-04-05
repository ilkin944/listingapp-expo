import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  searchContainer: {
    marginTop: 40,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  searchSelf: {
    width: '93%',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  item: {
    display: 'flex',
    marginLeft: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    width: '90%',
    borderRadius: 10,
    height: 100,
  },
});
