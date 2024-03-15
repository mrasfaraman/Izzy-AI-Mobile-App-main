import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import {useState} from 'react';
import {useDataContext} from '../contexts/DataContext';

function ProfileTypePage({navigation}: any) {
  const {userId} = useDataContext();

  const navigate = () => {
    navigation.push('setupProfile');
  };
  const naviagteBack = () => {
    navigation.goBack();
  };

  const selecteProfileType = (type: any) => {
    const formData = new FormData();

    // Append data to FormData object
    formData.append('UserID', userId);
    formData.append('NewUserType', type);

    console.log('Body Data ---> ', formData);
    fetch('https://b827-39-58-90-52.ngrok-free.app/update_user_type', {
      method: 'PUT',
      headers: {},
      body: formData,
    })
      .then(response => {
        console.log('My result ===> ', response);
        navigation.push('setupProfile');
      })
      .catch(error => {
        console.error('here', error);
      });
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
          <CustomHeader title="Profile Type" goBack={naviagteBack} />
          <View style={styles.subContainer}>
            <Text style={[styles.base, styles.heading]}>
              Choose a Profile Type:
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 25,
              }}>
              <TouchableOpacity
                // onPress={() => navigate()}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <Image source={require('../assets/images/avatarImage.png')} />
                <Text style={[styles.base]}>Caregiver</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => selecteProfileType('user')}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <Image source={require('../assets/images/avatarImage.png')} />
                <Text style={[styles.base]}>User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() => navigate()}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <Image source={require('../assets/images/avatarImage.png')} />
                <Text style={[styles.base]}>Clinician</Text>
              </TouchableOpacity>
            </View>
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
  container: {
    height: '100%',
    display: 'flex',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {fontSize: 24, fontWeight: '500'},
});

export default ProfileTypePage;
