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
import {LinearProgress} from '@rneui/themed';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import CustomHeader from '../components/CustomHeader';
import {useDataContext} from '../contexts/DataContext';
import {background} from 'native-base/lib/typescript/theme/styled-system';

const DarkButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.darkButton1, {width: '45%'}]}>
      <Text style={styles.darkButtonText1}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const LightButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.lightButton1, {width: '45%'}]}>
      <Text style={styles.lightButtonText1}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const ProgressTextRight = ({text}: any) => {
  return (
    <Text
      style={[
        styles.base,
        {
          fontSize: 52,
          fontWeight: '500',
          color: '#71D860',
          textAlign: 'center',
        },
      ]}>
      {text}%
    </Text>
  );
};

function ResultReportArticulation({navigation}: any) {
  const {articulationReport} = useDataContext();
  const length = articulationReport.length;
  const correct = 40 - length;
  const percentage = (correct / 40) * 100;
  console.log('incorrects', length);
  console.log('corrects', correct);
  console.log('percentage', Math.round(percentage));

  const naviagte = () => {
    navigation.push('assessmentPage');
  };

  const naviagteBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <CustomHeader title="Result Report" goBack={naviagteBack} />

          <View style={{alignItems: 'center', marginTop: 40}}>
            <AnimatedCircularProgress
              size={250}
              width={30}
              fill={percentage}
              tintColor="#71D860"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#FC4343"
              children={() => <ProgressTextRight text={percentage} />}
            />
          </View>

          <View
            style={{
              width: '95%',
              marginHorizontal: 'auto',
              // backgroundColor: 'red',
              display: 'flex',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <Text
              style={[
                styles.base,
                {
                  fontSize: 18,
                  textAlign: 'left',
                  paddingHorizontal: 20,
                },
              ]}>
              Correct Answers
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                paddingHorizontal: 20,
              }}>
              <LinearProgress
                style={{
                  marginVertical: 10,
                  borderRadius: 16,
                  height: 7,
                }}
                value={percentage / 100}
                variant="determinate"
                color="#71D860"
              />
              <Text style={[styles.base, styles.para]}>{percentage}</Text>
            </View>
          </View>

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
                  marginTop: 15,
                  textAlign: 'left',
                  paddingHorizontal: 20,
                },
              ]}>
              Incorrect Answers
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '90%',
                paddingHorizontal: 20,
              }}>
              <LinearProgress
                style={{
                  marginVertical: 10,
                  borderRadius: 16,
                  height: 7,
                }}
                value={(100 - percentage) / 100}
                variant="determinate"
                color="#FC4343"
              />
              <Text style={[styles.base, styles.para]}>{100 - percentage}</Text>
            </View>
          </View>

          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <Text style={[styles.base, {fontSize: 18}]}>
              List of incorrect Pronunciations:
            </Text>
            <View style={{marginTop: 10}}>
              {articulationReport.map((string: string, index: number) => (
                <Text
                  key={index}
                  style={[
                    styles.base,
                    {fontSize: 18, fontWeight: '500', marginLeft: 20},
                  ]}>
                  <Text style={{color: 'red', textTransform: 'uppercase'}}>
                    {string[0]}
                  </Text>
                  {string.substring(1)}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 20,
            marginTop: 30,
          }}>
          <LightButton
            title="Retry All"
            onPress={() => navigation.navigate('instructionsPage')}
          />
          <DarkButton
            title="Back to Home"
            onPress={() => navigation.navigate('home')}
          />
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
  darkButton1: {
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#111920',
    padding: 10,
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 25,
    paddingRight: 25,
  },
  para: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 15,
  },
  darkButtonText1: {
    color: '#fff',
    fontWeight: '600',
  },
  lightButton1: {
    borderRadius: 50,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 25,
    paddingRight: 25,
    borderWidth: 2,
    borderColor: '#FC4343',
  },
  lightButtonText1: {
    color: '#FC4343',
    fontWeight: '600',
  },
});

export default ResultReportArticulation;
