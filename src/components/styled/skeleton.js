import styled, { keyframes } from "styled-components";
import { variant } from "styled-system";

import Box from "./box";

const waveKeyframes = keyframes`
    0% {
        transform: translateX(-100%)
    }
    50% {
        transform: translateX(100%)
    }
    100% {
        transform: translateX(100%)
    }
`;

const WaveBox = styled(Box)`
  &::after {
    animation: ${waveKeyframes} 1.5s linear 0.5s infinite;
  }
`;

const SkeletonBox = styled(WaveBox)(
  variant({
    variants: {
      circle: {
        borderRadius: "50%",
      },
      rect: {},
    },
  }),
  {
    position: "relative",
    overflow: "hidden",
    "::after": {
      content: "''",
      background:
        "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.04), transparent)",
      position: "absolute",
      transform: "translateX(-100%)",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  }
);

SkeletonBox.defaultProps = { backgroundColor: "var(--gray-500)" };

const Skeleton = ({ variant = "rect", ...rest }) => {
  return <SkeletonBox variant={variant} {...rest} />;
};

export default Skeleton;
