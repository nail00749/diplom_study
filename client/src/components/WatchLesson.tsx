import React, {FC, useEffect, useRef, useState, useMemo} from 'react'
import {io, Socket} from "socket.io-client";
import {BaseURL} from "../config";
import {useGetMeDataQuery} from '../services/userAPI';
import {Button, Grid} from "@mui/material";

interface WatchLessonProps {
    url: string,
    lessonId: string,
    flowId: string,
    result: any,
    refetchResult: () => void
}

const WatchLesson: FC<WatchLessonProps> = (({url, lessonId, flowId, result, refetchResult}, ref) => {
    let socketRef = useRef<Socket | null>(null)
    let timer: ReturnType<typeof setTimeout>
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const {data: user} = useGetMeDataQuery()
    const [time, setTime] = useState(() => {
        const condition = result && result.lessonVideosTimings && result.lessonVideosTimings[lessonId]
        if (condition) {
            return result.lessonVideosTimings[lessonId]
        }
        return 0
    })


    useEffect(() => {
        return () => {
            clearTimeout(timer)
            if (socketRef && socketRef.current && videoRef && videoRef.current) {
                socketRef.current.emit('msgToServer', {
                    flowId,
                    lessonId,
                    timer: Math.floor(videoRef.current.currentTime),
                    userId: user!._id,
                    type: 'other'
                })
                socketRef.current.disconnect()
            }
        }
    }, [])

    useEffect(() => {
        let condition = true
        if (result && result.lessonVideosTimings && result.lessonVideosTimings[lessonId] && result.lessonVideosTimings[lessonId] === -1) {
            condition = false
            setTime(result.lessonVideosTimings[lessonId])
        }

        if (condition) {
            socketRef!.current = io("http://localhost:5000/api/v1/ws", {
                path: "/api/v1/ws/socket.io",
            });
            videoRef!.current!.addEventListener('ended', () => {
                clearTimeout(timer)
                socketRef!.current!.emit('msgToServer', {
                    flowId,
                    lessonId,
                    timer: -1,
                    userId: user!._id,
                    type: 'end'
                })
                refetchResult()
            })
            videoRef!.current!.addEventListener('seeking', () => {
                if (videoRef!.current!.currentTime > time) {
                    videoRef!.current!.currentTime = time
                }
                clearTimeout(timer)
            })
            videoRef!.current!.addEventListener('playing', () => {
                handleTimer()
            })
            videoRef!.current!.addEventListener('pause', () => {
                clearTimeout(timer)
                setTimeout(() => {
                    const t = Math.floor(videoRef!.current!.currentTime)
                    socketRef!.current!.emit('msgToServer', {
                        flowId,
                        lessonId,
                        timer: t,
                        userId: user!._id,
                        type: 'pause'
                    })
                }, 3000)
            })
        }
    }, [result])

    const handleTimer = () => {
        timer = setTimeout(() => {
            clearTimeout(timer)
            const t = Math.floor(videoRef!.current!.currentTime)
            socketRef!.current!.emit('msgToServer', {
                flowId,
                lessonId,
                timer: t,
                userId: user!._id,
                type: 'play'
            })
            const condition = result && result.lessonVideosTimings && result.lessonVideosTimings[lessonId] && result.lessonVideosTimings[lessonId]
            if (!condition || t > condition) {
                setTime(t)
            }
            handleTimer()
        }, 1000 * 3)
    }

    const handleContinue = () => {
        const condition = result.lessonVideosTimings && result.lessonVideosTimings[lessonId] && result.lessonVideosTimings[lessonId] !== -1
        if (condition) {
            videoRef!.current!.currentTime = time
        }
    }

    return (
        <Grid
            container
            direction = 'column'
            alignItems = 'center'
        >
            <div>
                <video
                    src = {url}
                    style = {{
                        maxWidth: 320,
                        maxHeight: 240
                    }}
                    ref = {videoRef}
                    controls
                    controlsList = 'nodownload'
                />
            </div>
            <div>
                {
                    time > 0 &&
					<Button
						onClick = {handleContinue}
						variant = 'outlined'
					>
                        {`Продолжить с ${time}`}
					</Button>
                }
            </div>
        </Grid>
    )
})

export default WatchLesson
