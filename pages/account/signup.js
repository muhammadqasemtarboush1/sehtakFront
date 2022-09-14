import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../contexts/Auth';
import Layout from '../../components/Steppers/InputLayout';


export default function Signup() {

    const { signup } = useAuth();
    const router = useRouter();

    function handleSignup(e) {
        e.preventDefault();
        let userInput = {
            email: e.target.email.value,
            password: e.target.password.value,
            first_name: e.target.firstname.value,
            last_name: e.target.lastname.value
        }
        signup(userInput);
        router.push('/gernerator');
    }
    return (
        <>
            <div className="pb-2 mx-auto bg-gray-100 shadow-2xl rounded-2xl md:w-1/2">

                <div className="flex flex-col p-10 mt-9">
                    <form onSubmit={handleSignup}>
                        <Layout label="Email">
                            <input name="email" type="email" className="inputField" />
                        </Layout>
                        <Layout label="password">
                            <input type="password" name="password" className="inputField" />
                        </Layout>
                        <Layout label="First Name">
                            <input name="firstname" className="inputField" />
                        </Layout>
                        <Layout label="Last Name">
                            <input name="lastname" className="inputField" />
                        </Layout>
                        <div className="btnContainer">
                            <button type="submit" className="btn" > Sign Up </button>
                        </div>
                    </form>
                </div>
                <p className="mb-6 ml-6 text-sm text-gray-500"
                >Already has an acoount?
                    <Link href="login">
                        <a className="pl-6">Log In</a>
                    </Link>

                </p>
            </div>

        </>
    )
}