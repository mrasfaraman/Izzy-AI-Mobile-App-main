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
import VideoPlayer from '../components/VideoPlayer';
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

function SpeechExercisePage({navigation}: any) {
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
    // const path = `./voices/_izzyvoice_${new Date().getTime()}.mp3`;
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
    formData.append('text', exerciseData.text || '');
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

      if (data.message == 'Matched') {
        setShowVideo(false);
        setExerciseCount(exerciseCount + 1);
        setRecordingStatus('stop');
      } else {
        setIncorrectQuestions([
          ...incorrentQuestions,
          formData.getAll('text')[0],
        ]);
        console.log(incorrentQuestions);
        setRecordingStatus('idle');
        setShowVideo(true);
      }
      console.log('_______Response data______:', data);
    } catch (error) {
      console.error('Network request failed:', error);
    }

    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    console.log(result);
  };

  // const onStartPlay = async () => {
  //   setPlayStart(true);
  //   console.log('onStartPlay');
  //   const msg = await audioRecorderPlayer.startPlayer();
  //   console.log(msg);
  //   audioRecorderPlayer.addPlayBackListener(e => {
  //     setCurrentPositionSec(e.currentPosition);
  //     setCurrentDurationSec(e.duration);
  //     setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
  //     setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
  //   });
  //   console.log('When Complete Stop');
  // };

  // const onPausePlay = async () => {
  //   await audioRecorderPlayer.pausePlayer();
  // };

  // const onStopPlay = () => {
  //   setPlayStart(false);
  //   console.log('onStopPlay');
  //   audioRecorderPlayer.stopPlayer();
  //   audioRecorderPlayer.removePlayBackListener();
  // };

  useEffect(() => {
    if (playTime == duration) {
      setPlayStart(false);
    }
  }, [playTime]);

  const [exerciseData, setExerciseData] = useState(null);
  const [exerciseCount, setExerciseCount] = useState(1);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [showVideo, setShowVideo] = useState(false);
  const [incorrentQuestions, setIncorrectQuestions] = useState([]);

  const {setExercisesReport} = useDataContext();

  const fetchExerciseData = async (id: any) => {
    try {
      const response = await fetch(`${BaseURL}/data/${id}`);
      const data = await response.json();
      setExerciseData(data);
      console.log('______Image Data_____:', data);
    } catch (error) {
      console.error('Network request failed:', error);
    }
  };

  const naviagte = () => {
    navigation.navigate('resultReport');
  };

  useEffect(() => {
    if (exerciseCount > 3) {
      setExercisesReport(incorrentQuestions);
      naviagte();
    } else {
      fetchExerciseData(exerciseCount);
    }
  }, [exerciseCount]);

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
          <CustomHeader title="Speech Exercise" goBack={naviagteBack} />

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
              Exercise{' '}
              <Text style={{fontWeight: '700'}}> {exerciseCount} </Text>
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
              {exerciseData && (
                <Image
                  style={{marginVertical: 20, width: 200, height: 200}}
                  // source={require('../assets/images/piano.png')}
                  source={{uri: exerciseData.image_path}}
                />
              )}
            </View>
          </View>

          <ScrollView style={{marginVertical: 20}}>
            <Text style={[styles.base, {fontSize: 18, fontWeight: '500'}]}>
              Say This...
            </Text>

            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text
                style={[
                  styles.base,
                  {
                    color: '#FC4343',
                    fontSize: 32,
                    fontWeight: '500',
                    textTransform: 'uppercase',
                  },
                ]}>
                {exerciseData && exerciseData.text[0]}
              </Text>
              <Text style={[styles.base, {fontSize: 32, fontWeight: '500'}]}>
                {exerciseData ? exerciseData.text.substring(1) : 'loading'}
              </Text>
            </View>
            {showVideo && (
              <VideoPlayer
                source={{
                  // uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  uri: exerciseData.video_path,
                }}
              />
            )}
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
              }}
              title="Next Exercise"
            />
          )}

          {recordingStatus == 'loading' && (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={[styles.base, {fontSize: 32, fontWeight: '500'}]}>
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

export default SpeechExercisePage;
