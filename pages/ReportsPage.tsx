import {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import SearchIcon from '../assets/SearchIcon';
import LinearGradient from 'react-native-linear-gradient';
import CalenderIcon from '../assets/CalenderIcon';
import ReportDetails from '../components/ReportDetails';

function Card({navigation, onPress}: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#0CC8E8', '#2DEEAA']}
        style={{
          justifyContent: 'center',
          borderRadius: 16,
          marginTop: 14,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 1.5,
            borderRadius: 15,
            backgroundColor: '#fff',
            padding: 16,
            // borderWidth: 1,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <View style={{}}>
              <Text
                style={[
                  styles.base,
                  {fontSize: 18, fontWeight: '500', maxWidth: 250},
                ]}>
                Articulation Screening Report
              </Text>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <CalenderIcon />
                <Text
                  style={[
                    styles.base,
                    {fontSize: 14, fontWeight: '500', marginLeft: 5},
                  ]}>
                  19 - 5 - 2024
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.base,
                {
                  marginHorizontal: 20,
                  fontSize: 20,
                  fontWeight: '800',
                  color: '#71D860',
                },
              ]}>
              87%
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function ReportsPage({navigation}: any) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const closeDetails = (val: any) => {
    setDetailsOpen(val);
  };

  const naviagteBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View style={{minHeight: '100%'}}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
          }}>
          <ReportDetails
            detailsOpen={detailsOpen}
            closeDetails={closeDetails}
          />
          <CustomHeader title="Reports" goBack={naviagteBack} />

          <View style={styles.textInputContainer}>
            <View style={styles.inputContainer}>
              <SearchIcon />
              <TextInput
                style={styles.textInput}
                placeholder="Search"
                placeholderTextColor={'#D6D8C0'}
              />
            </View>
          </View>

          <View style={{marginTop: 30}}>
            <Card onPress={() => setDetailsOpen(true)} />
            <Card onPress={() => setDetailsOpen(true)} />
            <Card onPress={() => setDetailsOpen(true)} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'SF-Pro-Display-Regular',
    color: '#111920',
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: '500',
  },
  para: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  textInputContainer: {
    marginTop: 45,
    width: '100%',
    paddingHorizontal: 25,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: '#0CC8E8',
    borderRadius: 16,
    padding: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 30,
  },
  cardContainer2: {
    borderWidth: 1,
    borderColor: '#0CC8E8',
    borderRadius: 16,
    padding: 14,
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    width: '90%',
    marginTop: 30,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    paddingLeft: 4,
    color: '#111920',
    fontSize: 16,
    width: '80%',
    margin: 5,
    // marginRight: 'auto',
  },
  darkButton: {
    marginLeft: 'auto',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#111920',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 24,
    paddingRight: 24,
  },
  redButton: {
    marginLeft: 'auto',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#FC4343',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 24,
    paddingRight: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
  },
  bold: {
    fontWeight: '700',
  },
});

export default ReportsPage;
