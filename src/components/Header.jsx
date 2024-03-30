import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Container data-bs-theme="dark" style={{ margin: "0", padding: "0" }}>
      <Navbar
        bg="dark"
        // data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary"
        style={{ width: "100vw" }}
      >
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Header;
