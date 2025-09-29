import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Example API (তুমি চাইলে নিজের API use করতে পারবে)
export const fetchTours = createAsyncThunk("tour/fetchTours", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await res.json();
});

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tours: [],
    loading: false,
    error: null,
  },
  reducers: {
    addTour: (state, action) => {
      state.tours.push(action.payload);
    },
    removeTour: (state, action) => {
      state.tours = state.tours.filter((tour) => tour.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTour, removeTour } = tourSlice.actions;
export default tourSlice.reducer;
