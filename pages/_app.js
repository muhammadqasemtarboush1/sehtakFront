import '../styles/globals.css';
import '../styles/globals.css';

import "nprogress/nprogress.css";
import NProgress  from 'nprogress';
import Router from 'next/router';

import { AuthProvider } from '../contexts/Auth';


Router.events.on('routeChangeStart' , ()=> NProgress.start());
Router.events.on('routeChangeComplete', ()=> NProgress.done());
Router.events.on('r', ()=> NProgress.done());


function MyApp({ Component, pageProps }) {
  return (
    <>
    
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      
    </>
  )
}

export default MyApp
