import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectProductList = (state: RootState) => state.productList

export const selectProducts = createSelector(
    [selectProductList],
    ({productList})=> productList
)

export const selectCurrentPage = createSelector(
    [selectProductList],
    (productList) => productList.currentPage
)