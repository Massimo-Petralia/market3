import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  signinRequestId: '',
};

const requestIdListSlice = createSlice({
  name: 'requestIdList',
  initialState,
  reducers: {
    setSignInRequestId: (state, action: PayloadAction<string>) => {
      return {...state, signinRequestId: action.payload};
    },
  },
});

export const {setSignInRequestId} = requestIdListSlice.actions;
export const requestIdListReducer = requestIdListSlice.reducer;
