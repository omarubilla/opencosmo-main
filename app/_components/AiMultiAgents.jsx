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
import { Button } from '@/components/ui/button'
import { Loader, Loader2, Lock, Mic, Paperclip, Send } from 'lucide-react'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import AiModelList from '@/shared/AiModelList'
import { AiSelectedModelContext } from '@/context/AiSelectedModelContext'

const THREAD_IDS = ['main', 'branchA', 'branchB']

function getActiveModelKey(aiSelectedModels) {
    const enabled = AiModelList.find((model) => aiSelectedModels?.[model.model]?.enable)
    return enabled?.model ?? AiModelList[0]?.model
}

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

function ModelOptionsBar() {
    const { aiSelectedModels, setAiSelectedModels } = useContext(AiSelectedModelContext)
    const { has } = useAuth()
    const activeModelKey = getActiveModelKey(aiSelectedModels)

    const onSelectModel = (modelKey) => {
        const modelConfig = AiModelList.find((item) => item.model === modelKey)
        const defaultModelId = modelConfig?.subModel?.[0]?.id
        const isPremiumLocked = modelConfig?.premium && has && !has({ plan: 'unlimited_plan' })
        if (isPremiumLocked) return

        setAiSelectedModels((prev) => {
            const next = { ...(prev ?? {}) }

            AiModelList.forEach((model) => {
                next[model.model] = {
                    ...(next?.[model.model] ?? {}),
                    modelId: next?.[model.model]?.modelId ?? model.subModel?.[0]?.id,
                    enable: model.model === modelKey,
                }
            })

            if (!next?.[modelKey]?.modelId && defaultModelId) {
                next[modelKey].modelId = defaultModelId
            }

            return next
        })
    }

    const onSelectValue = (modelKey, value) => {
        setAiSelectedModels((prev) => ({
            ...prev,
            [modelKey]: {
                ...(prev?.[modelKey] ?? {}),
                modelId: value,
                enable: true,
            },
        }))
    }

    return (
        <div className='w-full rounded-xl border bg-background/90 backdrop-blur px-3 py-2 overflow-x-auto'>
            <div className='flex items-center gap-3 min-w-max'>
                {AiModelList.map((model) => {
                    const isEnabled = activeModelKey === model.model
                    const selectedValue = aiSelectedModels?.[model.model]?.modelId
                    const isPremiumLocked = model.premium && has && !has({ plan: 'unlimited_plan' })

                    return (
                        <button
                            key={model.model}
                            type='button'
                            onClick={() => onSelectModel(model.model)}
                            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 bg-background transition ${isEnabled ? 'border-primary ring-1 ring-primary/30' : 'opacity-80 hover:opacity-100'}`}
                            disabled={isPremiumLocked}
                        >
                            <Image src={model.icon} alt={model.model} width={18} height={18} />
                            <span className='text-sm'>{model.model}</span>

                            {isEnabled && (
                                <Select
                                    value={selectedValue}
                                    onValueChange={(value) => onSelectValue(model.model, value)}
                                    disabled={isPremiumLocked}
                                >
                                    <SelectTrigger className='h-8 w-[190px]' onClick={(event) => event.stopPropagation()}>
                                        <SelectValue placeholder={selectedValue ?? model.model} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup className='px-3'>
                                            <SelectLabel className='text-sm text-gray-400'>Free</SelectLabel>
                                            {model.subModel.map((subModel, i) => !subModel.premium && (
                                                <SelectItem key={i} value={subModel.id}>{subModel.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                        <SelectGroup className='px-3'>
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

                            {isPremiumLocked && <Lock className='h-4 w-4 text-muted-foreground' />}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

function AiMultiModelsThread({ threadId }) {
    const { aiSelectedModels, threads = {} } = useContext(AiSelectedModelContext)
    const { has } = useAuth()
    const activeModelKey = getActiveModelKey(aiSelectedModels)
    const activeModel = AiModelList.find((model) => model.model === activeModelKey)

    const threadMessages = threads?.[threadId] ?? {}

    return (
        <div className="flex flex-1 h-full border-b min-h-0">
            {!activeModel && (
                <div className='w-full h-full flex items-center justify-center text-sm text-muted-foreground'>
                    Select a model from the top menu.
                </div>
            )}

            {activeModel && (
                <div className='flex flex-col h-full overflow-auto transition-all duration-300 flex-1 min-w-[240px]'>
                    <div className='px-3 py-2 border-b text-xs text-muted-foreground flex items-center gap-2'>
                        <Image src={activeModel.icon} alt={activeModel.model} width={16} height={16} />
                        <span>{activeModel.model}</span>
                    </div>

                    {has && !has({ plan: 'unlimited_plan' }) && activeModel.premium && (
                        <div className='flex items-center justify-center h-full p-3'>
                            <Button><Lock /> Upgrade to unlock</Button>
                        </div>
                    )}

                    {(!activeModel.premium || has({ plan: 'unlimited_plan' })) && (
                        <div className='flex-1 p-3 min-h-0 overflow-auto'>
                            <div className='space-y-2'>
                                {(threadMessages?.[activeModel.model] ?? []).map((message, messageIndex) => (
                                    <div
                                        key={`${threadId}-${activeModel.model}-${messageIndex}`}
                                        className={`p-2 rounded-md ${message.role === 'user'
                                            ? 'bg-blue-100 dark:bg-zinc-700 text-blue-900 dark:text-white'
                                            : 'bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white'
                                            }`}
                                    >
                                        {message.role === 'assistant' && (
                                            <span className='text-sm text-gray-400'>{message.model ?? activeModel.model}</span>
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
            )}
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
        setThreads,
        showBranches,
        setShowBranches,
    } = useContext(AiSelectedModelContext)
    const activeModelKey = getActiveModelKey(aiSelectedModels)
    const activeModel = AiModelList.find((model) => model.model === activeModelKey)
    const activeModelId = aiSelectedModels?.[activeModelKey]?.modelId

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

        if (!activeModel || !activeModelId) {
            toast.error('Select one model from the top bar first.')
            setLoading(false)
            return
        }

        if (activeModel.premium && has && !has({ plan: 'unlimited_plan' })) {
            toast.error('Upgrade to use this model.')
            setLoading(false)
            return
        }

        const currentInput = userInput

        setThreads((prevThreads) => appendMessageToThreadModel(prevThreads, threadId, activeModelKey, {
            role: 'user',
            content: currentInput,
        }))

        setUserInput('')

        setThreads((prevThreads) => appendMessageToThreadModel(prevThreads, threadId, activeModelKey, {
            role: 'assistant',
            content: 'loading',
            model: activeModelKey,
            loading: true,
        }))

        try {
            const result = await axios.post('/api/ai-multi-model', {
                model: activeModelId,
                msg: [{ role: 'user', content: currentInput }],
                parentModel: activeModelKey,
            })

            const { aiResponse, model } = result.data

            setThreads((prevThreads) => replaceLoadingInThreadModel(prevThreads, threadId, activeModelKey, {
                role: 'assistant',
                content: aiResponse,
                model,
                loading: false,
            }))
        } catch (error) {
            console.error(error)

            setThreads((prevThreads) => replaceLoadingInThreadModel(prevThreads, threadId, activeModelKey, {
                role: 'assistant',
                content: '⚠️ Error fetching response.',
                model: activeModelKey,
                loading: false,
            }))
        }

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
                            <SignInButton mode='modal' forceRedirectUrl='/' fallbackRedirectUrl='/'>
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
            <div className='h-full w-full flex flex-col gap-4'>
                <ModelOptionsBar />

                <div className='flex-1 min-h-0 flex gap-4'>
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
        </div>
    )
}

export default function AiMultiAgents() {
    return <ChatWorkspace />
}
