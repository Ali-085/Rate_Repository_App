import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../GraphQl/queries';


const useRepositories = (orderBy = 'CREATED_AT', orderDirection = 'DESC', searchKeyword = '') => {
  const { data, error, refetch, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword: searchKeyword || undefined },
    fetchPolicy: 'cache-and-network',
  });

  let repositories = [];
  if (data?.repositories?.edges) {
    repositories = data.repositories.edges.map(edge => edge.node);
  }

  if (error) {
    console.error('Error fetching repositories:', error);
  }

  return { repositories, loading, refetch, error };
};


export default useRepositories;