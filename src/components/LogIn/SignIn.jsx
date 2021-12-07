import { useState, useEffect } from "react";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { SnackbarProvider, useSnackbar } from "notistack";
import styled from "styled-components";
import axios from "axios";

function SignIn() {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({
    furstName: "",
    password: "",
  });

 

  const handleSnacbar = (variant) => () => {
    enqueueSnackbar("Пароль введен неверно !", { variant });
  };
  const handleSnacbarLogin = (variant) => () => {
    enqueueSnackbar("Это имя недоступно !", { variant });
  };
  const FetchProduct = async (e) => {
    e.preventDefault();

    const instance = axios.create({
      baseURL: "http://89.223.71.112:9898/",
    });
    await instance
      .post(
        "signInAdmin",
        { login: data.furstName, password: data.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.data.token));
        localStorage.setItem("tovar", JSON.stringify(res.data.data));
        window.location.href = "/home";
      })
      .catch((err) => {
        if(err.response.data.code === 50027){
          handleSnacbar("error")();
        }
        else if(err.response.data.code === 50026){
          handleSnacbarLogin("error")();
        }
        console.log(err.response)
      });
  };

  return (
    <Wrapper>
      <PaperStyled>
        <form onSubmit={FetchProduct}>
          <Typography style={{ marginBottom: "30px" }} variant="h4">
            Sign In
          </Typography>
          <TextField
            style={{ marginBottom: "20px" }}
            fullWidth
            id="outlined-basic"
            type="text"
            label="Login"
            variant="outlined"
            onChange={(e) => setData({ ...data, furstName: e.target.value })}
          />
          <TextField
            style={{ marginBottom: "20px" }}
            fullWidth
            id="outlined-basic"
            type="password"
            label="password"
            variant="outlined"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <StyledButton type="submit"> login </StyledButton>
        </form>
      </PaperStyled>
    </Wrapper>
  );
}

export default SignIn;

const Wrapper = styled.div`
  max-width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PaperStyled = styled(Paper)`
  width: 500px;
  height: auto;
  padding: 30px;
`;

export const StyledButton = styled(Button)`
  && {
    background: #3545a3;
    color: white;
    padding: 12px 25px;
    border-radius: 3px;
    &:hover {
      background: #2a3a96;
    }
  }
`;
