import React, { useState, useEffect, useRef } from 'react'
import socketIOClient from 'socket.io-client'

const SOCKET_SERVER_URL = 'http://localhost:8080'

function useVideoChat(roomId) {
  const [connected, setConnected] = useState(false)
  const [peerConnected, setPeerConnected] = useState(false)

  const [hasOffer, setHasOffer] = useState(true)
  const [hasAnswer, setHasAnswer] = useState(false)
  const [status, setStatus] = useState("Not Connected")

  const peer = useRef(null);
  const localStream = useRef(null);
  const remoteStream = useRef(null);
  const socketRef = useRef()

  const createOffer = async () => {
    let config = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    };
    try {
      let sdp = await peer.current.createOffer(config);
      handleSDP(sdp);
      setHasOffer(false);
      setStatus("Calling...");
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
      setStatus("Call Accepted!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSDP = (sdp) => {
    peer.current.setLocalDescription(sdp);
    socketRef.current.emit("sdp", { sdp });
    sendToPeer("sdp", sdp);
  };

  const sendToPeer = (eventType, payload) => {
    socket.emit(eventType, payload);
  };

  useEffect(() => {

    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on("connection", (data) => {
      console.log("connected to server");
    });

    socketRef.current.on("sdp", (data) => {
      peer.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
      if (data.sdp.type === "offer") {
        createAnswer();
      }

      if (data.sdp.type === "answer") {
        setHasAnswer(true);
        setStatus("Call Accepted!");
      }

      setPeerConnected(true);

    });

    socketRef.current.on("candidate", (candiate) => {
      console.log("candidate received");
      peer.current.addIceCandidate(new RTCIceCandidate(candiate));
    });


    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
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
        socketRef.current.emit("candidate", { candidate: e.candidate });
      }
    };

    peerConnection.ontrack = (e) => {
      console.log("ontrack");
      remoteStream.current.srcObject = e.streams[0];
    };

    peerConnection.onnegotiationneeded = async () => {
      console.log("onnegotiationneeded");
      try {
        let sdp = await peer.current.createOffer();
        handleSDP(sdp);
      } catch (err) {
        console.log(err);
      }
    };

    peer.current = peerConnection;
  }, [roomId]);


  return {
    connected,
    peerConnected,
    localStream,
    remoteStream,
    status,
  };

}

export default useVideoChat
