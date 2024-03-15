import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import IzzyAILogo from '../assets/IzzyAILogo';
import BlackDot from '../assets/BlackDot';
import WhiteDot from '../assets/WhiteDot';
import MicroPhoneIconGradient from '../assets/MicrophoneIconWithGradient';
import CustomButton from '../components/Button';

function GettingStartedPageOne({navigation}: any) {
  const navigate = () => {
    navigation.push('startedTwo');
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
          <IzzyAILogo style={{marginTop: 60}} />

          <Text style={[styles.base, styles.heading]}>Dummy heading 1</Text>
          <Text style={[styles.base, styles.para]}>
            Hello there! you can start saying words you feel difficult to
            pronounce
          </Text>
          <View style={styles.svgContainer}>
            <BlackDot style={styles.baseDot} />
            <WhiteDot style={styles.baseDot} />
            <WhiteDot style={styles.baseDot} />
          </View>
          {/* <View style={styles.secondContainer}>
        <View style={styles.micContainer}>
          <MicroPhoneIconGradient />
          <Text style={[styles.base, styles.micText]}>izzy</Text>
        </View>
        <View>
          <Text style={[styles.base, styles.para2]}>
            Hello there! you can start saying words you feel difficult to
            pronounce
          </Text>
        </View>
      </View> */}
          <Image
            style={styles.img}
            source={require('../assets/images/getStarted1.png')}
          />
          <View style={styles.btnContainer}>
            <CustomButton onPress={() => navigate()} title="Get Started" />
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
  heading: {
    paddingTop: 50,
    fontSize: 32,
    fontWeight: '500',
  },
  para: {
    paddingTop: 5,
    fontSize: 16,
    paddingHorizontal: 30,
    textAlign: 'center',
    fontWeight: '400',
  },
  svgContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
    fontSize: 16,
    paddingHorizontal: 30,
    textAlign: 'center',
    fontWeight: '400',
  },
  baseDot: {
    marginHorizontal: 3,
  },
  // secondContainer: {
  //   marginTop: 40,
  //   paddingHorizontal: 30,
  //   display: 'flex',
  //   flexDirection: 'row',
  // },
  // micContainer: {
  //   display: 'flex',
  //   justifyContent: 'center',
  // },
  // micText: {
  //   textAlign: 'center',
  // },
  // para2: {
  //   paddingTop: 5,
  //   fontSize: 14,
  //   paddingHorizontal: 30,
  //   fontWeight: '400',
  //   marginTop: 10,
  // },
  img: {
    marginTop: 10,
  },
  btnContainer: {
    marginTop: 'auto',
  },
});

export default GettingStartedPageOne;
