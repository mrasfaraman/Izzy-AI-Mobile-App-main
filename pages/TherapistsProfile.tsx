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

const CustomButton = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={styles.button}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

function TherapistProfilePage({navigation}: any) {
  const naviagte = () => {
    navigation.push('therapistName');
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
          <CustomHeader title="Therapists" goBack={naviagteBack} />

          <Image
            style={styles.img}
            source={require('../assets/images/TherapistImage.png')}
          />

          <Text style={[styles.base, styles.title]}>Hey 👋 myself AI SLP</Text>
          <Text style={[styles.base, styles.para]}>
            Egestas ut nam leo tristique. Sed sit commodo volutpat in quisque.
            Egestas dictum in risus pulvinar elementum cursus. Egestas ut nam
            leo tristique. Sed sit commodo volutpat in quisque. Egestas dictum
            in risus pulvinar elementum cursus. Egestas ut nam leo tristique.
            Sed sit commodo volutpat in quisque. Egestas dictum in risus
            pulvinar elementum cursus.{' '}
          </Text>

          {/* <Text>
          itemId: {JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>
          otherParam:
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text> */}

          <CustomButton onPress={() => naviagte()} title="Contact AI SLP" />
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
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '500',
  },
  para: {
    fontSize: 16,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  img: {
    marginTop: 40,
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
    marginTop: 'auto',
    marginBottom: '10%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default TherapistProfilePage;
