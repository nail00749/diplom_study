import {Box, Button} from '@mui/material';
import React, {FC, useRef, useState, useEffect} from 'react';
import Webcam from "react-webcam";


const Stream: FC = () => {
    const [isActiveWebCam, setIsActiveWebCam] = useState<boolean>(false);
    const [isActiveScreen, setIsActiveScreen] = useState<boolean>(false);
    const [capturing, setCapturing] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const screenRef = useRef<HTMLVideoElement | null>(null)
    const stream = useRef<MediaStream | null>(null)

    const [url, setUrl] = useState('')

    useEffect(() => {
        return () => {
            handleStopScreen()
            stream.current?.removeEventListener('inactive', handleStopScreen)
        }
    }, [])

    const connectWebRtC = async () => {
        try {
            const rtcp = new RTCPeerConnection()
            const offer = await rtcp.createOffer()


            const data = {
                sdp: offer.sdp,
                streamurl: 'webrtc://192.168.0.13/live/livestream',
                clienttip: null,
                tid: Number(parseInt(String(new Date().getTime() * Math.random() * 100))).toString(16).substr(0, 7)
            }
            const resp = await fetch('https://192.168.0.77:8088/rtc/v1/publish/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            console.log(resp)
            setUrl('https://192.168.0.13:8080/live/livestream.flv')

        } catch (e) {
            console.log(e)
        }
    }

    const handleStartCaptureClick = React.useCallback(async () => {
        await setIsActiveWebCam(true)
        if (webcamRef.current) {
            setCapturing(true);
            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream as MediaStream, {
                mimeType: "video/webm"
            });
            mediaRecorderRef.current.start();
        }
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleStopCaptureClick = React.useCallback(() => {
        setIsActiveWebCam(false)
        mediaRecorderRef.current?.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const handleStartScreen = async () => {
        try {
            if (screenRef.current) {
                let displayMediaOptions = {
                    video: {
                        cursor: "always"
                    },
                    audio: false
                };
                //stream.current = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions as DisplayMediaStreamConstraints)
                //stream.current.addEventListener('inactive', handleStopScreen)
                //screenRef.current.srcObject

                //stream.current .srcObject
                setIsActiveScreen(true)
            }
        } catch (e) {
            console.log(e)
        }

    }

    const handleStopScreen = () => {
        //todo fix after changing location
        if (stream && stream.current && screenRef && screenRef.current) {
            let tracks = stream.current.getTracks()
            tracks.forEach(t => t.stop())
            screenRef.current.srcObject = null
            setIsActiveScreen(false)
        }
    }

    return (
        <>
            <Box>
                {capturing ? (
                    <Button onClick = {handleStopCaptureClick}>Stop Capture</Button>
                ) : (
                    <Button onClick = {handleStartCaptureClick}>Start Capture</Button>
                )}
                {
                    isActiveWebCam &&
					<Webcam
						audio = {false}
						ref = {webcamRef}
                        //width = {isActiveWebCam ? 360 : 0}
                        //height = {isActiveWebCam ? 240 : 0}
						screenshotFormat = "image/jpeg"
						videoConstraints = {{
                            width: 240,
                            height: 300,
                            facingMode: "user",
                            aspectRatio: 16 / 9
                        }}
					/>
                }
            </Box>
            <Box>
                {
                    isActiveScreen ?
                        <Button
                            onClick = {handleStopScreen}
                        >
                            Stop screen
                        </Button>
                        : <Button
                            //onClick = {handleStartScreen}
                            onClick = {connectWebRtC}
                        >
                            Start screen
                        </Button>
                }
            </Box>

        </>
    );
};

export default Stream;
