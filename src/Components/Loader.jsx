'use client'
import { useContext } from 'react'
import LoadingBar from 'react-top-loading-bar'
import AppContext from '../context/Infracontext'

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
