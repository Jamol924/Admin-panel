import React from "react";
import MailIcon from '@material-ui/icons/Mail';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';

export const DataNav = [
  {
    id: 1,
    name: "User",
    icon:<PersonAddIcon style={{color:"blue"}} />
    
  },
  {
    id: 2,
    name: "Banner",
    icon:<PhotoAlbumIcon style={{color:"red "}}/>
  },
  {
    id: 3,
    name: "Section",
    icon:<MailIcon />
  }
];
