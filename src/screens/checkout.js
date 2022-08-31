import { useSelector, useDispatch } from "react-redux";

import { cleanCart, removeFromCart } from "../redux/reducers/cartSlice";

import { Formik } from "formik";
import * as Yup from "yup";

import { RiDeleteBack2Fill } from "react-icons/ri";

import Layout from "../components/layout";
import {
  Box,
  Button,
  Container,
  InputWrapper,
  Stack,
} from "../components/styled";

const Checkout = () => {
  const { cart, total } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const initialValues = {
    firstName: "",
    lastName: "",
    creditCard: "",
    address: "",
    civic: "",
    zip: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(4, "Too short! You must enter at least 4 characters.")
      .max(40, "Too long! You must enter at most 40 characters.")
      .required("firstName is required!"),
    lastName: Yup.string()
      .min(4, "Too short! You must enter at least 4 characters.")
      .max(40, "Too long! You must enter at most 40 characters.")
      .required("lastName is required!"),
    creditCard: Yup.string()
      .min(16, "Too short! You must enter at least 16 characters.")
      .max(16, "Too long! You must enter at most 16 characters.")
      .required("creditCard is required!"),
    address: Yup.string()
      .min(10, "Too short! You must enter at least 10 characters.")
      .max(60, "Too long! You must enter at most 60 characters.")
      .required("address is required!"),
    civic: Yup.number()
      .max(9999, "Can't be greater than 9999")
      .positive("You must enter a positive number.")
      .moreThan(0, "You must enter a positive number.")
      .required("civic is required!"),
    zip: Yup.string()
      .min(5, "Too short! You must enter at least 5 characters.")
      .max(5, "Too long! You must enter at most 5 characters.")
      .required("zip is required!"),
  });

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
                          rightIcon={<RiDeleteBack2Fill size={24} />}
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

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  setTimeout(() => {
                    alert(JSON.stringify(values));
                    setSubmitting(false);
                  }, 1000);
                }}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  isValid,
                  touched,
                  dirty,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Stack direction="column" spacing="36px">
                      <Stack justify="space-between" align="center">
                        <Box>
                          <InputWrapper
                            width="200px"
                            id="firstName"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            borderColor={
                              errors.firstName ? "var(--error)" : "initial"
                            }
                            placeholder="First Name"
                          />
                          {touched.firstName && errors.firstName ? (
                            <p
                              style={{
                                color: "var(--error)",
                                marginTop: "6px",
                                fontSize: "8px",
                                textAlign: "right",
                              }}
                            >
                              {errors.firstName}
                            </p>
                          ) : (
                            <div style={{ height: "8px" }}></div>
                          )}
                        </Box>

                        <Box>
                          <InputWrapper
                            width="200px"
                            id="lastName"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            borderColor={
                              errors.lastName ? "var(--error)" : "initial"
                            }
                            placeholder="Last Name"
                          />
                          {touched.lastName && errors.lastName ? (
                            <p
                              style={{
                                color: "var(--error)",
                                marginTop: "6px",
                                fontSize: "8px",
                                textAlign: "right",
                              }}
                            >
                              {errors.lastName}
                            </p>
                          ) : (
                            <div style={{ height: "8px" }}></div>
                          )}
                        </Box>
                      </Stack>

                      <Box width="100%">
                        <InputWrapper
                          width="100%"
                          id="creditCard"
                          name="creditCard"
                          value={values.creditCard}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          borderColor={
                            errors.creditCard ? "var(--error)" : "initial"
                          }
                          placeholder="Credit Card"
                        />
                        {touched.creditCard && errors.creditCard ? (
                          <p
                            style={{
                              color: "var(--error)",
                              marginTop: "6px",
                              fontSize: "8px",
                              textAlign: "right",
                            }}
                          >
                            {errors.creditCard}
                          </p>
                        ) : (
                          <div style={{ height: "8px" }}></div>
                        )}
                      </Box>

                      <Stack spacing="10px" align="center">
                        <Box>
                          <InputWrapper
                            width="200px"
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            borderColor={
                              errors.address ? "var(--error)" : "initial"
                            }
                            placeholder="Address"
                          />
                          {touched.address && errors.address ? (
                            <p
                              style={{
                                color: "var(--error)",
                                marginTop: "6px",
                                fontSize: "8px",
                                textAlign: "right",
                              }}
                            >
                              {errors.address}
                            </p>
                          ) : (
                            <div style={{ height: "8px" }}></div>
                          )}
                        </Box>

                        <Box>
                          <InputWrapper
                            width="100px"
                            id="civic"
                            name="civic"
                            value={values.civic}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            borderColor={
                              errors.civic ? "var(--error)" : "initial"
                            }
                            placeholder="Civic"
                          />
                          {touched.civic && errors.civic ? (
                            <p
                              style={{
                                color: "var(--error)",
                                marginTop: "6px",
                                fontSize: "8px",
                                textAlign: "right",
                              }}
                            >
                              {errors.civic}
                            </p>
                          ) : (
                            <div style={{ height: "8px" }}></div>
                          )}
                        </Box>

                        <Box>
                          <InputWrapper
                            width="100px"
                            id="zip"
                            name="zip"
                            value={values.zip}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            borderColor={
                              errors.zip ? "var(--error)" : "initial"
                            }
                            placeholder="Zip"
                          />
                          {touched.zip && errors.zip ? (
                            <p
                              style={{
                                color: "var(--error)",
                                marginTop: "6px",
                                fontSize: "8px",
                                textAlign: "right",
                              }}
                            >
                              {errors.zip}
                            </p>
                          ) : (
                            <div style={{ height: "8px" }}></div>
                          )}
                        </Box>
                      </Stack>
                      <Stack justify="space-between" align="center">
                        <h2>{total} €</h2>
                        <Button
                          type="submit"
                          variant={
                            isSubmitting || !isValid || !dirty
                              ? "disabled"
                              : "contained"
                          }
                          size="md"
                          disabled={isSubmitting}
                        >
                          Proceed to purchase
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
                )}
              </Formik>
            </Box>
          </Stack>
        </Container>
      </Container>
    </Layout>
  );
};

export default Checkout;
