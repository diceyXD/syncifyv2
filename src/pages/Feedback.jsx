import React, { useState } from 'react';
import { FaStar, FaRegStar, FaPaperPlane, FaThumbsUp } from 'react-icons/fa';

function Feedback() {
    // State for feedback form
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackType, setFeedbackType] = useState('general');
    const [selectedInstructor, setSelectedInstructor] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [historyFilter, setHistoryFilter] = useState('all');

    // State for feedback history
    const [feedbackHistory, setFeedbackHistory] = useState([
        {
            id: 1,
            type: 'course',
            text: 'The React course was excellent! The instructor explained complex concepts in a simple way.',
            rating: 5,
            date: 'Feb 15, 2024',
            response: 'Thank you for your positive feedback! We\'re glad you enjoyed the course.',
            status: 'responded'
        },
        {
            id: 2,
            type: 'platform',
            text: 'The dashboard is intuitive, but I would like to see more customization options.',
            rating: 4,
            date: 'Feb 10, 2024',
            response: '',
            status: 'pending'
        },
        {
            id: 3,
            type: 'general',
            text: 'Overall experience has been great so far!',
            rating: 4,
            date: 'Jan 28, 2024',
            response: 'We appreciate your feedback and are continuously working to improve.',
            status: 'responded'
        }
    ]);

    // Feedback types
    const feedbackTypes = [
        { id: 'general', label: 'General Feedback' },
        { id: 'course', label: 'Course Feedback' },
        { id: 'platform', label: 'Platform Feedback' },
        { id: 'instructor', label: 'Instructor Feedback' }
    ];

    // Instructors list
    const instructors = [
        { id: 'john_doe', name: 'John Doe' },
        { id: 'jane_smith', name: 'Jane Smith' },
        { id: 'robert_johnson', name: 'Robert Johnson' },
        { id: 'emily_davis', name: 'Emily Davis' },
        { id: 'michael_brown', name: 'Michael Brown' }
    ];

    // Courses list
    const courses = [
        { id: 'react_basics', name: 'React Basics' },
        { id: 'advanced_js', name: 'Advanced JavaScript' },
        { id: 'web_design', name: 'Web Design Fundamentals' },
        { id: 'node_backend', name: 'Node.js Backend Development' },
        { id: 'data_structures', name: 'Data Structures & Algorithms' }
    ];

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (feedbackText.trim() === '' || rating === 0) {
            return;
        }

        // Create new feedback entry
        const newFeedback = {
            id: feedbackHistory.length + 1,
            type: feedbackType,
            instructor: feedbackType === 'instructor' ? selectedInstructor : null,
            course: feedbackType === 'course' ? selectedCourse : null,
            text: feedbackText,
            rating: rating,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            response: '',
            status: 'pending'
        };

        // In a real app, you would send this to an API
        console.log(newFeedback);

        // Update feedback history
        setFeedbackHistory([newFeedback, ...feedbackHistory]);

        // Reset form and show success message
        setFeedbackText('');
        setFeedbackType('general');
        setSelectedInstructor('');
        setSelectedCourse('');
        setRating(0);
        setSubmitted(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
            setSubmitted(false);
        }, 3000);
    };

    // Render star rating component
    const renderStarRating = (value, editable = false) => {
        return (
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type={editable ? "button" : ""}
                        className={`${editable ? 'cursor-pointer' : 'cursor-default'} text-xl focus:outline-none`}
                        onClick={editable ? () => setRating(star) : undefined}
                    >
                        {star <= value ? (
                            <FaStar className="text-amber-500" />
                        ) : (
                            <FaRegStar className="text-gray-300 dark:text-gray-400" />
                        )}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Feedback Center</h1>

            {/* Submit Feedback Section */}
            <div className="bg-[var(--dark-surface)] p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>

                {submitted ? (
                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded relative mb-4 flex items-center">
                        <FaThumbsUp className="mr-2" />
                        <span>Thank you for your feedback! We appreciate your input.</span>
                    </div>
                ) : null}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Feedback Type</label>
                        <select
                            value={feedbackType}
                            onChange={(e) => setFeedbackType(e.target.value)}
                            className="w-full px-3 py-2 bg-[var(--dark-bg)] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {feedbackTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Conditional Instructor Dropdown */}
                    {feedbackType === 'instructor' && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Select Instructor</label>
                            <select
                                value={selectedInstructor}
                                onChange={(e) => setSelectedInstructor(e.target.value)}
                                className="w-full px-3 py-2 bg-[var(--dark-bg)] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Choose an instructor</option>
                                {instructors.map((instructor) => (
                                    <option key={instructor.id} value={instructor.id}>
                                        {instructor.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Conditional Course Dropdown */}
                    {feedbackType === 'course' && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Select Course</label>
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                className="w-full px-3 py-2 bg-[var(--dark-bg)] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Choose a course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Rating</label>
                        {renderStarRating(rating, true)}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Your Feedback</label>
                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            rows="4"
                            className="w-full px-3 py-2 bg-[var(--dark-bg)] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Share your thoughts, suggestions, or experiences..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-[var(--dark-text)] py-2 px-4 rounded"
                        >
                            <FaPaperPlane className="mr-2" />
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>

            {/* Feedback History Section */}
            <div className="bg-[var(--dark-surface)] p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Your Feedback History</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Filter by Type</label>
                    <select
                        value={historyFilter}
                        onChange={(e) => setHistoryFilter(e.target.value)}
                        className="w-full px-3 py-2 bg-[var(--dark-bg)] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Feedback</option>
                        {feedbackTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                {feedbackHistory.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 italic">You haven't submitted any feedback yet.</p>
                ) : (
                    <div className="space-y-4">
                        {feedbackHistory
                            .filter(feedback => historyFilter === 'all' || feedback.type === historyFilter)
                            .map((feedback) => (
                                <div key={feedback.id} className="border border-gray-700 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded mr-2">
                                                {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                                                {feedback.type === 'instructor' && feedback.instructor && (
                                                    <>: {instructors.find(i => i.id === feedback.instructor)?.name}</>
                                                )}
                                                {feedback.type === 'course' && feedback.course && (
                                                    <>: {courses.find(c => c.id === feedback.course)?.name}</>
                                                )}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">{feedback.date}</span>
                                        </div>
                                        {renderStarRating(feedback.rating)}
                                    </div>

                                    <p className="mb-3">{feedback.text}</p>

                                    {feedback.response && (
                                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md mt-2">
                                            <p className="text-sm font-medium mb-1">Response:</p>
                                            <p className="text-sm">{feedback.response}</p>
                                        </div>
                                    )}

                                    <div className="mt-2">
                                        <span className={`text-xs px-2 py-1 rounded ${feedback.status === 'responded' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'}`}>
                                            {feedback.status === 'responded' ? 'Responded' : 'Pending Response'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>

            {/* Feedback Statistics */}
            <div className="bg-[var(--dark-surface)] p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Feedback Statistics</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-[var(--dark-bg)] p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Average Rating</h3>
                        <div className="flex items-center">
                            <span className="text-3xl font-bold mr-2">4.3</span>
                            <div className="flex text-yellow-400">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaRegStar />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[var(--dark-bg)] p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Total Submissions</h3>
                        <p className="text-3xl font-bold">24</p>
                    </div>

                    <div className="bg-[var(--dark-bg)] p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Response Rate</h3>
                        <p className="text-3xl font-bold">92%</p>
                    </div>
                </div>

                <div className="bg-[var(--dark-bg)] p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Feedback by Category</h3>
                    <div className="space-y-2">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Course Feedback</span>
                                <span>45%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Platform Feedback</span>
                                <span>30%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Instructor Feedback</span>
                                <span>15%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span>General Feedback</span>
                                <span>10%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feedback;