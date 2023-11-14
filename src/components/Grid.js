import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Grid = ({ children }) => {
  return (
    <View style={styles.app}>
      {children}
    </View>
  )
}

export default Grid

const styles = StyleSheet.create({
  app: {
    flex: 2, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
  }
})