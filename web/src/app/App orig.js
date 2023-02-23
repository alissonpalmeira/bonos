import React, { useState, useEffect } from 'react';
import { isInstalled } from 'services/utils';
import { usePWAInstall } from 'react-use-pwa-install';
import * as fcl from '@onflow/fcl';
import './App.css';
import "assets/flow/config";

function App() {
  const [user, setUser] = useState({loggedIn: null})
  const install = usePWAInstall();

  useEffect(() => {
    fcl.currentUser.subscribe(setUser)
  }, [])

  const AuthedState = () => {
    return (
      <div>
        <div>Address: {user?.addr ?? "No Address"}</div>
        <button onClick={fcl.unauthenticate}>Log Out</button>
      </div>
    )
  }

  const UnauthenticatedState = () => {
    return (
      <div>
        <button onClick={fcl.logIn}>Log In</button>
        <button onClick={fcl.signUp}>Sign Up</button>
      </div>
    )
  }

  return (
    <div>
      <header>
        <title>FCL Quickstart with React</title>
        <meta name="description" content="My first web3 app on Flow!" />
        <link rel="icon" href="/favicon.png" />
      </header>
      <h1>Bonos</h1>
      {user.loggedIn
        ? <AuthedState />
        : <UnauthenticatedState />
      }
  
      <div>
        {!isInstalled && <button onClick={install}>Install</button>}
      </div>
    </div>
  );
}

export default App;
