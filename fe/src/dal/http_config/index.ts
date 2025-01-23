import axios, { type AxiosRequestConfig } from "axios"

const baseURL = import.meta.env.MODE === "development" ? 'http://localhost:3000' : 'http://localhost/api'

class Http {
  private _instanse = axios.create({ baseURL })
  get(url: string, config: AxiosRequestConfig = {}) {
    return this._instanse.get(url, config)
  }
}

export const http = new Http()
