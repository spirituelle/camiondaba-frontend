
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'

import Layout from '../components/Layout'

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { AppWrapper } from '../context/AppointementContext'; 
import { AuthWrapper } from '../context/AuthContext'; 

import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

import styles from "./../assets/jss/global.js";
import { makeStyles } from "@material-ui/core/styles";

import { useRouter } from 'next/router';
const useStyles = makeStyles(styles);


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


export default function MyApp(props) {
  const router = useRouter();
  const {locale} = router;
  const classes = useStyles();


  const { Component, pageProps } = props;
 

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
   
  return () => {
      
  }
  }, []);

  React.useEffect(() => {
    switch (locale) {
        case "ar":  
            document.documentElement.lang = 'ar'; 
            document.documentElement.dir = 'rtl'; 
            break;
        case "en":  
            document.documentElement.lang = 'en'; 
            document.documentElement.dir = 'ltr'; 
            break;
        default :  
            document.documentElement.lang = 'fr'; 
            document.documentElement.dir = 'ltr'; 
            break;
    }
    return () => {
        
    }
  }, [locale]) 

  return (
    <React.Fragment>
      <Head>
        <title> CAMIONDABA </title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <StylesProvider jss={jss}>
      <ThemeProvider theme={createTheme({
          direction: locale === "ar" ? 'rtl' : "ltr",
          palette: {
            primary: {
              main: '#ffcc5c',
            },
            secondary: {
              main: '#19857b',
            },
            error: {
              main: red.A400,
            },
            background: {
              default: '#fff',
            },
            typography: {
              fontFamily: [
                'Barlow',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
              ].join(','),
            },
          },
        })}
      >
        <CssBaseline />
        
          <AppWrapper>
            <AuthWrapper >
              <Layout locale={locale} pathname= {router.pathname} > 
              <div className={classes.container}>
                <Component {...pageProps} />  
              </div>
               
              </Layout>
            </AuthWrapper>
          </AppWrapper>
          
        
      </ThemeProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};


// Create a theme instance.
