import { useState, useRef, useEffect } from 'react';
import { Button, Center, Text, VStack, HStack, Input, Image } from '@chakra-ui/react';
import io from 'socket.io-client';
import ttb from '../../assets/logo.png';

// const socket = io("ws://localhost:8080", {
//   transports: ["websocket"],
// });

/**
 * We're doing manual signaling just to keep things simple.
 * In a real application, you would use a signaling server to exchange the SDP and ICE candidates.
 *
 * The signaling server is a server that is used to exchange data (SDP, ICE Candidates) between two peers.
 **/

function VideoChat() {
  const videoStream = useRef(null);
  const remoteStream = useRef(null);
  const peer = useRef(null);
  const textAreaRef = useRef(null);

  const [hasOffer, setHasOffer] = useState(true);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [status, setStatus] = useState('Not Connected');

  const options = {
    audio: false,
    video: true,
  };

  // const getAccess = async () => {
  //   await navigator.mediaDevices
  //     .getUserMedia(options)
  //     .then((stream) => {
  //       videoStream.current.srcObject = stream;
  //       stream.getTracks().forEach((track) => {
  //         peerConnection.addTrack(track, stream);
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const createOffer = async () => {
    let config = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    };
    try {
      let sdp = await peer.current.createOffer(config);
      handleSDP(sdp);
      setHasOffer(false);
      setStatus('Calling...');
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
      setStatus('Call Accepted!');
    } catch (err) {
      console.log(err);
    }
  };

  // const setRemoteDescription = async () => {
  //   const remoteDescription = JSON.parse(textAreaRef.current.value);
  //   peer.current
  //     .setRemoteDescription(new RTCSessionDescription(remoteDescription))
  //     .then(() => {
  //       console.log("Remote Description Set");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const addCandidate = async () => {
  //   candiates.current.forEach((candidate) => {
  //     peer.current.addIceCandidate(new RTCIceCandidate(candidate));
  //   });
  // };

  const handleSDP = (sdp) => {
    peer.current.setLocalDescription(sdp);
    socket.emit('sdp', { sdp });
    sendToPeer('sdp', sdp);
  };

  const sendToPeer = (eventType, payload) => {
    socket.emit(eventType, payload);
  };

  useEffect(() => {
    socket.on('connection', (data) => {
      console.log('Connected to server');
    });

    socket.on('sdp', (data) => {
      peer.current.setRemoteDescription(new RTCSessionDescription(data.sdp));
      textAreaRef.current.value = JSON.stringify(data.sdp, null, 2);

      if (data.sdp.type === 'offer') {
        setHasOffer(false);
        setHasAnswer(true);
        setStatus('Incoming Call...');
      } else {
        setStatus('Connected!');
      }
    });

    socket.on('candidate', (candidate) => {
      // candiates.current = [...candiates.current, candidate];
      peer.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    const peerConnection = new RTCPeerConnection();

    navigator.mediaDevices
      .getUserMedia(options)
      .then((stream) => {
        videoStream.current.srcObject = stream;
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
      if (peerConnection.signalingState !== 'stable') return;
      console.log('Negotiation Needed');
    };

    peerConnection.oniceconnectionstatechange = (e) => {
      if (peerConnection.iceConnectionState === 'disconnected') {
        console.log('Disconnected');
      }

      if (peerConnection.iceConnectionState === 'failed') {
        console.log('Failed');
      }

      if (peerConnection.iceConnectionState === 'closed') {
        console.log('Closed');
      }

      if (peerConnection.iceConnectionState === 'connected') {
        console.log('Connected');
      }
    };

    peer.current = peerConnection;
  }, []);

  const buttonToRender = () => {
    if (hasOffer && !hasAnswer) {
      return (
        <Button onClick={() => createOffer()} colorScheme='blue'>
          Call
        </Button>
      );
    }

    if (!hasOffer && hasAnswer) {
      return (
        <Button onClick={() => createAnswer()} colorScheme='blue'>
          Answer
        </Button>
      );
    }
  };

  return (
    <Center>
      <VStack>
        <Image src={ttb} alt='ttb logo' h={200} />
        <HStack>
          <Button onClick={() => getAccess()}>Get Media Devices</Button>
        </HStack>
        <HStack>
          <video
            style={{
              width: '600px',
              height: '600px',
              border: '1px solid black',
              borderRadius: '10px',
              backgroundColor: 'black',
              margin: '10px',
            }}
            ref={videoStream}
            autoPlay
          />
          <video
            style={{
              width: '600px',
              height: '600px',
              border: '1px solid black',
              borderRadius: '10px',
              backgroundColor: 'black',
              margin: '10px',
            }}
            ref={remoteStream}
            autoPlay
          />
        </HStack>
        <Input ref={textAreaRef} my={16} bg={'gray'} p={8} />
        <VStack pt={12}>
          {buttonToRender()}
          <Text fontSize='2xl'>{status}</Text>
        </VStack>
      </VStack>
    </Center>
  );
}

export default VideoChat;
