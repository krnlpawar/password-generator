import { useState } from 'react'
import './App.css'
import { use } from 'react'
import { useEffect } from 'react'

function App() {
  const [passwordLength, setPasswordLength] = useState(12)
  const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)

  const [generatedPassword, setGeneratedPassword] = useState('')
  const [showCopiedNotification, setShowCopiedNotification] = useState(false)

  const generateRandomPassword = () => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (includeSpecialCharacters) {
      characters += '!@#$%^&*()_+~`|}{[]\\'
    }
    if (includeNumbers) {
      characters += '0123456789'
    }

    let password = ''
    for (let i = 0; i < passwordLength; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    setGeneratedPassword(password)
  }

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword)
    setShowCopiedNotification(true)
    setTimeout(() => {
      setShowCopiedNotification(false)
    }, 2000)
  }

  useEffect(() => {
    generateRandomPassword()
  }, [passwordLength, includeSpecialCharacters, includeNumbers])

  return (
    <>
      <div className="container">
        <h2>Password Generator</h2>
        <div className="password-settings">
          {generatedPassword && <p id="password">{generatedPassword}</p>}

          <label htmlFor="passwordLength">Length:</label>
          <input
            type="range"
            id="passwordLength"
            min="6"
            max="100"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
          <span id="passwordLengthValue">{passwordLength}</span>
          <br />
          <label htmlFor="includeSpecialCharacters">
            Include Special Characters:
          </label>
          <input
            type="checkbox"
            id="includeSpecialCharacters"
            value={includeSpecialCharacters}
            onChange={(e) => setIncludeSpecialCharacters(e.target.checked)}
            checked={includeSpecialCharacters}
          />
          <br />
          <label htmlFor="includeNumbers">Include Numbers:</label>
          <input
            type="checkbox"
            id="includeNumbers"
            value={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            checked={includeNumbers}
          />
        </div>
        <button id="generate" onClick={copyPasswordToClipboard}>
          Copy Password
        </button>
        <br />
        <br />
        {showCopiedNotification && <div id="copied">Password Copied to Clipboard</div>}
      </div>
    </>
  )
}

export default App
