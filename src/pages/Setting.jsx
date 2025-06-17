import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompany } from '../redux/slices/companySlice';
import * as FaIcons from 'react-icons/fa';
import AddCompany from '../components/AddCompany';

const Setting = () => {
  const dispatch = useDispatch();
  const { companyList, loading, error } = useSelector((state) => state.company);
  const [showModel, setShowModel] = useState(false)

  useEffect(() => {
    dispatch(fetchCompany());
  }, [dispatch]);


  const openModel = () => {
    setShowModel(true);

  }


  console.log(companyList, "companyList");

  const getIconComponent = (iconName) => {
    const cleanedIcon = iconName?.split(' ').pop(); // e.g., 'fa fa-dashboard' -> 'fa-dashboard'
    const pascalName = cleanedIcon
      ?.replace(/^fa-/, '') // remove 'fa-'
      ?.replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase()); // to PascalCase
    const iconKey = `Fa${pascalName}`;
    return FaIcons[iconKey] || null;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Company List</h2>
          <button onClick={openModel} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition">
            Add New
          </button>
        </div>


        {loading && <p className="text-purple-600">Loading company data...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
          {companyList?.length > 0 ? (
            companyList.map((company) => (
              <div key={company?.id} className="bg-white rounded-xl shadow-md p-5 border border-gray-200">
                <h2 className="text-xl font-bold mb-2 text-purple-700 flex justify-between">Name: <span className='text-black font-semibold'> {company?.customer?.first_name}</span></h2>
                <h2 className="text-xl font-bold mb-2 text-purple-700">API Key:</h2>
                <p className="break-all text-sm text-gray-600 mb-4">{company.api_key}</p>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">Modules</h3>
                <ul className="space-y-2">
                  {company.moduler?.map((mod) => {
                    const Icon = getIconComponent(mod.icon);
                    return (
                      <li
                        key={mod.id}
                        className="flex items-center gap-3 bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition"
                      >
                        {Icon ? (
                          <Icon className="text-purple-600 text-xl" />
                        ) : (
                          <span className="text-gray-400 text-xl">⚙️</span>
                        )}
                        <div>
                          <p className="font-medium text-gray-800">{mod.name}</p>
                          <p className="text-xs text-gray-500 break-all">{mod.url}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          ) : (
            !loading && <p className="text-gray-500">No companies found.</p>
          )}
        </div>
      </div>


      {/* Add Company Module */}
      <AddCompany show={showModel} onClose={() => setShowModel(false)} />
    </div>
  );
};

export default Setting;
