import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div className="min-h-screen bg-[var(--dark-bg)] text-[var(--dark-text)]">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16 sm:py-24">
                <div className="text-center space-y-8 animate-fade-in">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/src/assets/logo.png"
                            alt="Logo"
                            className="h-24 w-auto"
                        />
                    </div>
                    <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        An advanced academic management system designed to simplify and streamline the educational process.
                    </p>
                </div>
            </div>

            {/* Main Content Section with Features and Login Side by Side */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Key Features Section */}
                    <div className="flex-1 bg-[var(--dark-surface)] p-8 rounded-lg">
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                            Key features include:
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-[var(--dark-secondary)] border-l-4 border-indigo-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-in">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Automated attendance tracking
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Using advanced technology for efficient and accurate attendance management.
                                </p>
                            </div>
                            <div className="bg-[var(--dark-secondary)] border-l-4 border-green-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-in">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Real-time performance analysis
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Instant insights into student and educator performance metrics.
                                </p>
                            </div>
                            <div className="bg-[var(--dark-secondary)] border-l-4 border-yellow-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-in">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Seamless integration
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Effortlessly connects with existing school systems and workflows.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Login Options Section */}
                    <div className="flex-1 bg-[var(--dark-surface)] p-8 rounded-lg">
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                            Login Options
                        </h2>
                        <div className="grid grid-cols-2 gap-4 h-[calc(100%-5rem)]">
                            {[
                                { role: 'Admin', path: '/login' },
                                { role: 'Parent', path: '/login' },
                                { role: 'Teacher', path: '/login' },
                                { role: 'Student', path: '/login' }
                            ].map((option, index) => (
                                <Link
                                    key={option.role}
                                    to={option.path}
                                    className="flex flex-col justify-center items-center h-full p-6 bg-gray-200/80 dark:bg-gray-700/30 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-indigo-900 transform transition-all duration-300 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000 animate-bounce-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <h3 className="text-2xl font-bold text-white text-center mb-3 transition-colors duration-300">
                                        {option.role}
                                    </h3>
                                    <p className="text-gray-100 text-center transition-colors duration-300">
                                        Access your {option.role.toLowerCase()} dashboard
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;