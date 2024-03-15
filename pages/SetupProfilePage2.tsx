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
  PermissionsAndroid,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import SelectDropdown from 'react-native-select-dropdown';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import IzzyAILogo from '../assets/IzzyAILogo';
import ChevronDownIcon from '../assets/ChevronDown';
import CustomHeader from '../components/CustomHeader';
import {CheckBox} from '@rneui/themed';
import BarFilled from '../assets/BarFilled';
import Bar from '../assets/Bar';
import LoaderWave from '../components/LoaderWave';
import {useDataContext} from '../contexts/DataContext';
//

const ProgressCenter = () => {
  return (
    <View
      style={{
        backgroundColor: '#FC4343',
        height: 65,
        width: 65,
        borderRadius: 1000,
      }}></View>
  );
};

function SetupProfilePage2({navigation, route}: any) {
  const [timer, setTimer] = useState(5);
  const [counter, setCounter] = useState(100);
  const [start, setStart] = useState(false);
  const {userId} = useDataContext();

  // ///////////////////////////////////////////////////////////////////////////////
  const [microphonePermission, setMicrophonePermission] = useState(false);
  const [microphoneWorking, setMicrophoneWorking] = useState(false);
  const [percentage, setPercentage] = useState(0);
  // ///////////////////////////////////////////////////////////////////////////////

  function handlePress() {
    // setStart(true);
    const formData = new FormData();

    // Append data to FormData object
    formData.append('UserID', userId);
    formData.append('MicQualityPrecent', '50');
    formData.append('CamQualityPrecent', '80');
    formData.append('TestDate', '2023-03-09');

    console.log('Body Data ---> ', formData);
    fetch(
      'https://b827-39-58-90-52.ngrok-free.app/add_mic_camera_test_report',
      {
        method: 'POST',
        headers: {},
        body: formData,
      },
    )
      .then(response => {
        console.log('My result ===> ', response);

        navigation.push('setupProfile3', route.params);
        // navigation.push('setupProfile2', route.params);
      })
      .catch(error => {
        console.error('here', error);
      });
  }

  useEffect(() => {
    if (start) {
      // console.log('State condition running');
      var timerID = setInterval(() => tick(), 1000);
      return function cleanup() {
        clearInterval(timerID);
      };
    }
  }, [start]);

  function tick() {
    setTimer(timer - 1);
    setCounter(counter - 20);
    if (timer == 0) {
      naviagte();
    }
  }

  const naviagte = () => {
    console.log('2nd', route.params);
    navigation.push('setupProfile3', route.params);
  };

  const naviagteBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <CustomHeader title="Setup Profile" goBack={naviagteBack} />
          <IzzyAILogo style={{marginTop: 60}} />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <BarFilled />
            <BarFilled />
            <BarFilled />
            <Bar />
            <Bar />
          </View>

          <Text style={[styles.base, styles.heading]}>
            Test your microphone & camera
          </Text>
          <View
            style={{
              display: 'flex',
              width: '90%',
              marginTop: 30,
            }}>
            <Text style={[styles.base, styles.labelText]}>
              Record yourself saying something for 5 seconds
            </Text>
            <View
              style={{
                height: 200,
                width: '100%',
                backgroundColor: '#DDDDDD',
                marginTop: 10,
                borderRadius: 16,
              }}></View>

            {/* <LoaderWave isAnimation={playStart} isDark={true} /> */}

            <View
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={[
                  styles.base,
                  {
                    fontSize: 24,
                    textAlign: 'center',
                    marginTop: 10,
                    fontWeight: '500',
                  },
                ]}>
                <Text style={{color: '#FC4343'}}>
                  0:0{timer > 0 ? timer : 0}
                </Text>{' '}
                Seconds Left
              </Text>
              <TouchableOpacity onPress={() => handlePress()}>
                <AnimatedCircularProgress
                  style={{marginTop: 20}}
                  size={90}
                  width={5}
                  fill={counter}
                  tintColor="#FC4343"
                  // onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor="#DADADA"
                  children={ProgressCenter}
                />
              </TouchableOpacity>
            </View>
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
    paddingTop: 30,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    textAlign: 'center',
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

export default SetupProfilePage2;
