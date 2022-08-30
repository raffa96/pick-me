import { useState } from "react";

import styled from "styled-components";

import { Box, Button, Skeleton, Stack } from "./styled";

import { ReactComponent as ColoredCart } from "../images/purple-cart.svg";
import { addSingleItemToCart } from "../redux/reducers/cartSlice";
import { useDispatch } from "react-redux";

const Card = styled(Box)`
  &:hover {
    .card-action {
      opacity: 1;
      visibility: visible;
      transform: rotateX(0deg);
      height: 100% !important;
    }
  }

  .card-action {
    opacity: 0;
    visibility: hidden;
    transition: all 125ms linear;
    transform: rotateX(-90deg);
    height: 0 !important;
    overflow: hidden;
  }
`;

const Photo = ({ alt_description, urls: { full }, likes, id }) => {
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);

  return (
    <Card
      maxWidth="367px"
      height="343px"
      width="calc(100%)"
      borderRadius="4px 4px 0 0"
      overflowX="hidden"
      position="relative"
      style={{ transform: "translateZ(0)" }}
    >
      <Box width="100%" height="100%">
        <img
          src={full}
          alt={alt_description}
          width="100%"
          height="100%"
          style={{ display: loaded ? "block" : "none", objectFit: "cover" }}
          onLoad={() => setLoaded(true)}
        />
        <Skeleton
          width="100%"
          height="100%"
          style={{ display: loaded ? "none" : "block" }}
        />
      </Box>
      <Box
        className="card-action"
        position="absolute"
        bottom="0"
        width="100%"
        maxHeight="72px"
        bg="white"
      >
        <Stack
          justify="space-between"
          align="center"
          width="100%"
          height="100%"
          px="20px"
        >
          <p style={{ color: "var(--gray-800)" }}>{likes} €</p>
          <Button
            variant="text"
            rightIcon={<ColoredCart />}
            iconColor="purple.300"
            onClick={() =>
              dispatch(
                addSingleItemToCart({ id, likes, url: full, alt_description })
              )
            }
          />
        </Stack>
      </Box>
    </Card>
  );
};

export default Photo;
