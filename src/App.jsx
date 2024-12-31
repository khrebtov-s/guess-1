import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import './App.css';
import Logo from './assets/logo.png';

const Note = ({ value, category, round }) => {
  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isActive) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.play();
      }
      setIsActive((prev) => !prev);
    }
  };

  const handleEnded = () => {
    setIsActive(false);
    setIsSelected(true);
  };

  const getAudioSrc = () => {
    const roundPath = round === 1 ? '1 раунд' : '2 раунд';
    return require(`./assets/audio/${roundPath}/${category}/${value}.mp3`);
  };

  return (
    <div
      onClick={togglePlay}
      className={classNames('note', { note_active: isActive || isSelected })}
      aria-label={isSelected ? 'Used' : isActive ? 'Playing' : 'Stopped'}
    >
      {value}
      <audio
        ref={audioRef}
        src={getAudioSrc()}
        preload="auto"
        onEnded={handleEnded}
      />
    </div>
  );
};

const SoundButton = ({ soundName }) => {
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      if (isActive) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.play();
      }
      setIsActive((prev) => !prev);
    }
  };

  return (
    <div className="sound_button" onClick={playSound}>
      <audio ref={audioRef} src={require(`./assets/audio/${soundName}.mp3`)} preload="auto" />
      {soundName}
    </div>
  );
};

const SoundPanel = () => {
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
        <SoundButton key={soundName} soundName={soundName} />
      ))}
    </div>
  );
};

const NoteBlock = ({ notes = [10, 20, 30, 40], category, round }) => (
  <div className="note_wrapper">
    {notes.map((value) => (
      <Note key={value} value={value} category={category} round={round} />
    ))}
  </div>
);

const Category = ({ title, round }) => (
  <li className="item">
    <div className="category_wrapper">
      <div className="category_name">{title}</div>
      <NoteBlock category={title} round={round} />
    </div>
  </li>
);

function App() {
  const [round, setRound] = useState(1);

  const categoriesRound1 = [
    'Русские хиты',
    'Зарубежные хиты',
    'Сериалы',
    'Ностальгия',
  ];

  const categoriesRound2 = ['Игры', 'Новогодние хиты', 'Хиты 2024'];

  const categories = round === 1 ? categoriesRound1 : categoriesRound2;

  const handleNextRound = () => {
    setRound(2);
  };

  return (
    <div className="App">
      <header className="logo_wrapper">
        <img src={Logo} alt="Company Logo" className="logo" />
      </header>

      <main className="board_wrapper">
        <div className="board">
          <ul className="list">
            {categories.map((category) => (
              <Category key={category} title={category} round={round} />
            ))}
          </ul>
          {round === 1 && (
            <button className="next_round_button" onClick={handleNextRound}>
              Перейти ко второму раунду
            </button>
          )}
        </div>
      </main>

      <footer className="footer">
        {/* Панель звуков внизу */}
        <SoundPanel />
      </footer>
    </div>
  );
}

export default App;
