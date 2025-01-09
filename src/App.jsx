import React, { useState } from 'react';
import classNames from 'classnames';
import './App.css';
import Logo from './assets/logo.png';

const Note = ({ value, category, onPlay }) => {
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const togglePlay = () => {
    const audioSrc = require(`./assets/audio/1 round/${category}/${value}.mp3`);
    if (isActive) {
      onPlay(null); // Остановить текущий звук
      setIsActive(false);
    } else {
      onPlay(audioSrc, () => setIsActive(false)); // Запустить новый звук
      setIsActive(true);
    }
    setIsSelected(true);
  };

  return (
    <div
      onClick={togglePlay}
      className={classNames('note', { note_active: isActive || isSelected })}
      aria-label={isSelected ? 'Used' : isActive ? 'Playing' : 'Stopped'}
    >
      {value}
    </div>
  );
};

const SoundButton = ({ soundName, onPlay }) => {
  const [isActive, setIsActive] = useState(false);

  const playSound = () => {
    const audioSrc = require(`./assets/audio/${soundName}.mp3`);
    if (isActive) {
      onPlay(null); // Остановить текущий звук
      setIsActive(false);
    } else {
      onPlay(audioSrc, () => setIsActive(false)); // Запустить новый звук
      setIsActive(true);
    }
  };

  return (
    <div className="sound_button" onClick={playSound}>
      {soundName}
    </div>
  );
};

const SoundPanel = ({ onPlay }) => {
  const sounds = [
    'Выбор рубрики',
    'Главная',
    'Заставка',
    'Конец раунда',
    'Не правильно',
    'Не угадал',
    'Победитель',
    'Правильно',
    'Реклама',
  ];

  return (
    <div className="sound_panel">
      {sounds.map((soundName) => (
        <SoundButton key={soundName} soundName={soundName} onPlay={onPlay} />
      ))}
    </div>
  );
};

const NoteBlock = ({ notes = [10, 20, 30, 40], category, onPlay }) => (
  <div className="note_wrapper">
    {notes.map((value) => (
      <Note key={value} value={value} category={category} onPlay={onPlay} />
    ))}
  </div>
);

const Category = ({ title, onPlay }) => (
  <li className="item">
    <div className="category_wrapper">
      <div className="category_name">{title}</div>
      <NoteBlock category={title} onPlay={onPlay} />
    </div>
  </li>
);

function App() {
  const [currentAudio, setCurrentAudio] = useState(null);

  const handlePlayAudio = (src, onEnd) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    if (!src) {
      setCurrentAudio(null);
      return;
    }

    const newAudio = new Audio(src);
    setCurrentAudio(newAudio);
    newAudio.play();
    newAudio.onended = () => {
      onEnd?.();
      setCurrentAudio(null);
    };
  };

  const categoriesRound1 = [
    'Русские хиты',
    'Зарубежные хиты',
    'Сериалы',
    'Ностальгия',
  ];

  return (
    <div className="App">
      <header className="logo_wrapper">
        <img src={Logo} alt="Company Logo" className="logo" />
      </header>

      <main className="board_wrapper">
        <div className="board">
          <ul className="list">
            {categoriesRound1.map((category) => (
              <Category key={category} title={category} onPlay={handlePlayAudio} />
            ))}
          </ul>
        </div>
      </main>

      <footer className="footer">
        <SoundPanel onPlay={handlePlayAudio} />
      </footer>
    </div>
  );
}

export default App;
