import { Container } from "../components/styled";

import Layout from "../components/layout";
import Hero from "../components/hero";
import HomeBody from "../components/home-body";

const Home = () => {
  return (
    <Layout>
      <Container size="fullWidth">
        <Hero />
        <HomeBody />
      </Container>
    </Layout>
  );
};

export default Home;
