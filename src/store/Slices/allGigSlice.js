// slices/gigslice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step1: {},
  step2: {},
  step3: {},
  step4: {},
  step5: {},
};

const allGigSlice = createSlice({
  name: 'gigData',
  initialState,
  reducers: {
    setStepData: (state, action) => {
      const { step, data } = action.payload;
      state[step] = data;
    },
    resetGigData: (state) => {
      return initialState;
    },
  },
});

export const { setStepData, resetGigData } = allGigSlice.actions;
export default allGigSlice.reducer;