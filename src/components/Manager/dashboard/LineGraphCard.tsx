import React, { useState} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js';
import {Line} from "react-chartjs-2";
import {Month} from "../../../utils/months.ts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  BarElement
);

const data = {
  labels:  Object.values(Month),
  datasets: [{
    label: 'on Bench',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: '#8A7D66',
    backgroundColor: '#8A7D66',
    pointBackgroundColor: '#8A7D66',
    tension: 0.4,
    pointHoverBackgroundColor: '#000',
  }],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true, // Ensures the Y-axis starts at 0
    },
  },
};

const LineGraphCard = () => {

  const [onBench, setOnBench] = useState<number>(1)

  const handleChange = ( e:React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    e.currentTarget.value = e.target.value

    setOnBench(Number(e.target.value));
  }


  return(
    <div className=' h-[100%] w-[100%] flex flex-col items-center bg-white rounded shadow-md'>
      <div className='flex items-center justify-between w-full h-[20%] px-8'>
        <p className="text-black font-bold text-base">Performance</p>
        <select
          name="status"
          id="status"
          className=" w-fit px-2 py-2 focus:outline-0 text-widget border-widget border rounded  cursor-pointer  "
          value={onBench}
          onChange={handleChange}
        >
          <option value="0">Yearly</option>
          <option value="1">Monthly</option>
          <option value="2">Weekly</option>

        </select>

      </div>

      <div className='w-[100%] h-[80%] px-[40px] pb-[30px]'>
        <Line data={data} options={options}/>
      </div>




    </div>
  )
}

export default LineGraphCard;