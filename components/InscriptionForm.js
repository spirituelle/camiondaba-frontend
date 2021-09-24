
import React, {useState, useEffect} from "react";

import { Col,Row, Alert, Collapse } from 'react-bootstrap';

import Config from '../EndPoint'
// @material-ui/icons
import InputLabel from '@material-ui/core/InputLabel';


import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import {MdVisibility, MdVisibilityOff} from 'react-icons/md'

// import TextField from 'components/Inputs/InputIcone/index';
import Button  from './CustomButtons/Button';

import { useRouter } from 'next/router'
import {useAuth} from './../context/AuthContext'
import SwipeableViews from 'react-swipeable-views';


import contentFR from './../util/contentFR'
import contentEN from './../util/contentEN'
import contentAR from './../util/contentAR'

import firebase from './../lib/Firebase'
import StepperManaging from './Stepper/Stepper';

import Axios from 'axios'
export default function ElementForm(){
    const router = useRouter();
    const {locale} = router;

    const { createUserWithEmailAndPassword } = useAuth();

    const content = locale === "ar" ? contentAR : locale === "en" ? contentEN : contentFR;

    const [state, setState] = useState({
                nom: "",
                prenom:"",
                phone:"+212650517418",
                email: "",
                password:"",
                email_confirmation:"",
    });
    const [fieldValidationErrors, setfieldValidationErrors] = useState({
        nomError:false,
        prenomError:false,
        numeroError:false,
        emailError:false,
                    
    })
    const [response, setResponse] = useState({
        sending:false,
        success:false,   
        donneIncorecte: false                 
    })
    const [activeStep, setActiveStep] = useState(2);
    const [recaptcha, setRecaptcha] = useState(0);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     let data = traitementDonnee();


    //     setResponse(old =>  { return {...old, sending: true}});

        
    //         Axios.post(`${Config.BACKEND_URL}/register`, {nom: "adnane", prenom:"rouhi", email:"adnane@gmail.com", password: "1234567890"}, {headers: {
    //             'Content-Type': 'application/json',
    //         }})
    //           .then( res =>{
                
    
                        
                        
    //                     console.log(res)
    //                 if(!res.error){
    //                     setResponse({sending: false, success:true, donneIncorecte: false});
    //                     // router.push("/logged_in");
                      
    //                 }else {
    //                     setResponse({sending: false, success:false, donneIncorecte:true})
    //                     if(res.validator){
    
    //                     }else{
    
    //                     }
    //                 }
    //            }
                
    //             ).catch(error =>{ 
    //                 console.log(error.response)
    //                 setResponse({sending: false, success:false, donneIncorecte:true})
    //             })

    //         // const authUser = await createUserWithEmailAndPassword(data.email, data.password)
    //         // // .then(authUser => {
    //         //   console.log("Success. The user is created in Firebase")
              
    //         // // })
    //         // console.log(data)
           
    //         // fetch(`${Config.BACKEND_URL}/register`,{
    //         //     method:"post",
    //         //     headers: {
    //         //         'Content-Type': 'application/json',
    //         //     },
    //         //     body:JSON.stringify(data)
    //         // })
    //         // .then( res =>{
                
    
                        
                        
    //         //             console.log(res)
    //         //         if(res.error === false){
    //         //             setResponse({sending: false, success:true, donneIncorecte: false});
    //         //             // router.push("/logged_in");
                      
    //         //         }else {
    //         //             setResponse({sending: false, success:false, donneIncorecte:true})
    //         //             if(res.validator){
    
    //         //             }else{
    
    //         //             }
    //         //         }
    //         //    }
                
    //         //     ).catch(error =>{ 
    //         //         console.log(error.response)
    //         //         setResponse({sending: false, success:false, donneIncorecte:true})
    //         //     })

        
     
        
            
    // }



    const handleSubmit = async (e) => {



         e.preventDefault();
        let data = traitementDonnee();

        Axios.post(`${Config.BACKEND_URL}/register`, {nom: "adnane", prenom:"rouhi", email:"adnanerouhi@gmail.com", phone: "+2126505174180", password: "1234567890"}, {headers: {
            'Content-Type': 'application/json',
        }})
          .then( res =>{
            
      
                    
                    
                    console.log(res)
                if(!res.error){
                    // setResponse({sending: false, success:true, donneIncorecte: false});
                    // router.push("/logged_in");
                  
                }else {
                    // setResponse({sending: false, success:false, donneIncorecte:true})
                    if(res.validator){
      
                    }else{
      
                    }
                }
           }
            
            ).catch(error =>{ 
                console.log(error.response)
                // setResponse({sending: false, success:false, donneIncorecte:true})
            })
      
        // const authUser = await createUserWithEmailAndPassword(data.email, data.password)
        // // .then(authUser => {
        //   console.log("Success. The user is created in Firebase")
          
        // // })
        // console.log(data)
       
        // fetch(`${Config.BACKEND_URL}/register`,{
        //     method:"post",
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body:JSON.stringify(data)
        // })
        // .then( res =>{
            
      
                    
                    
        //             console.log(res)
        //         if(res.error === false){
        //             setResponse({sending: false, success:true, donneIncorecte: false});
        //             // router.push("/logged_in");
                  
        //         }else {
        //             setResponse({sending: false, success:false, donneIncorecte:true})
        //             if(res.validator){
      
        //             }else{
      
        //             }
        //         }
        //    }
            
        //     ).catch(error =>{ 
        //         console.log(error.response)
        //         setResponse({sending: false, success:false, donneIncorecte:true})
        //     })
      
      
      
      
        
      }
      
    const getActiveStepContent = () => {

        return (
        <SwipeableViews index={activeStep}>
            <div >
                <StepOne
                   setRecaptcha={setRecaptcha}
                   state={state} handleChange={handleChange} validateField={validateField} content={content} setActiveStep={setActiveStep}
                   />
            </div>
            <div >
                <StepTwo
                    state={state} handleChange={handleChange} validateField={validateField} content={content} setActiveStep={setActiveStep} recaptcha={recaptcha}
                />
            </div>
            <div >
            <StepTree
                 state={state} handleChange={handleChange} validateField={validateField} response={response} content={content} handleSubmit={handleSubmit} fieldValidationErrors={fieldValidationErrors}
                 />
            </div>
            </SwipeableViews>
            )
        // switch (activeStep) {
        //     case 0:
        //         return (
        //           <StepOne
        //           setRecaptcha={setRecaptcha}
        //           state={state} handleChange={handleChange} validateField={validateField} content={content} setActiveStep={setActiveStep}
        //           />
                 
        //         );
        //     case 1:
        //       return (
        //         <StepTwo
        //         state={state} handleChange={handleChange} validateField={validateField} content={content} setActiveStep={setActiveStep} recaptcha={recaptcha}
        //         />
        //       )
        //     case 2:
        //       return (
        //         <StepTree
        //         state={state} handleChange={handleChange} validateField={validateField} content={content}
        //         />
        //       )
          
        //     default:
        //       return 'Unknown step';
        // }

    }


    const traitementDonnee = () => {
        let formData={};
        
        formData.nom=  state.nom
        formData.phone= state.phone
        formData.email= state.email
        formData.prenom= state.prenom
        formData.password= state.password
        // formData.email_confirmation= state.email_confirmation
 
        return formData;
    }
 
    const validateField = () => {

    }

    const handleChange = ({target : {value, name}}) => {
        
        if(name === "phone"){
            value = value
            // Remove all non-digits, turn initial 33 into nothing
            .replace(/[^\d+]/g, '')
            .replace(/^0/, '+212')
            // Stick to first 10, ignore later digits
            .slice(0, 13)
            // Add a space after any 2-digit group followed by more digits
            .replace(/(\d{3})(?=\d)/g, '$1 ')
        }
        setState(old => {return { ...old, [name]: value}}) ;
    }
        // let {password, showPassword, email_confirmation, fieldValidationErrors, nom, prenom, phone, email, donneIncorecte, success} = state
       
        useEffect(() => {
            Axios.get('https://camiondaba.ma/api/clients', {headers:{ 'Content-Type': 'application/json' }}).then((res) => console.log(res))
            return () => {
                
            }
        }, [])
    return (
        <div>
            <StepperManaging activeStep={activeStep} steps={["numéro de téléphone", "validation"," cordonnée personnel"]} />
            <div>


            {getActiveStepContent()}
           
            </div>
            
        </div>
    );

}

function StepOne({state, handleChange, validateField, content,setActiveStep}) {

    useEffect(() => {
        // set-up an invisible recaptcha. 'sendCode` is button element id
        // <button id="sendCode">Send Code</button>
        firebase.auth().languageCode = 'fr';
        // To apply the default browser preference instead of explicitly setting it.
        // firebase.auth().useDeviceLanguage();
    }, [])
    const handleClick = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone-sign-in-recaptcha',
        {
            'size': 'normal',
            'callback': function (recapchaToken) {
              // reCAPTCHA solved, send recapchaToken and phone number to backend.
              
              // a REST call to your backend
              setActiveStep(1)
              console.log(recapchaToken)
            //   request.post({
            //     url: 'https://camiondaba.ma',
            //     body: {
            //       phoneNumber: state.phone,
            //       recapchaToken,
            //     }
            //   });
            }
          });

                // render the rapchaVerifier. 
        window.recaptchaVerifier.render().then(function (widgetId) {
            window.recaptchaWidgetId = widgetId;
        });

        const appVerifier = window.recaptchaVerifier;

        firebase.auth().signInWithPhoneNumber(state.phone, appVerifier)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log(confirmationResult)
            // ...
            }).catch((error) => {
            // Error; SMS not sent
            console.log(error.message)
            // ...
            grecaptcha.reset(window.recaptchaWidgetId);
            });
        
    }
    return (
        <div>
            <Row className="m-0">
                <TextField
                    className="phone-text"
                    value={state.phone}
                    onChange={handleChange}
                    fullWidth
                    type="text"
                    onBlur={validateField} 
                    error={state.phoneError}
                    helperText={state.phoneError ? content.new.phoneError : ""}
                    margin="normal"
                    required
                    fullWidth
                    id="cd_phone"
                    label={content.new.phoneLabel}
                    name="phone"
                    autoComplete="off"
                />
            </Row>
            <div id="phone-sign-in-recaptcha"></div>


            <Row>
                <Button color="primary" onClick={handleClick}> Vérifier </Button>
            </Row>
           
        </div>
    )
}

function StepTwo({state, handleChange, validateField, content,setActiveStep}) {

    // useEffect(() => {

    //     // const appVerifier = window.recaptchaVerifier;
    //     firebase.auth().signInWithPhoneNumber(state.phone, recaptcha)
    //         .then((confirmationResult) => {
    //         // SMS sent. Prompt user to type the code from the message, then sign the
    //         // user in with confirmationResult.confirm(code).
    //         window.confirmationResult = confirmationResult;
    //         console.log(confirmationResult)
    //         // ...
    //         }).catch((error) => {
    //         // Error; SMS not sent
    //         console.log(error.message)
    //         // ...
    //         grecaptcha.reset(window.recaptchaWidgetId);
    //         });
    //     return () => {
            
    //     }
    // }, [])

    const handleVerify = () => {
        window.confirmationResult.confirm(state.code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log(user.phoneNumber)
            setActiveStep(2)
            // ...
          }).catch((error) => {
              console.log(error)
            // User couldn't sign in (bad verification code?)
            // ...
          });
          
    }
    return (
        <div>
 <Row className="m-0">
                <TextField
                    className="code-text"
                    value={state.code}
                    onChange={handleChange}
                    fullWidth
                    type="text"
                    onBlur={validateField} 
                    error={state.codeError}
                    helperText={state.codeError ? content.new.codeError : ""}
                    margin="normal"
                    required
                    fullWidth
                    id="cd_phone"
                    label={content.new.code}
                    name="code"
                    autoComplete="off"
                />
            </Row>
            <Row>
                <Button color="primary" onClick={() => {handleVerify()}}> envoyer </Button>
            </Row>
        </div>
    )
}

function StepTree({state, handleChange, validateField, content, handleSubmit, fieldValidationErrors, response}) {
    return (
        <div>
            <form onSubmit={handleSubmit} autoComplete="off">
            
            <Row>
                    <Col xs="12" md="6"> 
                        <TextField
                            error={fieldValidationErrors.nomError}
                            placeholder=""
                            label={content.new.labelNom}
                            required={false}
                            name="nom"
                            onBlur={validateField} 
                            value={state.nom}
                            onChange={handleChange} 
                        />
                         
                    </Col>
                    <Col xs="12" md="6" > 
                        <TextField
                            placeholder=""
                            required={false}
                            error={fieldValidationErrors.prenomError}
                            label={content.new.labelPrenom}
                            onBlur={validateField} 
                            name="prenom"
                            value={state.prenom}
                            onChange={handleChange} 
                        />
                      
                    </Col>

                    {/* <Col xs={12} sm={12} className="mt-3">
                        <TextField
                            className="phone-text"
                            value={state.phone}
                            onChange={handleChange}
                            fullWidth
                            type="text"
                            onBlur={validateField} 
                            error={state.phoneError}
                            helperText={state.phoneError ? content.new.phoneError : ""}
                            margin="normal"
                            required
                            fullWidth
                            id="patientPhone"
                            label={content.new.phoneLabel}
                            name="phone"
                            autoComplete="new-password"
                        />
                    </Col> */}

                    <Col xs="12" className="mt-3">
                        <TextField 
                            fullWidth
                            label={content.new.emailLabel}
                            placeholder="Adresse email"
                            name="email"
                            error={fieldValidationErrors.emailError}
                            required={true}
                            onBlur={validateField} 
                            value={state.email}
                            onChange={handleChange} 
                        />   
                       
                    </Col> 
                    <Col xs="12" className="mt-3">
                        <TextField 
                            fullWidth
                            label={content.new.labelEmailC}
                            placeholder={content.new.labelEmailCP}
                            name="email_confirmation"
                            error={fieldValidationErrors.emailError}
                            required={true}
                            onBlur={validateField} 
                            value={state.email_confirmation}
                            onChange={handleChange} 
                        />
                    </Col> 
                    <Col xs="12" className="mt-3"> 
                        <FormControl fullWidth >
                            <InputLabel htmlFor="standard-adornment-password"> {content.new.passLabel} </InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={state.showPassword ? 'text' : 'password'}
                                value={state.password}
                                onChange={handleChange}
                                required={true}
                                label={content.new.passLabel}
                                name="password"
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={ () => setState(old =>{return  {...old, showPassword: !state.showPassword}})} 
                                    >
                                    {state.showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                            </FormControl>
                    </Col>
            </Row>
            <Row className="justify-content-center">
                <Collapse in={response.donneIncorecte}>
                    <div className="mt-5">
                        <Alert  variant="danger">
                            {content.new.errorSignup}
                        </Alert>
                    </div>
                </Collapse>
            </Row>
            <Row className="justify-content-center">
                <Collapse in={response.success}>
                    <div className="mt-5">
                        <Alert  variant="success">
                            {content.new.successSignup}
                        </Alert>
                    </div>
                </Collapse>
            </Row>
            <Row className="align-items-center justify-content-around mt-4 ">
                <Button type="submit" color="primary"> {content.new.signup} </Button>
            </Row>
        </form>

        </div>
    )
}