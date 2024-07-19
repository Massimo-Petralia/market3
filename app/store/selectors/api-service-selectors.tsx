import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { apiServices } from "../slices/api-services-slice";


const selecApiUserDataById =(requestId: string)=> apiServices.endpoints.signin.select(requestId) 

export const selectUserData = (requestId: string) => createSelector(
    selecApiUserDataById(requestId),
    (userData) => userData.data
)