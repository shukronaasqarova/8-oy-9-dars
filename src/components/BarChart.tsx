import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { Bar, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Barchart() {
  const [competenciesData, setCompetenciesData] = useState(null);

  useEffect(() => {
    const fetchCompetenciesData = async () => {
      try {
        const response = await fetch("https://trello.vimlc.uz/professional");
        const data = await response.json();

        setCompetenciesData({
          labels: [
            "Умкадаги интилувчанлик",
            "Эмоционал интеллект",
            "Қобатчилик",
            "Ходимларга бўнақанлик",
            "Топширикларга бўнақанлик",
            "Фаол иктимоий муносабатлар",
            "Ўз устида ишлаш",
            "Муаммоли вазиятта ёукалтирлик"
          ],
          datasets: [
            {
              data: [
                data.intellectual,
                data.emotional_intelligence,
                data.adaptability,
                data.leadership,
                data.task_management,
                data.social_relations,
                data.self_improvement,
                data.problem_solving
              ],
              backgroundColor: "#0066CC",
              borderColor: "#0066CC",
              borderWidth: 1,
              fill: true,
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCompetenciesData();
  }, []);

  if (!competenciesData) {
    return <div>Loading...</div>;
  }

  const barData1 = {
    labels: competenciesData?.labels?.slice(0, 4) || [],
    datasets: [{
      data: competenciesData?.datasets[0]?.data.slice(0, 4) || [],
      backgroundColor: "#0066CC",
      borderColor: "white",
      borderWidth: 1,
      barThickness: 12,
    }]
  };

  const barData2 = {
    labels: competenciesData?.labels?.slice(4) || [],
    datasets: [{
      data: competenciesData?.datasets[0]?.data.slice(4) || [],
      backgroundColor: "#0066CC",
      borderColor: "white",
      borderWidth: 1,
      barThickness: 12,
    }]
  };

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      x: {
        max: 100,
        grid: {
          display: false,
        },
        border: {
          display: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false
        },
        ticks: {
          font: {
            size: 14
          }
        }
      }
    }
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: '#CCCCCC'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          display: false
        },
        grid: {
          color: '#CCCCCC'
        },
        pointLabels: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Шахсий ва касбий хусусиятлар</h1>

      <div className="flex flex-wrap justify-between gap-8">
        <div className="w-full md:w-[30%]">
          {barData1?.labels?.map((label, index) => (
            <div key={label} className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">{label}</span>
                <span className="text-sm">{barData1?.datasets[0]?.data[index]}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded relative">
                <div 
                  className="h-2 bg-[#0066CC] rounded"
                  style={{ width: `${barData1?.datasets[0]?.data[index]}%` }}
                >
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-xs text-white p-1">{barData1?.datasets[0]?.data[index]}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:w-[30%]">
          <div className="w-full h-[300px]">
            <Radar data={competenciesData} options={radarOptions} />
          </div>
        </div>

        <div className="w-full md:w-[30%]">
          {barData2?.labels?.map((label, index) => (
            <div key={label} className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">{label}</span>
                <span className="text-sm">{barData2?.datasets[0]?.data[index]}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded relative">
                <div 
                  className="h-2 bg-[#0066CC] rounded"
                  style={{ width: `${barData2?.datasets[0]?.data[index]}%` }}
                >
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-xs text-white p-1">{barData2?.datasets[0]?.data[index]}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
