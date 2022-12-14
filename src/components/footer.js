import { Container, Stack, Box } from "./styled";

import { ReactComponent as Logo } from "../images/logo-footer.svg";

const Footer = () => {
  return (
    <Container size="fullWidth" mt={["24px", "72px"]} pb="72px">
      <Container>
        <Stack width="100%" justify="flex-start">
          <Stack align="start" spacing="20px">
            <Box>
              <Logo />
            </Box>
            <Stack
              direction="column"
              align="start"
              height="100%"
              spacing="20px"
            >
              <Box>pick me</Box>
              <Box color="gray.600">Lorem ipsum dolor sit.</Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Container>
  );
};

export default Footer;
