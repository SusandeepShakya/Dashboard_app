import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type FilterState } from "../../types";

const initialState: FilterState = {
  search: "",
  currentPage: 1,
  itemsPerPage: 5,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
  },
});

export const { setSearch, setCurrentPage, setItemsPerPage } =
  filterSlice.actions;
export default filterSlice.reducer;

