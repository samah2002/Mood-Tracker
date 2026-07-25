function MoodHistory({ history }) {
  return (
    <div className="card">
      <h2>📜 Mood History</h2>

      {history.length === 0 ? (
        <div className="empty-history">
          <h3>No Mood History</h3>

          <p>Start by selecting your mood.</p>
        </div>
      ) : (
        <ul className="history-list">
          {history.map((item) => (
            <li key={item.id} className="history-item">
              <div className="history-left">
                <div className="history-emoji">{item.emoji}</div>

                <div>
                  <h4>{item.name}</h4>

                  <small>{item.period}</small>
                </div>
              </div>

              <div className="history-right">
                <span>{item.date}</span>

                <span>{item.time}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MoodHistory;
