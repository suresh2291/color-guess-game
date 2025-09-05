import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "Color Sort Game",
      score: "Score",
      time: "Time",
      correct: "Correct! +10",
      incorrect: "Wrong! -5",
      gameOver: "Game Over!",
      finalScore: "Final Score",
      playAgain: "Play Again",
      instructions: "Drag the middle color to the correct side!",
      redSide: "Red Side",
      blueSide: "Blue Side",
      startGame: "Start Game",
      timeUp: "Time's Up!",
      dragColor: "Drag the color to the correct side!"
    }
  },
  ja: {
    translation: {
      title: "カラーソートゲーム",
      score: "スコア",
      time: "時間",
      correct: "正解！+10",
      incorrect: "不正解！-5",
      gameOver: "ゲーム終了！",
      finalScore: "最終スコア",
      playAgain: "もう一度プレイ",
      instructions: "真ん中の色を正しい側にドラッグしてください！",
      redSide: "赤い側",
      blueSide: "青い側",
      startGame: "ゲーム開始",
      timeUp: "時間切れ！",
      dragColor: "色を正しい側にドラッグしてください！"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
