//Import Components
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
// import Dropdown from './Dropdown'
import { useAuth } from '../contexts/Auth';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
// React Bootstrap 
import { Dropdown, DropdownButton } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
// get our fontawesome imports
import { faSignIn, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Navbar() {
    const { isAuth, logout } = useAuth();
    const isLoggedIn = isAuth()
    const router = useRouter();

    function handleLogout(e) {
        e.preventDefault();
        logout()
        router.push('/account/login?status=logout');
    }
    return (
        <>
            <div className={styles.container}>
                <div>
                    <Image src='/images/logo.png' alt='' width='210' height='80' />
                </div>
                <div className={styles.container}>
                    <div className={styles.items}>
                        <Link href='/' className={styles.item}>Home</Link>
                    </div>
                    <div>
                        <Link href='/account/vistisInfo' className={styles.item}>Profile</Link>
                    </div>
                    <Dropdown>
                        <DropdownButton id="dropdown-basic-button" title="Medical Centers">
                            <Dropdown.Item href="/Doctors/Doctors">Doctors</Dropdown.Item>
                            <Dropdown.Item href="/Pharmacies/Pharmacies">Pharmacies</Dropdown.Item>
                            <Dropdown.Item href="/Labs/Labs">Labs</Dropdown.Item>
                            <Dropdown.Item href="/Xrays/Xrays">X-Ray Centers</Dropdown.Item>
                        </DropdownButton>
                    </Dropdown>
                    {

                        isLoggedIn ? <Link href='account/login'><button onClick={handleLogout} className={styles.whiteButtons}>Logout <span><FontAwesomeIcon icon={faSignOutAlt} /></span></button></Link> : <Link href='account/login'><button className={styles.whiteButtons}>Login <span><FontAwesomeIcon icon={faSignInAlt} /></span></button></Link>
                    }
                </div>

            </div>
        </>
    )
}