"use client"

import { useTheme } from "next-themes"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { Sun, Moon, Lock, X } from "lucide-react"
import UsageCreditProgress from "../_components/UsageCreditProgress"
import axios from "axios"
import AiModelList from "@/shared/AiModelList"
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext"
import { useAuth, UserProfile, useUser } from "@clerk/nextjs"
import Image from "next/image"
import { toast } from "sonner"
import TopNav from "../_components/TopNav"

export default function ProfileSettingsPage() {
    const { theme, setTheme } = useTheme()
    const router = useRouter()
    const [fullName, setFullName] = useState("")
    const [freeMsgCount, setFreeMsgCount] = useState(0);
    const { aiSelectedModels, setAiSelectedModels, messages, setMessages } = useContext(AiSelectedModelContext);
    const { has } = useAuth();
    const { user } = useUser();

    const onToggleChange = (model, value) => {
        setAiSelectedModels((prev) => ({
            ...prev,
            [model]: {
                ...(prev?.[model] ?? {}),
                enable: value
            }
        }));

    }

    useEffect(() => {
        GetReminingTokenMsgs();
    }, [])

    const GetReminingTokenMsgs = async () => {
        console.log('callhere')
        const result = await axios.post('/api/user-remaining-msg', {});
        console.log(result);
        setFreeMsgCount(result?.data?.remainingToken);
    }
    return (
        <div className="min-h-screen">
            <TopNav />
            <div className="max-w-3xl mx-auto py-10 mt-16 px-4 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Profile Settings</h1>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        >
                            {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="text-[var(--brand-red)] border-[var(--brand-red-border)] hover:bg-[var(--brand-red-soft)] hover:text-[var(--brand-red)]"
                            onClick={() => router.push("/")}
                            aria-label="Close settings"
                            title="Close settings"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <p className="text-muted-foreground">
                    Manage your profile information and AI model preferences.
                </p>

                {/* Profile Information */}
                <Card>
                <CardHeader>
                    <CardTitle>Profile information</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Manage your basic profile details.
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={user?.primaryEmailAddress?.emailAddress} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label>Full name</Label>
                        <Input
                            placeholder="Enter your full name"
                            value={user?.fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <Button className="w-full">Update profile</Button>
                </CardContent>
                </Card>

                {/* AI Model Preferences */}
                <Card>
                <CardHeader>
                    <CardTitle>Customize your chat AI model preferences</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Easily update your selections anytime in the settings
                    </p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {AiModelList.map((model, index) => (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <Image src={model.icon} width={40} className="rounded-2xl h-8 w-8" height={40} alt={model.model} />
                                <span className="font-medium">{model.model}</span>
                                {has && !has({ plan: 'unlimited_plan' }) && model.premium && <Lock className="h-4 w-4" />}
                            </div>
                            <Switch
                                onCheckedChange={(v) => onToggleChange(model.model, v)}
                                defaultChecked={aiSelectedModels[model.model]?.enable ?? false}
                                disabled={has && !has({ plan: 'unlimited_plan' }) && model.premium}
                            />
                        </div>
                    ))}


                    {/* <Button className="w-full">Update preferences</Button> */}
                    {has && !has({ plan: 'unlimited_plan' }) && <Button variant="outline" className="w-full">
                        Upgrade and Unlock Premium AI Models
                    </Button>}

                    <p className="text-xs text-muted-foreground">
                        Tips: Try not to use every AI model for smaller queries - this helps conserve tokens
                        and ensures more meaningful results.
                    </p>
                </CardContent>
                </Card>

                {/* Subscription Information */}
                {has && !has({ plan: 'unlimited_plan' }) && <Card>
                <CardHeader>
                    <CardTitle>Subscription information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 border border-destructive rounded-lg bg-destructive/10">
                        <UsageCreditProgress remainingToken={freeMsgCount} />
                        <Button variant="destructive" className="mt-2 w-full">
                            Upgrade for unlimited messages
                        </Button>
                    </div>
                </CardContent>
                </Card>}

                <UserProfile />
            </div>
        </div>
    )
}
