//Import Components
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import Dropdown from './Dropdown'
import { useAuth } from '../contexts/Auth';


export default function Navbar(){
    const {isAuth,logout } = useAuth();
    const isLoggedIn = isAuth()

    return(
        <>
        <div className={styles.container}>
        <Image src='/images/logo.png' alt='' width='210' height='80'/>
        <div className={styles.items}>
        <Link href='/'><a className={styles.item}>Home</a></Link>
        <Link href='/'><a className={styles.item}>Profile</a></Link>

        {/* <Link href='#'><a className={styles.item}>Medical Centers</a></Link> */}
        <Dropdown/>
        {

    isLoggedIn ? <Link href='login'><button onClick={logout} className={styles.whiteButtons}>Logout</button></Link> : <Link href='account/login'><button className={styles.whiteButtons}>Login</button></Link>
        }
        </div>
        </div>
        </>
    )
}