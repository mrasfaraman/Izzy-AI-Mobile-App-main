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

function PassagePageTwo({navigation}: any) {
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
          <CustomHeader title="The Rainbow Passage" goBack={naviagteBack} />
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
                  When the sunlight strikes raindrops in the air, they act as a
                  prism and form a rainbow. The rainbow is a division of white
                  light into many beautiful colors. These take the shape of a
                  long round arch, with its path high above, and its two ends
                  apparently beyond the horizon. There is, according to legend,
                  a boiling pot of gold at one end. People look, but no one ever
                  finds it. When a man looks for something beyond his reach, his
                  friends say he is looking for the pot of gold at the end of
                  the rainbow. Throughout the centuries people have explained
                  the rainbow in various ways. Some have accepted it as a
                  miracle without physical explanation. To the Hebrews it was a
                  token that there would be no more universal floods. The Greeks
                  used to imagine that it was a sign from the gods to foretell
                  war or heavy rain. The Norsemen considered the rainbow as a
                  bridge over which the gods passed from earth to their home in
                  the sky. Others have tried to explain the phenomenon
                  physically. Aristotle thought that the rainbow was caused by
                  reflection of the sun's rays by the rain. Since then
                  physicists have found that it is not reflection, but
                  refraction by the raindrops which causes the rainbows. Many
                  complicated ideas about the rainbow have been formed. The
                  difference in the rainbow depends considerably upon the size
                  of the drops, and the width of the colored band increases as
                  the size of the drops increases. The actual primary rainbow
                  observed is said to be the effect of super-imposition of a
                  number of bows. If the red of the second bow falls upon the
                  green of the first, the result is to give a bow with an
                  abnormally wide yellow band, since red and green light when
                  mixed form yellow. This is a very common type of bow, one
                  showing mainly red and yellow, with little or no green or
                  blue.
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
                When he speaks, his voice is just a bit cracked and quivers a
                bit. Twice each day he plays skillfully and with zest upon a
                small organ. Except in the winter when the snow or ice prevents,
                he slowly takes a short
              </Text>
            </View>
          </View>
          <PlayButton onPress={() => navigation.navigate('main')} />
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
});

export default PassagePageTwo;
