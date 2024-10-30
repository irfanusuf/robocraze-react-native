import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function TapTheCircle() {
  const [circlePosition, setCirclePosition] = useState({ x: width / 2, y: height / 2 });
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameOver) {
        moveCircle();
      }
    }, Math.max(1000 - score * 50, 200)); // Circle appears faster as score increases

    return () => clearInterval(timer);
  }, [score, gameOver]);

  const moveCircle = () => {
    const newX = Math.random() * (width - 50);
    const newY = Math.random() * (height - 50);
    setCirclePosition({ x: newX, y: newY });
  };

  const handleCircleTap = () => {
    setScore(score + 1);
    moveCircle();
  };

  const handleMiss = () => {
    setMisses(misses + 1);
    if (misses + 1 >= 3) {
      setGameOver(true);
    }
  };

  return (
    <View style={styles.container}>
      {gameOver ? (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.gameOverText}>Score: {score}</Text>
          <TouchableOpacity onPress={() => {
            setScore(0);
            setMisses(0);
            setGameOver(false);
          }}>
            <Text style={styles.retryButton}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.scoreText}>Score: {score}</Text>
          <TouchableOpacity
            onPress={handleCircleTap}
            style={[
              styles.circle,
              { left: circlePosition.x, top: circlePosition.y },
            ]}
          />
          {/* <TouchableOpacity style={styles.missArea} onPress={handleMiss}>
            <Text style={styles.instructionText}>Tap the circle!</Text>
          </TouchableOpacity> */}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 40,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    position: 'absolute',
  },
  missArea: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  instructionText: {
    position: 'absolute',
    bottom: 40,
    fontSize: 16,
    color: '#888',
  },
  gameOverContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  retryButton: {
    fontSize: 20,
    color: 'blue',
    marginTop: 20,
  },
});
