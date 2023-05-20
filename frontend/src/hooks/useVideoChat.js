import { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';

const SOCKET_SERVER_URL = 'wss://talk-to-beavs.herokuapp.com';
const SDP_EVENT = 'sdp';
const CANDIDATE_EVENT = 'candidate';

function useVideoChat(roomId) {
  const [connected, setConnected] = useState(false);
  const [peerConnected, setPeerConnected] = useState(false);

  const [hasOffer, setHasOffer] = useState(true);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [status, setStatus] = useState('Not Connected');

  const [name, setName] = useState('A Random Beaver');

  const peer = useRef(null);
  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const socketRef = useRef();

  const options = {
    audio: true,
    video: true,
  };

  const createOffer = async () => {
    let config = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    };
    try {
      let sdp = await peer.current.createOffer(config);
      handleSDP(sdp);
      setHasOffer(false);
    } catch (err) {
      console.log(err);
    }
  };

  const createAnswer = async () => {
    let config = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    };
    try {
      let sdp = await peer.current.createAnswer(config);
      handleSDP(sdp);
      setHasAnswer(false);
      setStatus('Connected!');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSDP = (sdp) => {
    peer.current.setLocalDescription(sdp);
    socketRef.current.emit('sdp', { sdp });
    sendToPeer('sdp', sdp);
  };

  const sendToPeer = (eventType, payload) => {
    socketRef.current.emit(eventType, payload);
  };

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on('connection', (data) => {
      console.log('connected to server');
    });

    socketRef.current.on('sdp', (data) => {
      peer.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
      if (data.sdp.type === 'offer') {
        setHasOffer(false);
        createAnswer();
        setPeerConnected(true);
        setStatus('Joined!');
        setConnected(true);
        // createAnswer();
      }
    });

    socketRef.current.on('candidate', (candiate) => {
      peer.current.addIceCandidate(new RTCIceCandidate(candiate));
      socketRef.current.emit('name', { name: name });
    });

    const peerConnection = new RTCPeerConnection();

    navigator.mediaDevices
      .getUserMedia(options)
      .then((stream) => {
        localStream.current.srcObject = stream;
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    peerConnection.onicecandidate = (e) => {
      if (e.candidate) {
        sendToPeer('candidate', e.candidate);
      }
    };

    peerConnection.ontrack = (e) => {
      remoteStream.current.srcObject = e.streams[0];
    };

    peerConnection.onnegotiationneeded = (e) => {
      if (peerConnection.signalingState !== 'stable') {
        return;
      }

      console.log('Negotiation Needed');

      // if (hasOffer) {
      //   createOffer();
      // }
      // if (hasAnswer) {
      //   createAnswer();
      // }
    };

    peerConnection.oniceconnectionstatechange = (e) => {
      if (peerConnection.iceConnectionState === 'disconnected') {
        console.log('Disconnected');
        setConnected(false);
        setStatus('Disconnected');
        setPeerConnected(false);
      }

      if (peerConnection.iceConnectionState === 'connected') {
        console.log('Connected');
      }

      if (peerConnection.iceConnectionState === 'failed') {
        console.log('Failed');
      }

      if (peerConnection.iceConnectionState === 'closed') {
        console.log('Closed');
      }

      if (peerConnection.iceConnectionState === 'new') {
        console.log('New');
      }

      if (peerConnection.iceConnectionState === 'checking') {
        console.log('Checking');
      }

      if (peerConnection.iceConnectionState === 'completed') {
        console.log('Completed');
      }
    };

    peer.current = peerConnection;

    return () => {
      // Close the peer connection
      peer.current.close();

      // Close the socket connection
      socketRef.current.close();

      // Disconnect from the server
      socketRef.current.disconnect();

      setStatus('Disconnected');
      setConnected(false);
      setPeerConnected(false);
    };
  }, [roomId]);

  return {
    localStream,
    remoteStream,
    createOffer,
    createAnswer,
    status,
    socketRef,
    hasOffer,
    hasAnswer,
    setStatus,
    connected,
    peerConnected,
    name,
  };
}

export default useVideoChat;
