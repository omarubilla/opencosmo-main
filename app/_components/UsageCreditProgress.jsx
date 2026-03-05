import { Progress } from '@/components/ui/progress'
import React from 'react'

function UsageCreditProgress({ remainingToken }) {
    return (
        <div className='p-3 border rounded-2xl mb-5 flex flex-col gap-2'>
            <h2 className='font-bold text-xl'>Free Plan</h2>
            <p className='text-gray-400'>{15 - remainingToken}/15 message Used</p>
            <Progress value={100 - ((15 - remainingToken) / 15) * 100} />
        </div>
    )
}

export default UsageCreditProgress