import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { Button, Container, Stack } from "./styled";

import { ReactComponent as LeftIcon } from "../images/left-arrow.svg";
import { ReactComponent as RightIcon } from "../images/right-arrow.svg";

const Paginator = () => {
  const { currentPage, hasPrevPage, hasNextPage } = useSelector(
    (state) => state.photos.pagination
  );

  const definePaginationFlex = () => {
    if (!hasNextPage && hasPrevPage) return "flex-start";

    if (hasNextPage && !hasPrevPage) return "flex-end";

    return "space-between";
  };

  return (
    <Container size="fullWidth" mt="96px">
      <Container>
        <Stack justify={definePaginationFlex()} align="center" width="100%">
          {hasPrevPage && (
            <Link
              to={
                parseInt(currentPage, 10) === 2
                  ? "/"
                  : `/photo/${parseInt(currentPage, 10) - 1}`
              }
              style={{ textDecoration: "none" }}
            >
              <Button
                size="md"
                variant="outlined"
                leftIcon={<LeftIcon />}
                iconColor="purple.300"
              >
                Prev
              </Button>
            </Link>
          )}

          {hasNextPage && (
            <Link
              to={`/photo/${parseInt(currentPage, 10) + 1}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                size="md"
                variant="outlined"
                rightIcon={<RightIcon />}
                iconColor="purple.300"
              >
                Next
              </Button>
            </Link>
          )}
        </Stack>
      </Container>
    </Container>
  );
};

export default Paginator;
