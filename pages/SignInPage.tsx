import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import IzzyAILogo from '../assets/IzzyAILogo';
import EmailIcon from '../assets/EmailIcon';
import LockIcon from '../assets/LockIcon';
import EyeOnIcon from '../assets/EyeOnIcon';
import GoogleIcon from '../assets/GoogleIcon';
import AppleIcon from '../assets/AppleIcon';
import CustomHeader from '../components/CustomHeader';
import {useDataContext} from '../contexts/DataContext';

const CustomButton = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={styles.button}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

function SignInPage({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState('');

  const {updateUserId} = useDataContext();

  const handleLogin = () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email address');
      return;
    }

    const userData = {
      Email: email,
      PasswordHash: password,
    };

    console.log('App credentail', userData);

    fetch('https://b827-39-58-90-52.ngrok-free.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        updateUserId(data.USERID);
        if (data.error) {
          setError(data.error);
        } else {
          navigation.push('profileType');
        }
      })
      .catch(error => {
        // navigation.push('profileType');
        console.error(error);
        setError('An error occurred while signing in');
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 10000);

    return () => clearTimeout(timer);
  }, [error]);

  const isValidEmail = (email: string) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <CustomHeader title="Sign In" goBack={() => navigation.goBack()} />
          <IzzyAILogo style={{marginTop: 60}} />

          <View style={styles.textInputContainer}>
            <Text style={[styles.base, styles.labelText]}>
              Email<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <EmailIcon />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor={'#D6D8C0'}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={[styles.base, styles.labelText]}>
              Password<Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputContainer}>
              <LockIcon />
              <TextInput
                style={styles.textInput}
                secureTextEntry={hidePassword}
                placeholder="Password"
                placeholderTextColor={'#D6D8C0'}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                <EyeOnIcon />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.base, styles.forgotPassword]}>
            Forget Password?
          </Text>

          <Text style={[styles.base, styles.heading]}>Sign in to continue</Text>
          {error ? (
            <Text style={{color: 'red', marginTop: 20}}>{error}</Text>
          ) : null}
          <CustomButton onPress={handleLogin} title="Login" />
          <View style={{marginTop: 10, display: 'flex', flexDirection: 'row'}}>
            <Text style={[styles.base, styles.text]}>
              Don’t have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.push('signUpPage')}>
              <Text style={[styles.base, styles.bold, styles.text]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: '#E0E0E0',
                width: '40%',
                marginHorizontal: 30,
              }}></View>
            <Text
              style={{
                fontFamily: 'SF-Pro-Display-Regular',
                color: '#7E7E7E',
              }}>
              OR
            </Text>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: '#E0E0E0',
                width: '40%',
                marginHorizontal: 20,
              }}></View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 20}}>
            <TouchableOpacity style={styles.socialAuthBtn}>
              <GoogleIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialAuthBtn}>
              <AppleIcon />
            </TouchableOpacity>
          </View>
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
    paddingTop: 5,
    fontSize: 16,
    paddingHorizontal: 30,
    textAlign: 'center',
    fontWeight: '400',
  },
  textInputContainer: {
    marginTop: 20,
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
  forgotPassword: {
    marginLeft: 'auto',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 20,
    marginTop: 10,
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
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
  },
  bold: {
    fontWeight: '700',
  },
  socialAuthBtn: {
    width: '40%',
    height: 50,
    borderColor: '#D0D5DD',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    margin: 5,
  },
});

export default SignInPage;
