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
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../components/CustomHeader';
import ChevronDownWhite from '../../assets/ChevronDownWhite';
import GearIcon from '../../assets/GearIcon';
import GradientChevronRight from '../../assets/GradientChevronRight';
import UserBioIcon from '../../assets/UserBioIcon';
import QuestionMarkIcon from '../../assets/QuestionMarkIcon';
import LogoutIcon from '../../assets/LogoutIcon';

const DarkButton = ({ navigation }: any) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('myProfilesPage')}
      style={styles.darkButton}>
      <Text style={styles.buttonText}>
        Switch account <ChevronDownWhite />
      </Text>
    </TouchableOpacity>
  );
};

function ProfilePage({ navigation }: any) {
  const naviagteBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View style={{ minHeight: '100%' }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
          }}>
          <CustomHeader title="My Profile" goBack={naviagteBack} />
          <View style={{ width: '85%' }}>
            <LinearGradient
              colors={['#0cc8e81f', '#2deeaa1f']}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              style={[styles.linearGradient, { marginTop: 40 }]}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 18,
                }}>
                <Image
                  source={require('../../assets/images/avatar.png')}
                  style={{ height: 80, width: 80, borderRadius: 1000 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={[styles.base, { fontSize: 20, fontWeight: '500' }]}>
                    Anna Soronio
                  </Text>
                  <Text
                    style={[styles.base, { fontSize: 16, fontWeight: '500' }]}>
                    Anna@gmail.com
                  </Text>
                  <DarkButton navigation={navigation} />
                </View>
              </View>
            </LinearGradient>
          </View>

          <View style={{ width: '85%' }}>
            <LinearGradient
              colors={['#0cc8e81f', '#2deeaa1f']}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              style={[styles.linearGradient, { marginTop: 20 }]}>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 20,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <GearIcon />
                  <Text
                    style={[
                      styles.base,
                      { marginLeft: 10, fontSize: 15, fontWeight: '500' },
                    ]}>
                    Settings
                  </Text>
                </View>
                <GradientChevronRight />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={{ width: '85%' }}>
            <LinearGradient
              colors={['#0cc8e81f', '#2deeaa1f']}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              style={[styles.linearGradient, { marginTop: 20 }]}>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 20,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <UserBioIcon />
                  <Text
                    style={[
                      styles.base,
                      { marginLeft: 10, fontSize: 15, fontWeight: '500' },
                    ]}>
                    Bio Data
                  </Text>
                </View>
                <GradientChevronRight />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={{ width: '85%' }}>
            <LinearGradient
              colors={['#0cc8e81f', '#2deeaa1f']}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              style={[styles.linearGradient, { marginTop: 20 }]}>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 20,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <QuestionMarkIcon />
                  <Text
                    style={[
                      styles.base,
                      { marginLeft: 10, fontSize: 15, fontWeight: '500' },
                    ]}>
                    About App
                  </Text>
                </View>
                <GradientChevronRight />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={{ width: '85%' }}>
            <LinearGradient
              colors={['#0cc8e81f', '#2deeaa1f']}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 0.0 }}
              style={[styles.linearGradient, { marginTop: 20 }]}>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 20,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <LogoutIcon />
                  <Text
                    style={[
                      styles.base,
                      { marginLeft: 10, fontSize: 15, fontWeight: '500' },
                    ]}>
                    Logout
                  </Text>
                </View>
                <GradientChevronRight />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  base: {
    fontFamily: 'SF-Pro-Display-Regular',
    color: '#111920',
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    margin: 5,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  darkButton: {
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#111920',
    display: 'flex',
    // justifyContent: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 10,
    width: 150,
  },
});

export default ProfilePage;
