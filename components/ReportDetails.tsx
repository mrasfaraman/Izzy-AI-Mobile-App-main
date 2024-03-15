import React from 'react';
import {Actionsheet, Box} from 'native-base';
import {View, StyleSheet, Text} from 'react-native';
import CustomButton from './Button';

function ReportDetails({closeDetails, detailsOpen, navigation}: any) {
  return (
    <Actionsheet isOpen={detailsOpen} onClose={() => closeDetails(false)}>
      <Actionsheet.Content style={{}}>
        <Box w="100%" h={550} px={4}>
          <Text
            style={[
              styles.base,
              {textAlign: 'center', fontSize: 16, fontWeight: '500'},
            ]}>
            Speech Articulation
          </Text>

          <View style={{marginTop: 40}}>
            <View style={{marginVertical: 5}}>
              <Text style={[styles.base, {fontSize: 16}]}>Name:</Text>
              <Text style={[styles.base, {fontSize: 16}]}>Alex James</Text>
            </View>

            <View style={{marginVertical: 5}}>
              <Text style={[styles.base, {fontSize: 16}]}>Age:</Text>
              <Text style={[styles.base, {fontSize: 16}]}>24</Text>
            </View>

            <View style={{marginVertical: 5}}>
              <Text style={[styles.base, {fontSize: 16}]}>Date:</Text>
              <Text style={[styles.base, {fontSize: 16}]}>12/10/24</Text>
            </View>

            <View style={{marginVertical: 5}}>
              <Text style={[styles.base, {fontSize: 16}]}>
                Number of Sessions:
              </Text>
              <Text style={[styles.base, {fontSize: 16}]}>2</Text>
            </View>

            <View style={{marginVertical: 5}}>
              <Text style={[styles.base, {fontSize: 16}]}>
                Percentage progress of problematic sound correction:
              </Text>
              <Text style={[styles.base, {fontSize: 16}]}>87%</Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 'auto',
            }}>
            <CustomButton title="Reset Record" />
          </View>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default ReportDetails;

const styles = StyleSheet.create({
  base: {
    fontFamily: 'SF-Pro-Display-Regular',
    color: '#111920',
  },
});
