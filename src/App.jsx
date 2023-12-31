import React, { useState } from 'react';
import classnames from 'classnames'
import './App.css';
import Logo from './assets/logo.png';

const Note = ({children}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  }
  
  return (
    <div
      onClick={handleClick}
      className={classnames("note", isActive && "note_active")}
    >
      {isActive ? children : ''}
    </div>
  );
}

const NoteBlock = () => {
  const array = [10, 20, 30, 40];
  return (
    <div className='note_wrapper'>
      {array.map((item, i) => {
        return <Note key={i}>{item}</Note>;
      })}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <div className="logo_wrapper">
        <img src={Logo} alt="" className="logo" />
      </div>
      <div className="board_wrapper">
        <div className="board">
          <ul className="list">
            <li className="item">
              <div className="category_wrapper">
                <div className="category_name">Русские хиты</div>
                <NoteBlock />
              </div>
            </li>
            <li className="item">
              <div className="category_wrapper">
                <div className="category_name">Зарубежные хиты</div>
                <NoteBlock />
              </div>
            </li>
            <li className="item">
              <div className="category_wrapper">
                <div className="category_name">Сериалы</div>
                <NoteBlock />
              </div>
            </li>
            <li className="item">
              <div className="category_wrapper">
                <div className="category_name">Ностальгия</div>
                <NoteBlock />
              </div>
            </li>
          </ul>
        </div>
        <div className="users">
          <div className="user">
            <h2>Nadya</h2>
            <input className="input" type="text" />
          </div>
          <div className="user">
            <h2>Tima</h2>
            <input className="input" type="text" />
          </div>
          <div className="user">
            <h2>Vadim</h2>
            <input className="input" type="text" />
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
