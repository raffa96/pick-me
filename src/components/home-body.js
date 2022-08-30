import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchData,
  saveSearch,
  updateCurrentPage,
  catchError,
} from "../redux/reducers/photosSlice";
import { rowalizer } from "../utils/helpers";

import { Box, Button, Container, InputWrapper, Stack } from "./styled";
import PhotoSection from "./photo-section";

import { ReactComponent as SearchIcon } from "../images/search-media.svg";
import Paginator from "./paginator";

const HomeBody = () => {
  const dispatch = useDispatch();

  const { photos, error, loading, rateLimit, search } = useSelector(
    (state) => state.photos
  );

  const [itemPerPage, setItemPerPage] = useState(search.itemPerPage || 12);

  const [query, setQuery] = useState(search.query || "");

  const fetchPhotos = (type = "latest", page = 1) => {
    let apiURL = null;

    if (type === "search") {
      if (query && query.trim().length > 1 && query !== " ") {
        apiURL = `search/photos?query=${query}&`;
      } else {
        dispatch(catchError(["Please enter a valid search query"]));
        return;
      }
    } else {
      apiURL = "photos?";
    }

    dispatch(updateCurrentPage(page));

    dispatch(fetchData(`${apiURL}page=${page}&per_page=${itemPerPage}`));

    dispatch(
      saveSearch({
        path: apiURL.trim(),
        itemPerPage,
        type,
        query,
      })
    );
  };

  const searchPhotos = () => fetchPhotos("search");

  useEffect(() => {
    if (!search.query) {
      fetchPhotos();
    } else {
      fetchPhotos(search.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemPerPage]);

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
            borderColor={error.status ? "error" : "gray.700"}
            px="18px"
            style={{ overflowX: "hidden" }}
          >
            <InputWrapper
              placeholder="Search photo"
              border="none"
              pl="0"
              value={query}
              onChange={({ target }) => setQuery(target.value)}
            />
            <Button
              rightIcon={<SearchIcon />}
              isLoading={false}
              disabled={false}
              variant="text"
              iconColor="gray.700"
              bg="gray.900"
              onClick={() => searchPhotos()}
            />
          </Stack>
        </Box>

        <Container mt="72px">
          <Stack direction="column" spacing="118px">
            {!loading && !error.status && photos.length > 0 ? (
              rowalizer(photos).map((row, index) => {
                return (
                  <PhotoSection key={`photos-section-${index}`} row={row} />
                );
              })
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
        <Paginator />
      </Container>
    </Container>
  );
};

export default HomeBody;
