import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

const initialState = [];
export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        updateProducts: (_, action) => {
            return action.payload;
        },
        resetProducts: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {

        builder.addMatcher(appApi.endpoints.getConvos.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.newConvo.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.deleteConvo.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.updateConvo.matchFulfilled, (_, { payload }) => payload);
    },
});

export const {  updateProducts, resetProducts } = productSlice.actions;
export default productSlice.reducer;