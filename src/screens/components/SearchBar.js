import React, {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {
  Icon,
  Input,
  useTheme,
} from '@ui-kitten/components';
import searchNonConnectedPatient from '../../actions/searchNonConnectedPatient';
import debounce from 'lodash.debounce';

function SearchBar({setShowSearch, search, setSearch}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const latitude = useSelector((state) => state.location.latitude);
  const longitude = useSelector((state) => state.location.longitude);

  // Clear search function
  const clearFunction = useCallback(() => {
    setSearch('');
    setShowSearch(false);
  }, [setSearch, setShowSearch]);

  // Search function with debounce to avoid unnecessary dispatches
  const debouncedSearch = useCallback(
    debounce((value) => {
        dispatch(
          searchNonConnectedPatient({
            userNameAndMobileNumber: value,
            latitude,
            longitude,
          })
        );   
    }, 300), // 300ms debounce time
    [dispatch, latitude, longitude]
  );

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearch(value);
    setShowSearch(true);
    debouncedSearch(value);
  };

  // Icons
  const ClearIcon = (props) => (
    <Icon
      {...props}
      name="close-outline"
      fill={theme['color-black-100']}
      onPress={clearFunction}
    />
  );

  const SearchIcon = (props) => (
    <Icon {...props} name="search-outline" fill={theme['color-black-100']} />
  );

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search for a patient"
        style={styles.searchInputBox}
        accessoryLeft={SearchIcon}
        accessoryRight={search !== '' ? ClearIcon : null}
        value={search}
        size="large"
        onChangeText={handleSearchChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    borderRadius: 10,
  },
  searchInputBox: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 6,
    elevation: 10,
    borderColor: 'transparent',
  },
});

export default SearchBar;
