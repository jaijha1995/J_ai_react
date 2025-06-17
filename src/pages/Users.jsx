import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerList } from '../redux/slices/customerSlice';
import AddCustomerModel from '../components/AddCustomerModel';

const Users = () => {
  const dispatch = useDispatch();
  const { customerList: customers, loading, error } = useSelector((state) => state.customer);
  const [showModal, setShowModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  const openAddModal = () => {
    setEditCustomer(null);
    setShowModal(true);
  };

  const openEditModal = (customer) => {
    setEditCustomer(customer);
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(customerList());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Customer List</h2>
          <button
            onClick={openAddModal}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Add New
          </button>
        </div>

        {loading ? (
          <div className="p-6 text-center text-purple-600 font-medium">Loading customers...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-600 font-medium">{error}</div>
        ) : customers.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No customers found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">First Name</th>
                  <th className="px-6 py-3 text-left font-medium">Last Name</th>
                  <th className="px-6 py-3 text-left font-medium">Email</th>
                  <th className="px-6 py-3 text-left font-medium">Phone</th>
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 text-black font-semibold">
                    <td className="px-6 py-4">{customer.first_name}</td>
                    <td className="px-6 py-4">{customer.last_name}</td>
                    <td className="px-6 py-4">{customer.email}</td>
                    <td className="px-6 py-4">{customer.mobile}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => openEditModal(customer)} className="text-purple-600 hover:underline text-sm">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


      {/* Model */}

      <AddCustomerModel show={showModal}
        onClose={() => setShowModal(false)}
        editData={editCustomer} />
    </div>
  );
};

export default Users;
