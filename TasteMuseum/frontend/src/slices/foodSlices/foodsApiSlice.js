import { apiSlice } from "./apiSlice";

const FOOD_URL = '/api/food';

export const foodApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        dailyFood: builder.query({
            query: () => ({
                url: `${FOOD_URL}/daily`,
                method: 'GET',
            }),
        }),
        addFood: builder.mutation({
            query: (data) => ({
                url: `${FOOD_URL}/addFood`,
                method: 'POST',
                body: data,
            }),
        }),
        getAllFoods: builder.query({
            query: () => ({
                url: `${FOOD_URL}/all`,
                method: 'GET',
            }),
        }),
        getFood: builder.query({
            query: (foodId) => ({
                url: `${FOOD_URL}/${foodId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useDailyFoodQuery, useAddFoodMutation, useGetAllFoodsQuery, useGetFoodQuery } = foodApiSlice;
