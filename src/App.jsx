import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import './App.css';

const ItemTypes = {
  COLOR: 'color'
};

// Simple draggable color item
const ColorItem = ({ color }) => {
  console.log('🎨 ColorItem: Rendering with color =', color);
  
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COLOR,
    item: { color },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  console.log('🎨 ColorItem: isDragging =', isDragging, 'color =', color);

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    console.log('🎨 ColorItem: Touch start on', color);
    e.preventDefault(); // Prevent scrolling
  };

  const handleTouchEnd = (e) => {
    console.log('🎨 ColorItem: Touch end on', color);
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    console.log('🎨 ColorItem: Touch move on', color);
    e.preventDefault(); // Prevent scrolling during drag
  };

  return (
    <div
      ref={drag}
      className={`color-item ${color}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onMouseDown={() => console.log('🎨 ColorItem: Mouse down on', color)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {color.toUpperCase()}
    </div>
  );
};

// Left drop zone - ONLY accepts RED
const LeftDropZone = ({ onCorrectDrop, onWrongDrop }) => {
  console.log('🔴 LeftDropZone: Rendering LEFT (RED) zone');
  
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.COLOR,
    drop: (item) => {
      console.log('🔴 LeftDropZone: DROP EVENT TRIGGERED!');
      console.log('🔴 LeftDropZone: item =', item);
      console.log('🔴 LeftDropZone: item.color =', item.color);
      console.log('🔴 LeftDropZone: typeof item.color =', typeof item.color);
      console.log('🔴 LeftDropZone: Checking if', item.color, '=== "red"');
      
      if (item.color === 'red') {
        console.log('🔴 LeftDropZone: ✅ CORRECT! Red dropped on LEFT zone');
        console.log('🔴 LeftDropZone: Calling onCorrectDrop()');
        onCorrectDrop();
      } else {
        console.log('🔴 LeftDropZone: ❌ WRONG!', item.color, 'dropped on LEFT zone (should be red)');
        console.log('🔴 LeftDropZone: Calling onWrongDrop()');
        onWrongDrop();
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  console.log('🔴 LeftDropZone: isOver =', isOver);

  return (
    <div 
      ref={drop} 
      className={`drop-zone red ${isOver ? 'hover' : ''}`}
      onMouseEnter={() => console.log('🔴 LeftDropZone: Mouse entered LEFT zone')}
      onMouseLeave={() => console.log('🔴 LeftDropZone: Mouse left LEFT zone')}
    >
      <div className="zone-label">RED<br/>LEFT</div>
    </div>
  );
};

// Right drop zone - ONLY accepts BLUE
const RightDropZone = ({ onCorrectDrop, onWrongDrop }) => {
  console.log('🔵 RightDropZone: Rendering RIGHT (BLUE) zone');
  
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.COLOR,
    drop: (item) => {
      console.log('🔵 RightDropZone: DROP EVENT TRIGGERED!');
      console.log('🔵 RightDropZone: item =', item);
      console.log('🔵 RightDropZone: item.color =', item.color);
      console.log('🔵 RightDropZone: typeof item.color =', typeof item.color);
      console.log('🔵 RightDropZone: Checking if', item.color, '=== "blue"');
      
      if (item.color === 'blue') {
        console.log('🔵 RightDropZone: ✅ CORRECT! Blue dropped on RIGHT zone');
        console.log('🔵 RightDropZone: Calling onCorrectDrop()');
        onCorrectDrop();
      } else {
        console.log('🔵 RightDropZone: ❌ WRONG!', item.color, 'dropped on RIGHT zone (should be blue)');
        console.log('🔵 RightDropZone: Calling onWrongDrop()');
        onWrongDrop();
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  console.log('🔵 RightDropZone: isOver =', isOver);

  return (
    <div 
      ref={drop} 
      className={`drop-zone blue ${isOver ? 'hover' : ''}`}
      onMouseEnter={() => console.log('🔵 RightDropZone: Mouse entered RIGHT zone')}
      onMouseLeave={() => console.log('🔵 RightDropZone: Mouse left RIGHT zone')}
    >
      <div className="zone-label">BLUE<br/>RIGHT</div>
    </div>
  );
};

function App() {
  const { t, i18n } = useTranslation();
  const [currentColor, setCurrentColor] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // Generate random color
  const generateRandomColor = () => {
    console.log('🎲 generateRandomColor: Starting...');
    const colors = ['red', 'blue'];
    console.log('🎲 generateRandomColor: Available colors =', colors);
    const randomIndex = Math.floor(Math.random() * colors.length);
    console.log('🎲 generateRandomColor: Random index =', randomIndex);
    const randomColor = colors[randomIndex];
    console.log('🎲 generateRandomColor: Selected color =', randomColor);
    console.log('🎲 generateRandomColor: Setting currentColor to', randomColor);
    setCurrentColor(randomColor);
    console.log('🎲 generateRandomColor: Done!');
  };

  // Show feedback
  const showFeedback = (text) => {
    console.log('💬 showFeedback: Showing message =', text);
    setMessage(text);
    setShowMessage(true);
    setTimeout(() => {
      console.log('💬 showFeedback: Hiding message after 1 second');
      setShowMessage(false);
    }, 1000);
  };

  // Handle correct drop
  const handleCorrectDrop = () => {
    console.log('✅ handleCorrectDrop: CORRECT DROP! +10 points');
    console.log('✅ handleCorrectDrop: Current score before update =', score);
    setScore(prev => {
      const newScore = prev + 10;
      console.log('✅ handleCorrectDrop: New score =', newScore);
      return newScore;
    });
    showFeedback(t('correct'));
    console.log('✅ handleCorrectDrop: Generating new random color...');
    generateRandomColor();
    console.log('✅ handleCorrectDrop: Done!');
  };

  // Handle wrong drop
  const handleWrongDrop = () => {
    console.log('❌ handleWrongDrop: WRONG DROP! -5 points');
    console.log('❌ handleWrongDrop: Current score before update =', score);
    setScore(prev => {
      const newScore = Math.max(0, prev - 5);
      console.log('❌ handleWrongDrop: New score =', newScore);
      return newScore;
    });
    showFeedback(t('incorrect'));
    console.log('❌ handleWrongDrop: NOT generating new color (player can try again)');
    console.log('❌ handleWrongDrop: Done!');
  };

  // Start game
  const startGame = () => {
    console.log('🎮 startGame: Starting game...');
    console.log('🎮 startGame: Setting gameStarted = true');
    setGameStarted(true);
    console.log('🎮 startGame: Setting gameOver = false');
    setGameOver(false);
    console.log('🎮 startGame: Setting score = 0');
    setScore(0);
    console.log('🎮 startGame: Setting timeLeft = 60');
    setTimeLeft(60);
    console.log('🎮 startGame: Generating first random color...');
    generateRandomColor();
    console.log('🎮 startGame: Game started!');
  };

  // Reset game
  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setCurrentColor(null);
  };

  // Change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Timer
  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true);
            setGameStarted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, timeLeft]);

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>{t('title')}</h1>
        <div className="language-buttons">
          <button
            className={i18n.language === 'en' ? 'active' : ''}
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
          <button
            className={i18n.language === 'ja' ? 'active' : ''}
            onClick={() => changeLanguage('ja')}
          >
            日本語
          </button>
        </div>
      </div>

      {/* Instructions */}
      {!gameStarted && !gameOver && (
        <div className="instructions">
          <p>{t('instructions')}</p>
        </div>
      )}

      {/* Game Info */}
      {gameStarted && (
        <div className="game-info">
          <div className="score">{t('score')}: {score}</div>
          <div className="timer">{t('time')}: {timeLeft}s</div>
        </div>
      )}

      {/* Game Container */}
      <div className="game-container">
        {/* LEFT SIDE - RED ZONE */}
        <LeftDropZone 
          onCorrectDrop={handleCorrectDrop} 
          onWrongDrop={handleWrongDrop} 
        />
        
        {/* MIDDLE - RANDOM COLOR */}
        <div className="middle-area">
          {gameStarted && currentColor ? (
            <div>
              <p>{t('dragColor')}</p>
              <ColorItem color={currentColor} />
            </div>
          ) : (
            <div className="placeholder">
              {t('startGame')}!
            </div>
          )}
        </div>
        
        {/* RIGHT SIDE - BLUE ZONE */}
        <RightDropZone 
          onCorrectDrop={handleCorrectDrop} 
          onWrongDrop={handleWrongDrop} 
        />
      </div>

      {/* Start Button */}
      {!gameStarted && !gameOver && (
        <button className="start-button" onClick={startGame}>
          {t('startGame')}
        </button>
      )}

      {/* Game Over */}
      {gameOver && (
        <div className="game-over">
          <h2>{t('gameOver')}</h2>
          <p>{t('finalScore')}: {score}</p>
          <button className="play-again-button" onClick={resetGame}>
            {t('playAgain')}
          </button>
        </div>
      )}

      {/* Message */}
      {showMessage && (
        <div className="message">
          {message}
        </div>
      )}
    </div>
  );
}

export default App;