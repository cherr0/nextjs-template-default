export interface ErrorResponse {
  error: string
  message: string[]
  statusCode: number
}
export interface ResponseTypes<T> {
  data: T
  message: string
  statusCode: number
}
