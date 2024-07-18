import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../store';
import {UserAuth} from '../../../models/models';
import {User} from '../../../models/models';
import {setCredential} from './auth-slice';
const baseURL = 'http://192.168.1.101:3000';

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, {getState}) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiServices = createApi({
  reducerPath: 'apiServices',
  baseQuery,
  endpoints: build => ({
    signup: build.mutation<UserAuth, User>({
      query: user => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
    signin: build.mutation<UserAuth, {email: string; password: string}>({
      query: ({email, password}) => ({
        url: '/signin',
        method: 'POST',
        body: {email, password},
      }),
      // async onQueryStarted({email, password}, {dispatch, queryFulfilled}) {
      //   try {
      //     const {data} = await queryFulfilled;
      //     if (typeof data === 'string') {
      //       const warning = data;
      //       //implement error message
      //     } else {
      //       const response: UserAuth = data;
      //       dispatch(setCredential({accessToken: response.accessToken}));
      //     }
      //   } catch (error) {
      //     console.error('login request failed: ', error);
      //   }
      // },
    }),
  }),
});

export const {useSignupMutation, useSigninMutation} = apiServices;
