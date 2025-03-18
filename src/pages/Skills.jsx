import React, { useState, useRef } from 'react';
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
import { Bar } from 'react-chartjs-2';
import { FaUpload, FaFileAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

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

function Skills() {
    // State for skills data
    const [skills, setSkills] = useState(['Programming', 'Communication', 'Problem Solving', 'Teamwork', 'Leadership']);
    const [skillLevels, setSkillLevels] = useState([85, 75, 90, 80, 70]);
    const [targetLevels, setTargetLevels] = useState([95, 85, 95, 90, 85]);

    // State for file upload
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef(null);

    // Chart data for skills assessment
    const chartData = {
        labels: skills,
        datasets: [
            {
                label: 'Current Level',
                data: skillLevels,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgb(53, 162, 235)',
                borderWidth: 1,
            },
            {
                label: 'Target Level',
                data: targetLevels,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Skills Assessment',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    // Sample skill courses data
    const skillCourses = [
        {
            skillName: 'Programming',
            courses: [
                { name: 'Advanced JavaScript', progress: 75, totalHours: 40 },
                { name: 'React Development', progress: 90, totalHours: 30 },
                { name: 'Python for Data Science', progress: 60, totalHours: 50 },
            ],
        },
        {
            skillName: 'Communication',
            courses: [
                { name: 'Business Communication', progress: 80, totalHours: 20 },
                { name: 'Technical Writing', progress: 70, totalHours: 15 },
            ],
        },
        {
            skillName: 'Problem Solving',
            courses: [
                { name: 'Algorithms & Data Structures', progress: 85, totalHours: 45 },
                { name: 'Critical Thinking', progress: 95, totalHours: 25 },
            ],
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Skills Dashboard</h1>

            {/* Current Skills List */}
            <div className="bg-[var(--dark-surface)] p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">My Skills List</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-dark-secondary/30 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">S.No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Skill Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date Added</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Certificate</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-dark-secondary/10 divide-y divide-gray-200 dark:divide-gray-700">
                            {skills.map((skill, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{skill}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Jan {10 + index}, 2024</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-xs">
                                            View Certificate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* File Upload Section */}
            <div className="bg-[var(--dark-surface)] p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Skills</h2>
                <p className="text-sm text-[var(--dark-text)] mb-4">
                    Upload a file to add additional skills to your list. Supported formats: CSV, JSON.
                </p>

                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors duration-200"
                    onClick={() => fileInputRef.current.click()}
                >
                    <input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        accept=".csv,.json,.txt"
                        onChange={(e) => {
                            const selectedFile = e.target.files[0];
                            if (selectedFile) {
                                setFile(selectedFile);
                                setFileError('');
                                setUploadSuccess(false);
                            }
                        }}
                    />

                    {!file ? (
                        <div className="flex flex-col items-center justify-center">
                            <FaUpload className="text-gray-500 text-3xl mb-2" />
                            <p className="text-sm font-medium">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-400 mt-1">CSV, JSON or TXT (Max 2MB)</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <FaFileAlt className="text-blue-500 text-3xl mb-2" />
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-gray-400 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                    )}
                </div>

                {fileError && (
                    <div className="mt-3 text-red-500 text-sm flex items-center">
                        <FaTimesCircle className="mr-1" />
                        {fileError}
                    </div>
                )}

                {uploadSuccess && (
                    <div className="mt-3 text-green-500 text-sm flex items-center">
                        <FaCheckCircle className="mr-1" />
                        File uploaded successfully! Your skills list has been updated.
                    </div>
                )}

                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-gray-700 hover:bg-gray-600 text-[var(--dark-text)] py-2 px-4 rounded mr-2"
                        onClick={() => {
                            setFile(null);
                            setFileError('');
                            setUploadSuccess(false);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        disabled={!file}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-[var(--dark-text)] py-2 px-4 rounded"
                        onClick={() => {
                            if (!file) {
                                setFileError('Please select a file to upload');
                                return;
                            }

                            // Here we would normally process the file
                            // For demo purposes, we'll just simulate adding new skills
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                try {
                                    // This is a simplified example - in a real app you'd parse the file properly
                                    // For demo, we'll just add some hardcoded skills
                                    const newSkills = ['Data Science', 'Machine Learning', 'Cloud Computing'];
                                    const newLevels = [65, 70, 60];
                                    const newTargets = [85, 90, 80];

                                    setSkills([...skills, ...newSkills]);
                                    setSkillLevels([...skillLevels, ...newLevels]);
                                    setTargetLevels([...targetLevels, ...newTargets]);

                                    setUploadSuccess(true);
                                    setFileError('');
                                } catch (error) {
                                    setFileError('Error processing file. Please check the file format.');
                                }
                            };
                            reader.onerror = () => {
                                setFileError('Error reading file');
                            };
                            reader.readAsText(file);
                        }}
                        disabled={!file}
                    >
                        Upload and Process
                    </button>
                </div>
            </div>

            {/* Recommended Skills */}
            <div className="bg-[var(--dark-surface)] p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Recommended Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-700 rounded-lg p-4">
                        <h3 className="font-medium mb-2">Cloud Computing</h3>
                        <p className="text-sm text-[var(--dark-text)] mb-3">
                            Enhance your technical profile with cloud platform knowledge
                        </p>
                        <button className="text-sm bg-blue-600 hover:bg-blue-700 text-[var(--dark-text)] py-1 px-3 rounded">
                            Explore Courses
                        </button>
                    </div>
                    <div className="border border-gray-700 rounded-lg p-4">
                        <h3 className="font-medium mb-2">UI/UX Design</h3>
                        <p className="text-sm text-[var(--dark-text)] mb-3">
                            Complement your development skills with design principles
                        </p>
                        <button className="text-sm bg-blue-600 hover:bg-blue-700 text-[var(--dark-text)] py-1 px-3 rounded">
                            Explore Courses
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Skills;