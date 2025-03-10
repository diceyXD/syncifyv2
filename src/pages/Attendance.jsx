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
  const subjects = ['CST 402', 'CST 414', 'CST 466', 'CST 448', 'CSD 416'];
  const months = ['December', 'January', 'February', 'March', 'April'];

  // Sample data for overall and subject-wise attendance
  const overallAttendance = [92, 88, 95, 90, 93];
  const subjectAttendance = {
    'CST 402': [90, 85, 92, 88, 91],
    'CST 414': [95, 89, 94, 92, 93],
    'CST 466': [88, 92, 96, 90, 94],
    'CST 448': [94, 87, 93, 91, 92],
    'CSD 416': [100, 100, 100, 100, 100]
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
    },
    {
      subjectCode: 'CSD 416',
      subjectName: 'Project Phase II',
      facultyName: 'Reeba B',
      classesAttended: 50,
      totalClasses: 50,
      attendancePercentage: 100
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

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
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

  const [selectedWeek, setSelectedWeek] = useState(1);
  const totalWeeks = 16; // Assuming a 16-week semester

  // Function to calculate dates for a given week number
  const getWeekDates = (weekNumber) => {
    const startDate = new Date('2024-12-16'); // Week 1 starts from Dec 16, 2024
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekNumber - 1) * 7);

    const weekDates = {
      Monday: new Date(weekStart),
      Tuesday: new Date(weekStart.setDate(weekStart.getDate() + 1)),
      Wednesday: new Date(weekStart.setDate(weekStart.getDate() + 1)),
      Thursday: new Date(weekStart.setDate(weekStart.getDate() + 1)),
      Friday: new Date(weekStart.setDate(weekStart.getDate() + 1))
    };

    return weekDates;
  };

  // Sample weekly attendance data for multiple weeks
  const semesterWeeklyAttendance = {
    1: {
      Monday: [
        { present: true, subject: 'CST 402', faculty: 'Jeena V R' },
        { present: false, subject: 'CST 414', faculty: 'Biju G' },
        { present: true, subject: 'CST 466', faculty: 'Reeba B' },
        { present: true, subject: 'CST 448', faculty: 'Remya Reghu' },
        { present: true, subject: 'CST 402', faculty: 'Jeena V R' },
        { present: true, subject: 'CST 414', faculty: 'Biju G' }
      ],
      Tuesday: [
        { present: true, subject: 'CST 466', faculty: 'Reeba B' },
        { present: true, subject: 'CST 448', faculty: 'Remya Reghu' },
        { present: true, subject: 'CST 402', faculty: 'Jeena V R' },
        { present: false, subject: 'CST 414', faculty: 'Biju G' },
        { present: true, subject: 'CST 466', faculty: 'Reeba B' },
        { present: true, subject: 'CST 448', faculty: 'Remya Reghu' }
      ],
      Wednesday: [
        { present: true, subject: 'CST 402', faculty: 'Jeena V R' },
        { present: true, subject: 'CST 414', faculty: 'Biju G' },
        { present: false, subject: 'CST 466', faculty: 'Reeba B' },
        { present: true, subject: 'CST 448', faculty: 'Remya Reghu' },
        { present: true, subject: 'CST 402', faculty: 'Jeena V R' },
        { present: true, subject: 'CST 414', faculty: 'Biju G' }
      ],
      Thursday: [
        { present: true, subject: 'CST 466', faculty: 'Reeba B' },
        { present: true, subject: 'CST 448', faculty: 'Remya Reghu' },
        { present: true, subject: 'CST 402', faculty: 'Jeena V R' },
        { present: true, subject: 'CST 414', faculty: 'Biju G' },
        { present: false, subject: 'CST 466', faculty: 'Reeba B' },
        { present: true, subject: 'CST 448', faculty: 'Remya Reghu' }
      ],
      Friday: [
        { present: true, subject: 'CSD 416', faculty: 'Reeba B' },
        { present: true, subject: 'CSD 416', faculty: 'Reeba B' },
        { present: true, subject: 'CSD 416', faculty: 'Reeba B' },
        { present: true, subject: 'CSD 416', faculty: 'Reeba B' },
        { present: true, subject: 'CSD 416', faculty: 'Reeba B' },
        { present: true, subject: 'CSD 416', faculty: 'Reeba B' }
      ]
    },
    2: {
      Monday: [
        { present: true, subject: 'CST 402', faculty: 'Jeena V R' },
        { present: true, subject: 'CST 414', faculty: 'Biju G' },
        { present: true, subject: 'CST 466', faculty: 'Reeba B' },
        { present: true, subject: 'CST 448', faculty: 'Remya Reghu' },
        { present: false, subject: 'CST 402', faculty: 'Jeena V R' },
        { present: true, subject: 'CST 414', faculty: 'Biju G' }
      ],
      Tuesday: [
        { present: true, subject: 'CST 466', faculty: 'Reeba B' },
        { present: true, subject: 'CST 448', faculty: 'Remya Reghu' },
        { present: false, subject: 'CST 402', faculty: 'Jeena V R' },
        { present: true, subject: 'CST 414', faculty: 'Biju G' },
        { present: true, subject: 'CST 466', faculty: 'Reeba B' },
        { present: true, subject: 'CST 448', faculty: 'Remya Reghu' }
      ],
      Wednesday: [
        { present: true, subject: 'CST 402', faculty: 'Jeena V R' },
        { present: false, subject: 'CST 414', faculty: 'Biju G' },
        { present: true, subject: 'CST 466', faculty: 'Reeba B' },
        { present: true, subject: 'CST 448', faculty: 'Remya Reghu' },
        { present: true, subject: 'CST 402', faculty: 'Jeena V R' },
        { present: true, subject: 'CST 414', faculty: 'Biju G' }
      ],
      Thursday: [
        { present: true, subject: 'CST 466', faculty: 'Reeba B' },
        { present: true, subject: 'CST 448', faculty: 'Remya Reghu' },
        { present: true, subject: 'CST 402', faculty: 'Jeena V R' },
        { present: false, subject: 'CST 414', faculty: 'Biju G' },
        { present: true, subject: 'CST 466', faculty: 'Reeba B' },
        { present: true, subject: 'CST 448', faculty: 'Remya Reghu' }
      ],
      Friday: [
        { present: false, subject: 'CSD 416', faculty: 'Reeba B' },
        { present: true, subject: 'CSD 416', faculty: 'Reeba B' },
        { present: true, subject: 'CSD 416', faculty: 'Reeba B' },
        { present: true, subject: 'CSD 416', faculty: 'Reeba B' },
        { present: true, subject: 'CSD 416', faculty: 'Reeba B' },
        { present: true, subject: 'CSD 416', faculty: 'Reeba B' }
      ]
    }
  };

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
  ];

  const handleWeekChange = (week) => {
    setSelectedWeek(week);
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

          {/* Weekly Calendar Section */}
          <div className="bg-gray-50 dark:bg-dark-secondary/20 p-4 rounded-md w-full transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Weekly Attendance Calendar</h3>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedWeek}
                  onChange={(e) => handleWeekChange(parseInt(e.target.value))}
                  className="px-3 py-1 text-sm bg-gray-200 dark:bg-dark-secondary rounded-md hover:bg-gray-300 dark:hover:bg-dark-secondary/50 transition-colors duration-200"
                >
                  {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((week) => (
                    <option key={week} value={week}>Week {week}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border dark:border-gray-700 bg-gray-100 dark:bg-dark-secondary/30 text-gray-700 dark:text-gray-300">Date</th>
                    <th className="p-2 border dark:border-gray-700 bg-gray-100 dark:bg-dark-secondary/30 text-gray-700 dark:text-gray-300">Day</th>
                    {Array.from({ length: 6 }, (_, index) => (
                      <th key={index} className="p-2 border dark:border-gray-700 bg-gray-100 dark:bg-dark-secondary/30 text-gray-700 dark:text-gray-300">
                        Hour {index + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(semesterWeeklyAttendance[selectedWeek] || {}).map(([day, hours]) => {
                    const weekDates = getWeekDates(selectedWeek);
                    const currentDate = weekDates[day];
                    return (
                      <tr key={day}>
                        <td className="p-2 border dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm font-medium">
                          {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="p-2 border dark:border-gray-700 text-gray-600 dark:text-gray-400 text-sm font-medium">
                          {day}
                        </td>
                        {hours.map((slot, hourIndex) => (
                          <td key={`${day}-${hourIndex}`} className="p-2 border dark:border-gray-700">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <div className={`w-4 h-4 rounded-full ${slot.present ? 'bg-green-500' : 'bg-red-500'}`} />
                              <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{slot.subject}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{slot.faculty}</div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;