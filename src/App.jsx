import { useState } from 'react'
import './App.css'
import { use } from 'react'
import { useEffect } from 'react'

function App() {
  const [length, setLength] = useState(12)
  const [specialChars, setSpecialChars] = useState(true)
  const [numbers, setNumbers] = useState(true)

  const [password, setPassword] = useState("")

  const generatePassword = () => {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (specialChars) {
      characters += "!@#$%^&*()_+~`|}{[]\\"
    }
    if (numbers) {
      characters += "0123456789"
    }
    let password = ""
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    setPassword(password)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setTimeOut(true)
    setTimeout(() => {
      setTimeOut(false)
    }, 2000)
  }

  const [timeOut, setTimeOut] = useState(false)

  useEffect(() => {
    generatePassword()
  }, [length, specialChars, numbers])
  
  return (
    <>
      <div className="container">
        <h2>Password Generator</h2>
        <div className="password-settings">
            { password && <p id="password">{password}</p>}

            <label for="length">Length:</label>
            <input type="range" id="length" min="6" max="100" value={length} onChange={(e) => setLength(e.target.value)}/>
            <span id="length-value">{length}</span>
            <br/>
            <label for="specialChars">Include Special Characters:</label>
            <input type="checkbox" id="specialChars" value={specialChars} onChange={(e) => setSpecialChars(e.target.checked)} checked={specialChars}/>
            <br/>
            <label for="numbers">Include Numbers:</label>
            <input type="checkbox" id="numbers" value={numbers} onChange={(e) => setNumbers(e.target.checked)} checked={numbers}/>
        </div>
        <button id="generate" onClick={copyToClipboard}>Copy Password</button>
        <br />
        <br />
        {timeOut && <div id="copied">Password Copied to Clipboard</div>}
    </div>
    </>
  )
}

export default App
