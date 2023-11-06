import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Register = ({ navigation }) => {
  return (
    <View>
      <Text>Register</Text>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>Sudah punya akun? Login</Text>
      </Pressable>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({})