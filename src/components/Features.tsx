import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import qrcode from "../assets/qr-code.svg";

interface FeaturesData {
  percentage: number;
  label: string;
  color: string;
}

const Features: React.FC = () => {
  const [data, setData] = useState<FeaturesData[]>([]);

  useEffect(() => {
    fetch("https://trello.vimlc.uz/competence")
      .then((response) => response.json())
      .then((result: FeaturesData[]) => {
        setData(result);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="mt-20 bg-white mb-20 px-12 py-12">
      <div className="flex items-center mb-8">
        <div className="bg-blue-800 w-2 h-10 mr-4"></div>
        <h2 className="text-black font-bold text-3xl lg:text-4xl">
          Компетенцияларинг намоён бўлиши
        </h2>
      </div>
      <div className="flex justify-between">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-center space-x-4 w-full"
            >
              <div className="flex items-center space-x-4 w-full">
                <div className="relative w-36 h-36">
                  <CircularProgressbar
                    value={item.percentage}
                    styles={buildStyles({
                      pathColor: item.color, 
                      trailColor: "#e6e6e6",
                      textColor: "#000",
                      textSize: "18px",
                      strokeLinecap: "round",
                    })}
                    text={`${item.percentage}%`}
                  />
                </div>
                <p className="text-center text-sm lg:text-lg font-bold whitespace-normal">
                  {item.label.split(" ").map((word, index) => (
                    <span key={index} className="block">
                      {word}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <img src={qrcode} alt="QR Code" className="w-52 h-52" />
        </div>
      </div>
    </div>
  );
};

export default Features;
