import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components needed for the chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  // Data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June','july','august','september','october','november','december'],
    datasets: [
      {
        label: 'Sales Over Time',
        data: [150, 200, 170, 220, 180, 240,150, 200, 170, 220, 180, 240],
        fill: false,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
