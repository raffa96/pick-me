import { useCallback, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchData,
  saveSearch,
  updateCurrentPage,
} from "../redux/reducers/photosSlice";

import Layout from "../components/layout";
import Paginator from "../components/paginator";
import { Container, Stack } from "../components/styled";
import { rowalizer } from "../utils/helpers";
import PhotoSection from "../components/photo-section";

const Paginated = () => {
  const { page } = useParams();

  const dispatch = useDispatch();

  const {
    search: { query, itemPerPage, path, type },
    error,
    loading,
    photos,
  } = useSelector((state) => state.photos);

  const [itemForPage, setItemForPage] = useState(itemPerPage);

  const fetchPaginatedData = useCallback(() => {
    dispatch(updateCurrentPage(page));
    dispatch(fetchData(`${path}&page=${page}&per_page=${itemForPage}`));
    dispatch(saveSearch({ query, itemPerPage: itemForPage, path, type }));
  }, [dispatch, page, itemForPage, path, type, query]);

  useEffect(() => {
    fetchPaginatedData();
  }, [fetchPaginatedData]);

  return (
    <Layout>
      <Container mt="72px">
        <Stack direction="column" spacing="118px">
          {!loading && !error.status && photos.length > 0 ? (
            rowalizer(photos).map((row, index) => (
              <PhotoSection key={`photos-section-${index}`} row={row} />
            ))
          ) : !loading && error.status ? (
            <h3>
              {error.message && error.message.length > 0
                ? error.message.join(" ")
                : "Something went wrong! Try again later."}
            </h3>
          ) : (
            <h3>Loading...</h3>
          )}

          <Stack justify="flex-end">
            <p style={{ color: "var(--gray-700)" }}>
              Item per Page
              <select
                value={itemForPage}
                onChange={({ target }) => setItemForPage(+target.value)}
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
    </Layout>
  );
};

export default Paginated;
