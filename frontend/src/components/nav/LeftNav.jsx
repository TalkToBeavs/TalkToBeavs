import ThemeToggle from "@/components/layout/ThemeToggle";
import { TalkToBeavsMobile } from "@/components/text/TalkToBeavs";
import {
    Box,
    Button,
    HStack
} from "@chakra-ui/react";
import React from "react";
import {
    AiOutlineHome,
    AiOutlineProfile,
    AiOutlineUser
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function LeftNav() {
    const user = useSelector((state) => state.user.data);
    const email = user ? user.email : "";
    const navigate = useNavigate();
    return (
        <HStack display="flex" spacing={3} alignItems="center">
            <HStack
                spacing={3}
                display={{
                    base: "none",
                    md: "inline-flex",
                }}
            >
                <Box>
                    <TalkToBeavsMobile />
                </Box>
                <Button
                    variant="ghost"
                    leftIcon={<AiOutlineHome />}
                    size="sm"
                    onClick={() => {
                        if (!user) return;
                        navigate("/home");
                    }}
                >
                    Home
                </Button>
                <Button
                    variant="ghost"
                    leftIcon={<AiOutlineUser />}
                    size="sm"
                    onClick={() => {
                        if (!user) return;
                        navigate(`/profile/${email.split("@")[0]}`);
                    }}
                >
                    Profile
                </Button>
                <Button
                    variant="ghost"
                    leftIcon={<AiOutlineProfile />}
                    size="sm"
                    onClick={() => {
                        if (!user) return;
                        navigate("/feed");
                    }}
                >
                    Feed
                </Button>
                <Box
                    display={{
                        base: "none",
                        md: "inline-flex",
                        lg: "none",
                    }}
                >
                    <ThemeToggle />
                </Box>
            </HStack>
        </HStack>
    )
}