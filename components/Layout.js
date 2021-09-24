
import {useEffect, useState} from 'react'
import  Navbar  from './../components/Navbar';
import  AuthNavbar  from './../components/Navbar';
import  Footer  from './../components/Footer';

import {useAuth} from './../context/AuthContext'
// import LangSwitch from './LangSwitcher'


export default function Layout({children, locale, pathname}) {
    const [isAuth, setIsAuth] = useState(false);

    const { userData } = useAuth();

    useEffect(() => {

        if(userData){
            setIsAuth(userData.isAuth)
        }
       
        return () => {
            
        }
    }, [userData])
  
    
    return (
        <>
            {isAuth ? 
                <AuthNavbar />
                : <Navbar />
            }
            
            <main style={ locale === "ar" ? {direction: "rtl", textAlign: "right"}: {direction: "ltr"}} className={"main" + (isAuth? " authentified" : "")}>
                {children}
            </main>
            <Footer />
            {/* <LangSwitch /> */}
        </>
    )
}
