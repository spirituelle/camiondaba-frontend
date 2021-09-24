import React, {useState, useEffect} from 'react'

import Card from "./../../components/Card/Card";

import CardBody from "./../../components/Card/CardBody.js";

import {Row, Col, Collapse, Alert} from 'react-bootstrap'

import Button from './../../components/CustomButtons/Button'

import {useAppContext} from './../../context/AppointementContext'
import {useAuth} from './../../context/AuthContext'

import StepperManaging from './../../components/Stepper/Stepper';

import Config from './../../EndPoint';

import AuthForm from './../../components/Login'
import InscriptionForm from './../../components/InscriptionForm'
import Link from 'next/link'

import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

import contentFR from './../../util/contentFR'
import contentEN from './../../util/contentEN'
import contentAR from './../../util/contentAR'

import {BiCurrentLocation} from "react-icons/bi"
import {GiCheckMark} from "react-icons/gi"

import Geocode from "react-geocode";

import MapPosition from './../../components/mapPosition'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import frLocale from "date-fns/locale/fr";

import {
    successColor,
    whiteColor,
    grayColor,
    hexToRgb,
    infoColor,
    blackColor,
} from "./../../assets/jss/variables";


import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

// import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";


Geocode.setApiKey(Config.apiKey);
Geocode.setLanguage("fr");
Geocode.setRegion("fr");
Geocode.setLocationType("ROOFTOP");

export default function Appointement({medecinInfo}) {
    const router = useRouter();
    const {locale} = router;
  
    const content = locale === "ar" ? contentAR.appointment : locale === "en" ? contentEN.appointment : contentFR.appointment;
  
    const [activeStep, setActiveStep] = useState(0);
    const [isStepOneValide, setIsStepOneValide] = useState(false);
    const [appointementInfo, setAppointementInfo] = useState({});
    const [addedConsultation, setAddedConsultation]  = useState({});

    const { temporary_appointment, setUserTemporary } = useAppContext();
    const { userData, setUser } = useAuth();

    useEffect(() => {
        if(!temporary_appointment){

        }else {
            let changedApp = JSON.stringify(temporary_appointment) !== JSON.stringify(appointementInfo); 
            if(changedApp) {
                setAppointementInfo( oldapp => {return {...oldapp, ...temporary_appointment, typeConsultation : medecinInfo.teleconsultationIsDisponible ? temporary_appointment.typeConsultation :  "consultation_cabinet" }} );
                if(temporary_appointment.isStepOneValide){
                    handleSubmitStepOne()
                }
            }
        }
       

        return () => {
            
        }
    }, [temporary_appointment])



    const StepOneValid = (data) => {
        setActiveStep(1)
    }

    const StepTwoValid = () => {
        setActiveStep(2)
    }
    const stepTreeValide = () => {
        setActiveStep(3)
    }
    const stepFourValid = () => {
        setActiveStep(4)
    }


    const getActiveStepContent = () => {

        switch (activeStep) {
            case 0:
                return (
                  <StepOne
                    apponitementInfo = {appointementInfo}
                    StepOneValid={StepOneValid}
                    content={content.step1}
                    locale={locale}
                    
                  />
                 
                );
            case 1:
              return (
                <StepTwo
                apponitementInfo ={appointementInfo}
                StepTwoValid={StepTwoValid}
                activeStep={activeStep}
                content={content.step2}
                />
              )
            case 2:
              return (
                <StepTree
                apponitementInfo ={appointementInfo}
                StepTreeValid={stepTreeValide}
                content={content.step3}
                />
              )
          
            case 3:
              return (
                <StepFour
                apponitementInfo ={appointementInfo}
                stepFourValid={stepFourValid}
                setAddedConsultation={setAddedConsultation}
                content={content.step4}

                />
              )
            case 4:
              return (
                <StepFive
                    apponitementInfo ={addedConsultation}
                    setAddedConsultation={setAddedConsultation}
                    content={content.step5}
                />
              )
          
            default:
              return 'Unknown step';
          }

    }

    const handleSubmitStepOne= () => {
        // setFormData({medecin: appointementInfo.medecin.id, typeConsultation: appointementInfo.typeConsultation, motif: appointementInfo.motif, date: appointementInfo.selectedDate});
        setUserTemporary({...temporary_appointment, isStepOneValide: true})
        setActiveStep(1);

    }

    return (
        <div>
            <div className="bg-white p-3">
                <h3 className="text-center"> {content.takeApp} </h3>
            </div>  
            <div>
                <StepperManaging activeStep={activeStep} steps={content.steps} />
            </div>
            <div className="container">
                {getActiveStepContent()}
            </div>
            <div>
             {
             (isStepOneValide && activeStep === 0) ? <div className="row justify-content-center"> 
                <Button onClick={handleSubmitStepOne} color="success"> {content.takeApp} </Button>  
                </div> 
            : null }   
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`${Config.BACKEND_URL}/medecin/1`);

    if(!res) {
        return {
            props: { error: true, message: "request failed"},
          }
    }
    const data = await res.json();

    if(!data || data.error) {
        return {
            props: { error: true, message: data.message},
          }
    }

    return {
      props: {},
    }
}

function StepOne (props) {

    const {content} = props;

    const [showStart, setShowStart] = React.useState(false);
    const [startDone, setStartDone] = React.useState(false);
    const [endDone, setEndDone] = React.useState(false);

    const [adressStart, setAdressStart] = React.useState("");

    const [startPosition, setStarPosition] = React.useState({lat: 33.5795703, lng: -7.5874518,});
    const [centerStart, setCenterStar] = React.useState({lat: 33.5795703, lng: -7.5874518,});

    const [showEnd, setShowEnd] = React.useState(false);
    const [adressEnd, setAdressEnd] = React.useState("");

    const [EndPosition, setEndPosition] = React.useState({lat: 33.5795703, lng: -7.5874518,});
    const [centerEnd, setCenterEnd] = React.useState({lat: 33.5795703, lng: -7.5874518,});

    const _showStart = (day, hour) => {
        setShowStart(true)
    }
    const _hideStart = () => {
        setShowStart(false)
        setCenterStar(startPosition)
    }
    const _showEnd = (day, hour) => {
        setShowEnd(true)
    }
    const _hideEnd = (day, hour) => {
        setShowEnd(false)
        setCenterEnd(EndPosition)
    }

    const onMapClickStart = React.useCallback((e) => {
        setStarPosition( {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        })
       
      }, []);
    const onMapClickEnd = React.useCallback((e) => {
        setEndPosition( {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        })
       
      }, []);
    
      const handleConfirmationStart = () => {
        setShowStart(false);
        // Get address from latitude & longitude.
        Geocode.fromLatLng(startPosition.lat, startPosition.lng).then(
            (response) => {
            const address = response.results[0].formatted_address;
            setAdressStart(address);
            setStartDone(true);
            },
            (error) => {
            console.error(error);
            }
        );
        

      }
      const handleConfirmationEnd = () => {
        setShowEnd(false);
        // Get address from latitude & longitude.
        Geocode.fromLatLng(EndPosition.lat, EndPosition.lng).then(
            (response) => {
            const address = response.results[0].formatted_address;
            setAdressEnd(address);
            setEndDone(true)
            },
            (error) => {
            console.error(error);
            }
        );
        

      }
 
      useEffect(() => {
          if(startDone && endDone){

          }
          
          return () => {
              
          }
      }, [])
    return(
        <Card >
        <CardBody>
            <Col dir={ props.locale === "ar" ? "rtl" : "ltr"}>
                   <Row className="justify-content-around">
                       <div>
                            <Button color={startDone? "success" : 'primary'} onClick={_showStart}> <span className="mr-2">{ startDone? <GiCheckMark /> : <BiCurrentLocation />} </span> { startDone? "Changer l'adresse de départ" : "Adresse de départ" } </Button>
                            { startDone ? 
                            <div>
                                <p>
                                    {adressStart}
                                </p>
                            </div>
                            
                            : null
                            }
                            

                       </div>
                       <div>
                            <Button color={endDone? "success" : 'primary'} onClick={_showEnd}> <span className="mr-2">  { endDone? <GiCheckMark /> : <BiCurrentLocation />} </span> { endDone? "Changer l'adresse d'arriver" : "Adresse d'arriver" }  </Button>
                            { endDone ? 
                            <div>
                                <p>
                                    {adressEnd}
                                </p>
                            </div>
                            
                            : null
                            }
                       </div>

                   </Row>
                   {startDone && endDone ? 
                   <Row className="justify-content-center">
                       <Button color="primary" onClick={props.StepOneValid}> Choisir la date </Button>
                   </Row>
                   : null
                   }
            </Col>

        </CardBody>
        <Dialog
        // open={false}
        open={showStart}
        onClose={_hideStart}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
           <DialogTitle id="alert-dialog-title"> Sélectionné sur la map la position de départ </DialogTitle>
           <div>
            <MapPosition marker={startPosition} center={centerStart} onClick={onMapClickStart} />
           </div>
           <DialogActions>
                <Button onClick={handleConfirmationStart} color="primary">
                    Enregistrer
                </Button>
            </DialogActions>
      </Dialog>
      <Dialog
        // open={false}
        open={showEnd}
        onClose={_hideEnd}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
           <DialogTitle id="alert-dialog-title"> Sélectionné sur la map la position d'arriver </DialogTitle>
           <div>
            <MapPosition marker={EndPosition} center={centerEnd} onClick={onMapClickEnd} />
           </div>
            
            <DialogActions>
                <Button onClick={handleConfirmationEnd} color="primary">
                    Enregistrer
                </Button>
            </DialogActions>
      </Dialog>
        
      </Card>
    )
}

function StepFour (props) {
    const { userData, setUser } = useAuth();

    const {content} = props;

    const [signinWay, setSigninWay]  = useState("notSpecified"); 

    const postLogin = ( data) => {

        setUser({isAuth: true, user: data.user, token: data.token})
       
    }

    const setUserData = (data) => {
        setUser({isAuth: true, user: data.addedUser, token: data.token})
    }

    useEffect(() => {
        

        if(userData.isAuth && props.activeStep === 1){
            props.StepTwoValid()
        }
        return () => {
            
        }
    }, [userData, props])
    

    return(
        <div>
            <Row>
                <Col sm="8">
                    {
                        signinWay === "auth" ?
                            <>
                                <Card>
                                    <CardBody>
                                        <AuthForm submiting={postLogin} />
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody className="justify-content-center d-flex flex-column aligh-items-center">
                        <h4 className="text-center"> {content.new} </h4>
                                        <Button onClick= {() => {setSigninWay("inscription")}} color="transparent">  {content.signup}  </Button>
                                    </CardBody>
                                </Card>
                            </>
                        : signinWay === "inscription" ?
                            <>
                                <Card>
                                    <CardBody>
                                        <InscriptionForm setUserData={setUserData} />
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody className="justify-content-center d-flex flex-column aligh-items-center">
                                    <h4 className="text-center"> {content.old}   </h4>
                                        <Button onClick= {() => {setSigninWay("auth")}} color="transparent"> {content.signin}  </Button>
                                    </CardBody>
                                </Card>
                            </>
                        :
                        <Col>
                            <Row>
                                <Card>
                                    <CardBody className="justify-content-center d-flex flex-column aligh-items-center">
                                        <h4 className="text-center"> {content.new} </h4>
                                        <Button onClick= {() => {setSigninWay("inscription")}} color="primary">  {content.signup}  </Button>
                                    </CardBody>
                                </Card>
                            </Row>
                            <Row>
                                <Card>
                                    <CardBody className="justify-content-center d-flex flex-column aligh-items-center">
                                        <h4 className="text-center"> {content.old}  </h4>
                                        <Button onClick= {() => {setSigninWay("auth")}} color="info"> {content.signin} </Button>
                                    </CardBody>
                                </Card>
                            </Row>
                            
                        </Col>
                        
                    }
                    
                </Col>
                <Col sm="4">
                    <Card>
                        <CardBody>
                            <Col>
                                                       
                            </Col>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

function StepTwo (props) {
    const { userData } = useAuth();
    const [date, changeDate] = useState(new Date());
console.log(date)
    const {content} = props;
    useEffect(() => {
        if(userData.user){
            if(userData.user.active){
                props.stepTreeValide()
            }
        }
        return () => {
            
        }
    }, [userData])
    const GenererLink = () => {
        fetch(`${Config.BACKEND_URL}/patient/generer-link`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${userData.token}`,
            }
        })
        .then(
            (r) => r.json()
            .then(res => {

            })
            ).catch(error =>{ 
              
            })
    }
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
        <Card className="bg-light">
            <CardBody>
                <h3> Veillez précisez la date auquel vous voulez réaliser votre movement </h3>
                <Col>
                <Row className="justify-content-between">
                <DatePicker
                    autoOk
                    orientation="landscape"
                    variant="static"
                    openTo="date"
                    value={date}
                    onChange={changeDate}
                    disablePast
                />
                 <TimePicker
                    autoOk
                    ampm={false}
                    variant="static"
                    orientation="landscape"
                    openTo="minutes"
                    value={date}
                    onChange={changeDate}
                />
                </Row>
                
                <Row className="justify-content-center mt-4">
                       <Button color="primary" onClick={props.StepTwoValid}> Choisir votre véhicule </Button>
                   </Row>          
                </Col>
                
            </CardBody>
        </Card> 
        </MuiPickersUtilsProvider>
    )
}

const style4 = {
    successText: {
        color: successColor[0]
      },
      label:{
  
      },
  
      img: {
          cursor: "pointer",
          marginLeft: "15px",
          transition: "all ease-in 0.3s",
          padding: 15,
          width:"128px",
          boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(blackColor) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(blackColor) +
                ",.2)",
          "&:hover,&:focus": {
              border: "1px solid",
              borderColor: infoColor[0],
              transform: "scale(1.05)",
              boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(infoColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(infoColor[0]) +
                ",.2)"
          }, 
      },
      input:{
          "&.checked + img": {
              border: "1px solid",
              transform: "scale(1.05)",
              borderColor: infoColor[0],
              boxShadow:
                "0px 0px 20px 8px rgba(" +
                hexToRgb(infoColor[0]) +
                ",.3)"
          },
          display: "none",
         
      },
}
const useStylesStepTwo = makeStyles(style4);

function StepTree (props) {
    const { userData } = useAuth();
    const [date, changeDate] = useState(new Date());
    const classes = useStylesStepTwo();
  
    
    const [vehicule, setVehicule] = useState();

    const [vehiculeError, setVehiculeError] = useState(false);

    const {content} = props;
    useEffect(() => {
        if(userData.user){
            if(userData.user.active){
                props.stepTreeValide()
            }
        }
        return () => {
            
        }
    }, [userData])


    const selectWay = (e) => {
        if(e.target){
            let value = e.target.value;
            setVehicule(value)
            setVehiculeError(false);
            // props.setData(data => { return {...data, vehicule: value}});
            // props.setErrors(errors =>  {return {...errors, vehiculeError: false}});
        }
    }



    return(
        <Card className="bg-light">
            <CardBody>
                <h3> Veillez sélectionné votre véhicule </h3>
                <Col>
                <Row className="justify-content-between">
                <label className={classes.label}>
                    <input onChange={selectWay} className={classes.input + (vehicule === "small" ? " checked" : " ")} type="radio" name="vehicule" value="small" />
                    <img className={classes.img + " img-fluid"} width="128px" src="/image/small.png" />
                </label>
                <label className={classes.label}>
                    <input onChange={selectWay} className={classes.input + (vehicule === "minibus" ? " checked" : " ")} type="radio" name="vehicule" value="minibus" />
                    <img className={classes.img + " img-fluid"} width="128px" src="/image/minibus.png" />
                </label>
                <label className={classes.label}>
                    <input onChange={selectWay} className={classes.input + (vehicule === "honda" ? " checked" : " ")} type="radio" name="vehicule" value="honda" />
                    <img className={classes.img + " img-fluid"} width="128px" src="/image/honda.png" />
                </label>

                <label className={classes.label}>
                    <input onChange={selectWay} className={classes.input + (vehicule === "big" ? " checked" : " ")} type="radio" name="vehicule" value="big" />
                    <img className={classes.img} src="/image/big.png" />
                </label>
                </Row>
                
                <Row className="justify-content-center mt-4">
                       <Button color="primary" onClick={props.StepTreeValid}> Indiquez les information personnel </Button>
                   </Row>          
                </Col>
                
            </CardBody>
        </Card> 
    )
}

function StepFive (props) {
    return(
        <Card>
            <CardBody>
                <h3> {props.content.title} </h3>

                <Link href="/account/appointments">
                        <a className="link btn btn-primary"> {props.content.gerer} </a>
                    </Link>
            </CardBody>
        </Card>
    )
}