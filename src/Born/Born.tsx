
import React, { useState, useEffect, useMemo } from 'react'
import { Icon, DatePicker, ProgressIndicator, PrimaryButton } from '@fluentui/react'
import './Born.css'

const defaultTime = new Date('1999-06-05 00:00')

const getAge = (bornTime: Date): string => {
    const time = (new Date().getTime() - bornTime.getTime()) / 60 / 60 / 24 / 365.242 / 1000
    return time.toFixed(8)
}

export const Born: React.FunctionComponent = () => {
    const [bornTime, setbornTime] = useState(defaultTime)
    const [nowAge, setNowAge] = useState(getAge(bornTime))

    useEffect(() => {
        const timer = setInterval(() => {
            setNowAge(getAge(bornTime))
        }, 1000)
        return () => clearInterval(timer)
    })

    useEffect(() => {
        document.title = '生辰'
    })

    const progressLabel = useMemo(() => {
        return `距出生的 ${bornTime.getFullYear()} 年，你已经 ${nowAge} 岁了`
    }, [bornTime, nowAge])

    const Progress: React.FunctionComponent = () => {
        return (
            <ProgressIndicator label={progressLabel} percentComplete={Number(nowAge) / 100}/>
        )
    }

    return (
        <div className='o-born'>
            <div className='o-born-inner'>
                <Icon iconName="Timer" className='o-born-inner-icon'/>
                <Progress/>
                <DatePicker
                    placeholder="选择一个时间……"
                    onSelectDate={
                        setSelectedDate => setbornTime(setSelectedDate || defaultTime) 
                    }
                    initialPickerDate={bornTime}
                    value={bornTime}
                    maxDate={new Date()}
                    // dateTimeFormatter={{
                    //     formatDay: date => String(date.getDate()),
                    //     formatMonth: date => String(date.getMonth() + 1) + '月',
                    //     formatMonthDayYear: date => `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
                    //     formatMonthYear: date => `${date.getFullYear()}年${date.getMonth() + 1}月`,
                    //     formatYear: date => String(date.getFullYear())
                    // }}
                    formatDate={date => date ? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日` : ''}
                />
                <PrimaryButton text="恢复默认值" onClick={() => setbornTime(defaultTime)}/>
            </div>
        </div>
    )
}