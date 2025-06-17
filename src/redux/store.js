import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./slices/loginSlice"
import customerReducer from "./slices/customerSlice";
import moduleReducer from "./slices/moduleSlice"
import companyReducer from "./slices/companySlice"

const store = configureStore({
    reducer: {
        login: loginReducer,
        customer: customerReducer,
        module: moduleReducer,
        company: companyReducer
    },
    devTools: true
})


export default store