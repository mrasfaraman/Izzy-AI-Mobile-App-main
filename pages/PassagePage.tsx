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
  Platform,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVModeIOSOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import CustomHeader from '../components/CustomHeader';
import SearchIcon from '../assets/SearchIcon';
import LinearGradient from 'react-native-linear-gradient';
import CalenderIcon from '../assets/CalenderIcon';
import ReportDetails from '../components/ReportDetails';
import WaveSVG from '../assets/Wave';

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

const DarkButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={styles.recordButton}>
      <Text style={styles.recordButtonText}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const audioRecorderPlayer = new AudioRecorderPlayer();

const backendURL = 'https://3bf6-39-36-205-255.ngrok-free.app/predict';
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

function PassagePage({navigation}: any) {
  const [status, setStatus] = useState('idle');
  const [backendResponse, setBackendResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const naviagteBack = () => {
    navigation.goBack();
  };

  ////////////////////////////////////////////////////////////

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
    formData.append('file', {
      uri: result,
      // type: 'audio/mp4',
      // name: 'sound.mp4',
      type: 'audio/wav',
      name: 'sound.wav',
    });

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      setLoading(true);
      const response = await fetch(backendURL, options);
      const data = await response.json();

      if (data) {
        setLoading(false);
        setBackendResponse(data.predictions);
      }
      console.log(data);
    } catch (error) {
      console.error('Network request failed:', error);
    }

    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    console.log(result);
  };

  const onStartPlay = async () => {
    setPlayStart(true);
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
    });
    console.log('When Complete Stop');
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = () => {
    setPlayStart(false);
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  useEffect(() => {
    if (playTime == duration) {
      setPlayStart(false);
    }
  }, [playTime]);

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
          <CustomHeader title="Grandfather Passage" goBack={naviagteBack} />
          <View
            style={{
              borderWidth: 1,
              borderColor: '#000',
              margin: 20,
              marginTop: 30,
            }}>
            <View
              style={{
                height: 300,
                borderWidth: 1,
                borderColor: '#0CC8E8',
                borderRadius: 16,
                padding: 20,
              }}>
              <Text style={[styles.base, {fontSize: 20, marginTop: 10}]}>
                Read this Paragraph:
              </Text>
              <ScrollView
                indicatorStyle="black"
                showsVerticalScrollIndicator={true}>
                <Text style={[styles.base, {fontSize: 32, marginTop: 10}]}>
                  Well, he is nearly 93 years old, yet he still thinks as
                  swiftly as ever. He dresses himself in an old black frock
                  coat, usually several buttons missing. A long beard clings to
                  his chin, giving those who observe him a pronounced feeling of
                  the utmost respect. When he speaks, his voice is just a bit
                  cracked and quivers a bit. Twice each day he plays skillfully
                  and with zest upon a small organ. Except in the winter when
                  the snow or ice prevents, he slowly takes a short walk in the
                  open air each day. We have often urged him to walk more and
                  smoke less, but he always answers, “Banana oil!” Grandfather
                  likes to be modern in his language.
                </Text>
              </ScrollView>
            </View>
            <View
              style={{
                height: 300,
                marginTop: 20,
                backgroundColor: '#111920',
                borderRadius: 16,
                padding: 20,
              }}>
              <Text
                style={[
                  styles.base,
                  {color: '#fff', fontSize: 20, marginTop: 10},
                ]}>
                Speech Output:
              </Text>
              <Text
                style={[
                  styles.base,
                  {color: '#fff', marginTop: 10, fontSize: 18, lineHeight: 30},
                ]}>
                {/* When he speaks, his voice is just a bit cracked and quivers a
                bit. Twice each day he plays skillfully and with zest upon a
                small organ. Except in the winter when the snow or ice prevents,
                he slowly takes a short */}
                {loading && 'Loading Response'}
                {!loading && backendResponse
                  ? // ? `Label: ${backendResponse.Label} Score: ${backendResponse.Score}`
                    `${backendResponse.Label}`
                  : ''}
              </Text>
            </View>
          </View>
          {/* <PlayButton onPress={() => navigation.navigate('main')} /> */}
          {status == 'idle' && (
            <DarkButton
              onPress={() => {
                setStatus('recording');
                onStartRecord();
              }}>
              {'\u2B24'} Record
            </DarkButton>
          )}
          {status == 'recording' && (
            <PlayButton
              onPress={() => {
                setStatus('stop');
                onStopRecord();
              }}
            />
          )}
          {status == 'stop' && (
            <DarkButton onPress={() => navigation.navigate('main')}>
              Back to Home
            </DarkButton>
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
    marginBottom: '5%',
  },
  recordButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default PassagePage;
