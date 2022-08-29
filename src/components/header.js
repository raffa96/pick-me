import { Link } from "react-router-dom";
import { Container, Stack, Button, Box } from "./styled";

import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as CartIcon } from "../images/cart.svg";

const Header = () => {
  return (
    <>
      <Container
        size="fullWidth"
        position="fixed"
        background="gray.800"
        zIndex={999}
      >
        <Stack direction="column" align="center">
          <Container>
            <Stack
              width="100%"
              height={["64px", "72px"]}
              justify="space-between"
              align="center"
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <Logo />
              </Link>
              <Link to="/checkout">
                <Button variant="text">
                  <CartIcon />
                </Button>
              </Link>
            </Stack>
          </Container>
        </Stack>
      </Container>
      <Box height={["64px", "72px"]} width="100%" />
    </>
  );
};

export default Header;
