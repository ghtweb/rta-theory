import { configureStore } from '@reduxjs/toolkit'
import rtaTheorySlice from "./rtaTheorySlice";

export default configureStore({
    reducer: {
        rtaTheory: rtaTheorySlice
    }
});
