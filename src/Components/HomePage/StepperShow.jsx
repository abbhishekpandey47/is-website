'use client'
import React, { useState, Suspense, useMemo } from 'react'
import Layout1JS from './All_Layouts/Layout1'
import Layout0JS from './All_Layouts/Layout0'
import LayoutJS2 from './All_Layouts/Layout2'
import LayoutJS3 from './All_Layouts/Layout3'




const StepperShow = () => {
    const eachPtArray = useMemo(() => [
        {
            ptrNum: 0,
            ptrTitle: "Research",
            layout: (<Layout0JS />)
        },
        {
            ptrNum: 1,
            ptrTitle: "Outline",
            layout: (<Layout1JS />)
        },
        {
            ptrNum: 2,
            ptrTitle: "Create",
            layout: (<LayoutJS2 />)
        },
        {
            ptrNum: 3,
            ptrTitle: "Distribute",
            layout: (<LayoutJS3 />)
        },
    ], []);
    const [widthOfMover, setWidthOfMover] = useState(16)
    const [curPtr, setCurPtr] = useState(0)
    const [visitedColor, setVisitedColor] = useState("#fff")
    const [nonVisitedCol, setNonVisitedCol] = useState("#999")
    const handleOnClick = (ptr) => {
        setWidthOfMover((100 / 3) * ptr + (100 / 6))
        setCurPtr(ptr)
    }
    return (
        <div className='w-full flex justify-center  items-center flex-col gap-2 pt-10'>
            <div className='w-3/4 max-lg:w-5/6 relative flex items-center overflow-hidden'>
                <div className='z-10 relative flex w-full justify-between'>
                    {eachPtArray.map((eachPt, index) => {
                        return (
                            <div key={index} className='flex flex-col items-center relative'>
                                <div className=''><p style={{ color: `${curPtr >= eachPt.ptrNum ? `${visitedColor}` : `${nonVisitedCol}`}` }} className={`text-[#fff] max-lg:text-[1em] text-center`}>{eachPt.ptrTitle}</p></div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <div className='w-2/3 max-lg:w-4/5 relative flex items-center overflow-hidden'>
                <div className='z-10 relative flex w-full justify-between'>
                    {eachPtArray.map((eachPt, index) => {
                        return (
                            <div key={index} className='flex flex-col items-center relative'>
                                <div onClick={(() => { handleOnClick(eachPt.ptrNum) })} style={{ backgroundColor: `${curPtr >= eachPt.ptrNum ? visitedColor : nonVisitedCol}` }} className='h-[15px] w-[15px] rounded-full cursor-pointer'></div>

                            </div>
                        )
                    })}

                </div>
                <div style={{ backgroundColor: `${nonVisitedCol}` }} className={`w-full h-[2px] absolute`} ></div>
                <div style={{ width: `${widthOfMover}%`, backgroundColor: `${visitedColor}` }} className={`h-[2px] absolute transition-all duration-500 ease-linear`} ></div>
            </div>
            <Suspense fallback={"Loading..."}>
                {eachPtArray[curPtr].layout}
            </Suspense>

        </div>
    )
}

export default StepperShow