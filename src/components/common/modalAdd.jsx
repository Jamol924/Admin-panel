import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { TextField } from "@material-ui/core";
import { eliment } from "../../redux/active/productActions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogAdd = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  const [data, setData] = useState({
    title: "",
    content: "",
  });
  const add = useSelector((state) => state);

  const Produc = {
    data: [
      {
        title: "Text matni",
        content: "Text matni",
        image: "Text matni",
      },
      {
        title: "Text matni",
        content: "Text matni",
        image: "Text matni",
      },
    ],
  };
  useEffect(() => {
    dispatch(eliment(Produc));
  }, []);

  const handleSubmitImg = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axios
      .post("http://89.223.71.112:9898/image", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAxios = () => {
    setOpen(false);
    const instance = axios.create({
      baseURL: "http://89.223.71.112:9898/",
    });
    instance
      .post(
        "banner",
        { title: data.title, content: data.content, image: img.name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      )
      .then((res) => {
        onSuccess();
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  return (
    <div>
      <Button
        startIcon={<PostAddIcon />}
        style={{ cursor: "pointer", margin: "10px" }}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        add to tovar
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Model detail?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              style={{ marginBottom: "20px" }}
              fullWidth
              label="Title"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <TextField
              style={{ marginBottom: "20px" }}
              fullWidth
              label="Content"
              onChange={(e) => setData({ ...data, content: e.target.value })}
            />
            <TextField
              onChange={handleSubmitImg}
              style={{ marginBottom: "20px" }}
              fullWidth
              type="file"
              htmlFor="username"
            ></TextField>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitImg} color="primary">
            cancel
          </Button>
          <Button onClick={handleAxios} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
