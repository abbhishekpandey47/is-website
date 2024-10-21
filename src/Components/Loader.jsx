'use client'
import AppContext from '@/context/Infracontext'
import React, { useContext } from 'react'
import LoadingBar from 'react-top-loading-bar'

export const Loader = () => {

    const context = useContext(AppContext)

    const { setProgress, progress } = context

    return (
        <div>
            <LoadingBar
                color='#A020F0'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
        </div>
    )
}