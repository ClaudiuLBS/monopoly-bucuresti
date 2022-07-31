import React, { useEffect, useState } from 'react';
import GameSessionApi from '../services/game_session.service';
import InitService from '../services/init.service';
import LoadingScreen from './LoadingScreen';
import SessionGameScreen from './SessionGameScreen';
import SessionHomeScreen from './SessionHomeScreen';
import SessionLobbyScreen from './SessionLobbyScreen';

const SessionStack = () => {
  const [gameSession, setGameSession] = useState(null);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCreateSession = async (name) => {
    const data = await GameSessionApi.createSession(name);
    setPlayer(data.player);
    setGameSession(data.gameSession);
  };

  const handleJoinSession = async (name, code) => {
    const data = await GameSessionApi.joinSession(name, code);
    setPlayer(data.player);
    setGameSession(data.gameSession);
  };

  const handleStartSession = async (code) => {
    const data = await GameSessionApi.startSession(code);
    // console.log(data);
  };

  useEffect(() => {
    InitService.handleStorageKeys().then((data) => {
      setGameSession(data.gameSession);
      setPlayer(data.player);
      setLoading(false);
    });
  });

  if (loading) return <LoadingScreen />;

  if (gameSession)
    if (gameSession.start_date)
      return <SessionGameScreen player={player} gameSession={gameSession} />;
    else
      return (
        <SessionLobbyScreen
          owner={player.owner}
          code={gameSession.code}
          startSession={handleStartSession}
        />
      );

  return <SessionHomeScreen createSession={handleCreateSession} joinSession={handleJoinSession} />;
};

export default SessionStack;
