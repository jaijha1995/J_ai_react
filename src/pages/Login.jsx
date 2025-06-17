




// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaFacebookF, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';

// import login from "../assets/image.png";
// import { AdminLogin } from '../redux/slices/loginSlice';
// import toast from 'react-hot-toast';

// const Login = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [formData, setFormData] = useState({ email: '', password: '' });

//     const { loginData, loading, error, success } = useSelector((state) => state.login);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(AdminLogin(formData));
//     };

//     // 🔁 Handle redirect + toast after login
//    useEffect(() => {
//     if (success && loginData?.id) {
//         toast.success("Login successful!");
//         navigate('/');
//     } else if (error) {
//         toast.error(error);
//     }
// }, [success, error, loginData, navigate]);

//     return (
//         <div className='flex h-screen '>
//             {/* Left side  */}
//             <div className='hidden md:flex w-3/4 flex-col items-center justify-center bg-gray-100 relative p-10'>
//                 <img src={login} alt="Login Illustrations" className="w-[70%] h-screen object-contain" />
//                 <div className="absolute top-10 left-10 text-2xl font-bold text-purple-700">
//                     Skylabs
//                 </div>
//             </div>

//             {/* Right side */}
//             <div className='w-full md:w-1/3 flex flex-col justify-center p-10'>
//                 <h2 className='text-2xl font-semibold mb-2'>Welcome to Skylabs! 👋🏻</h2>
//                 <p className='mb-6 text-gray-600'>Please sign-in to your account and start the adventure</p>

//                 <form className="space-y-5" onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         placeholder="Email or Username"
//                         className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                     <div className="relative">
//                         <input
//                             type={showPassword ? 'text' : 'password'}
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             placeholder="Password"
//                             className="w-full border rounded-md px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-purple-500"
//                         />
//                         <span
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <FiEye /> : <FiEyeOff />}
//                         </span>
//                     </div>

//                     <div className="flex justify-between items-center">
//                         <label className="flex items-center space-x-2">
//                             <input type="checkbox" />
//                             <span className="text-sm">Remember Me</span>
//                         </label>
//                         <a href="#" className="text-sm text-purple-600 hover:underline">
//                             Forgot Password?
//                         </a>
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md transition"
//                     >
//                         {loading ? 'Logging in...' : 'Login'}
//                     </button>
//                 </form>

//                 <div className="flex items-center my-4">
//                     <hr className="flex-grow border-t" />
//                     <span className="mx-4 text-gray-500">or</span>
//                     <hr className="flex-grow border-t" />
//                 </div>

//                 <div className="flex justify-center space-x-4">
//                     <FaFacebookF className="text-blue-600 cursor-pointer" size={20} />
//                     <FaTwitter className="text-blue-400 cursor-pointer" size={20} />
//                     <FaGithub className="text-black cursor-pointer" size={20} />
//                     <FaGoogle className="text-red-500 cursor-pointer" size={20} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaFacebookF, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import loginImage from "../assets/image.png";
import { AdminLogin, UserLogin } from '../redux/slices/loginSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [roles, setRoles] = useState('Customer');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const { loginData, loading, error, success } = useSelector((state) => state.login);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        if (roles === 'superadmin') {
            dispatch(AdminLogin(formData));
        } else {
            dispatch(UserLogin(formData));
        }
    };

    useEffect(() => {
        if (success && loginData) {
            toast.success("Login successful!");
            const role = loginData.role;

            // Save to localStorage
            localStorage.setItem("authToken", loginData.access_token);
            localStorage.setItem("role", role);

            if( role === 'Customer') {
                localStorage.setItem("apiKey", loginData.api_key);
                localStorage.setItem("userId", loginData.id);
            }

            if (role === 'superadmin') {
                navigate('/superadmin/dashboard');
            } else {
                navigate('/');
            }
        } else if (error) {
            toast.error(error);
        }
    }, [success, error, loginData, navigate]);

    return (
        <div className='flex h-screen'>
            <div className='hidden md:flex w-3/4 flex-col items-center justify-center bg-gray-100 relative p-10'>
                <img src={loginImage} alt="Login" className="w-[70%] h-screen object-contain" />
                <div className="absolute top-10 left-10 text-2xl font-bold text-purple-700">Skylabs</div>
            </div>

            <div className='w-full md:w-1/3 flex flex-col justify-center p-10'>
                <h2 className='text-2xl font-semibold mb-2'>Welcome to Skylabs! 👋🏻</h2>
                <p className='mb-6 text-white-300'>Please sign in to continue</p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <select
                        value={roles}
                        onChange={(e) => setRoles(e.target.value)}
                        className="w-full border rounded-md px-4 py-2 outline-none"
                    >
                        <option value="Customer" className='text-black'>User</option>
                        <option value="superadmin" className='text-black'>Super Admin</option>
                    </select>

                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email or Username"
                        required
                        className="w-full border rounded-md px-4 py-2 outline-none"
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            className="w-full border rounded-md px-4 py-2 pr-10 outline-none"
                        />
                        <span
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEye /> : <FiEyeOff />}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span className="text-sm">Remember Me</span>
                        </label>
                        <a href="#" className="text-sm text-purple-600 hover:underline">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-t" />
                    <span className="mx-4 text-gray-500">or</span>
                    <hr className="flex-grow border-t" />
                </div>

                <div className="flex justify-center space-x-4">
                    <FaFacebookF className="text-blue-600 cursor-pointer" size={20} />
                    <FaTwitter className="text-blue-400 cursor-pointer" size={20} />
                    <FaGithub className="text-black cursor-pointer" size={20} />
                    <FaGoogle className="text-red-500 cursor-pointer" size={20} />
                </div>
            </div>
        </div>
    );
};

export default Login;
