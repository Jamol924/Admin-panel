import * as React from "react";
import { DataGrid, GridToolbar, GridOverlay } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

export const User = () => {
  const { data } = useDemoData({
    // dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 10,
  });
  const item = [
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={item.map((el) => ({
          id: el.id,
        }))}
        {...data}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};
