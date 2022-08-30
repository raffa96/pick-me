import { useSelector, useDispatch } from "react-redux";

import { cleanCart, removeFromCart } from "../redux/reducers/cartSlice";

import Layout from "../components/layout";
import {
  Box,
  Button,
  Container,
  InputWrapper,
  Stack,
} from "../components/styled";

import { ReactComponent as DeleteBackIcon } from "../images/small-right-arrow.svg";

const Checkout = () => {
  const { cart, total } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <Layout>
      <Container size="fullWidth" mb="118px">
        <Container mt="96px">
          <Box>
            <h1>Cart</h1>
          </Box>
          <Stack justify="space-between" align="start" spacing="64px" mt="72px">
            <Stack direction="column" spacing="48px" flex="1 1 auto">
              <Stack justify="flex-end">
                <Button
                  variant="text"
                  size="sm"
                  onClick={() => dispatch(cleanCart())}
                >
                  Remove all
                </Button>
              </Stack>
              {cart && cart.length > 0 ? (
                cart.map((item) => {
                  return (
                    <Box key={item.id}>
                      <Stack justify="space-between" align="start">
                        <Stack spacing="24px">
                          <Box
                            position="relative"
                            overflow="hidden"
                            maxWidth="160px"
                            maxHeight="90px"
                            borderRadius="4px"
                            width="100%"
                            height="100%"
                            transform="translateZ(0)"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <img
                              src={item.url}
                              alt={item.alt_description}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                          <Stack
                            direction="column"
                            align="start"
                            justify="space-between"
                          >
                            <Box color="purple.300">
                              <h5>Category</h5>
                            </Box>
                            <Box>
                              <h6 style={{ color: "gray.700" }}>Artist</h6>
                              <p>Title | {item.likes} €</p>
                            </Box>
                          </Stack>
                        </Stack>
                        <Button
                          variant="text"
                          size="md"
                          rightIcon={<DeleteBackIcon size={24} />}
                          iconColor="purple.300"
                          onClick={() => dispatch(removeFromCart(item))}
                        />
                      </Stack>
                    </Box>
                  );
                })
              ) : (
                <h4>No items in cart</h4>
              )}
            </Stack>

            <Box
              border="1px solid"
              borderColor="gray.700"
              borderRadius="8px"
              px="36px"
              py="56px"
              bg="gray.900"
              maxWidth="534px"
            >
              <Box mb="36px">
                <h3>Payment data</h3>
              </Box>

              <form>
                <Stack direction="column" spacing="36px">
                  <Stack justify="space-between" align="center">
                    <InputWrapper width="200px" placeholder="First Name" />
                    <InputWrapper width="200px" placeholder="Last Name" />
                  </Stack>
                  <InputWrapper placeholder="Credit Card" />
                  <Stack spacing="10px" align="center">
                    <InputWrapper width="200px" placeholder="Address" />
                    <InputWrapper width="100px" placeholder="Civic" />
                    <InputWrapper width="100px" placeholder="Zip" />
                  </Stack>
                  <Stack justify="space-between" align="center">
                    <h4>{total} €</h4>
                    <Button type="submit" variant="contained" size="md">
                      Proceed to purchase
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Container>
      </Container>
    </Layout>
  );
};

export default Checkout;
