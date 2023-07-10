import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth, CreateUserFn } from '../../context/AuthContext';
import { FirebaseError } from 'firebase/app';
import logo1 from "../../assets/Vector (3).png"
import logo2 from "../../assets/Vector 2.png"
import './Signup.css'
import Footer from '../Footer/Footer';

function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('');
  const navigate = useNavigate()

  const { createUser }: { createUser: CreateUserFn } = UserAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('password do not match, try again');
      return;
    }

    try {
      if (typeof createUser === 'function') {
        await createUser(email, password);
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

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const getErrorMessage = (error: Error): string => {
    if (error.name === 'FirebaseError') {
      const firebaseError = error as FirebaseError;
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          return 'Email already exist. Try signing in.';
        case 'auth/weak-password':
          return 'Password should be at least 6 characters.';
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
      <div className='signup'>
        <h3>create account</h3>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <span>
            <input
              onChange={handleEmailChange}
              type="email"
              placeholder="email"
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
          <span>
            <input
              onChange={handleConfirmPassword}
              type="password"
              placeholder="Retype password"
              required
              value={confirmPassword}
            />
          </span>
          <p className='password'>6 or more characters, one number, one uppercase & one lower case.</p>
          <button type="submit">sign up with Email</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <p className='terms'>By signing in with an account, you agree to <br />scissor's <span>Terms of Service, Privacy Policy</span> and <span>Acceptable Use Policy.</span></p>
      </div>
      <Footer />
    </>
  );
}

export default Signup;