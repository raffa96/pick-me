import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchPhotos } from "../redux/reducers/photosSlice";

import { Box, Button, Container, InputWrapper, Stack } from "./styled";

import { ReactComponent as SearchIcon } from "../images/search-media.svg";

const HomeBody = () => {
  const dispatch = useDispatch();

  const { photos, error, loading, rateLimit } = useSelector(
    (state) => state.photos
  );

  const [itemPerPage, setItemPerPage] = useState(12);

  useEffect(() => {
    dispatch(fetchPhotos("photos"));
  }, [dispatch]);

  return (
    <Container size="fullWidth">
      <Container mt="96px">
        <Stack justify="space-between" align="end">
          <h4>Search your photos</h4>
          <p style={{ color: "var(--gray-700)" }}>
            Requests Available: {rateLimit.remaining}/{rateLimit.total}
          </p>
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

        <Container mt="72px">
          <Stack direction="column" spacing="118px">
            {!loading && !error.status && photos.length > 0 ? (
              <p>Photos</p>
            ) : !loading && error.status ? (
              error.message && error.message.length > 0 ? (
                error.message.join(" ")
              ) : (
                "Error"
              )
            ) : (
              <h3>Loading...</h3>
            )}

            <Stack justify="flex-end">
              <p style={{ color: "var(--gray-700)" }}>
                Item per Page
                <select
                  value={itemPerPage}
                  onChange={({ target }) => setItemPerPage(+target.value)}
                >
                  {Array.from({ length: 7 }, (_, index) => {
                    return (index + 1) * 3;
                  }).map((item) => {
                    return (
                      <option key={`option-${item}`} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </p>
            </Stack>
          </Stack>
        </Container>
      </Container>
    </Container>
  );
};

export default HomeBody;
