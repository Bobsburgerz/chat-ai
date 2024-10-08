import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut, selectCurrentToken } from '../slice/authSlice';

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    if (refreshResult?.data) {
      const token = selectCurrentToken(api.getState());
      api.dispatch(setCredentials({ ...refreshResult.data, token }));
  
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

const baseQuery = fetchBaseQuery({
  baseUrl: `https://cumcams.xyz/api`,
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
 let token = 7
    if (token) {

      headers.set("authorization", `Bearer 8`);
    }
    if (!token) {
   
      headers.set("authorization", `Bearer 555`);
    }
    return headers;
  }
});

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    newConvo: builder.mutation({
      query: (product) => ({
        url: "/chat/conversations/new",
        method: "POST",
        body: product,
        meta: { excludeAuthorization: true },  
      }),
    }),
    deleteConvo: builder.mutation({
      query: (product) => ({
        url: "/chat/conversations/delete",
        method: "DELETE",
        body: product,
        meta: { excludeAuthorization: true },  
      }),
    }),
    updateConvo: builder.mutation({
      query: (product) => ({
        url: "/chat/conversations/update",
        method: "PUT",
        body: product,
        meta: { excludeAuthorization: true },  
      }),
    }),
    signup: builder.mutation({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
        meta: { excludeAuthorization: true }, // Exclude authorization for this endpoint
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
        meta: { excludeAuthorization: true }, // Exclude authorization for this endpoint
      }),
    }),
 

  logout: builder.mutation({
    query: (user) => ({
      url: "/auth/logout",
      method: "POST",
      body: user,
      meta: { excludeAuthorization: true }, // Exclude authorization for this endpoint
    }),
  }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
        meta: { excludeAuthorization: true }, // Exclude authorization for this endpoint
      }),
    }),

  

   
 
  }),
});

export const {
  useSignupMutation,
  useNewConvoMutation,
  useUpdateConvoMutation,
  useDeleteConvoMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useLogoutMutation
} = appApi;

export default appApi;