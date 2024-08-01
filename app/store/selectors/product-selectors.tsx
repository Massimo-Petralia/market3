import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectProduct = (state: RootState) => state.product

export const selectProductDetail = createSelector(
    [selectProduct],
    ({product})=> product
)

export const selectLoadingState = createSelector(
    [selectProduct],
    (product) => product.loadingState 
)