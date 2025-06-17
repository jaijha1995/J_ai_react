// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addCompany, fetchCompany } from '../redux/slices/companySlice';
// import { AllModules } from '../redux/slices/moduleSlice';
// import { customerList } from '../redux/slices/customerSlice';

// const AddCompany = ({ show, onClose }) => {
//   const dispatch = useDispatch();
//    const { customerList: customers, loading, error } = useSelector((state) => state.customer);
//   const { moduleList, } = useSelector((state) => state.module);

//   console.log('Module', moduleList)

//   const [formData, setFormData] = useState({
//     customer: '',
//     start_date: '',
//     end_date: '',
//     moduler: [],
//     is_active: false,
//   });

//   useEffect(() => {
//     if (show) {
//       dispatch(customerList());
//       dispatch(AllModules())
//     }
//   }, [dispatch, show]);

//   // const handleChange = (e) => {
//   //   const { name, value, type, checked } = e.target;
//   //   if (name === 'moduler') {
//   //     const selected = Array.from(e.target.selectedOptions, (option) => Number(option.value));
//   //     setFormData((prev) => ({ ...prev, moduler: selected }));
//   //   } else {
//   //     setFormData((prev) => ({
//   //       ...prev,
//   //       [name]: type === 'checkbox' ? checked : value,
//   //     }));
//   //   }
//   // };


//   const handleChange = (e) => {
//   const { name, value, type, checked } = e.target;
//   if (name === 'moduler') {
//     const selected = Array.from(e.target.selectedOptions, (option) => Number(option.value));
//     setFormData((prev) => ({ ...prev, moduler: selected }));
//   } else {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === 'customer' ? Number(value) : (type === 'checkbox' ? checked : value),
//     }));
//   }
// };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitted Data:', formData);
//     dispatch(addCompany(formData))

//   };

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-purple-500 w-full max-w-2xl p-6 rounded-xl shadow-lg relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute cursor-pointer top-2 right-3 text-2xl text-white hover:text-red-700"
//         >
//           &times;
//         </button>

//         <h2 className="text-xl  mb-6 text-white font-bold">Add Company Module</h2>

//         {loading && <p className="text-purple-500">Loading companies...</p>}
//         {error && <p className="text-red-600">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Select Customer */}
//           <div>
//             <label className="block mb-1 font-medium">Select Customer</label>
//             <select
//               name="customer"
//               value={formData.customer}
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-300 rounded px-3 py-2"
//             >
//               <option value="">-- Select --</option>
//               {customers?.map((c) => (
//                 <option key={c.id} value={c.customer?.id} className='text-black'>
//                   {c?.first_name} {c?.last_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Dates */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 font-medium">Start Date</label>
//               <input
//                 type="date"
//                 name="start_date"
//                 value={formData.start_date}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">End Date</label>
//               <input
//                 type="date"
//                 name="end_date"
//                 value={formData.end_date}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 required
//               />
//             </div>
//           </div>

//           {/* Select Modules */}
//           <div>
//             <label className="block mb-1 font-medium">Select Modules</label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded px-3 py-2">
//               {moduleList?.map((mod) => (
//                 <label key={mod.id} className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     value={mod.id}
//                     checked={formData.moduler.includes(mod.id)}
//                     onChange={(e) => {
//                       const value = Number(e.target.value);
//                       setFormData((prev) => {
//                         const selected = new Set(prev.moduler);
//                         if (e.target.checked) {
//                           selected.add(value);
//                         } else {
//                           selected.delete(value);
//                         }
//                         return { ...prev, moduler: Array.from(selected) };
//                       });
//                     }}
//                   />
//                   <span className="text-sm">{mod.name}</span>
//                 </label>
//               ))}

//             </div>
//           </div>



//           {/* Is Active */}
//           <div className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               name="is_active"
//               checked={formData.is_active}
//               onChange={handleChange}
//               className="w-4 h-4"
//             />
//             <label className="text-sm font-medium">Is Active</label>
//           </div>

//           <div className="text-right flex justify-end space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className=" text-white w-1/2 px-4 py-2 border rounded-md"
//             >
//               Close
//             </button>
//             <button
//               type="submit"
//               className="bg-purple-600 text-white px-5 py-2 w-1/2 rounded hover:bg-purple-700"
//             >
//               Submit
//             </button>

//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddCompany;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany, fetchCompany } from '../redux/slices/companySlice';
import { AllModules } from '../redux/slices/moduleSlice';
import { customerList } from '../redux/slices/customerSlice';

const AddCompany = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const { customerList: customers, loading, error } = useSelector((state) => state.customer);
  const { moduleList } = useSelector((state) => state.module);

  const [formData, setFormData] = useState({
    customer: '',
    start_date: '',
    end_date: '',
    moduler: [],
    is_active: false,
  });

  useEffect(() => {
    if (show) {
      dispatch(customerList());
      dispatch(AllModules());
    }
  }, [dispatch, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'moduler') {
      const selected = Array.from(e.target.selectedOptions, (option) => Number(option.value));
      setFormData((prev) => ({ ...prev, moduler: selected }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'customer' ? Number(value) : (type === 'checkbox' ? checked : value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    dispatch(addCompany(formData));
    onClose(); // optionally close modal after submit
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-purple-500 w-full max-w-2xl p-6 rounded-xl shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-3 text-2xl text-white hover:text-red-700"
        >
          &times;
        </button>

        <h2 className="text-xl mb-6 text-white font-bold">Add Company Module</h2>

        {loading && <p className="text-purple-500">Loading customers...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Customer */}
          <div>
            <label className="block mb-1 font-medium">Select Customer</label>
            <select
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Select --</option>
              {customers?.map((c) => (
                <option key={c.id} value={c.id} className="text-black">
                  {c.first_name} {c.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Select Modules */}
          <div>
            <label className="block mb-1 font-medium">Select Modules</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded px-3 py-2">
              {moduleList?.map((mod) => (
                <label key={mod.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={mod.id}
                    checked={formData.moduler.includes(mod.id)}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setFormData((prev) => {
                        const selected = new Set(prev.moduler);
                        if (e.target.checked) {
                          selected.add(value);
                        } else {
                          selected.delete(value);
                        }
                        return { ...prev, moduler: Array.from(selected) };
                      });
                    }}
                  />
                  <span className="text-sm">{mod.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Is Active */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Is Active</label>
          </div>

          <div className="text-right flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-white w-1/2 px-4 py-2 border rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-5 py-2 w-1/2 rounded hover:bg-purple-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;

