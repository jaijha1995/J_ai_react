import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { moduleAdd } from '../redux/slices/moduleSlice';

const AddModule = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    icon: '',
    name: '',
    url: ''
  })


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have an action to add a module
      await dispatch(moduleAdd(formData)).unwrap();
      toast.success("Module added successfully!");
      onClose();

      setFormData({
        icon: '',
        name: '',
        url: ''
      })
    } catch (error) {
      toast.error(error || "Operation failed.");
    }
  }


  if (!show) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-purple-500 p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4"> Add New Module</h2>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <input type='text' name='icon' placeholder='Icon Name' value={formData.icon} onChange={handleChange} required className='w-full border px-4 py-2 rounded-md outline-none' />
          <input type='text' name='name' placeholder='Enter Module Name' value={formData.name} onChange={handleChange} required className='w-full border px-4 py-2 rounded-md outline-none' />
          <input type='text' name='url' placeholder='Enter Module URL' value={formData.url} onChange={handleChange} required className='w-full border px-4 py-2 rounded-md outline-none' />


          <div className='flex justify-end space-x-3 pt-4'>
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
              Save
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default AddModule
