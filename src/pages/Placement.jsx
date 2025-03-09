import React from 'react';

function Placement() {
  return (
    <div className="p-4 w-full">
      <div className="bg-white dark:bg-dark-bg shadow-lg rounded-lg p-6 w-full transition-colors duration-200">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Placement Dashboard</h2>
        <div className="space-y-4 w-full">
          <div className="bg-gray-50 dark:bg-dark-secondary/20 p-4 rounded-md w-full transition-colors duration-200">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Placement Statistics</h3>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-white dark:bg-dark-secondary/10 p-4 rounded-md shadow transition-colors duration-200">
                <p className="text-sm text-gray-500 dark:text-gray-400">Placed Students</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">75%</p>
              </div>
              <div className="bg-white dark:bg-dark-secondary/10 p-4 rounded-md shadow transition-colors duration-200">
                <p className="text-sm text-gray-500 dark:text-gray-400">Average Package</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">$75K</p>
              </div>
              <div className="bg-white dark:bg-dark-secondary/10 p-4 rounded-md shadow transition-colors duration-200">
                <p className="text-sm text-gray-500 dark:text-gray-400">Highest Package</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">$120K</p>
              </div>
              <div className="bg-white dark:bg-dark-secondary/10 p-4 rounded-md shadow transition-colors duration-200">
                <p className="text-sm text-gray-500 dark:text-gray-400">Companies Visited</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">25</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-secondary/10 rounded-md shadow transition-colors duration-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Recent Placements</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-dark-secondary/30">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Package</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-dark-secondary/10 divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Sample data - Replace with actual data */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Jane Smith</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Tech Corp</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Software Engineer</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">$85K</span>
                      </td>
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

export default Placement;