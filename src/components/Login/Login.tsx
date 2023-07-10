import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth, SignInUserFn } from '../../context/AuthContext';
import { FirebaseError } from 'firebase/app';
import logo1 from "../../assets/Vector (3).png"
import logo2 from "../../assets/Vector 2.png"
import Footer from '../Footer/Footer';
import './Login.css'

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate()

  const { signIn }: { signIn: SignInUserFn } = UserAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      if (typeof signIn === 'function') {
        await signIn(email, password);
        navigate('/dashboard')
      }
    } catch (e) {
      if (typeof e === 'object' && e instanceof Error) {
        const errorMessage = getErrorMessage(e);
        setError(errorMessage);
      }
    }

  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const getErrorMessage = (error: Error): string => {
    if (error.name === 'FirebaseError') {
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case 'auth/user-not-found':
          return 'User not found. Try signing up.';
        case 'auth/wrong-password':
          return 'Incorrect password';
        default:
          return 'An error occurred, please try again.';
      }
    }
    return 'An error occurred, please try again.';
  };


  return (
    <>
      <div className="login-logo">
        <Link to="/" className='logo'>
          <img src={logo1} alt="logo" />
          <img src={logo2} alt="logo" />
          <p>SCISSOR</p>
        </Link>
      </div>
      <div className='login'>
        <h3>login</h3>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <span>
            <input
              onChange={handleEmailChange}
              type="email"
              placeholder="email address"
              required
              value={email}
            />
          </span>
          <span>
            <input
              onChange={handlePassword}
              type="password"
              placeholder="password"
              required
              value={password}
            />
          </span>
          <button type="submit">login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p className='terms'>By signing in with an account, you agree to <br />scissor's <span>Terms of Service, Privacy Policy</span> and <span>Acceptable Use Policy.</span></p>
      </div>
      <Footer />
    </>
  );
}

export default Login;