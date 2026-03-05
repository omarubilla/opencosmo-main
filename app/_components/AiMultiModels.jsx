import React, { useContext, useEffect, useState } from 'react'
import AiModelList from './../../shared/AiModelList'
import Image from 'next/image'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from '@/components/ui/switch'
import { Loader, Lock, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SelectLabel } from '@radix-ui/react-select'
import { AiSelectedModelContext } from '@/context/AiSelectedModelContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import { useAuth, useUser } from '@clerk/nextjs'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useSearchParams } from 'next/navigation'
function AiMultiModels() {
    const { user } = useUser();
    const [aiModelList, setAiModelList] = useState(AiModelList)
    const { aiSelectedModels, setAiSelectedModels, messages, setMessages } = useContext(AiSelectedModelContext);

    const { has } = useAuth();

    const onToggleChange = (model, value) => {
        setAiModelList((prev) =>
            prev.map((m) =>
                m.model === model ? { ...m, enable: value } : m))

        setAiSelectedModels((prev) => ({
            ...prev,
            [model]: {
                ...(prev?.[model] ?? {}),
                enable: value
            }
        }))
    }





    const onSelecteValue = async (parentModel, value) => {
        setAiSelectedModels(prev => ({
            ...prev,
            [parentModel]: {
                modelId: value
            }
        }))

    }

    return (
        <div className="flex flex-1 h-[75vh] border-b">
            {aiModelList.map((model, index) => (
                <div
                    key={index}
                    className={`flex flex-col border-r h-full overflow-auto transition-all duration-300
                        ${model.enable && aiSelectedModels[model.model]?.enable ? 'flex-1 min-w-[400px]' : 'w-[100px] flex-none'}`}
                >
                    <div className="flex w-full h-[70px] gap-2 items-center justify-between border-b p-4">
                        <div className="flex items-center gap-4 w-full">
                            <Image
                                src={model.icon}
                                alt={model.model}
                                width={24}
                                height={24}
                            />

                            {model.enable && aiSelectedModels[model.model]?.enable && (
                                <Select defaultValue={aiSelectedModels[model.model]?.modelId}
                                    onValueChange={(value) => onSelecteValue(model.model, value)}
                                    disabled={model.premium && !has({ plan: 'unlimited_plan' })}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={aiSelectedModels[model.model]?.modelId} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup className="px-3">
                                            <SelectLabel className='text-sm text-gray-400'>Free</SelectLabel>
                                            {model.subModel.map((subModel, i) => subModel.premium == false && (
                                                <SelectItem key={i} value={subModel.id}>
                                                    {subModel.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                        <SelectGroup className="px-3">
                                            <SelectLabel className='text-sm text-gray-400'>Premium</SelectLabel>
                                            {model.subModel.map((subModel, i) => subModel.premium == true && (
                                                <SelectItem key={i} value={subModel.name} disabled={subModel.premium}>
                                                    {subModel.name} {subModel.premium && <Lock className='h-4 w-4' />}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                        <div>
                            {model.enable && aiSelectedModels[model.model]?.enable ? (
                                <Switch
                                    checked={model.enable}
                                    disabled={has && !has({ plan: 'unlimited_plan' }) && model.premium}
                                    onCheckedChange={(v) => onToggleChange(model.model, v)}
                                />
                            ) : (
                                <MessageSquare
                                    className="cursor-pointer h-5 w-5"
                                    onClick={() => onToggleChange(model.model, true)}
                                />
                            )}
                        </div>
                    </div>
                    {has && !has({ plan: 'unlimited_plan' }) && model.premium && model.enable && <div className='flex items-center justify-center h-full'>
                        <Button> <Lock /> Upgrade to unlock</Button>
                    </div>}

                    {model.enable && aiSelectedModels[model.model]?.enable && (!model.premium || has({ plan: 'unlimited_plan' })) && < div className='flex-1 p-4'>
                        <div className='flex-1 p-4 space-y-2 '>
                            {messages[model.model]?.map((m, i) => (
                                <div
                                    className={`p-2 rounded-md ${m.role == 'user' ?
                                        "bg-blue-100 dark:bg-zinc-700 text-blue-900 dark:text-white"
                                        : "bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white"
                                        }`}
                                >
                                    {m.role == 'assistant' && (
                                        <span className='text-sm text-gray-400'>{m.model ?? model.model}</span>
                                    )}
                                    <div className='flex gap-3 items-center'>
                                        {m.content == 'loading' && <><Loader className='animate-spin' /><span>Thinking...</span></>}</div>
                                    {m && m.content && m.content !== 'loading' && (
                                        <ReactMarkdown className="prose prose-sm max-w-full overflow-x-auto">
                                            {m?.content?.toString() || ''}
                                        </ReactMarkdown>
                                    )}

                                </div>
                            ))}
                        </div>
                    </div>}
                </div>
            ))
            }


        </div >
    )
}

export default AiMultiModels
