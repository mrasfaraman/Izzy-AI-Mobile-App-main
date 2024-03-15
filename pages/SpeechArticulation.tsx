import {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {LinearProgress} from '@rneui/themed';
import CustomHeader from '../components/CustomHeader';
import AudioWaveSVG from '../assets/AudioWave';
import WaveSVG from '../assets/Wave';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVModeIOSOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import {useDataContext} from '../contexts/DataContext';
import BaseURL from '../components/ApiCreds';
const audioRecorderPlayer = new AudioRecorderPlayer();

const dirs = RNFetchBlob.fs.dirs;
// const path = Platform.select({
//   ios: 'hello.mp4',
//   android: `${dirs.CacheDir}/sound.mp4`,
// });
const path = Platform.select({
  ios: 'hello.wav',
  android: `${dirs.CacheDir}/${new Date().getTime()}.wav`,
});
const audioSet: AudioSet = {
  // -----For .wav format
  AudioSourceAndroid: AudioSourceAndroidType.MIC,
  OutputFormatAndroid: OutputFormatAndroidType.DEFAULT,
  AudioEncoderAndroid: AudioEncoderAndroidType.AMR_NB,
  AudioSamplingRateAndroid: 44100,
  AudioChannelsAndroid: 2,
  AudioEncodingBitRateAndroid: 128000,

  // -----For .mp4 format
  // AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  // AudioSourceAndroid: AudioSourceAndroidType.MIC,
  // AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  // AVNumberOfChannelsKeyIOS: 2,
  // AVFormatIDKeyIOS: AVEncodingOption.aac,
};

const RecordButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={styles.recordButton}>
      <Text style={styles.recordButtonText}>
        {'\u2B24'} {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const NextButton = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={styles.nextButton}>
      <Text style={styles.nextButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const PlayButton = (props: any) => {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: '#FC4343',
        marginBottom: '10%',
        padding: 5,
        borderRadius: 100,
      }}>
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={styles.playButton}>
        <WaveSVG />
      </TouchableOpacity>
    </View>
  );
};

const IzzyDialogue = ({showSecondLine, question, secondLine = ''}: any) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        marginTop: 30,
        marginLeft: 20,
      }}>
      <Image key="image" source={require('../assets/images/izzy-bot.png')} />
      <View style={{marginLeft: 15, marginTop: 0}}>
        <Text
          key="question"
          style={[styles.base, {maxWidth: 230, fontSize: 15}]}>
          {question}
        </Text>
        {showSecondLine && (
          <Text
            key="secondLine"
            style={[styles.base, {marginTop: 5, maxWidth: 230}]}>
            {''}
            <Text
              style={[styles.base, {color: 'red', textTransform: 'uppercase'}]}>
              {secondLine.length > 0 ? secondLine[0] : ''}
            </Text>
            {secondLine.substring(1)}
          </Text>
        )}
      </View>
    </View>
  );
};

const UserDialogue = ({showSecondLine, username}: any) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '90%',
        marginTop: 30,
        marginRight: 20,
      }}>
      <AudioWaveSVG />
      <View style={{marginLeft: 10, marginTop: 10}}>
        <Image
          style={{height: 32, width: 32, borderRadius: 100}}
          source={require('../assets/images/avatar.png')}
        />
        <Text style={[styles.base, {textAlign: 'center'}]}>{username}</Text>
      </View>
    </View>
  );
};

function SpeechArticulationPage({navigation}: any) {
  ///////////////////////////////////////////////
  const [recordStart, setRecordStart] = useState(false);
  const [playStart, setPlayStart] = useState(false);
  const [playBtnDisable, setPlayBtnDisable] = useState(true);

  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');

  // Targeted Time In Second
  const [targetTimeInSeconds, setTargetTimeInSeconds] = useState(0);
  const [dynamicTimeInSeconds, setDynamicTimeInSeconds] = useState(0);

  useEffect(() => {
    const timeToSeconds = (time: any) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };
    setTargetTimeInSeconds(timeToSeconds(duration));
  }, [duration]);

  useEffect(() => {
    const timeToSeconds = (time: any) => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };
    setDynamicTimeInSeconds(timeToSeconds(playTime));
  }, [playTime]);

  useEffect(() => {
    console.log('Target Time ===> ', targetTimeInSeconds);
    console.log('Dynamic Time ===> ', dynamicTimeInSeconds);
  }, [dynamicTimeInSeconds]);

  const progressPercentage = (dynamicTimeInSeconds / targetTimeInSeconds) * 100;
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  useEffect(() => {
    console.log(`Curent Position ===> `, currentPositionSec);
  }, [currentPositionSec]);

  const onStartRecord = async () => {
    setPlayBtnDisable(true);
    setRecordStart(true);
    const result = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    setPlayBtnDisable(false);
    setRecordStart(false);
    const result = await audioRecorderPlayer.stopRecorder();

    const formData = new FormData();
    formData.append('audio', {
      uri: result,
      // type: 'audio/mp4',
      // name: 'sound.mp4',
      type: 'audio/wav',
      name: 'sound.wav',
    });
    formData.append('text', questionData.text || '');

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      setRecordingStatus('loading');
      const response = await fetch(BaseURL + '/process_speech', options);
      const data = await response.json();
      console.log('response of rec : ', data);

      if (data.message == 'Matched') {
        setQuestionResponse('Correct!');
        setCorrectAnswersCount(prevCount => prevCount + 1); // Increment correct answers count
      } else {
        setIncorrectQuestions(prevQuestions => [
          ...prevQuestions,
          questionData.text,
        ]);
        setQuestionResponse('Incorrect!');
      }
      setRecordingStatus('stop');
    } catch (error) {
      console.error('Network request failed:', error);
      setRecordingStatus('stop');
    }

    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    console.log(result);
  };

  useEffect(() => {
    if (playTime == duration) {
      setPlayStart(false);
    }
  }, [playTime]);

  const [questionResponse, setQuestionResponse] = useState('');
  const [questionData, setQuestionData] = useState(null);
  const [questionCount, setQuestionCount] = useState(1);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);

  const {setArticulationReport}: any = useDataContext();

  const fetchQuestionData = async (id: any) => {
    console.log('Rao ', questionData.WordID);
    try {
      const response = await fetch(`${BaseURL}/get_assess_word/?word_id=${15}`);
      const data = await response.json();
      console.log('response data ==> ', data);
      if (data.message == 'Completed' || questionCount >= 40) {
        setArticulationReport(incorrectQuestions);
        navigate();
      }
      setQuestionData(data);
      console.log('______Image Data_____:', data);
    } catch (error) {
      console.error('Network request failed:', error);
    }
  };

  const navigate = () => {
    const correctAnswersCount = questionCount - 1 - incorrectQuestions.length;
    navigation.navigate('resultReport', {
      correctAnswers: correctAnswersCount,
      incorrectAnswers: incorrectQuestions.length,
      incorrectQuestions: incorrectQuestions,
    });
  };

  useEffect(() => {
    console.log(incorrectQuestions);
    // if (questionCount > 3) {
    //   setArticulationReport(incorrectQuestions);
    //   naviagte();
    // } else {
    setQuestionResponse('');
    fetchQuestionData(questionCount);
    // }
  }, [questionCount]);

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
          <CustomHeader title="Speech Articulation" goBack={naviagteBack} />

          <View
            style={{
              width: '95%',
              marginHorizontal: 'auto',
              // backgroundColor: 'red',
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                styles.base,
                {
                  fontSize: 18,
                  marginTop: 50,
                  textAlign: 'left',
                  paddingHorizontal: 20,
                },
              ]}>
              Question{' '}
              <Text style={{fontWeight: '700'}}> {questionCount} </Text>
              out of
              <Text style={{fontWeight: '700'}}> 40</Text>
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                paddingHorizontal: 20,
                marginTop: 10,
              }}>
              <LinearProgress
                style={{
                  marginVertical: 10,
                  borderRadius: 16,
                  height: 7,
                }}
                value={0.02}
                variant="determinate"
                color="#FF7A2F"
              />
              <Text style={[styles.base, styles.para]}>2%</Text>
            </View>
            {/* Results Display Section */}
            {/* <View style={styles.resultsDisplayContainer}>
              <Text style={[styles.base, {fontSize: 18}]}>
                Correct Answers: {correctAnswersCount}
              </Text>
              <Text style={[styles.base, {fontSize: 18}]}>
                Incorrect Answers: {incorrectQuestions.length}
              </Text>
            </View> */}

            <View
              style={{
                borderWidth: 1,
                borderColor: '#0CC8E8',
                borderRadius: 16,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                paddingHorizontal: 20,
                marginHorizontal: 20,
              }}>
              {questionData && (
                <Image
                  style={{marginVertical: 20, width: 200, height: 200}}
                  // source={require('../assets/images/piano.png')}
                  source={{uri: `${BaseURL}${questionData.SoundName}`}}
                />
              )}
            </View>
          </View>

          <ScrollView style={{marginVertical: 5}}>
            {questionData && (
              <IzzyDialogue
                question="Say this..."
                secondLine={questionData && questionData.Word}
                showSecondLine
              />
            )}
            {/* <UserDialogue username="You" /> */}
            {questionResponse && <IzzyDialogue question={questionResponse} />}
          </ScrollView>
          {recordingStatus == 'idle' && (
            <RecordButton
              onPress={() => {
                onStartRecord();
                setRecordingStatus('recording');
              }}
              title="Record"
            />
          )}

          {recordingStatus == 'recording' && (
            <PlayButton
              onPress={() => {
                onStopRecord();
              }}
              title="Record"
            />
          )}

          {recordingStatus == 'stop' && (
            <NextButton
              onPress={() => {
                setRecordingStatus('idle');
                setQuestionResponse(''); // Clear previous response
                setQuestionCount(prevCount => prevCount + 1); // Correctly increment question count
              }}
              title="Next Question"
            />
          )}

          {recordingStatus == 'loading' && (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={[styles.base, {fontSize: 24, fontWeight: '500'}]}>
                loading please wait...
              </Text>
            </View>
          )}
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
  // Define the resultsDisplayContainer style here
  resultsDisplayContainer: {
    alignItems: 'center',
    marginTop: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#f0f0f0', // light gray background for visibility
  },
  resultsContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0, // Adjust based on your layout
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 2, // For better spacing between result texts
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '100%',
  },
  heading: {
    paddingTop: 50,
    fontSize: 24,
    fontWeight: '500',
  },
  para: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 15,
  },
  textInputContainer: {
    marginTop: 15,
    width: '100%',
    paddingHorizontal: 25,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
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
  nextButton: {
    width: '85%',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#71D860',
    padding: 10,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    // marginTop: 120,
    marginBottom: '10%',
  },
  nextButtonText: {
    color: '#111920',
    fontWeight: '600',
  },
  playButton: {
    width: '85%',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#FC4343',
    padding: 10,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  recordButton: {
    width: '85%',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#111920',
    padding: 10,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: '10%',
  },
  recordButtonText: {
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

export default SpeechArticulationPage;
