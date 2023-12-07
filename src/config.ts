const localBaseUrl = process.env.NEXT_PUBLIC_BASE_DEV_URL
const serverBaseUrl = process.env.NEXT_PUBLIC_BASE_PROD_URL

export const BaseUrl =
  process.env.NODE_ENV === 'development' ? localBaseUrl : serverBaseUrl

export const ServerBaseUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_SERVER_BASE_DEV_URL
    : process.env.NEXT_PUBLIC_SERVER_BASE_PROD_URL

export const API_KEY = process.env.NEXT_PUBLIC_API_KEY
