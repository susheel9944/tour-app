import { StyleSheet, Text, View } from 'react-native';

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Left Side */}
        <View>
          <Text style={styles.exploreText}>Explore</Text>
          <Text style={styles.aspenText}>ASPEN</Text>
        </View>

        {/* Right Side */}
        <View>
          <Text style={styles.dropdownText}>DropDown</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  exploreText: {
    fontSize: 16,
    color: '#666',
  },

  aspenText: {
    fontSize: 28,
    fontWeight: 400,
    color: '#000',
    fontFamily: 'Montserrat-BlackItalic',
  },

  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
});

export default ExploreScreen;
