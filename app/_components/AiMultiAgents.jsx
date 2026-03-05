"use client"

import React, { useContext, useMemo, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { SelectLabel } from '@radix-ui/react-select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Loader, Loader2, Lock, MessageSquare, Mic, Paperclip, Send } from 'lucide-react'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import AiModelList from '@/shared/AiModelList'
import { AiSelectedModelContext } from '@/context/AiSelectedModelContext'

const THREAD_IDS = ['main', 'branchA', 'branchB']

function ensureThreadShape(threads) {
    return {
        main: threads?.main ?? {},
        branchA: threads?.branchA ?? {},
        branchB: threads?.branchB ?? {},
    }
}

function appendMessageToThreadModel(prevThreads, threadId, modelKey, message) {
    const safeThreads = ensureThreadShape(prevThreads)
    const thread = safeThreads[threadId] ?? {}
    const modelMessages = thread[modelKey] ?? []

    return {
        ...safeThreads,
        [threadId]: {
            ...thread,
            [modelKey]: [...modelMessages, message],
        },
    }
}

function replaceLoadingInThreadModel(prevThreads, threadId, modelKey, replacement) {
    const safeThreads = ensureThreadShape(prevThreads)
    const thread = safeThreads[threadId] ?? {}
    const modelMessages = [...(thread[modelKey] ?? [])]
    const loadingIndex = modelMessages.findIndex((message) => message?.loading)

    if (loadingIndex !== -1) {
        modelMessages[loadingIndex] = replacement
    } else {
        modelMessages.push(replacement)
    }

    return {
        ...safeThreads,
        [threadId]: {
            ...thread,
            [modelKey]: modelMessages,
        },
    }
}

function AiMultiModelsThread({ threadId }) {
    const [aiModelList, setAiModelList] = useState(AiModelList)
    const { aiSelectedModels, setAiSelectedModels, threads = {} } = useContext(AiSelectedModelContext)
    const { has } = useAuth()

    const threadMessages = threads?.[threadId] ?? {}

    const onToggleChange = (model, value) => {
        setAiModelList((prev) => prev.map((item) => (item.model === model ? { ...item, enable: value } : item)))

        setAiSelectedModels((prev) => ({
            ...prev,
            [model]: {
                ...(prev?.[model] ?? {}),
                enable: value,
            },
        }))
    }

    const onSelectValue = (parentModel, value) => {
        setAiSelectedModels((prev) => ({
            ...prev,
            [parentModel]: {
                ...(prev?.[parentModel] ?? {}),
                modelId: value,
            },
        }))
    }

    return (
        <div className="flex flex-1 h-full border-b min-h-0">
            {aiModelList.map((model, index) => {
                const isEnabled = model.enable && aiSelectedModels?.[model.model]?.enable

                return (
                    <div
                        key={`${threadId}-${model.model}-${index}`}
                        className={`flex flex-col border-r h-full overflow-auto transition-all duration-300 ${isEnabled ? 'flex-1 min-w-[240px]' : 'w-[80px] flex-none'}`}
                    >
                        <div className="flex w-full h-[64px] gap-2 items-center justify-between border-b p-3">
                            <div className="flex items-center gap-3 w-full">
                                <Image src={model.icon} alt={model.model} width={20} height={20} />

                                {isEnabled && (
                                    <Select
                                        defaultValue={aiSelectedModels?.[model.model]?.modelId}
                                        onValueChange={(value) => onSelectValue(model.model, value)}
                                        disabled={model.premium && !has({ plan: 'unlimited_plan' })}
                                    >
                                        <SelectTrigger className="w-[160px]">
                                            <SelectValue placeholder={aiSelectedModels?.[model.model]?.modelId} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup className="px-3">
                                                <SelectLabel className='text-sm text-gray-400'>Free</SelectLabel>
                                                {model.subModel.map((subModel, i) => !subModel.premium && (
                                                    <SelectItem key={i} value={subModel.id}>{subModel.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                            <SelectGroup className="px-3">
                                                <SelectLabel className='text-sm text-gray-400'>Premium</SelectLabel>
                                                {model.subModel.map((subModel, i) => subModel.premium && (
                                                    <SelectItem key={i} value={subModel.id} disabled>
                                                        {subModel.name} <Lock className='h-4 w-4' />
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>

                            <div>
                                {isEnabled ? (
                                    <Switch
                                        checked={model.enable}
                                        disabled={has && !has({ plan: 'unlimited_plan' }) && model.premium}
                                        onCheckedChange={(value) => onToggleChange(model.model, value)}
                                    />
                                ) : (
                                    <MessageSquare className="cursor-pointer h-5 w-5" onClick={() => onToggleChange(model.model, true)} />
                                )}
                            </div>
                        </div>

                        {has && !has({ plan: 'unlimited_plan' }) && model.premium && model.enable && (
                            <div className='flex items-center justify-center h-full p-3'>
                                <Button><Lock /> Upgrade to unlock</Button>
                            </div>
                        )}

                        {isEnabled && (!model.premium || has({ plan: 'unlimited_plan' })) && (
                            <div className='flex-1 p-3 min-h-0 overflow-auto'>
                                <div className='space-y-2'>
                                    {(threadMessages?.[model.model] ?? []).map((message, messageIndex) => (
                                        <div
                                            key={`${threadId}-${model.model}-${messageIndex}`}
                                            className={`p-2 rounded-md ${message.role === 'user'
                                                ? 'bg-blue-100 dark:bg-zinc-700 text-blue-900 dark:text-white'
                                                : 'bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white'
                                                }`}
                                        >
                                            {message.role === 'assistant' && (
                                                <span className='text-sm text-gray-400'>{message.model ?? model.model}</span>
                                            )}
                                            {message.content === 'loading' && (
                                                <div className='flex gap-2 items-center'>
                                                    <Loader className='animate-spin h-4 w-4' />
                                                    <span>Thinking...</span>
                                                </div>
                                            )}
                                            {message?.content && message.content !== 'loading' && (
                                                <ReactMarkdown className="prose prose-sm max-w-full overflow-x-auto">
                                                    {message.content?.toString() || ''}
                                                </ReactMarkdown>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

function ChatInputBoxThread({ threadId }) {
    const [userInput, setUserInput] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useUser()
    const { has } = useAuth()

    const {
        aiSelectedModels,
        threads = {},
        setThreads,
        showBranches,
        setShowBranches,
    } = useContext(AiSelectedModelContext)

    const enabledModelEntries = useMemo(
        () => Object.entries(aiSelectedModels ?? {}).filter(([, modelInfo]) => modelInfo?.enable),
        [aiSelectedModels]
    )

    const SaveMessages = async () => {}
    const GetMessages = async () => {}

    const handleSend = async () => {
        if (!userInput?.trim()) return

        setLoading(true)

        if (!has({ plan: 'unlimited_plan' })) {
            const result = await axios.post('/api/user-remaining-msg', { token: 1 })
            const remainingToken = result?.data?.remainingToken

            if (remainingToken <= 0) {
                toast.error('Maximum Daily Limit Exceed')
                setLoading(false)
                return
            }
        }

        if (threadId === 'main' && !showBranches) {
            setShowBranches(true)
        }

        const currentInput = userInput

        enabledModelEntries.forEach(([modelKey]) => {
            setThreads((prevThreads) => appendMessageToThreadModel(prevThreads, threadId, modelKey, {
                role: 'user',
                content: currentInput,
            }))
        })

        setUserInput('')

        const modelRequests = enabledModelEntries
            .filter(([, modelInfo]) => modelInfo?.modelId)
            .map(async ([parentModel, modelInfo]) => {
                setThreads((prevThreads) => appendMessageToThreadModel(prevThreads, threadId, parentModel, {
                    role: 'assistant',
                    content: 'loading',
                    model: parentModel,
                    loading: true,
                }))

                try {
                    const result = await axios.post('/api/ai-multi-model', {
                        model: modelInfo.modelId,
                        msg: [{ role: 'user', content: currentInput }],
                        parentModel,
                    })

                    const { aiResponse, model } = result.data

                    setThreads((prevThreads) => replaceLoadingInThreadModel(prevThreads, threadId, parentModel, {
                        role: 'assistant',
                        content: aiResponse,
                        model,
                        loading: false,
                    }))
                } catch (error) {
                    console.error(error)

                    setThreads((prevThreads) => replaceLoadingInThreadModel(prevThreads, threadId, parentModel, {
                        role: 'assistant',
                        content: '⚠️ Error fetching response.',
                        model: parentModel,
                        loading: false,
                    }))
                }
            })

        await Promise.all(modelRequests)
        setLoading(false)
    }

    return (
        <div className='w-full border-t p-3'>
            <div className='w-full border rounded-xl shadow-md p-3 bg-background'>
                <input
                    type='text'
                    placeholder={`Ask (${threadId})...`}
                    className='border-0 outline-none w-full bg-transparent'
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault()
                            handleSend()
                        }
                    }}
                />
                <div className='mt-3 flex justify-between items-center'>
                    <Button variant='ghost' size='icon'>
                        <Paperclip className='h-5 w-5' />
                    </Button>

                    <div className='flex gap-3'>
                        <Button variant='ghost' size='icon'>
                            <Mic className='h-5 w-5' />
                        </Button>

                        {user ? (
                            <Button size='icon' className='bg-blue-500' onClick={handleSend} disabled={loading}>
                                {loading ? <Loader2 className='animate-spin' /> : <Send />}
                            </Button>
                        ) : (
                            <SignInButton mode='modal'>
                                <Button size='icon' className='bg-blue-500' disabled={loading}>
                                    {loading ? <Loader2 className='animate-spin' /> : <Send />}
                                </Button>
                            </SignInButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ChatPanel({ threadId, title }) {
    return (
        <div className='h-full min-h-0 border rounded-xl overflow-hidden flex flex-col bg-background'>
            <div className='px-3 py-2 border-b text-sm font-medium capitalize'>
                {title}
            </div>
            <div className='flex-1 min-h-0'>
                <AiMultiModelsThread threadId={threadId} />
            </div>
            <ChatInputBoxThread threadId={threadId} />
        </div>
    )
}

function ChatWorkspace() {
    const { showBranches, threads = {} } = useContext(AiSelectedModelContext)

    const hasMainMessages = Object.values(threads?.main ?? {}).some((modelMessages) => (modelMessages?.length ?? 0) > 0)
    const shouldShowBranches = showBranches || hasMainMessages

    return (
        <div className='h-[calc(100vh-90px)] w-full p-4'>
            <div className='h-full w-full flex gap-4'>
                <div className={shouldShowBranches ? 'w-1/2 h-full min-h-0' : 'w-full h-full min-h-0'}>
                    <ChatPanel threadId='main' title='main' />
                </div>

                {shouldShowBranches && (
                    <div className='w-1/2 h-full min-h-0 flex flex-col gap-4'>
                        <div className='flex-1 min-h-0'>
                            <ChatPanel threadId='branchA' title='branchA' />
                        </div>
                        <div className='flex-1 min-h-0'>
                            <ChatPanel threadId='branchB' title='branchB' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function AiMultiAgents() {
    return <ChatWorkspace />
}
