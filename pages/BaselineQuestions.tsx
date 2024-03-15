import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import CustomHeaderBaseline from '../components/CustomHeaderBaseline';
import {useDataContext} from '../contexts/DataContext';

const CustomButton = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={styles.button}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const Question = ({
  questionText,
  onSelect,
  selectedValue,
}: {
  questionText: string;
  onSelect: (value: boolean) => void;
  selectedValue: boolean | null;
}) => {
  return (
    <View style={{marginVertical: 15}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={[styles.base]}>Q.</Text>
        <Text
          style={[
            styles.base,
            {
              maxWidth: 350,
              marginBottom: 10,
              marginLeft: 0,
              marginRight: 20,
            },
          ]}>
          {questionText}
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => onSelect(true)}
          style={{
            borderColor: selectedValue === true ? '#71D860' : '#ccc',
            borderWidth: 2,
            width: '40%',
            borderRadius: 1000,
            paddingVertical: 8,
            marginHorizontal: 8,
          }}>
          <Text style={[styles.base, {textAlign: 'center', fontWeight: '700'}]}>
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect(false)}
          style={{
            borderColor: selectedValue === false ? '#FC4343' : '#ccc',
            borderWidth: 2,
            width: '40%',
            borderRadius: 1000,
            paddingVertical: 8,
            marginHorizontal: 8,
          }}>
          <Text style={[styles.base, {textAlign: 'center', fontWeight: '700'}]}>
            No
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function BaselineQuestions({navigation, route}: any) {
  const {userId} = useDataContext();
  const questions = [
    'At 15 months is still not babbling.',
    'At 2 years uses less than 50 words.',
    'At 2 years not talking.',
    'At 15 months is still not babbling.',
    'At 2years uses less than 50 words. ',
    'At 2years not talking. ',
    'At 2years the family finds it difficult to understand the speech. ',
    'At 2-1/2years is unable to use unique two-word phrases. ',
    'At 2-1/2years is unable to use noun-verb combinations. ',
    'At 3years unable to use at least 200 words. ',
    'At 3years unable to ask for things by name. ',
    'At 3years is unable to speak in short sentences. ',
    'At 3years strangers are unable to understand the speech. ',
    'At any age is unable to say previously learned words.',
    'Has difficulty following directions. ',
    'Has poor pronunciation or articulation. ',
    'Is leaving words out of a sentence. ',
    'Frequent coughing or sneezing loudly. ',
    'Frequent throat clearing. ',
    'Frequent screaming or shouting. ',
    'Frequent talking in noisy environments. ',
    'Frequent loud singing or class practice. ',
    'Frequent talking for extended periods of time. ',
    'Extensive number of hours of voice usage per day. ',
    'Frequent intake of caffeine products (coffee, chocolate, cocoa). ',
    'Frequent exposure to environmental irritants. ',
    'Frequent or extensive smoking. ',
    'Frequent alcohol consumption. ',
    'Frequent intake of spicy food items. ',
    'Frequent consumption of carbonated drinks. ',
    'Minimum or less number of glasses of water intake per day. ',
    'Frequent habit of chewing tobacco, snuff, pan etc. ',
    'Frequent infections like cold or laryngitis etc. ',
    'High pitch voice that does not match your age. ',
    ' Frequent pitch breaks while talking. ',
    'Voice sounds strained, tight or breathy while talking.',
  ];

  const [responses, setResponses] = useState<(boolean | null)[]>(
    new Array(questions.length).fill(null),
  );

  const handleSelect = (index: number, value: boolean) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const handleSubmit = () => {
    if (responses.includes(null)) {
      // Not all questions answered
      Alert.alert(
        'Incomplete',
        'Please answer all questions before submitting.',
      );
    } else {
      console.log('Array val ==> ', responses);
      // Proceed with submission logic
      // navigation.push('profileSetupSuccess', route.params);
      const formData = new FormData();

      // Append data to FormData object
      formData.append('UserID', userId);
      formData.append('Answer', JSON.stringify(responses));

      console.log('Body Data ---> ', formData);
      fetch('https://b827-39-58-90-52.ngrok-free.app/add_answer', {
        method: 'POST',
        headers: {},
        body: formData,
      })
        .then(response => {
          console.log('My result ===> ', response);
          navigation.push('profileSetupSuccess', route.params);
        })
        .catch(error => {
          console.error('here', error);
        });
    }
  };

  const navigate = () => {
    navigation.push('profileSetupSuccess', route.params);
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <CustomHeaderBaseline
            title="Setup Profile"
            navigation={navigation}
            goBack={() => navigation.goBack()}
          />
          <View style={{marginVertical: 15}}>
            {questions.map((questionText, index) => (
              <Question
                key={index}
                questionText={questionText}
                onSelect={value => handleSelect(index, value)}
                selectedValue={responses[index]}
              />
            ))}
          </View>
          <CustomButton onPress={handleSubmit} title="Submit" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'SF-Pro-Display-Regular',
    color: '#111920',
    marginLeft: 20,
    marginRight: 2,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '100%',
  },
  heading: {
    paddingTop: 30,
    fontSize: 24,
    fontWeight: '500',
    maxWidth: 370,
    textAlign: 'center',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    textAlign: 'center',
    maxWidth: 350,
  },

  button: {
    width: '85%',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#111920',
    padding: 10,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default BaselineQuestions;
