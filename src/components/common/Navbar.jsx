import { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const history = useHistory();
  const handleMenuClose = () => {
    localStorage.removeItem("token");
    window.location.reload();
    history.push("/signin")
  };

  const FullName = JSON.parse(localStorage.getItem("tovar"));
  console.log(FullName.full_name);

  return (
    <Wrapper>
      <Toolbar>
          <IconButton edge="end" onClick={handleMenuClose} color="inherit">
            <span>{FullName.full_name}</span>
            <AccountCircle />
          </IconButton>
      </Toolbar>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: absolute;
  right: 0;
  display: block;
  span{
    font-size: 15px;
    margin-right: 4px;
  }
`;
