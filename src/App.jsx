import { useEffect, useState } from "react";
import MoodSelector from "./components/MoodSelector";
import MoodHistory from "./components/MoodHistory";
import MoodStats from "./components/MoodStats";

function App() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("moodHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(history));
  }, [history]);

  function handleSelectMood(mood) {
    const now = new Date();

    const date = now.toLocaleDateString();

    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const hour = now.getHours();

    let period = "";

    if (hour >= 5 && hour < 12) {
      period = "🌅 Morning";
    } else if (hour >= 12 && hour < 17) {
      period = "☀️ Afternoon";
    } else if (hour >= 17 && hour < 21) {
      period = "🌇 Evening";
    } else {
      period = "🌙 Night";
    }

    const newMood = {
      id: Date.now(),
      name: mood.name,
      emoji: mood.emoji,
      date,
      time,
      period,
    };

    setHistory((prev) => [newMood, ...prev]);
  }

  function clearHistory() {
    if (window.confirm("Delete all mood history?")) {
      setHistory([]);
    }
  }

  const totalEntries = history.length;

  const uniqueMoods = new Set(history.map((item) => item.name)).size;

  const latestMood = history[0];

  const hour = new Date().getHours();

  let greeting = "🌙 Good Night";

  if (hour >= 5 && hour < 12) greeting = "🌅 Good Morning";
  else if (hour >= 12 && hour < 17) greeting = "☀️ Good Afternoon";
  else if (hour >= 17 && hour < 21) greeting = "🌇 Good Evening";

  return (
    <div className="app">
      <header className="header">
        <h1>{greeting}</h1>

        <p>{new Date().toDateString()}</p>
      </header>

      <div className="dashboard">
        <div className="dashboard-card">
          <h4>Total Entries</h4>
          <h2>{totalEntries}</h2>
        </div>

        <div className="dashboard-card">
          <h4>Different Moods</h4>
          <h2>{uniqueMoods}</h2>
        </div>

        <div className="dashboard-card">
          <h4>Last Mood</h4>

          {latestMood ? (
            <h2>
              {latestMood.emoji} {latestMood.name}
            </h2>
          ) : (
            <h2>---</h2>
          )}
        </div>
      </div>

      <div className="top-section">
        <MoodSelector onSelectMood={handleSelectMood} />

        <MoodStats history={history} />
      </div>

      <MoodHistory history={history} />

      {history.length > 0 && (
        <button className="clear-btn" onClick={clearHistory}>
          🗑 Clear All Records
        </button>
      )}

      <footer>Made with ❤️ using React</footer>
    </div>
  );
}

export default App;
