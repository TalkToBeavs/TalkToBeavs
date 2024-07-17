import { useNavigate } from 'react-router-dom';
import TalkToBeavs from '../../components/text/TalkToBeavs';
import SVGComponent from '../../assets/logo';
import { motion } from 'framer-motion';
import {
  comeFromLeftAnimation,
  comeFromTopAnimation,
  comeFromBottomAnimation,
} from '../../lib/animations/index';
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  useMediaQuery,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import Footer from '../../components/landing/Footer';
import Hero from '../../components/landing/Hero';
import CTA from '../../components/landing/CTA';
import Features from '../../components/landing/Features';
import Preview from '../../components/landing/Preview';
import FAQ from '../../components/landing/FAQ';
import Offerings from '../../components/landing/Offerings';

export default function Landing() {
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const text = `Stay connected with all of your peers. Make new friends. Get help with your classes. Welcome to TalkToBeavs.`;

  const letters = Array.from(text);

  return (
    <>
      <Hero />
      <Preview />
      <Features />
      <Offerings />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
