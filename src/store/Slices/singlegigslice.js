import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetSingleServiceApi } from '../../Api_Requests/Api_Requests';

// Async thunk for fetching gig details
export const fetchGigDetails = createAsyncThunk(
  'gig/fetchGigDetails',
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await GetSingleServiceApi(gigId);
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue('Failed to fetch gig details');
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const singleGigSlice = createSlice({
  name: 'gig',
  initialState: {
    gig: null,
    selectedPlan: 'basic',
    requirements: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetGigState: (state) => {
      state.gig = null;
      state.loading = false;
      state.error = null;
    },
    updateSelectedPlan: (state, action) => {
        state.selectedPlan = action.payload; 
      },
      addrequirements: (state, action) => {
        state.requirements = action.payload; 
      },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGigDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.gig = action.payload;
      })
      .addCase(fetchGigDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch gig details';
      });
  },
});

export const { resetGigState, updateSelectedPlan, addrequirements } = singleGigSlice.actions;
export default singleGigSlice.reducer;