import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Container, InputWrapper, Stack } from "./styled";

import { ReactComponent as SearchIcon } from "../images/search-media.svg";

const HomeBody = () => {
  const dispatch = useDispatch();

  const photos = useSelector((state) => state.photos);

  console.log(photos);

  /* useEffect(() => {
    const test = async () => {
      try {
        const response = await httpClient.get("photos");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    test();
  }, []); */

  return (
    <Container size="fullWidth">
      <Container mt="96px">
        <Stack justify="space-between" align="end">
          <h4>Search your photos</h4>
          <p style={{ color: "var(--gray-700)" }}>Requests: 50/50</p>
        </Stack>

        <Box mt="24px">
          <Stack
            width="fit-content"
            bg="gray.900"
            borderRadius="100px"
            border="1px solid"
            borderColor={"gray.700"}
            px="18px"
            style={{ overflowX: "hidden" }}
          >
            <InputWrapper
              placeholder="Search photo"
              border="none"
              pl="0px"
              value="React"
              onChange={() => console.log("Searching photo...")}
            />
            <Button
              rightIcon={<SearchIcon />}
              isLoading={false}
              disabled={false}
              variant="text"
              iconColor="gray.700"
              bg="gray.900"
            />
          </Stack>
        </Box>
      </Container>
    </Container>
  );
};

export default HomeBody;
