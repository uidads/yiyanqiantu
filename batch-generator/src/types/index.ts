// 生成任务状态
export type TaskStatus = 'pending' | 'generating' | 'success' | 'error'

// 图片比例类型
export type AspectRatio = '1:1' | '3:4' | '16:9'

// 模型类型
export type ModelType = 'jimeng-3.0' | 'jimeng-2.1' | 'jimeng-2.0-pro' | 'jimeng-2.0' | 'jimeng-1.4' | 'jimeng-xl-pro'

// API Session接口
export interface IApiSession {
  id: string
  name: string
  token: string
  status: 'active' | 'throttled' | 'error' | 'inactive'
  lastUsed: number
  totalGenerated: number
  credits: number
}

// 生成任务接口
export interface IGenerateTask {
  id: string
  prompt: string
  negativePrompt?: string
  model: ModelType
  aspectRatio: AspectRatio
  status: TaskStatus
  images: IGeneratedImage[]
  sessionId: string
  createdAt: number
  updatedAt: number
  error?: string
}

// 生成的图片接口
export interface IGeneratedImage {
  id: string
  url: string
  status: 'generating' | 'completed' | 'error'
  index: number // 0-3，表示4张图片中的位置
}

// API请求参数
export interface IGenerateRequest {
  model: ModelType
  prompt: string
  negative_prompt?: string
  width?: number
  height?: number
  sample_strength?: number
  response_format?: 'url' | 'b64_json'
}

// API响应
export interface IGenerateResponse {
  created: number
  data: Array<{
    url?: string
    b64_json?: string
  }>
}

// 应用状态
export interface IAppState {
  // Sessions管理
  sessions: IApiSession[]
  activeSessions: string[]
  
  // Tasks管理
  tasks: IGenerateTask[]
  
  // 设置
  settings: {
    model: ModelType
    aspectRatio: AspectRatio
    concurrentLimit: number
    autoRetry: boolean
  }
  
  // UI状态
  ui: {
    isGenerating: boolean
    selectedTasks: string[]
    showSessionManager: boolean
  }
} 