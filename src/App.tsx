import React, { useState, useEffect } from 'react';
import { ScreenId, TreasureType, QuestionData, UserAnswerRecord, LeaderboardEntry, REALMS } from './types';
import { sound } from './utils/sound';
import { generateQuestion } from './utils/mathEngine';
import { TopBar } from './components/TopBar';
import { ScratchpadModal } from './components/ScratchpadModal';
import { HeroScreen } from './components/HeroScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { RulesScreen } from './components/RulesScreen';
import { TreasureScreen } from './components/TreasureScreen';
import { QuizScreen } from './components/QuizScreen';
import { ClimaxScreen } from './components/ClimaxScreen';
import { ResultScreen } from './components/ResultScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { ClosingScreen } from './components/ClosingScreen';

const STORAGE_LEADERBOARD_KEY = 'tu_tien_toan_hoc_leaderboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('hero');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);

  // Player & Game State
  const [playerName, setPlayerName] = useState<string>('');
  const [playerClass, setPlayerClass] = useState<string>('');
  const [treasure, setTreasure] = useState<TreasureType>('jade');
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [realmIndex, setRealmIndex] = useState<number>(0);
  const [stageIndex, setStageIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [answers, setAnswers] = useState<UserAnswerRecord[]>([]);
  const [jadeUsed, setJadeUsed] = useState<boolean>(false);
  const [skipUsed, setSkipUsed] = useState<boolean>(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_LEADERBOARD_KEY);
      if (stored) {
        setLeaderboard(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleToggleSound = () => {
    const isNowOn = sound.toggleSound();
    setSoundEnabled(isNowOn);
    if (isNowOn) sound.playTap();
  };

  const handleStartGame = (selectedTreasure: TreasureType) => {
    setTreasure(selectedTreasure);
    setScore(0);
    setCorrectCount(0);
    setRealmIndex(0);
    setStageIndex(0);
    setJadeUsed(false);
    setSkipUsed(false);
    setAnswers([]);

    // Generate 10 randomized procedural questions
    const generated: QuestionData[] = [];
    for (let i = 1; i <= 10; i++) {
      generated.push(generateQuestion(i));
    }
    setQuestions(generated);
    setCurrentScreen('quiz');
  };

  const handleAnswerQuestion = (choiceIndex: number, isTimeout: boolean) => {
    const currentQ = questions[stageIndex];
    const isCorrect = choiceIndex === currentQ.correctIndex;
    let jadeRescued = false;
    let newRealm = realmIndex;
    let newScore = score;

    if (isCorrect) {
      newScore += 10;
      newRealm = Math.min(realmIndex + 1, REALMS.length - 1);
      setScore(newScore);
      setCorrectCount((prev) => prev + 1);
      setRealmIndex(newRealm);
    } else {
      // If Jade treasure available and not Q10
      if (treasure === 'jade' && !jadeUsed && currentQ.n < 10) {
        jadeRescued = true;
        setJadeUsed(true);
        newRealm = Math.min(realmIndex + 1, REALMS.length - 1);
        setRealmIndex(newRealm);
      }
    }

    setAnswers((prev) => [
      ...prev,
      {
        n: currentQ.n,
        choice: choiceIndex,
        correct: isCorrect,
        skipped: false,
      },
    ]);

    return {
      isCorrect,
      jadeRescued,
      newRealmIndex: newRealm,
      newScore,
    };
  };

  const handleSkipQuestion = () => {
    const currentQ = questions[stageIndex];
    setSkipUsed(true);
    const newRealm = Math.min(realmIndex + 1, REALMS.length - 1);
    setRealmIndex(newRealm);

    setAnswers((prev) => [
      ...prev,
      {
        n: currentQ.n,
        choice: -1,
        correct: false,
        skipped: true,
      },
    ]);

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (stageIndex < 9) {
      setStageIndex((prev) => prev + 1);
    } else {
      // Finished all 10 stages!
      // Save record to leaderboard
      const newEntry: LeaderboardEntry = {
        id: Date.now().toString(),
        name: playerName || 'Vô Danh Tu Sĩ',
        className: playerClass || 'Tự Tu',
        treasure,
        score,
        correctCount,
        realm: REALMS[realmIndex],
        date: new Date().toLocaleDateString('vi-VN'),
      };

      const updated = [newEntry, ...leaderboard];
      setLeaderboard(updated);
      try {
        localStorage.setItem(STORAGE_LEADERBOARD_KEY, JSON.stringify(updated.slice(0, 30)));
      } catch {
        // ignore
      }

      setCurrentScreen('climax');
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCorrectCount(0);
    setRealmIndex(0);
    setStageIndex(0);
    setJadeUsed(false);
    setSkipUsed(false);
    setQuestions([]);
    setAnswers([]);
    setCurrentScreen('hero');
  };

  return (
    <div className="min-h-screen bg-[#09172c] bg-[radial-gradient(ellipse_at_20%_15%,#173b64_0,transparent_40%),radial-gradient(ellipse_at_80%_85%,#341f5a_0,transparent_40%)] flex flex-col justify-between text-slate-100 selection:bg-teal-400 selection:text-slate-900">
      {/* Top Navigation Bar */}
      <TopBar
        playerName={playerName}
        realmIndex={realmIndex}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenScratchpad={() => setIsScratchpadOpen(true)}
        showScratchpadBtn={currentScreen === 'quiz' || currentScreen === 'review'}
      />

      {/* Screen Router */}
      <main className="flex-1 flex flex-col relative w-full overflow-y-auto">
        {currentScreen === 'hero' && (
          <HeroScreen
            onStart={() => setCurrentScreen('register')}
            onOpenLeaderboard={() => setCurrentScreen('result')}
          />
        )}

        {currentScreen === 'register' && (
          <RegistrationScreen
            initialName={playerName}
            initialClass={playerClass}
            onConfirm={(name, cls) => {
              setPlayerName(name);
              setPlayerClass(cls);
              setCurrentScreen('rules');
            }}
            onBack={() => setCurrentScreen('hero')}
          />
        )}

        {currentScreen === 'rules' && (
          <RulesScreen
            onNext={() => setCurrentScreen('treasure')}
            onBack={() => setCurrentScreen('register')}
          />
        )}

        {currentScreen === 'treasure' && (
          <TreasureScreen
            onSelectAndStart={handleStartGame}
            onBack={() => setCurrentScreen('rules')}
          />
        )}

        {currentScreen === 'quiz' && questions.length > 0 && (
          <QuizScreen
            question={questions[stageIndex]}
            stageIndex={stageIndex + 1}
            totalStages={10}
            score={score}
            realmIndex={realmIndex}
            treasure={treasure}
            jadeUsed={jadeUsed}
            skipUsed={skipUsed}
            onAnswer={handleAnswerQuestion}
            onSkip={handleSkipQuestion}
            onNext={handleNextQuestion}
          />
        )}

        {currentScreen === 'climax' && (
          <ClimaxScreen
            playerName={playerName}
            playerClass={playerClass}
            score={score}
            correctCount={correctCount}
            totalQuestions={10}
            onProceedToResult={() => setCurrentScreen('result')}
          />
        )}

        {currentScreen === 'result' && (
          <ResultScreen
            playerName={playerName || 'Tu Sĩ'}
            playerClass={playerClass || 'Lớp'}
            score={score}
            correctCount={correctCount}
            realmIndex={realmIndex}
            leaderboard={leaderboard}
            onReview={() => setCurrentScreen('review')}
            onProceedToClosing={() => setCurrentScreen('closing')}
          />
        )}

        {currentScreen === 'review' && (
          <ReviewScreen
            questions={questions}
            answers={answers}
            onBackToResult={() => setCurrentScreen('result')}
            onProceedToClosing={() => setCurrentScreen('closing')}
          />
        )}

        {currentScreen === 'closing' && (
          <ClosingScreen
            playerName={playerName}
            onRestart={handleRestart}
            onOpenLeaderboard={() => setCurrentScreen('result')}
          />
        )}
      </main>

      {/* Floating Scratchpad Canvas Modal */}
      <ScratchpadModal
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      {/* Footer Bar */}
      <footer className="h-8 shrink-0 bg-[#071120]/90 border-t border-slate-800/80 px-4 flex items-center justify-center text-[10px] text-slate-400 font-semibold tracking-wider uppercase select-none">
        <span>Tu Tiên Toán Học · Điểm Số Của Ta, Do Ta Quyết Định</span>
      </footer>
    </div>
  );
}
