import { createAsyncThunk } from '@reduxjs/toolkit';
import { IServerResponse } from '@/shared/types';
import { IAuthResponseData, IUserSignInData, IUserSignUpData } from '../model';
import { axiosInstance, setAccessToken } from '@/shared/lib/axiosInstance';
import { handleAxiosError } from '@/shared/utils/handleAxiosError';

enum USER_API_ENDPOINTS {
  REFRESH_TOKENS = '/auth/refreshTokens',
  SIGN_IN = '/auth/signIn',
  SIGN_OUT = '/auth/signOut',
  SIGN_UP = '/auth/signUp',
}

enum USER_THUNK_TYPES {
  SIGN_IN = 'user/signIn',
  SIGN_UP = 'user/signUp',
  SIGN_OUT = 'user/signOut',
  REFRESH_TOKENS = 'user/refreshTokens',
}

export const refreshTokensThunk = createAsyncThunk<
  IServerResponse<IAuthResponseData>,
  void,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.REFRESH_TOKENS, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(USER_API_ENDPOINTS.REFRESH_TOKENS);
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const signInThunk = createAsyncThunk<
  IServerResponse<IAuthResponseData>,
  IUserSignInData,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.SIGN_IN, async (signInData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post(USER_API_ENDPOINTS.SIGN_IN, signInData);
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const signUpThunk = createAsyncThunk<
  IServerResponse<IAuthResponseData>,
  IUserSignUpData,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.SIGN_UP, async (signUpData, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post(USER_API_ENDPOINTS.SIGN_UP, signUpData);
    setAccessToken(data.data.accessToken);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const signOutThunk = createAsyncThunk<
  IServerResponse,
  void,
  { rejectValue: IServerResponse }
>(USER_THUNK_TYPES.SIGN_OUT, async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(USER_API_ENDPOINTS.SIGN_OUT);
    setAccessToken('');
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});
