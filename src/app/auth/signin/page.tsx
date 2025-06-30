import { SignInPage } from '@/components/Pages/SignIn';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login'
}

const SignIn = () => <SignInPage />

export default SignIn