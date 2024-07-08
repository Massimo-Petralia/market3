import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from './store';
import {AuthState} from './models';
import {User} from '../../models/models';
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

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: build => ({
    signup: build.mutation<AuthState, User>({
      query: user => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),
    signin: build.mutation<AuthState, {name: string; email: string}>({
      query: ({name, email}) => ({
        url: '/signin',
        method: 'POST',
        body: {name, email},
      }),
    }),
  }),
});

export const {useSignupMutation, useSigninMutation} = api;
