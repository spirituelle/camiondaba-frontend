import {primaryColor } from './variables'
  const checkboxAdnRadioStyle = {
    navWrap:{
        position: "relative",
        width: "100%",
        top: 0,
        padding: 0,
        border: 0,
        borderRadius: 0,
        height: "64px",
        backgroundColor: primaryColor[0],
        transition: "background-color 0.3s",
    },
    navContent : {
        padding: "0 20px",
        height: "100%",
        // display: -webkit-box,
        // display: -webkit-flex,
        // display: -ms-flexbox,
        display: "flex",
        width: "100%",
        // -webkit-box-pack: justify,
        // -webkit-justify-content: space-between,
        // -ms-flex-pack: justify,
        justifyContent: "space-between",
    },
    navbarNav: {
        "& .nav-item .nav-link" :{
            color: "#fff !important",
            cursor: "pointer",
            textDecoration: "none",
            padding: "0 20px 0",
            fontWeight: 500,
           
            display: "flex",
         
            alignItems: "center",
          
            flexGrow: 0,
            fontSize: 14,
            height: "100%",
           
            flexShrink: 0,
          
            userSelect: "none",
        },
        "& .nav-item .nav-link svg" :{
            width: 16,
            height: 16,
            marginRight: "8px !important",
        },
        "& .professionel" : {
            backgroundColor: "#fff",
            borderRadius: 8,
            "& .nav-link" :{
                color: primaryColor[0] + " !important",
            },
        }
    }
  }
  
  export default checkboxAdnRadioStyle;
  