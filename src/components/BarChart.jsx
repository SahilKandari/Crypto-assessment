import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const BarChart = ({ data, options}) => {
  return (
    <div className='max-w-screen-md ml-auto mr-auto pt-6 h-96'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
