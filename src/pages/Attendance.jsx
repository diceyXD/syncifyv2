import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Attendance() {
  const subjects = ['CST 402', 'CST 414', 'CST 466', 'CST 448'];
  const months = ['December', 'January', 'February', 'March', 'April'];

  // Sample data for overall and subject-wise attendance
  const overallAttendance = [92, 88, 95, 90, 93];
  const subjectAttendance = {
    'CST 402': [90, 85, 92, 88, 91],
    'CST 414': [95, 89, 94, 92, 93],
    'CST 466': [88, 92, 96, 90, 94],
    'CST 448': [94, 87, 93, 91, 92]
  };

  // Sample attendance records data
  const attendanceRecords = [
    {
      subjectCode: 'CST 402',
      subjectName: 'Distributed Computing',
      facultyName: 'Jeena V R',
      classesAttended: 45,
      totalClasses: 50,
      attendancePercentage: 90
    },
    {
      subjectCode: 'CST 414',
      subjectName: 'Deep Learning',
      facultyName: 'Biju G',
      classesAttended: 47,
      totalClasses: 50,
      attendancePercentage: 94
    },
    {
      subjectCode: 'CST 466',
      subjectName: 'Data Mining',
      facultyName: 'Reeba B',
      classesAttended: 44,
      totalClasses: 50,
      attendancePercentage: 88
    },
    {
      subjectCode: 'CST 448',
      subjectName: 'Internet of Things',
      facultyName: 'Remya Reghu',
      classesAttended: 46,
      totalClasses: 50,
      attendancePercentage: 92
    }
  ];

  // Current subject-wise attendance percentage
  const currentSubjectAttendance = subjects.map(subject => {
    const attendance = subjectAttendance[subject];
    return attendance.reduce((a, b) => a + b, 0) / attendance.length;
  });

  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: 'Overall Attendance',
        data: overallAttendance,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        fill: true
      },
      ...subjects.map((subject, index) => ({
        label: subject,
        data: subjectAttendance[subject],
        borderColor: `hsl(${index * 90}, 70%, 50%)`,
        backgroundColor: 'transparent',
        tension: 0.1
      }))
    ]
  };

  const barChartData = {
    labels: subjects,
    datasets: [{
      label: 'Subject-wise Attendance',
      data: currentSubjectAttendance,
      backgroundColor: subjects.map((_, index) => `hsla(${index * 90}, 70%, 50%, 0.6)`),
      borderColor: subjects.map((_, index) => `hsl(${index * 90}, 70%, 50%)`),
      borderWidth: 1
    }]
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Attendance Trends'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Attendance Percentage'
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Current Subject-wise Attendance'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Attendance Percentage'
        }
      }
    }
  };

  return (
    <div className="p-4 w-full">
      <div className="bg-white dark:bg-dark-bg shadow-lg rounded-lg p-6 w-full transition-colors duration-200">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Attendance Overview</h2>
        <div className="space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="bg-gray-50 dark:bg-dark-secondary/20 p-4 rounded-md w-full transition-colors duration-200">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Overall Attendance Trend</h3>
              <div className="w-full h-[400px]">
                <Line options={lineChartOptions} data={lineChartData} />
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-dark-secondary/20 p-4 rounded-md w-full transition-colors duration-200">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Subject-wise Attendance</h3>
              <div className="w-full h-[400px]">
                <Bar options={barChartOptions} data={barChartData} />
              </div>
            </div>
          </div>

          {/* Attendance Records Table */}
          <div className="bg-white dark:bg-dark-secondary/10 rounded-md shadow transition-colors duration-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Attendance Records</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-dark-secondary/30 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Faculty Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Classes Attended</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Classes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Attendance %</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-dark-secondary/10 divide-y divide-gray-200 dark:divide-gray-700">
                    {attendanceRecords.map((record) => (
                      <tr key={record.subjectCode}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.subjectCode}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{record.subjectName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{record.facultyName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{record.classesAttended}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{record.totalClasses}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{record.attendancePercentage}%</td>
                      </tr>
                    ))}
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

export default Attendance;