import { View, StyleSheet, Image, Button } from 'react-native';
import * as Linking from 'expo-linking';
import Text from './Text';
import theme from '../theme';


const formatCount = (count) => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
};

const LanguageTag = ({ language }) => (
  <View style={styles.languageTag}>
    <Text style={styles.languageText}>{language}</Text>
  </View>
);

const Stat = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text fontWeight="bold" style={styles.statValue}>{value}</Text>
    <Text color="textSecondary" style={styles.statLabel}>{label}</Text>
  </View>
);

const RepositoryItem = ({ repository, showGitHubButton }) => {
  const handleOpenGitHub = () => {
    if (repository.url) {
      Linking.openURL(repository.url);
    }
  };
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topRow}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.info}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.fullName}>{repository.fullName}</Text>
          <Text color="textSecondary" style={styles.description}>{repository.description}</Text>
          <LanguageTag language={repository.language} />
        </View>
      </View>
      <View style={styles.statsRow}>
        <Stat label="Stars" value={formatCount(repository.stargazersCount)} />
        <Stat label="Forks" value={formatCount(repository.forksCount)} />
        <Stat label="Reviews" value={formatCount(repository.reviewCount)} />
        <Stat label="Rating" value={formatCount(repository.ratingAverage)} />
      </View>
      {showGitHubButton && repository.url && (
        <View style={{ marginTop: 16 }}>
          <Button title="Open in GitHub" onPress={handleOpenGitHub} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  fullName: {
    marginBottom: 4,
  },
  description: {
    marginBottom: 6,
  },
  languageTag: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  languageText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
});

export default RepositoryItem;
