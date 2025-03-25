import { useState } from 'react'
import BSTutorsLogo from './assets/BST-logo.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a target="_blank"> 
          <img src={BSTutorsLogo} className="bst-logo" alt="BST logo" />
        </a>
      </div>
      <h1>BSTutors</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
