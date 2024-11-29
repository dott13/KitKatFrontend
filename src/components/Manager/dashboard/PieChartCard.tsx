import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions} from 'chart.js';
import React, { useState} from "react";
import {ReversedCountryAbbreviationMap} from "../../../utils/country.ts";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  datasets: [{
    data: [100, 50, 100],
    backgroundColor: ['#8A7D66', '#888485', '#E3DDE0'],
    borderColor: ['#8A7D66', '#888485', '#E3DDE0'],
    hoverBorderWidth: 20,
    hoverOffset: 0,
  }]
};
const options: ChartOptions<'doughnut'> = {
  cutout: '70%',
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 40,
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
        generateLabels: function (chart) {
          const data = chart.data;
          const labels = ['Tech Employees', 'Soft Employees', 'On Project']
          return labels.map((label, i) => {
            const value = data.datasets[0].data[i];
            const backgroundColor = Array.isArray(data.datasets[0].backgroundColor) ? data.datasets[0].backgroundColor[i] : '#000';
            const borderColor = Array.isArray(data.datasets[0].borderColor) ? data.datasets[0].borderColor[i] : '#000';
            return {
              text: `${label}: ${value}`,
              fillStyle: backgroundColor,
              strokeStyle: borderColor,
              lineWidth: 2,
            };
          });
        }
      },
      align: 'center',
    },
    tooltip: {
      backgroundColor: '#fff',
      bodyColor: '#000',
      borderColor: '#8A7D66',
      borderWidth: 1,
      displayColors: false,
      callbacks: {
        title: ()=> {
          return [];
        }
      }

    },

  },
};

interface PieChartCardProps {
  status: "idle" | "loading" | "succeeded" | "failed";
}

const PieChartCard: React.FC<PieChartCardProps> = ({status}) => {

  const [country, setCountry] = useState<string>("")

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const  value = e.target.value;
    setCountry(value)
  };

  return (
    <div  className='h-[400px] w-[100%] flex flex-col items-center bg-white rounded shadow-md'>
      <div className='flex items-center justify-between w-full h-[20%] px-8'>
        <p className="text-black font-bold text-base ">Statistics</p>
        <select
          name="country"
          id="country"
          className=" w-[65px] px-2 py-2 focus:outline-0 text-widget border-widget border rounded  cursor-pointer  "
          value={country}
          onChange={handleChange}
        >
          <option value="">Country</option>
          {Object.entries(ReversedCountryAbbreviationMap).map(([countryName, countryId]) => (
            <option key={countryId} value={countryId}>
              {countryName}
            </option>
          ))}
        </select>

      </div>
      <div  className=' h-[85%] w-full p-[20px] flex justify-center items-center'>

        {status === "succeeded" ? (
          <Doughnut  data={data} options={options}/>
        ) : (
          <Spin
            indicator={<LoadingOutlined spin style={{ fontSize: 48, color: '#8A7D66' }} />}
          />
        )}
      </div>
    </div>
  );
};

export default PieChartCard;
