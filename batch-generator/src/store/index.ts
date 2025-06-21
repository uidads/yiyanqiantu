import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IAppState, IApiSession, IGenerateTask, ModelType, AspectRatio, TaskStatus } from '@/types'

interface AppStore extends IAppState {
  // Session管理方法
  addSession: (session: Omit<IApiSession, 'id' | 'lastUsed' | 'totalGenerated'>) => void
  removeSession: (sessionId: string) => void
  updateSessionStatus: (sessionId: string, status: IApiSession['status']) => void
  getActiveSession: () => IApiSession | null
  
  // Task管理方法
  addTask: (prompt: string) => void
  updateTask: (taskId: string, updates: Partial<IGenerateTask>) => void
  removeTask: (taskId: string) => void
  updateTaskStatus: (taskId: string, status: TaskStatus) => void
  
  // 设置管理
  updateSettings: (settings: Partial<IAppState['settings']>) => void
  
  // UI状态管理
  setGenerating: (isGenerating: boolean) => void
  toggleTaskSelection: (taskId: string) => void
  clearSelection: () => void
  setShowSessionManager: (show: boolean) => void
  
  // 批量操作
  regenerateSelected: () => void
  downloadSelected: () => void
}

const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // 初始状态
      sessions: [],
      activeSessions: [],
      tasks: [],
      settings: {
        model: 'jimeng-3.0',
        aspectRatio: '1:1',
        concurrentLimit: 3,
        autoRetry: true,
      },
      ui: {
        isGenerating: false,
        selectedTasks: [],
        showSessionManager: false,
      },

      // Session管理方法
      addSession: (sessionData) => {
        const newSession: IApiSession = {
          ...sessionData,
          id: `session_${Date.now()}`,
          lastUsed: 0,
          totalGenerated: 0,
        }
        set((state) => ({
          sessions: [...state.sessions, newSession],
          activeSessions: [...state.activeSessions, newSession.id],
        }))
      },

      removeSession: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.filter(s => s.id !== sessionId),
          activeSessions: state.activeSessions.filter(id => id !== sessionId),
        }))
      },

      updateSessionStatus: (sessionId, status) => {
        set((state) => ({
          sessions: state.sessions.map(session =>
            session.id === sessionId ? { ...session, status } : session
          ),
        }))
      },

      getActiveSession: () => {
        const { sessions, activeSessions } = get()
        const availableSessions = sessions.filter(s => 
          activeSessions.includes(s.id) && 
          s.status === 'active' &&
          Date.now() - s.lastUsed > 1000 // 1秒间隔
        )
        return availableSessions.length > 0 ? availableSessions[0] : null
      },

      // Task管理方法
      addTask: (prompt) => {
        const { settings } = get()
        const newTask: IGenerateTask = {
          id: `task_${Date.now()}`,
          prompt,
          model: settings.model,
          aspectRatio: settings.aspectRatio,
          status: 'pending',
          images: Array.from({ length: 4 }, (_, index) => ({
            id: `img_${Date.now()}_${index}`,
            url: '',
            status: 'generating',
            index,
          })),
          sessionId: '',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }))
      },

      updateTask: (taskId, updates) => {
        set((state) => ({
          tasks: state.tasks.map(task =>
            task.id === taskId 
              ? { ...task, ...updates, updatedAt: Date.now() }
              : task
          ),
        }))
      },

      removeTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter(task => task.id !== taskId),
          ui: {
            ...state.ui,
            selectedTasks: state.ui.selectedTasks.filter(id => id !== taskId),
          },
        }))
      },

      updateTaskStatus: (taskId, status) => {
        set((state) => ({
          tasks: state.tasks.map(task =>
            task.id === taskId 
              ? { ...task, status, updatedAt: Date.now() }
              : task
          ),
        }))
      },

      // 设置管理
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }))
      },

      // UI状态管理
      setGenerating: (isGenerating) => {
        set((state) => ({
          ui: { ...state.ui, isGenerating },
        }))
      },

      toggleTaskSelection: (taskId) => {
        set((state) => {
          const selectedTasks = state.ui.selectedTasks.includes(taskId)
            ? state.ui.selectedTasks.filter(id => id !== taskId)
            : [...state.ui.selectedTasks, taskId]
          return {
            ui: { ...state.ui, selectedTasks },
          }
        })
      },

      clearSelection: () => {
        set((state) => ({
          ui: { ...state.ui, selectedTasks: [] },
        }))
      },

      setShowSessionManager: (show) => {
        set((state) => ({
          ui: { ...state.ui, showSessionManager: show },
        }))
      },

      // 批量操作
      regenerateSelected: () => {
        const { ui, updateTaskStatus } = get()
        ui.selectedTasks.forEach(taskId => {
          updateTaskStatus(taskId, 'pending')
        })
      },

      downloadSelected: () => {
        // TODO: 实现批量下载逻辑
        console.log('下载选中的图片')
      },
    }),
    {
      name: 'batch-generator-store',
      partialize: (state) => ({
        sessions: state.sessions,
        tasks: state.tasks,
        settings: state.settings,
      }),
    }
  )
)

export default useStore 