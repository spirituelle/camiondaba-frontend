import React from 'react'

import { useRouter } from 'next/router';

export default function angSwitcher(props) {
    const router = useRouter();

    const {locale} = router;

    const switchLang = (lang) =>{
        try {
            router.push(router.asPath, router.asPath, { locale: lang })
        } catch (error) {
            console.log(error)
        }
    }

    const Arab = () => (
        <div className="selecting-lang" style={{direction:"rtl" , textAlign:"right"}} id="ar" onClick={() => switchLang("ar")}>
            <img className="lang-flag mx-2" src="/image/morocco-circular.png" alt="arab"/>
            <p className="lang-text"> العربية </p>
        </div>
    )
    const frensh = () => (
        <div  className="selecting-lang" onClick={() => switchLang("fr")}>
            <img className="lang-flag mx-2" src="/image/france.png" alt="français"/>
            <p className="lang-text" >Français</p>
	    </div>
    )
    const english = () => (
        <div  className="selecting-lang" onClick={() => switchLang("en")}>
            <img className="lang-flag mx-2" src="/image/united-kingdom.png" alt="English"/>
            <p className="lang-text" >English</p>
        </div>
    )
    return (
       
        <div className="switch-lang"> 
            <div className="current-lang" >
                { locale === "ar"? Arab() : locale === "en" ? english() : frensh() }
                <div  className="lang-dropdown">
                    {  locale === "en" ? null : english()  }
                    { locale === "fr" ? null :  frensh() }
                    { locale === "ar"?  null : Arab()  }
                </div>
            </div>
        </div>
    )
}
