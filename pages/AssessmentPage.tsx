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
import {LinearProgress} from '@rneui/themed';
import CustomHeader from '../components/CustomHeader';
import SearchIcon from '../assets/SearchIcon';
import DocumentIcon from '../assets/DocumentIcon';
import AssessmentDetails from '../components/AssessmentDetails';

const DarkButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.darkButton}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const RedButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.redButton}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

function AssessmentPage({navigation}: any) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const closeDetails = (val: any) => {
    setDetailsOpen(val);
  };

  const naviagteBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <AssessmentDetails
          navigation={navigation}
          detailsOpen={detailsOpen}
          closeDetails={closeDetails}
        />
        <View style={styles.container}>
          <CustomHeader title="Assessment" goBack={naviagteBack} />

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

          <View style={styles.cardContainer}>
            <View>
              <Text style={[styles.base, styles.heading]}>
                Speech Articulation
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <DocumentIcon />
                <Text style={[styles.base, styles.para]}>129 Questions</Text>
              </View>
            </View>
            <DarkButton
              onPress={() => navigation.navigate('instructionsPage')}
              title="Start"
            />
          </View>

          <View style={styles.cardContainer2}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Text style={[styles.base, styles.heading]}>
                  Speech Articulation
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <DocumentIcon />
                  <Text style={[styles.base, styles.para]}>129 Questions</Text>
                </View>
              </View>
              <RedButton
                onPress={() => navigation.navigate('speechArticulationPage')}
                title="Resume"
              />
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                marginTop: 10,
              }}>
              <LinearProgress
                style={{
                  marginVertical: 10,
                  borderRadius: 16,
                  height: 7,
                }}
                value={0.24}
                variant="determinate"
                color="#FF7A2F"
              />
              <Text style={[styles.base, styles.para]}>24%</Text>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <View>
              <Text style={[styles.base, styles.heading]}>
                Stammering Passages
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <DocumentIcon />
                <Text style={[styles.base, styles.para]}>129 Questions</Text>
              </View>
            </View>
            <DarkButton
              onPress={() => setDetailsOpen(!detailsOpen)}
              title="Start"
            />
          </View>

          <View style={styles.cardContainer}>
            <View>
              <Text style={[styles.base, styles.heading]}>Voice Disorder</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <DocumentIcon />
                <Text style={[styles.base, styles.para]}>129 Questions</Text>
              </View>
            </View>
            <DarkButton
              onPress={() => setDetailsOpen(!detailsOpen)}
              title="Start"
            />
          </View>
        </View>
      </ScrollView>
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

export default AssessmentPage;
