import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { customerAdd, customerUpdate } from '../redux/slices/customerSlice';
import toast from 'react-hot-toast';

const AddCustomerModel = ({ show, onClose,editData = null }) => {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        password: '',
        re_password: ''
    });

    useEffect(() => {
    if (editData) {
      setFormData({ ...editData, password: '' }); // keep password blank in edit
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        password: '',
      });
    }
  }, [editData]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await dispatch(customerUpdate({ id: editData.id, data: formData })).unwrap();
        toast.success("Customer updated successfully!");
      } else {
        await dispatch(customerAdd(formData)).unwrap();
        toast.success("Customer added successfully!");
      }
      onClose();
    } catch (error) {
      toast.error(error || "Operation failed.");
    }
  };


    if (!show) return null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-purple-500 p-6 rounded-md shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4"> {editData ? "Edit Customer" : "Add New Customer"}</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full border px-4 py-2 rounded-md outline-none"
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full border px-4 py-2 rounded-md outline-none"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border px-4 py-2 rounded-md outline-none"
                        required
                    />
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Mobile"
                        className="w-full border px-4 py-2 rounded-md outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full border px-4 py-2 rounded-md outline-none"
                        required
                    />
                    <input
                        type="password"
                        name="re_password"
                        value={formData.re_password}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="w-full border px-4 py-2 rounded-md outline-none"
                        required
                    />

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className=" text-white w-1/2 px-4 py-2 border rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className=" w-1/2 font-semibold px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                        >
                              {editData ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCustomerModel
