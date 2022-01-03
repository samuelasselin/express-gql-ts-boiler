import React from "react";
import { Container } from "../components/Container";
import NavBar from "../components/NavBar";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container height="100vh">{children}</Container>
    </>
  );
};
