import React, { useState } from 'react'
import { auth } from './main';
import './App.css'
import RepositoryList from './components/RepositoryList'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async () => {
    const isLoggedIn =  await auth.login('github');
    setIsLoggedIn(isLoggedIn)
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          isLoggedIn ? <RepositoryList /> : 
          (
            <button onClick={() => login()}>Login with Github</button>
          )
        }
      </header>
    </div>
  )
}

export default App
