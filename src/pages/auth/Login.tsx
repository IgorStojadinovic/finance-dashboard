import { useEffect, useState } from 'react';
import Logo from '../../assets/images/Logo.svg';
import { Link } from 'react-router-dom';
import HidePasswordIcon from '../../assets/images/icon-hide-password.svg';
import ShowPasswordIcon from '../../assets/images/eye-open.svg';
import AuthIllustration from '../../assets/images/illustration-authentication.svg';
import toast, { Toaster } from 'react-hot-toast';

type Data = {
    email: string;
    password: string;
};

const Login = () => {
    const notify = () => {
        toast('Hey!', {
            duration: 4000,
            icon: '👋',
            style: {
                background: '#201F24',
                color: '#fff',
            },
        });
        toast(
            'Site is currently in development, you can login without account.',
            {
                style: {
                    background: '#201F24',
                    color: '#fff',
                },
            }
        );
    };

    useEffect(() => {
        notify();
    }, []);
    const [data, setData] = useState<Data>({
        email: '',
        password: '',
    });

    const [type, setType] = useState('password');

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event) {
            console.log(event);
            setData((prevData) => ({
                ...prevData,
                [event.target.name]: event.target.value,
            }));
        }
    };
    console.log(data);

    const togglePasswordView = () => {
        if (type === 'password') {
            setType('text');
        } else {
            setType('password');
        }
    };

    return (
        <div className='bg-beige-100 flex flex-col h-svh  xl:flex-row'>
            <div className='bg-grey-900 py-6 flex justify-center items-center rounded-b-lg xl:hidden'>
                <img src={Logo} />
            </div>
            <div className='hidden xl:flex m-5 relative '>
                <img
                    src={Logo}
                    className='absolute top-10 left-10'
                />
                <img
                    src={AuthIllustration}
                    className='rounded-lg'
                />
                <div className='absolute p-10 bottom-0 text-white flex flex-col gap-6'>
                    <h1 className='text-preset-1'>
                        Keep track of your money and save for your future
                    </h1>
                    <p className='text-preset-4'>
                        Personal finance app puts you in control of your
                        spending. Track transactions, set budgets, and add to
                        savings pots easily.
                    </p>
                </div>
            </div>
            <form className='flex flex-col justify-center flex-1'>
                <div className='bg-white flex flex-col gap-8 mx-4 px-5 py-6 justify-center rounded-lg md:mx-[6.5rem] md:px-8 md:py-8 xl:mx-[8.75rem] 2xl:mx-[17.5rem]'>
                    <h2 className='text-preset-1'>Login</h2>

                    <div className='flex flex-col gap-4  text-grey-500'>
                        <div className='flex flex-col gap-1'>
                            <label
                                htmlFor='email'
                                className='text-preset-5-bold'
                            >
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                className='border rounded-lg px-5 py-3'
                                onChange={onInputChange}
                            />
                        </div>
                        <div className='flex flex-col '>
                            <label
                                htmlFor='pwd'
                                className='text-preset-5-bold'
                            >
                                Password
                            </label>

                            <div className='relative'>
                                <input
                                    type={type}
                                    name='passowrd'
                                    id='pwd'
                                    className='border rounded-lg px-5 py-3 w-full'
                                    onChange={onInputChange}
                                />
                                <img
                                    src={
                                        type === 'password'
                                            ? HidePasswordIcon
                                            : ShowPasswordIcon
                                    }
                                    onClick={togglePasswordView}
                                    className='h-4 absolute top-4 right-5'
                                />
                            </div>
                        </div>
                    </div>

                    <Link
                        className='btn-dark'
                        to='/overview'
                    >
                        Login
                    </Link>
                    <div className='flex gap-2 items-center justify-center'>
                        <p>Need to create an account?</p>
                        <Link
                            to='/signup'
                            className='underline text-preset-4-bold'
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </form>

            <div>
                <Toaster
                    position='bottom-right'
                    reverseOrder={false}
                />
            </div>
        </div>
    );
};

export default Login;
