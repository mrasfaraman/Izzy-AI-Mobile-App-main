import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

const CustomButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'SF-Pro-Display-Regular',
    color: '#111920',
  },
  button: {
    width: 300,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: '#111920',
    padding: 10,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default CustomButton;
