import * as React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Card from './components/Card.js';
import { useFonts } from 'expo-font';

const cards =[
  "🤡",
  "👻",
  "🎃",
  "👺",
  "👽",
  "👾"
];

export default function App() {
  const [fontsLoaded] = useFonts({
    Russo: require("./assets/fonts/RussoOne-Regular.ttf")
  })
  const [board, setBoard] =  React.useState(()=>shuffle([...cards, ...cards]))
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [matchedCards, setMatchedCards] = React.useState([]);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    if (selectedCards.length < 2) return;

    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setScore(score + 1);
      setSelectedCards([]);
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards])

  const handleTapCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
  }

  const didPlayerWin = () => matchedCards.length === board.length;

  const resetGame = () => {
    setMatchedCards([]);
    setSelectedCards([]);
    setScore(0);
    setBoard(shuffle([...cards, ...cards]));
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MemoGame</Text>
      <Text style={styles.title}>Score: {score}</Text>
      <Text style={styles.youwin}>{didPlayerWin() ? "YOU WIN 🎉" : null}</Text>
      <View style={styles.board}>
          {board.map((card, index)=> {
            const isTurnedOver =
            selectedCards.includes(index) || matchedCards.includes(index);
            return (
              <Card 
                key={index}
                isTurnedOver={isTurnedOver}
                onPress={() => handleTapCard(index)}
                >{card}</Card>
            )
          })}
      </View>
      {didPlayerWin() && <Button onPress={resetGame} title="RESET"/>}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#023e8a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: '900',
    fontFamily: 'Russo'
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  youwin: {
    fontSize: 32,
    color: '#f77f00',
    fontWeight: '900',
    fontFamily: 'Russo'
  },
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}