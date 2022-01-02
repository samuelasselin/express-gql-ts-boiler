import { Container } from "../components/Container";
import NavBar from "../components/NavBar";
import { useIsAuth } from "../utils/useIsAuth";

const Index = () => {
  useIsAuth();

  return (
    <>
      <NavBar />
      <Container height="100vh">
        <h1>Hello world</h1>
      </Container>
    </>
  );
};

export default Index;
