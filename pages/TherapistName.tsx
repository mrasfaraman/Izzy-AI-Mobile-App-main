import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';

import CustomHeader from '../components/CustomHeader';

const TherapistName = ({navigation}: any) => {
  const [chats, setChats] = useState([
    {
      text: '',
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState('');

  const scrollViewRef = useRef<ScrollView>(null);

  const navigateBack = () => {
    navigation.goBack();
  };

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      setChats([...chats, {text: inputText, isUser: true}]);
      setInputText('');
      // Scroll to bottom of chat
      scrollViewRef.current?.scrollToEnd({animated: true});
      // Here you might want to handle the response from the therapist
    }
  };

  const handleKeyboardSend = () => {
    sendMessage();
    Keyboard.dismiss(); // Dismiss the keyboard after sending the message
  };

  const startRecording = () => {
    // Code to start recording audio and send it
    // This function will be implemented based on your audio recording logic
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <CustomHeader title="AI SLP" goBack={navigateBack} />
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            marginTop: 60,
          }}
          keyboardShouldPersistTaps="handled">
          <View style={styles.izzyChatContainer}>
            <View style={styles.izzyIconContainer}>
              <Image
                source={require('../assets/images/microphone.png')}
                style={styles.izzyIcon}
              />
              <Text style={styles.izzyText}>Izzy</Text>
            </View>
            <View style={styles.chatBubble}>
              <Text style={styles.chatText}>
                Hello there! you can start saying words you feel difficult to
                pronounce
              </Text>
            </View>
          </View>
          {chats.map((chat, index) => (
            <View
              key={index}
              style={[
                styles.chatBubble,
                chat.isUser ? styles.userChat : styles.therapistChat,
              ]}>
              <Text style={styles.chatText}>{chat.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            onSubmitEditing={handleKeyboardSend}
          />
          <TouchableOpacity
            style={styles.microphoneButton}
            onPress={startRecording}>
            <Image
              style={styles.img}
              source={require('../assets/images/microphone.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  izzyChatContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10, // Add margin vertical here
    paddingHorizontal: 20,
  },
  izzyIconContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  izzyIcon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  izzyText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
    margin: 5,
  },

  img: {
    marginTop: 0,
    backgroundColor: '#F0F0F0',
  },
  userChat: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  therapistChat: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFEFEF',
  },
  chatText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  microphoneButton: {
    // backgroundColor: '#111920',
    borderRadius: 20,
    padding: 10,
  },
});

export default TherapistName;
