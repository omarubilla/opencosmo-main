"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { useUser } from '@clerk/nextjs'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import { AiSelectedModelContext } from '@/context/AiSelectedModelContext'
import { DefaultModel } from '@/shared/AiModelsShared'
import { UserDetailContext } from '@/context/UserDetailContext'
import { toast } from 'sonner'

const DEFAULT_THREADS = {
    main: {},
    branchA: {},
    branchB: {}
}

function Provider({ children, ...props }) {

    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const [aiSelectedModels, setAiSelectedModels] = useState(DefaultModel)
    const [userDetail, setUserDetail] = useState();
    const [messages, setMessages] = useState({})
    const [threads, setThreads] = useState(DEFAULT_THREADS)
    const [showBranches, setShowBranches] = useState(false)
    useEffect(() => {
        if (user) {
            CreateNewUser();
        }
    }, [user])

    useEffect(() => {
        if (!userEmail || !aiSelectedModels) return;
        updateAIModelSelectionPref();
    }, [aiSelectedModels, userEmail]);

    const updateAIModelSelectionPref = async () => {
        if (!userEmail) return;
        const docRef = doc(db, "users", userEmail);
        await setDoc(docRef, {
            selectedModelPref: aiSelectedModels
        }, { merge: true })
        toast.success('Pref Updated!')
    }


    const CreateNewUser = async () => {
        //If user exist?
        const userRef = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            console.log('Existing User');
            const userInfo = userSnap.data();
            setAiSelectedModels(userInfo?.selectedModelPref ? userInfo?.selectedModelPref : DefaultModel);
            setUserDetail(userInfo);
            return;
        } else {
            const userData = {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                createdAt: new Date(),
                reminaingMsg: 5,//Only for Free users
                plan: 'Free',
                selectedModelPref: DefaultModel,
                credits: 1000 //Paid User
            }
            await setDoc(userRef, userData);
            console.log('New User data saved');
            setUserDetail(userData);

        }

        //if Not then insert
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NextThemesProvider {...props}
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>
                <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                    <AiSelectedModelContext.Provider value={{
                        aiSelectedModels,
                        setAiSelectedModels,
                        messages,
                        setMessages,
                        threads,
                        setThreads,
                        showBranches,
                        setShowBranches
                    }}>
                        <SidebarProvider>
                            <AppSidebar />


                            <div className='flex-1 min-w-0'>
                                <AppHeader />{children}</div>
                        </SidebarProvider>
                    </AiSelectedModelContext.Provider>
                </UserDetailContext.Provider>
            </NextThemesProvider>
        </Suspense>
    )
}

export default Provider