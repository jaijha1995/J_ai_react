import React from 'react';
import { FaUsers, FaBoxOpen, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import image from "../assets/image.png";
const statsData = [
  {
    title: 'Ratings',
    value: '13k',
    change: '+15.6%',
    changeColor: 'text-green-600',
    subtitle: 'Year of 2021',
    image: image, // use your own avatar images or illustrations
    bgColor: 'bg-white',
  },
  {
    title: 'Sessions',
    value: '24.5k',
    change: '-20%',
    changeColor: 'text-red-500',
    subtitle: 'Last Week',
    image: image,
    bgColor: 'bg-white',
  },
];

const transactionStats = [
  {
    title: 'Sales',
    value: '245k',
    icon: <FaShoppingCart className="text-purple-600" />,
    bg: 'bg-purple-100',
  },
  {
    title: 'Customers',
    value: '12.5k',
    icon: <FaUsers className="text-green-600" />,
    bg: 'bg-green-100',
  },
  {
    title: 'Product',
    value: '1.54k',
    icon: <FaBoxOpen className="text-yellow-600" />,
    bg: 'bg-yellow-100',
  },
  {
    title: 'Revenue',
    value: '$88k',
    icon: <FaDollarSign className="text-blue-600" />,
    bg: 'bg-blue-100',
  },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statsData.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-6 rounded-xl shadow-sm ${item.bgColor}`}
          >
            <div>
              <h3 className="text-gray-500 text-sm">{item.title}</h3>
              <div className="text-2xl font-bold text-gray-800">{item.value}</div>
              <div className={`text-sm ${item.changeColor}`}>{item.change}</div>
              <div className="mt-1 text-xs text-purple-600 font-medium bg-purple-100 inline-block px-2 py-1 rounded-md">
                {item.subtitle}
              </div>
            </div>
            <img src={item.image} alt="Avatar" className="w-20 h-20 object-contain" />
          </div>
        ))}
      </div>

      {/* Transactions Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Transactions</h2>
        <p className="text-sm text-gray-500 mb-4">
          Total <span className="font-semibold text-green-600">48.5% Growth 😎</span> this month
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {transactionStats.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.bg}`}
              >
                {item.icon}
              </div>
              <div>
                <div className="text-sm text-gray-500">{item.title}</div>
                <div className="text-lg font-semibold text-gray-800">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;