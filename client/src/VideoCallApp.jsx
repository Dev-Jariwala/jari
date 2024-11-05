import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const socket = io('http://localhost:3000');

function VideoCallApp() {
    const { roomID } = useParams();
    const [stream, setStream] = useState(null);
    const userVideo = useRef();
    const peerVideo = useRef();
    const peerRef = useRef();

    useEffect(() => {
        // Join the specific room
        socket.emit('join-room', roomID);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
                userVideo.current.srcObject = stream;
            });

        socket.on('offer', (data) => {
            const peer = new SimplePeer({ initiator: false, trickle: false, stream });
            peer.on('signal', (signal) => {
                socket.emit('answer', { signal, roomID });
            });
            peer.on('stream', (remoteStream) => {
                peerVideo.current.srcObject = remoteStream;
            });
            peer.signal(data);
            peerRef.current = peer;
        });

        return () => {
            socket.disconnect();
        };
    }, [roomID]);

    const callUser = () => {
        const peer = new SimplePeer({ initiator: true, trickle: false, stream });
        peer.on('signal', (signal) => {
            socket.emit('offer', { signal, roomID });
        });
        peer.on('stream', (remoteStream) => {
            peerVideo.current.srcObject = remoteStream;
        });
        peerRef.current = peer;
    };

    return (
        <div>
            <video ref={userVideo} autoPlay playsInline muted />
            <video ref={peerVideo} autoPlay playsInline />
            <button onClick={callUser}>Call User</button>
        </div>
    );
}

export default VideoCallApp;
