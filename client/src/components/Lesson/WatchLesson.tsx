import React, {FC, useEffect, useRef, useState} from 'react'
import {io, Socket} from "socket.io-client";
import {BaseURL} from "../../config";
import {useGetMeDataQuery} from '../../services/userAPI';
import {Button, Grid} from "@mui/material";

interface WatchLessonProps {
    url: string,
    lessonId: string,
    flowId: string,
    result: any,
    refetchResult: () => void
}

const WatchLesson: FC<WatchLessonProps> = (({url, lessonId, flowId, result, refetchResult}) => {
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
            socketRef!.current = io(`${BaseURL}/api/v1/ws`, {
                path: "/api/v1/ws/socket.io",
            });

            const ended = () => {
                clearTimeout(timer)
                socketRef!.current!.emit('msgToServer', {
                    flowId,
                    lessonId,
                    timer: -1,
                    userId: user!._id,
                    type: 'end'
                })
                refetchResult()
            }
            videoRef!.current!.addEventListener('ended', ended)


            videoRef!.current!.addEventListener('seeking', seeking)

            const playing = () => {
                handleTimer()
            }
            videoRef!.current!.addEventListener('playing', playing)

            const pause = () => {
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
                }, 2000)
            }
            videoRef!.current!.addEventListener('pause', pause)

            return () => {
                videoRef!.current!.removeEventListener('ended', ended)
                videoRef!.current!.removeEventListener('seeking', seeking)
                videoRef!.current!.removeEventListener('playing', playing)
                videoRef!.current!.removeEventListener('pause', pause)
            }
        }
    }, [result])

    const seeking = () => {
        console.log(videoRef!.current!.currentTime, time)
        if (videoRef!.current!.currentTime > time) {
            console.log(2)
            videoRef!.current!.currentTime = time
        }
        clearTimeout(timer)
    }

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
            setTime(t)
            /*const condition = result && result.lessonVideosTimings && result.lessonVideosTimings[lessonId] && result.lessonVideosTimings[lessonId]
            if (!condition || t > condition) {
                setTime(t)
            }*/
            handleTimer()
        }, 1000)
    }

    const handleContinue = () => {
        const condition = result.lessonVideosTimings && result.lessonVideosTimings[lessonId] && result.lessonVideosTimings[lessonId] !== -1
        if (condition) {
            videoRef!.current!.currentTime = time
        }
    }

    return (
        <Grid
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
