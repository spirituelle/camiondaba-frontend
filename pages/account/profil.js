import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './../../context/AuthContext';

// import {Container, Row, Col} from 'reactstrap';

const LoggedIn = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

  return (
   <h3>  Mon profile </h3>
  )
}

export default LoggedIn;