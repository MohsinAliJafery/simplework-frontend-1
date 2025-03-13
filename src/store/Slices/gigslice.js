import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DeleteServiceApi,
  GetAllServiceApi,
  GetCurrentUserServicesApi,
} from "../../Api_Requests/Api_Requests";

export const fetchGigs = createAsyncThunk(
  "gigs/fetchGigs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetAllServiceApi();
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Error fetching Gigs");
    }
  }
);

export const deleteGig = createAsyncThunk(
  "gigs/deleteGig",
  async (id, { rejectWithValue }) => {
    try {
      const response = await DeleteServiceApi(id);
      return id;
    } catch (error) {
      return rejectWithValue("Error deleting Gig!");
    }
  }
);

export const fetchCurrentUserGigs = createAsyncThunk(
  "gigs/fetchCurrentUserGigs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetCurrentUserServicesApi();
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Error fetching Gigs");
    }
  }
);

const gigslice = createSlice({
  initialState: {
    allGigs: [],
    personalGigs: [],
    favoriteGigs: [],
    searchQuery: "",
    gigId: "",
    loading: false,
    error: null,
    fetchCurrentUserGigsError: null,
    deleteGigError: null,
    gigSellerId: "",
  },
  name: "gig",
  reducers: {
    setId: (state, action) => {
      state.gigId = action.payload.id;
    },
    addGig: (state, action) => {
      state.personalGigs.push(action.payload.gig);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetSearchQuery: (state) => {
      state.searchQuery = "";
    },
    setGigSellerId: (state, action) => {
      state.gigSellerId = action.payload;
    },
    resetGigSellerId: (state) => {
      state.gigSellerId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.allGigs = action.payload;
        state.error = null;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentUserGigs.pending, (state) => {
        state.loading = true;
        state.fetchCurrentUserGigsError = null;
      })
      .addCase(fetchCurrentUserGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.personalGigs = action.payload;
        state.fetchCurrentUserGigsError = null;
      })
      .addCase(fetchCurrentUserGigs.rejected, (state, action) => {
        state.loading = false;
        state.fetchCurrentUserGigsError = action.payload;
      })
      .addCase(deleteGig.pending, (state, action) => {
        state.loading = true;
        state.deleteGigError = null;
      })
      .addCase(deleteGig.rejected, (state, action) => {
        state.loading = false;
        state.deleteGigError = action.payload;
      })
      .addCase(deleteGig.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteGigError = null;
        state.personalGigs = state.personalGigs.filter(
          (gig) => gig._id !== action.payload
        );
      });
  },
});
export const { setId, addGig, setSearchQuery, resetSearchQuery, setGigSellerId, resetGigSellerId } =
  gigslice.actions;
export default gigslice.reducer;
