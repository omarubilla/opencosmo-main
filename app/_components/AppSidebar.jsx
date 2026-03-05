"use client"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { SignInButton, useAuth, UserButton, useUser } from "@clerk/nextjs"
import { Bolt, Moon, Sun, User2, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import UsageCreditProgress from "./UsageCreditProgress"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/config/FirebaseConfig"
import { useContext, useEffect, useState } from "react"
import moment from "moment"
import Link from "next/link"
import axios from "axios"
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext"
import PricingModal from "./PricingModal"
import { motion } from "framer-motion"

export function AppSidebar() {
    const { theme, setTheme } = useTheme();
    const { user } = useUser();
    const [chatHistory, setChatHistory] = useState([]);
    const [freeMsgCount, setFreeMsgCount] = useState(0);
    const { aiSelectedModels, setAiSelectedModels, messages, setMessages } = useContext(AiSelectedModelContext);
    const { has } = useAuth();
    // const paidUser = has({ plan: 'unlimited_plan' });
    useEffect(() => {
        if (!user) {
            setChatHistory([]);
            return;
        }
        GetChatHistory();
        GetReminingTokenMsgs();
    }, [user])

    useEffect(() => {
        user && GetReminingTokenMsgs();
    }, [messages])

    const GetChatHistory = async () => {
        const q = query(collection(db, "chatHistory"), where("userEmail", '==', user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);
        const history = [];

        querySnapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
            history.push(doc.data());
        })

        setChatHistory(history);

    }


    const GetLastUserMessageFromChat = (chat) => {

        const allMessages = Object.values(chat.messages).flat();
        const userMessages = allMessages.filter(msg => msg.role == 'user');

        const lastUserMsg = userMessages[userMessages?.length - 1]?.content || null;

        const lastUpdated = chat?.lastUpdated || Date.now();
        const formattedDate = moment(lastUpdated).fromNow();

        return {
            chatId: chat.chatId,
            message: lastUserMsg,
            lastMsgDate: formattedDate
        }

    }

    const GetReminingTokenMsgs = async () => {
        console.log('callhere')
        const result = await axios.post('/api/user-remaining-msg', {});
        console.log(result);
        setFreeMsgCount(result?.data?.remainingToken);
    }

    return (
        <Sidebar className={`min-w-60 ${user ? 'top-0 h-[100svh]' : 'top-16 h-[calc(100svh-4rem)]'} bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#ece8e1] dark:from-[#001121] dark:via-[#001121] dark:to-[#001121] border-r border-[#e6e0d7] dark:border-[#123047] [&_[data-slot=sidebar-inner]]:bg-gradient-to-br [&_[data-slot=sidebar-inner]]:from-[#faf8f3] [&_[data-slot=sidebar-inner]]:via-[#f5f2ed] [&_[data-slot=sidebar-inner]]:to-[#ece8e1] dark:[&_[data-slot=sidebar-inner]]:from-[#001121] dark:[&_[data-slot=sidebar-inner]]:via-[#001121] dark:[&_[data-slot=sidebar-inner]]:to-[#001121]`}>
            <SidebarHeader >
                <div className="p-3">
                    {user && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="flex justify-between items-center"
                        >
                            <div className="flex items-center gap-3">
                                <Image src={'/openCosmo_logo3.png'} alt="logo" width={80} height={80}
                                    className="w-[40px] h-[40px]"
                                />
                                <h2 className="font-bold text-xl text-[#4a4540] dark:text-[#ececf1]">OpenCosmo</h2>
                            </div>
                            <div>
                                {theme == 'light' ? <Button variant={'ghost'} onClick={() => setTheme('dark')}><Sun /></Button>
                                    : <Button variant={'ghost'} onClick={() => setTheme('light')}><Moon /></Button>}
                            </div>
                        </motion.div>
                    )}
                    {user ?
                        <Link href={'/'}>
                            <Button className='mt-7 w-full bg-[var(--brand-red)] hover:bg-[var(--brand-red-hover)] text-white' size="lg">+ New Chat</Button>
                        </Link> :

                        <SignInButton mode="modal">
                            <Button className='mt-7 w-full bg-[var(--brand-red)] hover:bg-[var(--brand-red-hover)] text-white' size="lg">+ New Chat</Button>
                        </SignInButton>}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <div className={'p-3'} >
                        <h2 className="font-bold text-lg text-[#4a4540] dark:text-[#ececf1]">Chat</h2>
                        {!user && <p className="text-sm text-gray-500 dark:text-[#9ca3af]">Sign in to start chating with multiple AI agents</p>}
                        {user && (
                            <div className="overflow-auto">
                                {chatHistory.map((chat, index) => (
                                    <Link href={'/?chatId=' + chat.chatId} key={index} className=" ">
                                        <div className="hover:bg-black/5 dark:hover:bg-white/5 p-2 cursor-pointer rounded-md transition-colors">
                                            <h2 className="text-sm text-gray-500 dark:text-[#9ca3af]">{GetLastUserMessageFromChat(chat).lastMsgDate}</h2>
                                            <h2 className="text-lg line-clamp-1 text-[#4a4540] dark:text-[#ececf1]">{GetLastUserMessageFromChat(chat).message}</h2>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter >
                <div className="p-3 mb-10">
                    {!user ? <SignInButton mode="modal" >
                        <Button className={'w-full bg-[var(--brand-red)] hover:bg-[var(--brand-red-hover)] text-white'} size={'lg'}>Sign In/Sign Up</Button>
                    </SignInButton>
                        :
                        <div>
                            {!has({ plan: 'unlimited_plan' }) &&
                                <div>
                                    <UsageCreditProgress remainingToken={freeMsgCount} />
                                    <PricingModal>
                                        <Button className={'w-full mb-3'}> <Zap /> Upgrade Plan </Button>
                                    </PricingModal>
                                </div>}
                            <div className="flex items-center gap-3 w-full">
                                <UserButton />
                                <Link href={'/profile'} className="w-full">
                                    <Button className="flex w-full border rounded-md cursor-pointer p-2 items-center " variant={'ghost'} >
                                        <User2 className="" /> <h2 className="">Settings</h2>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}