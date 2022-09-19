//Import Components
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import Dropdown from './Dropdown'
import { useAuth } from '../contexts/Auth';
import { useRouter } from 'next/router';

export default function Navbar(){
    const {isAuth,logout } = useAuth();
    const isLoggedIn = isAuth()
    const router = useRouter();

    function handleLogout(e) {  
        e.preventDefault();
        logout()
        router.push('/account/login?ss=logout');
    }
    return(
        <>
        <div className={styles.container}>
        <Image src='/images/logo.png' alt='' width='210' height='80'/>
        <div className={styles.items}>
        <Link href='/'><a className={styles.item}>Home</a></Link>
        <Link href='/account/vistisInfo'><a className={styles.item}>Profile</a></Link>

        {/* <Link href='#'><a className={styles.item}>Medical Centers</a></Link> */}
        <Dropdown/>
        {

    isLoggedIn ? <Link href='account/login'><button onClick={handleLogout} className={styles.whiteButtons}>Logout</button></Link> : <Link href='account/login'><button className={styles.whiteButtons}>Login</button></Link>
        }
        </div>
        </div>
        </>
    )
}