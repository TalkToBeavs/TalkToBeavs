import { keyframes } from '@emotion/react';

const slide = keyframes`
      0% {
            opacity: 0;
            scale: 0.5;
            transform: translate3d(0, 100%, 0);
            transform-origin: 50% 0;
            transform-style: preserve-3d;
            transform-box: fill-box;
      }

      1% {
            opacity: 0.3;
            scale: 0.6;
      }

      50% {
            opacity: 0.5;
            scale: 1.2;
      }

      100% {
            opacity: 1;
            scale: 1;
            transform: translate3d(0, 0, 0);
      }
`;
const slideAnimation = `${slide} 1s ease-in-out`;

const popIn = keyframes`
      0% {
            opacity: 0;
            transform: scale(0.5);
            
      }

      1% {
            opacity: 0;
            transform: scale(0.6);
            transform-origin: 50% 0;
            transform-style: preserve-3d;
            transform-box: fill-box;
            transform: translate3d(0, 0, 0);
            transform: translate3d(0, 100%, 0);
      }

      50% {
            opacity: 0.5;
            transform: scale(1.2);
      }

      100% {
            opacity: 1;
            transform: scale(1);
      }
`;

const popInAnimation = `${slide} 1.4s ease-in-out`;

// transform: translate3d(0, 100%, 0);
const comeFromLeft = keyframes`
      0% {
            opacity: 0;
            scale: 0.5;
            transform-origin: 50% 0;
            transform-style: preserve-3d;
            transform-box: fill-box;

            transform: translate3d(80%, 0, 0);
      }

      1% {
            opacity: 0.5;
            scale: 0.6;
      }

      25% {
            opacity: 0.7;
            scale: 1.2;
      }


      100% {
            opacity: 1;
            scale: 1;
            transform: translate3d(0, 0, 0);
      }

`;

const comeFromLeftAnimation = `${comeFromLeft} 2.2s ease-in-out`;

export { slideAnimation, popInAnimation, comeFromLeftAnimation };
