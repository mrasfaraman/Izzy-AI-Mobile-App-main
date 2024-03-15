import {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import CustomButton from '../components/Button';

function InstructionsPage({navigation}: any) {
  const naviagte = () => {
    navigation.push('speechArticulationPage');
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
          <CustomHeader title="Instructions" goBack={naviagteBack} />
          <Image
            style={{marginTop: 40}}
            source={require('../assets/images/mouth.png')}
          />

          <Text
            style={[
              styles.base,
              styles.heading,
              {maxWidth: 350, textAlign: 'center'},
            ]}>
            Articulation screening instructions
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 10,
              maxWidth: '80%',
            }}>
            <Text style={[styles.base, {fontSize: 14, fontWeight: '400'}]}>
              {'\u2B24'}
            </Text>
            <Text
              style={[
                styles.base,
                {
                  fontSize: 14,
                  fontWeight: '400',
                  marginLeft: 10,
                },
              ]}>
              You will be shown some images of random objects and you will have
              to pronounce their names with your mic
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 10,
              maxWidth: '80%',
            }}>
            <Text style={[styles.base, {fontSize: 14, fontWeight: '400'}]}>
              {'\u2B24'}
            </Text>
            <Text
              style={[
                styles.base,
                {
                  fontSize: 14,
                  fontWeight: '400',
                  marginLeft: 10,
                },
              ]}>
              Hit “Record” button and start pronouncing the name of the object
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 10,
              maxWidth: '80%',
            }}>
            <Text style={[styles.base, {fontSize: 14, fontWeight: '400'}]}>
              {'\u2B24'}
            </Text>
            <Text
              style={[
                styles.base,
                {
                  fontSize: 14,
                  fontWeight: '400',
                  marginLeft: 10,
                },
              ]}>
              IzzyAi will respond if you pronounced the name correctly
            </Text>
          </View>

          <CustomButton onPress={() => naviagte()} title="Start Now" />
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
    fontSize: 24,
    fontWeight: '500',
  },
});

export default InstructionsPage;
