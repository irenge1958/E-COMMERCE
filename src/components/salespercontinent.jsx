import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const SalesDoughnutChart = () => {
  // Sales data per country, including "Others"
  const data = {
    labels: ['USA', 'Canada', 'UK', 'Germany', 'Australia', 'Others'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 150, 200, 100, 250, 120], // Adding sales data for "Others"
        backgroundColor: [
          '#007bff',  // USA - blue
          '#28a745',  // Canada - green
          '#ffc107',  // UK - yellow
          '#dc3545',  // Germany - red
          '#17a2b8',  // Australia - teal
          '#343a40',  // Others - dark grey
        ],
        borderColor: [
          '#fff',  // Border colors for each segment
        ],
        borderWidth: 2,  // Thickness of the borders
      },
    ],
  };

  // Optional chart configuration (for legends, tooltips, etc.)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left', // Set the legend to appear on top
      },
      tooltip: {
        enabled: true,  // Enable tooltips to show sales data on hover
      },
    },
  };

  return (
    <div style={{ width: '400px', margin: '0 auto' }}>
      <h4 className="text-center" >Sales per Country</h4>
      <Doughnut data={data} options={options} style={{marginTop:'-30px'}} />
    </div>
  );
};

export default SalesDoughnutChart;
