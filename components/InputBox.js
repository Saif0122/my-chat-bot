const speak = (text) => {
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = locale;  // e.g. "fr-FR", "es-ES"
  const voiceList = speechSynthesis.getVoices();
  utt.voice = voiceList.find(v=> v.lang===locale && v.name.includes(selectedGender)) || null;
  speechSynthesis.speak(utt);
};

const recognition = new webkitSpeechRecognition();
recognition.lang = locale;
recognition.onresult = e => setInput(e.results[0][0].transcript);
