


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllModules } from '../redux/slices/moduleSlice';

import * as PiIcons from 'react-icons/pi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faDashboard
} from '@fortawesome/free-solid-svg-icons';
import AddModule from '../components/AddModule';

const fontAwesomeMap = {
  'fa fa-home': faHome,
  'fa fa-dashboard': faDashboard,
};

const Module = () => {
  const dispatch = useDispatch();
  const { moduleList, loading, error } = useSelector((state) => state.module);
  const [ showModel, setShowModel ] = useState(false)

  useEffect(() => {
    dispatch(AllModules());
  }, [dispatch]);

  const openModel = () => {
    setShowModel(true);

  }




  const renderIcon = (icon) => {
    // 1. Check if it's a Font Awesome class (like "fa fa-home")
    if (icon.startsWith('fa')) {
      const mapped = fontAwesomeMap[icon];
      return mapped ? (
        <FontAwesomeIcon icon={mapped} className="text-xl text-purple-700" />
      ) : (
        <span className="text-gray-400 italic">{icon}</span>
      );
    }

  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Module List</h2>
          <button onClick={openModel} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
            Add New
          </button>
        </div>

        {loading ? (
          <div className="p-6 text-center text-purple-600 font-medium">Loading modules...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600 font-medium">{error}</div>
        ) : moduleList.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No modules found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Icon</th>
                  <th className="px-6 py-3 text-left font-medium">Name</th>
                  <th className="px-6 py-3 text-left font-medium">URL</th>
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {moduleList.map((module) => (
                  <tr key={module.id} className="hover:bg-gray-50 text-black font-semibold">
                    <td className="px-6 py-4">{renderIcon(module.icon)}</td>
                    <td className="px-6 py-4">{module.name}</td>
                    <td className="px-6 py-4">{module.url}</td>
                    <td className="px-6 py-4">
                      <button className="text-purple-600 hover:underline text-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>




      {/*  */}
      <AddModule show={showModel} onClose={() => setShowModel(false)} />
    </div>
  );
};

export default Module;
