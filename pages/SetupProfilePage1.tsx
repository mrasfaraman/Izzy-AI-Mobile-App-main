import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import IzzyAILogo from '../assets/IzzyAILogo';
import BarFilled from '../assets/BarFilled';
import Bar from '../assets/Bar';
import {useDataContext} from '../contexts/DataContext';

const CustomButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

function SetupProfilePage1({navigation, route}) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [gender, setGender] = useState('Male');
  const {userId} = useDataContext();

  useEffect(() => {
    console.log('User Data Back ', route.params);
    // Assuming the gender is passed as a parameter called 'gender'
    if (route.params?.gender) {
      setGender(route.params.gender);
    }
  }, [route.params?.gender]);

  const navigateNext = () => {
    if (true) {
      const formData = new FormData();

      // Append data to FormData object
      formData.append('UserID', userId);
      formData.append('AvatarID', selectedAvatar);

      console.log('Body Data ---> ', formData);
      fetch('https://b827-39-58-90-52.ngrok-free.app/update_avatar_id', {
        method: 'PUT',
        headers: {},
        body: formData,
      })
        .then(response => {
          console.log('My result ===> ', response);
          navigation.push('setupProfile2', route.params);
        })
        .catch(error => {
          console.error('here', error);
        });
      // ///////////////////////

      // navigation.push('setupProfile2', route.params); // Pass profileData to the next component
    } else {
      Alert.alert('Please select an avatar');
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const selectAvatar = avatar => {
    console.log('Selecte Avatar ===> ', avatar);
    setSelectedAvatar(avatar);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <CustomHeader title="Setup Profile" goBack={navigateBack} />
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
            <Bar />
            <Bar />
            <Bar />
          </View>

          <Text style={[styles.base, styles.heading]}>Choose your Avatar</Text>

          {gender === 'Male' && (
            <>
              {/* <Text style={[styles.base, styles.labelText]}>Male Avatars</Text> */}
              <View style={styles.avatarRow}>
                <TouchableOpacity
                  onPress={() => selectAvatar(1)}
                  style={[
                    styles.avatarContainer,
                    selectedAvatar === 1 && styles.selectedAvatarContainer,
                  ]}>
                  <Image
                    style={styles.avatarImage}
                    source={require('../assets/images/male1.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => selectAvatar(2)}
                  style={[
                    styles.avatarContainer,
                    selectedAvatar === 2 && styles.selectedAvatarContainer,
                  ]}>
                  <Image
                    style={styles.avatarImage}
                    source={require('../assets/images/male2.png')}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}

          {(gender === 'Transgender' || gender === 'Prefer not to say') && (
            <>
              <Text style={[styles.base, styles.labelText]}>Male Avatars</Text>
              <View style={styles.avatarRow}>
                <TouchableOpacity
                  onPress={() => selectAvatar(1)}
                  style={[
                    styles.avatarContainer,
                    selectedAvatar === require('../assets/images/male1.png') &&
                      styles.selectedAvatarContainer,
                  ]}>
                  <Image
                    style={styles.avatarImage}
                    source={require('../assets/images/male1.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => selectAvatar(2)}
                  style={[
                    styles.avatarContainer,
                    selectedAvatar === require('../assets/images/male2.png') &&
                      styles.selectedAvatarContainer,
                  ]}>
                  <Image
                    style={styles.avatarImage}
                    source={require('../assets/images/male2.png')}
                  />
                </TouchableOpacity>
              </View>

              <Text style={[styles.base, styles.labelText]}>
                Female Avatars
              </Text>
              <View style={styles.avatarRow}>
                <TouchableOpacity
                  onPress={() => selectAvatar(3)}
                  style={[
                    styles.avatarContainer,
                    selectedAvatar ===
                      require('../assets/images/female1.png') &&
                      styles.selectedAvatarContainer,
                  ]}>
                  <Image
                    style={styles.avatarImage}
                    source={require('../assets/images/female1.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => selectAvatar(3)}
                  style={[
                    styles.avatarContainer,
                    selectedAvatar ===
                      require('../assets/images/female2.png') &&
                      styles.selectedAvatarContainer,
                  ]}>
                  <Image
                    style={styles.avatarImage}
                    source={require('../assets/images/female2.png')}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}

          {gender === 'Female' && (
            <>
              {/* <Text style={[styles.base, styles.labelText]}>
                Female Avatars
              </Text> */}
              <View style={styles.avatarRow}>
                <TouchableOpacity
                  onPress={() => selectAvatar(3)}
                  style={[
                    styles.avatarContainer,
                    selectedAvatar ===
                      require('../assets/images/female1.png') &&
                      styles.selectedAvatarContainer,
                  ]}>
                  <Image
                    style={styles.avatarImage}
                    source={require('../assets/images/female1.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => selectAvatar(3)}
                  style={[
                    styles.avatarContainer,
                    selectedAvatar ===
                      require('../assets/images/female2.png') &&
                      styles.selectedAvatarContainer,
                  ]}>
                  <Image
                    style={styles.avatarImage}
                    source={require('../assets/images/female2.png')}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Add conditions and avatar components for other genders if needed */}

          <CustomButton onPress={navigateNext} title="Next" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'SF-Pro-Display-Regular',
    color: '#111920',
    marginBottom: 10,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '100%',
    padding: 20,
  },
  heading: {
    paddingTop: 30,
    fontSize: 24,
    fontWeight: '500',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 10,
    marginRight: 200,
    textAlign: 'left',
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
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 50,
    marginTop: 10,
  },
  avatarContainer: {
    borderWidth: 0,
    borderRadius: 10,
  },
  selectedAvatarContainer: {
    borderWidth: 2,
    borderColor: '#2DEEAA',
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});

export default SetupProfilePage1;
