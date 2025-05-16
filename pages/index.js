import { useState, useEffect, useRef } from 'react'
import ChatWindow   from '../components/ChatWindow'
import InputBox     from '../components/InputBox'
import VoiceToggle  from '../components/VoiceToggle'
import ThemeToggle  from '../components/ThemeToggle'
import { loadStripe } from '../.gitignore/node_modules/@stripe/stripe-js/lib'
import { useContext } from "react";
import { UserContext } from "./_app";
import ModelSelector from "./components/ModelSelector";


const user = useContext(UserContext);
const [model, setModel] = useState("4omini");

return (
  <div>
    {/* other UI */}
    { user && (
      <ModelSelector
        model={model}
        setModel={setModel}
        user={user}
      />
    )}
    {/* …chat window & input */}
  </div>
);
export default function Home() {
  const [messages, setMessages] = useState([
    { role:'system', content:'You are a friendly, responsible, romantic AI.' }
  ])
  const [voice, setVoice] = useState('female')  
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

  // send user prompt
  async function sendPrompt(text) {
    const newMsg = { role:'user', content:text }
    setMessages(m=>[...m, newMsg])

    // Optimistically add placeholder
    setMessages(m=>[...m, { role:'assistant', content:'…', streaming:true }])

    // Fetch streaming tokens
    const res = await fetch(`/api/chat?messages=${encodeURIComponent(JSON.stringify(messages.concat(newMsg)))}`)
    const reader = res.body.getReader()
    let buff = '', done=false
    while(!done) {
      const { value, done: d } = await reader.read()
      done = d
      buff  += new TextDecoder().decode(value)
      // update last message
      setMessages(m=> {
        const copy = [...m]
        copy[copy.length-1] = { role:'assistant', content: buff }
        return copy
      })
      // speak token
      const utter = new SpeechSynthesisUtterance(value ? new TextDecoder().decode(value) : '')
      const voices = speechSynthesis.getVoices()
      utter.voice = voices.find(v=> voice==='female' ? v.name.includes('Female'):v.name.includes('Male'))
      speechSynthesis.speak(utter)
    }
  }

  // Stripe checkout
  async function handleSubscription() {
    const stripe = await stripePromise
    const { sessionId } = await fetch('/api/checkout_session', { method:'POST' }).then(r=>r.json())
    stripe.redirectToCheckout({ sessionId })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">💕 Romantic AI</h1>
        <div className="flex gap-4">
          <VoiceToggle voice={voice} setVoice={setVoice}/>
          <ThemeToggle/>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-4">
        <ChatWindow messages={messages}/>
      </main>

      <footer className="p-4 flex items-center gap-4">
        <InputBox onSend={sendPrompt}/>
        <button onClick={handleSubscription}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
          Subscribe
        </button>
      </footer>
    </div>
  )
}
