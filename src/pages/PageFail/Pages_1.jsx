import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { DialogAdd } from "../../components/common/modalAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: theme.spacing("100%"),
      height: theme.spacing("auto"),
    },
  },
}));

export const Banner = () => {
  const [produc, setProduc] = useState([]);
  const handleAxios = () => {
    axios
      .get("http://89.223.71.112:9898/banners", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setProduc(res.data.data);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    handleAxios();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
        <DialogAdd onSuccess={handleAxios} />
        <ListItem>
          <ListItemText>Images</ListItemText>
        </ListItem>
        {produc.map((prod) => (
          <List>
            <ListItem button>
              <TableItem1>
                <ListItemText button>{prod.title}</ListItemText>
              </TableItem1>
              <TableItem2 button>
                <ListItemText>{/* {prod.content} */}</ListItemText>
              </TableItem2>
              <TableItem3>
                <ListItemText>
                  <img
                    src={`http://89.223.71.112:9898/image?path=${prod.image}`}
                  />
                </ListItemText>
              </TableItem3>
            </ListItem>
            <Divider />
          </List>
        ))}
      </Paper>
    </div>
  );
};

const TableItem1 = styled.div`
  width: 25%;
`;
const TableItem2 = styled.div`
  width: 55%;
`;
const TableItem3 = styled.div`
  width: 15%;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;
