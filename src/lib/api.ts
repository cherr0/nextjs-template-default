import axios, { AxiosError } from 'axios'

import Config from '~/constants/config'
import { ErrorResponse } from '~/types/api'

const api = axios.create({
  baseURL: Config.API_BASE_URL
})

api.defaults.timeout = 6000

api.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error: AxiosError<ErrorResponse>) {
    return Promise.reject(error.response.data)
  }
)

export default api
