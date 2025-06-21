'use client'

import React, { useState } from 'react'
import { Settings, Link, Save, Folder, HelpCircle, Target, Key, Ruler, Upload, Play, Pause, Download, Plus, RotateCcw } from 'lucide-react'

const MainInterface = () => {
  const [selectedModel, setSelectedModel] = useState('jimeng-3.0')
  const [selectedRatio, setSelectedRatio] = useState('1:1')
  const [newPrompt, setNewPrompt] = useState('')
  
  // 模拟数据
  const tasks = [
    {
      id: '1',
      prompt: '🌸 春天的樱花盛开，粉色花瓣飘落地面，温暖的阳光透过枝叶',
      images: [
        { status: 'completed' },
        { status: 'completed' },
        { status: 'completed' },
        { status: 'generating' }
      ]
    },
    {
      id: '2',
      prompt: '🌊 蓝色海洋波浪翻滚，阳光洒在水面上闪闪发光',
      images: [
        { status: 'pending' },
        { status: 'pending' },
        { status: 'pending' },
        { status: 'pending' }
      ]
    }
  ]

  const models = [
    'jimeng-3.0',
    'jimeng-2.1', 
    'jimeng-2.0-pro',
    'jimeng-2.0',
    'jimeng-1.4',
    'jimeng-xl-pro'
  ]

  const ratios = ['1:1', '3:4', '16:9']

  const handleAddPrompt = () => {
    if (newPrompt.trim()) {
      // TODO: 添加到store
      setNewPrompt('')
    }
  }

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'completed':
        return <div className="status-success" />
      case 'generating':
        return <div className="status-generating" />
      case 'pending':
        return <div className="status-pending" />
      case 'error':
        return <div className="status-error" />
      default:
        return <div className="status-pending" />
    }
  }

  return (
    <div className="min-h-screen bg-apple-gray-50 font-sf">
      {/* 顶栏 - Apple风格毛玻璃效果 */}
      <header className="sticky top-0 z-50 glass-card rounded-none border-b border-apple-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-apple-blue" />
              <h1 className="text-xl font-semibold text-apple-gray-900">
                Batch Image Generator
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-apple-gray-100 rounded-apple transition-colors">
                <Link className="w-5 h-5 text-apple-gray-600" />
              </button>
              <button className="p-2 hover:bg-apple-gray-100 rounded-apple transition-colors">
                <Settings className="w-5 h-5 text-apple-gray-600" />
              </button>
              <button className="p-2 hover:bg-apple-gray-100 rounded-apple transition-colors">
                <Save className="w-5 h-5 text-apple-gray-600" />
              </button>
              <button className="p-2 hover:bg-apple-gray-100 rounded-apple transition-colors">
                <Folder className="w-5 h-5 text-apple-gray-600" />
              </button>
              <button className="p-2 hover:bg-apple-gray-100 rounded-apple transition-colors">
                <HelpCircle className="w-5 h-5 text-apple-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* 工具栏 */}
        <div className="glass-card rounded-apple-lg p-4">
          <div className="grid grid-cols-3 gap-8">
            {/* 模型选择 */}
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-apple-blue" />
              <span className="text-sm font-medium text-apple-gray-700">模型</span>
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="flex-1 px-3 py-2 bg-apple-gray-100 border border-apple-gray-200 rounded-apple text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue"
              >
                {models.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* 账号状态 */}
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-apple-green" />
              <span className="text-sm font-medium text-apple-gray-700">账号</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-apple-gray-900">主账号·1247💎</span>
                <div className="w-2 h-2 bg-apple-green rounded-full animate-pulse" />
              </div>
            </div>

            {/* 比例选择 */}
            <div className="flex items-center space-x-3">
              <Ruler className="w-5 h-5 text-apple-purple" />
              <span className="text-sm font-medium text-apple-gray-700">比例</span>
              <div className="flex bg-apple-gray-100 rounded-apple p-1">
                {ratios.map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => setSelectedRatio(ratio)}
                    className={`px-3 py-1 text-xs font-medium rounded-apple transition-all ${
                      selectedRatio === ratio
                        ? 'bg-white text-apple-blue shadow-sm'
                        : 'text-apple-gray-600 hover:text-apple-gray-900'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 操作栏 */}
        <div className="glass-card rounded-apple-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="apple-button-secondary">
                <Upload className="w-4 h-4 mr-2" />
                批量导入
              </button>
              <button className="apple-button-primary">
                <Play className="w-4 h-4 mr-2" />
                全部生成
              </button>
              <button className="apple-button-secondary">
                <Pause className="w-4 h-4 mr-2" />
                暂停队列
              </button>
            </div>
            
            <button className="apple-button-secondary">
              <Download className="w-4 h-4 mr-2" />
              下载选中(12)
            </button>
          </div>
        </div>

        {/* 内容区 */}
        <div className="space-y-4">
          {/* 任务列表 */}
          {tasks.map(task => (
            <div key={task.id} className="glass-card rounded-apple-lg p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* 左侧：提示词区域 */}
                <div className="space-y-4">
                  <textarea
                    value={task.prompt}
                    className="w-full h-20 px-4 py-3 bg-apple-gray-50 border border-apple-gray-200 rounded-apple text-sm resize-none focus:outline-none focus:ring-2 focus:ring-apple-blue"
                    placeholder="输入你的提示词..."
                  />
                  <div className="flex items-center space-x-2">
                    <button className="apple-button-secondary text-xs">
                      <RotateCcw className="w-3 h-3 mr-1" />
                      重新生成
                    </button>
                  </div>
                </div>

                {/* 右侧：图片网格 */}
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-3">
                    {task.images.map((image, index) => (
                      <div 
                        key={index}
                        className="aspect-square bg-apple-gray-100 rounded-apple border border-apple-gray-200 flex items-center justify-center relative overflow-hidden group hover:scale-105 transition-transform"
                      >
                        {image.status === 'completed' ? (
                          <div className="w-full h-full bg-gradient-to-br from-apple-blue/20 to-apple-purple/20 flex items-center justify-center">
                            <span className="text-xs text-apple-gray-600">图片</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center space-y-1">
                            {getStatusIndicator(image.status)}
                            <span className="text-xs text-apple-gray-500">
                              {image.status === 'generating' ? '生成中' : '待生成'}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 添加新任务 */}
          <div className="glass-card rounded-apple-lg p-6 border-2 border-dashed border-apple-gray-300 hover:border-apple-blue transition-colors">
            <div className="flex items-center space-x-4">
              <Plus className="w-5 h-5 text-apple-gray-400" />
              <input
                type="text"
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddPrompt()}
                className="flex-1 px-4 py-3 bg-transparent border-none text-apple-gray-700 placeholder-apple-gray-400 focus:outline-none"
                placeholder="添加新的提示词..."
              />
              <button 
                onClick={handleAddPrompt}
                className="apple-button-primary"
              >
                添加
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MainInterface 