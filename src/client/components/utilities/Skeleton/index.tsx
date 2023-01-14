import React from 'react';
import styled, { keyframes } from 'styled-components';

interface ISkeleton {
  className?: string;
  height?: string;
  width?: string;
}

const animateShimmer = () => keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const Shimmer = styled.div.attrs(
  (props: { height: string; width: string }) => ({
    height: props.height || '10px',
    width: props.width || '100%',
  }),
)`
  background-color: #dfe4e8;
  display: inline-block;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  overflow: hidden;
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(0.25turn, transparent, #ffffff, transparent),
      linear-gradient(#dfe4e8, #dfe4e8),
      radial-gradient(38px circle at 19px 19px, #dfe4e8 50%, transparent 51%),
      linear-gradient(#dfe4e8, #dfe4e8);
    background-repeat: no-repeat;
    animation: ${animateShimmer} 2s infinite;
    content: '';
  }
`;

const Skeleton = (props: ISkeleton) => (
  <Shimmer
    height={props.height}
    width={props.width}
    className={props.className}
  />
);

export default Skeleton;
