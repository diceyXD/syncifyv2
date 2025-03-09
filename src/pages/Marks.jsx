import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Marks() {
  const subjects = ['CST 402', 'CST 414', 'CST 466', 'CST 448'];
  const series1Marks = [45, 40, 43, 41];
  const series2Marks = [42, 44, 45, 43];
  const predictedMarks = [87, 84, 88, 84];
  const semesterMarks = [85, 82, 86, 83];
  const marksDifference = predictedMarks.map((predicted, index) => predicted - semesterMarks[index]);

  // Calculate grade distribution
  const gradeDistribution = {
    excellent: semesterMarks.filter(mark => mark > 80).length,
    good: semesterMarks.filter(mark => mark > 60 && mark <= 80).length,
    pass: semesterMarks.filter(mark => mark > 40 && mark <= 60).length,
    fail: semesterMarks.filter(mark => mark <= 40).length
  };

  const totalStudents = semesterMarks.length;
  const gradePercentages = {
    excellent: (gradeDistribution.excellent / totalStudents) * 100,
    good: (gradeDistribution.good / totalStudents) * 100,
    pass: (gradeDistribution.pass / totalStudents) * 100,
    fail: (gradeDistribution.fail / totalStudents) * 100
  };

  const chartData = {
    labels: subjects,
    datasets: [
      {
        label: 'Series 1 Marks',
        data: series1Marks,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'transparent',
        tension: 0.1,
        yAxisID: 'y'
      },
      {
        label: 'Series 2 Marks',
        data: series2Marks,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'transparent',
        tension: 0.1,
        yAxisID: 'y'
      },
      {
        label: 'Predicted Marks',
        data: predictedMarks,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
        fill: '+1',
        yAxisID: 'y1'
      },
      {
        label: 'Semester Marks',
        data: semesterMarks,
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'transparent',
        tension: 0.1,
        yAxisID: 'y1'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance Analysis'
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Series Marks (0-50)'
        },
        min: 0,
        max: 50
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Semester/Predicted Marks (0-100)'
        },
        min: 0,
        max: 100,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };
  return (
    <div className="p-4 w-full">
      <div className="bg-white dark:bg-dark-bg shadow-lg rounded-lg p-6 w-full transition-colors duration-200">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Academic Performance</h2>
        <div className="space-y-4 w-full">
          <div className="bg-gray-50 dark:bg-dark-secondary/20 p-4 rounded-md w-full transition-colors duration-200">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Performance Trends</h3>
            <div className="w-full h-[400px]">
              <Line options={options} data={chartData} />
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-dark-secondary/20 p-4 rounded-md w-full transition-colors duration-200">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Grade Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <div className="bg-white dark:bg-dark-secondary/10 p-4 rounded-md shadow transition-colors duration-200">
                <p className="text-sm text-gray-500 dark:text-gray-400">Excellent (80-100%)</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{gradeDistribution.excellent} ({gradePercentages.excellent.toFixed(1)}%)</p>
              </div>
              <div className="bg-white dark:bg-dark-secondary/10 p-4 rounded-md shadow transition-colors duration-200">
                <p className="text-sm text-gray-500 dark:text-gray-400">Good (60-79%)</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{gradeDistribution.good} ({gradePercentages.good.toFixed(1)}%)</p>
              </div>
              <div className="bg-white dark:bg-dark-secondary/10 p-4 rounded-md shadow transition-colors duration-200">
                <p className="text-sm text-gray-500 dark:text-gray-400">Pass (40-59%)</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{gradeDistribution.pass} ({gradePercentages.pass.toFixed(1)}%)</p>
              </div>
              <div className="bg-white dark:bg-dark-secondary/10 p-4 rounded-md shadow transition-colors duration-200">
                <p className="text-sm text-gray-500 dark:text-gray-400">Fail</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{gradeDistribution.fail} ({gradePercentages.fail.toFixed(1)}%)</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-secondary/10 rounded-md shadow transition-colors duration-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Student Marks</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-dark-secondary/30 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Faculty Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Series 1 Marks(50)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Series 2 Marks(50)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Predicted Sem Mark(100)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Semester Exam Marks(100)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-dark-secondary/10 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">CST 402</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Distributed Computing</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Jeena V R</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">45</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">42</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">87</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">85</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">CST 414</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Deep Learning</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Biju G</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">40</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">44</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">84</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">82</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">CST 466</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Data Mining</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Reeba B</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">43</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">45</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">88</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">86</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">CST 448</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Internet of Things</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Remya Reghu</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">41</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">43</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">84</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">83</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marks;