const moods = [
  {
    id: 1,
    name: "Happy",
    emoji: "😊",
    color: "#22c55e",
  },
  {
    id: 2,
    name: "Sad",
    emoji: "😢",
    color: "#3b82f6",
  },
  {
    id: 3,
    name: "Neutral",
    emoji: "😐",
    color: "#facc15",
  },
  {
    id: 4,
    name: "Angry",
    emoji: "😡",
    color: "#ef4444",
  },
  {
    id: 5,
    name: "Tired",
    emoji: "😴",
    color: "#a855f7",
  },
];

function MoodSelector({ onSelectMood }) {
  return (
    <div className="card">
      <h2>😊 How are you feeling today?</h2>

      <div className="mood-container">
        {moods.map((mood) => (
          <button
            key={mood.id}
            className="mood-btn"
            style={{
              borderColor: mood.color,
            }}
            onClick={() => onSelectMood(mood)}
          >
            <span className="emoji">{mood.emoji}</span>

            <span>{mood.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodSelector;
