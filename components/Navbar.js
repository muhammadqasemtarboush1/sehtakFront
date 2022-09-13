//Import Components
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import Dropdown from './Dropdown'



export default function Navbar(){
    return(
        <>
        <div className={styles.container}>
        <Image src='/images/logo.png' alt='' width='210' height='80'/>
        <div className={styles.items}>
        <Link href='/'><a className={styles.item}>Home</a></Link>
        {/* <Link href='#'><a className={styles.item}>Medical Centers</a></Link> */}
        <Dropdown/>
        <button className={styles.whiteButtons}>Login</button>
        </div>
        </div>
        </>
    )
}