import React from 'react';
import { FlatList, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigation } from '@react-navigation/native';
import RepositoryListHeader from './RepositoryListHeader';
import { useDebounce } from 'use-debounce';

const RepositoryList = () => {
  const [sort, setSort] = React.useState('latest');
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  let orderBy = 'CREATED_AT';
  let orderDirection = 'DESC';
  if (sort === 'highest') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'DESC';
  } else if (sort === 'lowest') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'ASC';
  }
  const { repositories } = useRepositories(orderBy, orderDirection, debouncedSearchKeyword);
  const navigation = useNavigation();
  const handlePress = (id) => {
    navigation.navigate('SingleRepository', { id });
  };

  const renderHeader = () => (
    <RepositoryListHeader
      sort={sort}
      setSort={setSort}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );

  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={item => item.id}
      ListHeaderComponent={renderHeader}
    />
  );
};

export default RepositoryList;
