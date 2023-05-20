import * as React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function Card({onPress, isTurnedOver, children}) {
  return (
    <Pressable onPress={onPress} style={isTurnedOver ? styles.cardUp : styles.cardDown}>
      {isTurnedOver ? (
        <Text style={styles.text}>{children}</Text>
        ) 
        : (
          <Text style={styles.text}>?</Text>
        )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cardUp: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#003049',
    borderWidth: 8,
    borderColor: '#6d6875'
  },
  cardDown: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 8,
    borderColor: '#6d6875',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#003049',
  },
  text: {
    color: '#d62828',
    fontSize: 40,
  }
})
