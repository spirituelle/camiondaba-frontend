
import React from 'react';
import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';

import styles from '../../assets/jss/CheckboxStyle'
const useStyles = makeStyles(styles);

// Inspired by blueprintjs
export default function StyledCheckbox({name, label,rtl,  ...rest}) {
  const classes = useStyles();

  return (
    <label className={classes.checkboxLabel}> 
    <input
        name={name}
        type="checkbox"
        className={ classes.input + (rtl ? " rtl" : " ltr")}
        {...rest}
    />
    <span className= {classes.span} ></span>
    <span className= {classes.spanText}> {label} </span>  
    </label>
  );
}

    StyledCheckbox.defaultProps = {
        checked: false,
        onClick: () => {  },
        label:"",
        name:"checkbox",
        rtl: false
    };

    StyledCheckbox.propTypes = {
        checked: PropTypes.bool,
        name: PropTypes.string,
        rtl: PropTypes.bool,
        label: PropTypes.string,
        onChange: PropTypes.func,


    };
  