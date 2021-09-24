// src/context/state.js
import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';

import useFirebaseAuth from './../lib/useFirebaseAuth';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import Button from './../components/CustomButtons/Button'


import contentFR from './../util/contentFR'
import contentEN from './../util/contentEN'
import contentAR from './../util/contentAR'

// @material-ui/icons
import InputLabel from '@material-ui/core/InputLabel';



import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import {MdVisibility, MdVisibilityOff} from 'react-icons/md'


import Config from '../EndPoint';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';



const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {}

});


export function AuthWrapper({ children }) {
  const auth = useFirebaseAuth();



  return (
  <authUserContext.Provider value={auth}>
    {children}
    {/* <NewPAsswordPopup /> */}
    
    </authUserContext.Provider>
    );
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);



// const AppContext = createContext();


// export function AuthWrapper({ children }) {
//   let existinguserData = Cookies.get("patientData");

//   existinguserData = (existinguserData != undefined) ? JSON.parse(existinguserData) : {};
//   const router = useRouter();
//   const {locale} = router;

//   const content = locale === "ar" ? contentAR : locale === "en" ? contentEN : contentFR;

//     const [userData, setUserData] = useState(existinguserData);
  

//     const setUser = (data) => {
//       if(!data.token){
//         Cookies.set('patientData', {}, { expires: -1000 });


//         setUserData({isAuth: false});
//         return router.push({
//           pathname: `/account/new`,
//         })
//       }else {
//         setAddedByAdmin(data.user.addedByAdmin && !data.user.passwordChanged);
//         Cookies.set('patientData', JSON.stringify(data));
//         Cookies.set('token', data.token);
//         setUserData(data);
//       }
       
//     }

//     useEffect(() => {
//       if(userData.token){
//         setAddedByAdmin(userData.user.addedByAdmin && !userData.user.passwordChanged);
//         fetch(`${Config.BACKEND_URL}/patient/verify`,{
//           headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `token ${userData.token}`,
//           },
//         })
//         .then(
//             (r) => r.json()
//             .then(res => {

//                 if(!res.error){
//                   // setUserData(existinguserData);
//                 }else {
//                   setUserData({isAuth: false});
//                 }
          
//             })
//         ).catch(error =>{ 
//             setUserData({isAuth: false});
//         })
//       }

//         return () => {
            
//         }
//     }, [])
      
    

 

//   return (
//     <AppContext.Provider value={{ userData, setUser }}>
//       {children}
      

//     </AppContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AppContext);
// }



// const NewPAsswordPopup = () => {
  

//   const [state, setState] = useState({
//     password_confirmation: "",
//     password:"",
//     old_password:"",
// });

//   const handleChange = ({target : {value, name}}) => {
//     setState(old => {return { ...old, [name]: value}}) ;
// }

// const handleConfirmation = () => {
//   let testPass = state.password.trimStart();

//   if(testPass.length > 6) {
//     let data = {password: state.password, password_confirmation: state.password_confirmation, old_password: state.old_password, email: userData.user.email }
//     fetch(`${Config.BACKEND_URL}/patient/new-password`, {
//       method: 'PUT',
//       body: JSON.stringify(data),
//       headers: {
//         'Accept': 'application/json', 
//         'Content-Type': 'application/json',
//         'Authorization': `token ${userData.token}`,
//       },
//   } )
//     .then((res) =>{
//       console.log(res);
//       setAddedByAdmin(false);
//       setUserData(res.data.updatePatient)
//     })
//     .catch((err) => {
//       console.log(err.response)

//     })
//   }
  
// }
// return(
//   <Dialog
//         // open={false}
//         open={addedByAdmin}
//         onClose={ () => {}}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title"> Renouveler le mot de passe </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Ce compte à tait créer avec un administrateur, alors ce mot de passe à était générer d'une maniére aléatoir. On vous recomande de saisir un nouveau mot de passe pour la scuité de vos information.
//           </DialogContentText>
//           <FormControl className="mt-3" fullWidth >
//           <InputLabel htmlFor="standard-adornment-password"> {content.new.oldpassLabel} </InputLabel>
//           <Input
//               id="standard-adornment-password"
//               type={state.showPassword ? 'text' : 'password'}
//               value={state.old_password}
//               onChange={handleChange}
//               required={true}
//               label={content.new.oldpassLabel}
//               name="old_password"
//               endAdornment={
//               <InputAdornment position="end">
//                   <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={ () => setState(old =>{return  {...old, showPassword: !state.showPassword}})} 
//                   >
//                   {state.showPassword ? <MdVisibility /> : <MdVisibilityOff />}
//                   </IconButton>
//               </InputAdornment>
//               }
//           />
//           </FormControl>
//           <FormControl className="mt-3" fullWidth >
//           <InputLabel htmlFor="standard-adornment-password"> {content.new.passLabel} </InputLabel>
//           <Input
//               id="standard-adornment-password"
//               type={state.showPassword ? 'text' : 'password'}
//               value={state.password}
//               onChange={handleChange}
//               required={true}
//               label={content.new.passLabel}
//               name="password"
//               endAdornment={
//               <InputAdornment position="end">
//                   <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={ () => setState(old =>{return  {...old, showPassword: !state.showPassword}})} 
//                   >
//                   {state.showPassword ? <MdVisibility /> : <MdVisibilityOff />}
//                   </IconButton>
//               </InputAdornment>
//               }
//           />
//           </FormControl>
//           <FormControl className="mt-3" fullWidth >
//           <InputLabel htmlFor="standard-adornment-password"> {content.new.confirmpassLabel} </InputLabel>
//           <Input
//               id="standard-adornment-password"
//               type={state.showPassword ? 'text' : 'password'}
//               value={state.password_confirmation}
//               onChange={handleChange}
//               required={true}
//               label={content.new.confirmpassLabel}
//               name="password_confirmation"
//               endAdornment={
//               <InputAdornment position="end">
//                   <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={ () => setState(old =>{return  {...old, showPassword: !state.showPassword}})} 
//                   >
//                   {state.showPassword ? <MdVisibility /> : <MdVisibilityOff />}
//                   </IconButton>
//               </InputAdornment>
//               }
//           />
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleConfirmation} color="danger">
//             Confirmer
//           </Button>
//         </DialogActions>
//       </Dialog>
                   
// )
// }