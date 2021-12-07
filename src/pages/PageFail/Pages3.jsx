import { useState, useEffect } from "react";
import { DataGrid, GridToolbar, GridOverlay } from "@mui/x-data-grid";
import styled from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}
export const UserPages = () => {
  const [item, setItem] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const handleProduct = () => {
    axios
      .get("http://89.223.71.112:9898/users?limit=10&offset=0", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        setItem(res.data.data);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    handleProduct();
  }, []);
  function day(el) {
    if (el == null) {
      return null;
    }
    let d = new Date(el).toLocaleString().slice(0, -3);
    return d;
  }
  return (
    <>
      <div style={{ backgroundColor: "white", height: 550, width: "100%" }}>
        <SityledTable
          className="demo"
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 25, 50, 100]}
          pagination
          rows={item.map((el) => ({
            id: el.id,
            image: `http://89.223.71.112:9898/image?path=${el.image}`,
            firstName: el.first_name,
            lastName: el.last_name,
            birth_date: day(el.birth_date),
            card_id: el.card_id,
            code: el.code,
            family_status: el.family_status,
            gender: el.gender,
            own_reff_id: el.own_reff_id,
            reff_id: el.reff_id,
            phone: el.phone,
          }))}
          columns={[
            { field: "id", headerName: "Id", width: 20 },
            {
              field: "image",
              headerName: "Image",
              editable: true,
              renderCell: (params) => <img src={params.value} />,
            },
            { field: "firstName", headerName: "First Name", width: 150 },
            { field: "lastName", headerName: "Last Name", width: 150 },
            { field: "birth_date", headerName: "birth_date", width: 180 },
            { field: "card_id", headerName: "card_id", width: 100 },
            { field: "code", headerName: "code", width: 100 },
            { field: "family_status", headerName: "family_status", width: 100 },
            { field: "gender", headerName: "gender", width: 100 },
            { field: "own_reff_id", headerName: "own_reff_id", width: 250 },
            { field: "reff_id", headerName: "reff_id", width: 320 },
            {
              field: "phone",
              headerName: "phone",
              width: 170,
              disableReorder: true,
            },
          ]}
          components={{
            Toolbar: GridToolbar,
          }}
          disableColumnMenu
        />
      </div>
    </>
  );
};

const SityledTable = styled(DataGrid)`
  &&.css-1d97e6z-MuiDataGrid-root {
    border: 0px solid rgba(224, 224, 224, 1);
    border-radius: 4px;
    box-shadow: 0px 1px 4px #ccc;

    && img {
      width: 45px;
      height: 45px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;
