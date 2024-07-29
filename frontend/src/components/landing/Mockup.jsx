import darkMock from '@/assets/darkmock.png';
import lightMock from '@/assets/lightmock.png';
import { Image, useColorMode } from '@chakra-ui/react';

export default function Mockup() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Image
        borderRadius='lg'
        src={colorMode === 'light' ? lightMock : darkMock}
        alt='TalkToBeavs Mockup'
      />
    </>
  );
}
