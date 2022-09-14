import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/Auth';
import Layout from '../../components/Steppers/InputLayout';


export default function Login() {
    const { login } = useAuth();
    const router = useRouter();

    function handleLogin(e) {  
        e.preventDefault();
        login(e.target.email.value, e.target.password.value);
        router.push('gernerator');
    }


    return (
        <>
            <div className="pb-2 mx-auto bg-gray-100 shadow-2xl rounded-2xl md:w-1/2 ">
                <div className="flex flex-col p-10 my-20">
                    <form onSubmit={handleLogin}>
                        <Layout label="Email">
                            <input name="email" type="email" className="inputField" />
                        </Layout>
                        <Layout label="password">
                            <input type="password" name="password" className="inputField" />
                        </Layout>
                        <div className="btnContainer">
                            <button type="submit" className="btn" >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}