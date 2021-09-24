import {
    primaryColor,
    infoColor,

  } from "./variables.js";
  
  const buttonStyle = {
    checkboxLabel: {
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: 300,
        lineHeight: 1,
        margin: "12px 7px",
    },
    span :{
        position: "relative",
        top: 0,
        borderColor: primaryColor[2],
        border: "1px solid",
        borderRadius: "50%",
        float: "left",
        height: "14px",
        width: "14px",
        margin: "0 14px 0 0px",
        outlineColor: "#fff",

        transition: "all 0.2s ease-in-out",
        zIndex: 1,
    },
    spanText:{
        color: "black"
    },
    input : {
        display: "none",
        '&:disabled + span' : {
            borderColor: "#eee" + "!important",
        },
        '&:checked + span' : {
            borderRadius: "0%",
            top: "-2px",
            borderColor: primaryColor[0] + "!important",
        },
        '&.rtl:checked + span' : {
            borderRight: "2px solid",
            borderBottom: "4px solid",
            transform: "rotate(45deg) scaleY(0.5)",

            borderTop: 0,
            borderLeft: 0,

        },
        '&.ltr:checked + span' : {
            transform: "rotate(-45deg) scaleY(0.5)",
           borderLeft: "2px solid",
            borderBottom: "4px solid",
            borderTop: 0,
            borderRight: 0,

        },
        
    },
  };
  
  export default buttonStyle;
  