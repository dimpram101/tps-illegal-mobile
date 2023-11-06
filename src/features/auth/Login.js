import { View, Text, StyleSheet, TextInput, Button, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const Login = ({ navigation }) => {
  const { onLogin } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>TPS Ilegal - Login</Text>
      <View style={styles.form}>
        <View style={styles.formSection}>
          <Text style={styles.formLabel}>Email</Text>
          <TextInput placeholder="Email" style={styles.formInputBox} value={email} onChangeText={(e) => setEmail(e)}/>
        </View>
        <View style={styles.formSection}>
          <Text style={styles.formLabel}>Password</Text>
          <TextInput placeholder="Password" style={styles.formInputBox} secureTextEntry={true} value={password} onChangeText={(e) => setPassword(e)}/>
        </View>
        <Button title="Login"  onPress={() => {
          onLogin(email, password);
        }}/>
        <Pressable onPress={() => navigation.push('Register')}>
          <Text style={styles.registerLabel}>Belum punya akun? Daftar di sini</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center'
  },
  form: {
    marginTop: 12,
    gap: 12
  },
  formSection: {
    gap: 6
  },
  formLabel: {
    fontWeight: 'bold'
  },
  formInputBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  registerLabel: {
    color: 'grey',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }
})

export default Login