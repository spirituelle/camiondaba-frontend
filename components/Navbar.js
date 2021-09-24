import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Row } from 'react-bootstrap';
// import {Link } from "react-router-dom";
import Link from 'next/link'
import { withRouter } from 'next/router'

import { makeStyles } from "@material-ui/core/styles";

import classNames from "classnames";


import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from "./CustomButtons/Button.js";

import styles from "./../assets/jss/PublicNavbar.js";

import {  BsPerson } from 'react-icons/bs'
import { useRouter } from 'next/router';

import contentFR from './../util/contentFR'
import contentEN from './../util/contentEN'
import contentAR from './../util/contentAR'
import stylesDropdown from "./../assets/jss/headerLinksStyle.js";

import {  BsFillPersonFill } from 'react-icons/bs'

import {useAuth} from './../context/AuthContext'

const useStyles = makeStyles(styles);
const useStyles1 = makeStyles(stylesDropdown);

function PatientPublicNavbar(props) {
    const classes = useStyles();
    const router = useRouter();
    const { authUser } = useAuth();

    const {locale} = router;
    const content = locale === "ar" ? contentAR : locale === "en" ? contentEN : contentFR;

    const [colapsed, setColapsed] = useState(false)
    const [isLoggedin, setIslogedin] = useState(authUser)

    const isToggled = (etat) => {
        setColapsed(etat)
    }
     

    useEffect(() => {
        setIslogedin(authUser)

    }, [ authUser])

    return (
                <div >
                    <Navbar className={classes.navWrap} collapseOnSelect={true} expand="lg" as="nav" onToggle={isToggled}>
                        <div className={classes.navContent} > 
                            <div className= "d-flex">
                                <Link href={"/"}>
                                    <a className="view-pro-btn">
                                        <span style= {{
                                            backgroundColor: "#fff",
                                            padding: "2rem"
                                        }}> 
                                        {/* <div style={{display: "inline-block",
                                                width: "95px",
                                                
                                                height: "50px",
                                                backgroundImage: `url(/image/camiondaba.png)`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundPosition: "center",
                                                backgroundSize: "95px auto",}}>  
                                        </div>  */}
                                        <img src="/image/camiondaba.png" className="logo img-fluid" width="100px" height="64px" />
                                        </span>
                                      
                                    </a>
                                </Link>
                                
                                <Navbar.Toggle aria-expanded={colapsed} aria-controls="basic-navbar-nav" className="mx-5" >
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </Navbar.Toggle>
                            </div>
                            <Row>
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav as="ul" activeKey={props.router? props.router.pathname: null} className={classes.navbarNav} >

                                        <Nav.Item className="professionel" as="li">
                                            <Link href='/get-a-quote' passHref>
                                            <Nav.Link className="" > 
                                                <span >  Obtenir un devis </span>
                                            </Nav.Link> 
                                            </Link>
                                        </Nav.Item> 
                                      {
                                          isLoggedin ?
                                          (
                                            <Logedin content={content} />
                                          ):
                                          (
                                            <Nav.Item as="li">
                                            <Link href="/account/access" passHref>
                                                <Nav.Link > 
                                                <BsPerson /> 
                                                <div>
                                                    <div> {content.navbar.conect} </div>
                                                    <div style={{opacity: 0.7, fontSize: 12}}> {content.navbar.rdv} </div>
                                                </div>
                                                </Nav.Link>
                                            </Link> 
                                        </Nav.Item>

                                          )
                                
                                      }
                                       
                                    </Nav>
                                </Navbar.Collapse>
                            </Row>
                                
                        </div>
                    </Navbar>
                </div>
)
}

export default withRouter(PatientPublicNavbar)

const Logedin = ({content}) => {
    const [openProfile, setOpenProfile] = useState(null);

    const classes2 = useStyles1();
    const { authUser, loading, signOut } = useAuth();

    const router = useRouter();
    const handleClickProfile = event => {
        if (openProfile && openProfile.contains(event.target)) {
          setOpenProfile(null);
        } else {
          setOpenProfile(event.currentTarget);
        }
      };
 
      
    return(
        <div className={classes2.manager}>
            <Button
            color={ "transparent"}
            // justIcon={window.innerWidth > 959}
            simple={false}
            aria-owns={openProfile ? "profile-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickProfile}
            className={classes2.buttonLink}
            >
            <BsFillPersonFill className={classes2.icons} />
            <Hidden mdDown implementation="css">
                <p className={classes2.linkText}>email</p>
            </Hidden>
            </Button>
            <Poppers
            placement={'bottom'}
            // style={{right: -10}}
            open={Boolean(openProfile)}
            anchorEl={openProfile}
            transition
            disablePortal
            className={
                classNames({ [classes2.popperClose]: !openProfile }) +
                " mr-4 " +
                classes2.popperNav
            }
            >
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                id="profile-menu-list-grow"
                style={{
                    transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={() => {setOpenProfile(null);}}>
                    <MenuList role="menu">
                        <MenuItem
                        onClick={() => {router.push('/account/profil');}}
                        className={classes2.dropdownItem}
                        >
                        {content.pronavbar.dropDown1}
                        </MenuItem>
                        <Divider light />
                        <MenuItem
                        onClick={ signOut}
                        className={classes2.dropdownItem}
                        >
                            {content.pronavbar.dropDown2}
                        </MenuItem>
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Poppers>
        </div>
    )
}