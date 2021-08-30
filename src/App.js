import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { AuthModal } from './components/AuthModal/AuthModal';

import { Welcome } from './screens/Welcome/Welcome';
import { MakePicks } from './screens/MakePicks/MakePicks';
import { ViewPicks } from './screens/ViewPicks/ViewPicks';
import { SeasonLeaderboard } from './screens/SeasonLeaderboard/SeasonLeaderboard';
import { WeeklyLeaderboard } from './screens/WeeklyLeaderboard/WeeklyLeaderboard';
import { PostLines } from './screens/PostLines/PostLines';
import { ScoreGames } from './screens/ScoreGames/ScoreGames';

import './App.css';

export const App = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const startAuthHandler = () => {
    setIsLoggingIn(true);
  };

  const finishAuthHandler = () => {
    setIsLoggingIn(false);
  };

  return (
    <div className="App">
      <Header onStartAuth={startAuthHandler} />
      {isLoggingIn && <AuthModal onFinishAuth={finishAuthHandler} />}
      <Route path="/" exact>
        <Welcome />
      </Route>
      <Route path="/makePicks">
        <MakePicks />
      </Route>
      <Route path="/viewPicks" exact>
        <ViewPicks />
      </Route>
      <Route path="/viewPicks/:username">
        <ViewPicks />
      </Route>
      <Route path="/seasonLeaderboard">
        <SeasonLeaderboard />
      </Route>
      <Route path="/weeklyLeaderboard">
        <WeeklyLeaderboard />
      </Route>
      <Route path="/admin/postLines">
        <PostLines />
      </Route>
      <Route path="/admin/scoreGames">
        <ScoreGames />
      </Route>
      <Footer />
    </div>
  );
};
