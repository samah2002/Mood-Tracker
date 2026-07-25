import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function MoodStats({ history }) {
  if (history.length === 0) {
    return (
      <div className="card">
        <h2>📊 Mood Statistics</h2>

        <div className="empty-chart">
          <h3>No Data Yet</h3>

          <p>Select your first mood.</p>
        </div>
      </div>
    );
  }

  const counts = {};

  history.forEach((item) => {
    counts[item.name] = (counts[item.name] || 0) + 1;
  });

  const moodColors = {
    Happy: "#22c55e",
    Sad: "#3b82f6",
    Neutral: "#facc15",
    Angry: "#ef4444",
    Tired: "#a855f7",
  };

  const labels = Object.keys(counts);

  const values = Object.values(counts);

  const colors = labels.map((label) => moodColors[label] || "#38bdf8");

  const maxMood = labels.reduce((a, b) => (counts[a] > counts[b] ? a : b));

  const percentage = ((counts[maxMood] / history.length) * 100).toFixed(1);

  const data = {
    labels,

    datasets: [
      {
        data: values,

        backgroundColor: colors,

        borderColor: "#0f172a",

        borderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },

      datalabels: {
        color: "#fff",

        formatter: (value) => {
          const total = values.reduce((a, b) => a + b, 0);

          return ((value / total) * 100).toFixed(0) + "%";
        },

        font: {
          weight: "bold",
          size: 16,
        },
      },
    },
  };

  return (
    <div className="card">
      <h2>📊 Mood Statistics</h2>

      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>

      <div className="stats-summary">
        <div className="summary-box">
          <h4>Most Selected</h4>

          <h3>{maxMood}</h3>
        </div>

        <div className="summary-box">
          <h4>Percentage</h4>

          <h3>{percentage}%</h3>
        </div>
      </div>

      <div className="progress-section">
        {labels.map((label) => {
          const percent = ((counts[label] / history.length) * 100).toFixed(0);

          return (
            <div className="progress-item" key={label}>
              <div className="progress-title">
                <span>{label}</span>

                <span>{percent}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${percent}%`,
                    background: moodColors[label],
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MoodStats;
