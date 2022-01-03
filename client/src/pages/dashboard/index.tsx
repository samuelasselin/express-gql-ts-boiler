import { Box } from "@chakra-ui/react";
import { Container } from "../../components/Container";
import { Dashboard } from "../../layout/Dashboard";
import { useIsAuth } from "../../utils/useIsAuth";

const Index = () => {
  useIsAuth();
  return (
    <Box>
      <h1>Salut cava</h1>
    </Box>
  );
};

export default Index;

Index.layout = Dashboard;
