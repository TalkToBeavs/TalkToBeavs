import { useState, useRef, useEffect } from "react";
import { Button, Center, Text, VStack, HStack, Input, Flex, useMediaQuery, Divider, Spinner, useColorModeValue, Box } from "@chakra-ui/react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function VideoChat() {
  const videoStream = useRef(null);
  const remoteStream = useRef(null);
  const peer = useRef(null);
  const { roomId } = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.data);

  const onid = user?.name;
  const [name, setName] = useState("Random User");

  const [hasOffer, setHasOffer] = useState(true);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [status, setStatus] = useState("Not Connected");
  const [isLargerThan768] = useMediaQuery("(min-width: 1068px)");
  const [isMobile] = useMediaQuery("(max-width: 575px)");
  const navigate = useNavigate();

  const options = {
    audio: true,
    video: true,
  };
  
  const socket = io("wss://talk-to-beavs.herokuapp.com", {
    transports: ["websocket"],
    query: {
      roomId
    },
  });

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
    } catch (err) {
      console.log(err);
    }
  };

  const handleSDP = (sdp) => {
    peer.current.setLocalDescription(sdp);
    socket.emit("sdp", { sdp });
    sendToPeer("sdp", sdp);
    console.log(onid)
  };

  const sendToPeer = (eventType, payload) => {
    socket.emit(eventType, payload);
  };

  useEffect(() => {
    socket.on("sdp", (data) => {
      peer.current.setRemoteDescription(new RTCSessionDescription(data.sdp));

      if (data.sdp.type === "offer") {
        setHasOffer(false);
        createAnswer();
      }
    });

    socket.on("name", (data) => {
      setName(data.name);
    });

    socket.on("candidate", (candidate) => {
      peer.current.addIceCandidate(new RTCIceCandidate(candidate));
      socket.emit("name", { name: onid });
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
        sendToPeer("candidate", e.candidate);
      }
    };

    peerConnection.ontrack = (e) => {
      remoteStream.current.srcObject = e.streams[0];
    };

    peerConnection.onnegotiationneeded = (e) => {
      if (peerConnection.signalingState !== "stable") return;
      console.log("Negotiation Needed");
    };

    peerConnection.oniceconnectionstatechange = (e) => {
      if (peerConnection.iceConnectionState === "disconnected") {
        setLoading(true);
        setStatus("Disconnected");
        console.log("Disconnected");
      }

      if (peerConnection.iceConnectionState === "failed") {
        console.log("Failed");
      }

      if (peerConnection.iceConnectionState === "closed") {
        console.log("Closed");
      }

      if (peerConnection.iceConnectionState === "connected") {
        setLoading(false);
        setStatus("Connected!");
        console.log("Connected");
      }
    };

    peer.current = peerConnection;

    return () => {
      setStatus("Disconnected");
      setLoading(true);
      socket.close();
      socket.disconnect();
    };
  }, []);


  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (hasOffer && !hasAnswer) {
        createOffer();
      }
    }, 2000);

    return () => {
      setStatus("Disconnected");
      socket.close();
      socket.disconnect();
      peer.current.close();
    };

  }, []);


  return (
    <Center h={isLargerThan768 ? "100vh" : `${isMobile ? "120vh" : "120vh"}`} w="100vw" bg={useColorModeValue("gray.100", "gray.900")}>
      <VStack spacing={4}>
        <Text fontSize={{
          base: "xl",
          md: "2xl",
        }} fontWeight="bold">
          You are in room: {roomId}
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          {status}
        </Text>
        {loading && <Spinner size="sm" />}
        <Flex direction={isLargerThan768 ? "row" : `${isMobile ? "column" : "row"}`} spacing={4} gap={1} justify="center" align="center">
          <Flex direction="column" justify="center" align="center">
            <Text fontSize="lg" fontWeight="bold">
              {onid}
            </Text>
            <video
              ref={videoStream}
              autoPlay
              muted={isMuted}
              style={{
                height: isLargerThan768 ? "400px" : `${isMobile ? "250px" : "400px"}`,
                border: "1px solid black",
                borderRadius: "10px",
              }}
            />
          </Flex>

          <Flex direction="column" justify="center" align="center">
            <Text fontSize="lg" fontWeight="bold">
              {name ? name : "A Random Beaver"}
            </Text>

            <video
              ref={remoteStream}
              autoPlay
              style={{
                height: isLargerThan768 ? "400px" : `${isMobile ? "250px" : "400px"}`,
                border: "1px solid black",
                borderRadius: "10px",
              }}
            />
          </Flex>
        </Flex>
        <HStack spacing={4}>
          <Button
            colorScheme="blue"
            onClick={() => {
              setIsMuted(!isMuted);
            }}
          >
            {isMuted ? "Unmute" : "Mute"}
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              peer.current.close();
              socket.off();
              socket.disconnect();
              socket.close();
              navigate("/video");
            }}
          >
            End Call
          </Button>
        </HStack>
      </VStack>
    </Center>


  );
}

export default VideoChat;