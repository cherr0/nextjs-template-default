const Config: Record<string, string> = {
  SERVER_RPC_URL: process.env.NEXT_PUBLIC_SERVER_RPC_URL,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL
} as const

export default Config
