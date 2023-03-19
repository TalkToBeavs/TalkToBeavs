import { keyframes } from '@emotion/react';

const slide = keyframes`
      0% {
            opacity: 0;
            transform: translate3d(0, 200%, 0);
      }

      50% {
            opacity: 0.5;
            transform: translate3d(0, 0, 0);
      }

      100% {
            opacity: 1;

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
            transform: translate3d(-100%, 0, 0);
      }

      50% {
            opacity: 0.5;
            transform: translate3d(0, 0, 0);
      }

      100% {
            opacity: 1;

            transform: translate3d(0, 0, 0);
      }


`;

const comeFromLeftAnimation = `${comeFromLeft} 3.0s ease-in-out`;

const comeFromRight = keyframes`
      0% {
            opacity: 0;
            transform: translate3d(150%, 0, 0);
      }

      50% {
            opacity: 0.5;
            transform: translate3d(0, 0, 0);
      }

      100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
      }

      `;
const comeFromRightAnimation = `${comeFromRight} 3.0s ease-in-out`;

const comeFromTop = keyframes`
      0% {
            opacity: 0;
            transform: translate3d(0, -150%, 0);
      }

      50% {
            opacity: 0.5;
            transform: translate3d(0, 0, 0);
      }

      100% {
            opacity: 1;

            transform: translate3d(0, 0, 0);
      }

      `;

const comeFromTopAnimation = `${comeFromTop} 2.4s ease-in-out`;

const comeFromBottom = keyframes`
      0% {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
      }

      50% {
            opacity: 0.5;

            transform: translate3d(0, 0, 0);
      }

      100% {
            opacity: 1;

            transform: translate3d(0, 0, 0);
      }

      `;

const comeFromBottomAnimation = `${comeFromBottom} 2.4s ease-in-out`;

const fadeIntoView = keyframes`
      0% {
            opacity: 0;
            scale: 0.5;
            color: #DE6a1f;
      }

      50% {
            opacity: 0.5;
            scale: 1.2;
            color: #DE6a1f;
      }

      100% {
            opacity: 1;
            scale: 1;
      }


      `;

const fadeIntoViewAnimation = `${fadeIntoView} 1.8s ease-in-out`;

const pulseLoaderLoop = keyframes`
      0% {
            transform: scale(1);
      }

      50% {
            transform: scale(1.2);
      }

      100% {
            transform: scale(1);
      }
`;

const pulseLoaderAnimation = `${pulseLoaderLoop} 3.5s ease-in-out infinite`;

export {
      slideAnimation,
      popInAnimation,
      comeFromLeftAnimation,
      comeFromRightAnimation,
      comeFromTopAnimation,
      comeFromBottomAnimation,
      fadeIntoViewAnimation,
      pulseLoaderAnimation,
};

