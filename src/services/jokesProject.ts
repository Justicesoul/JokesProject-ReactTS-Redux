// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BlockquoteHTMLAttributes } from 'react';

type Categories = {
  error: boolean,
  categories: string[],
  categoryAliases:
  {
    alias: string,
    resolved: string
  }[],
  timestamp: number
};

type JokesByCategories = {
  error: boolean,
  amount: number,
  jokes: {
    category: string,
    type: string,
    joke: string,
    flags: {
      nsfw: boolean,
      religious: boolean,
      political: boolean,
      racist: boolean,
      sexist: boolean,
      explicit: boolean,
    }
    id: number,
    lang: string,
  }[]
};

type Joke = {
  error: boolean,
  category: string,
  type: string,
  joke: string,
  flags: {
    nsfw: boolean,
    religious: boolean,
    political: boolean,
    racist: boolean,
    sexist: boolean,
    explicit: boolean,
  }
  id: number,
  safe: boolean,
  lang: string,
}



// Define a service using a base URL and expected endpoints
export const jokesApi = createApi({
  reducerPath: 'jokesProject',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://v2.jokeapi.dev/' }),
  endpoints: (builder) => ({
    getCategories: builder.query<Categories, undefined>({
      query: () => `/categories`,
    }),
    getJokeCategory: builder.query<JokesByCategories, string>({
      query: (name) => `/joke/${name}?type=single&amount=10`,
    }),
    getJokeById: builder.query<Joke, number>({
      query: (id) => `/joke/Any?type=single&idRange=${id}`,
    }),
  }),
})

export const { reducer } = jokesApi

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetJokeCategoryQuery, useGetCategoriesQuery, useGetJokeByIdQuery } = jokesApi