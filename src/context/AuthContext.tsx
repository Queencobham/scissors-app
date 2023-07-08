import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import { auth } from "../firebase";

export type CreateUserFn = (email: string, password: string) => Promise<UserCredential>;
export type SignInUserFn = (email: string, password: string) => Promise<UserCredential>;
type LogoutFn = () => Promise<void>;

interface UserContextValues {
  createUser: CreateUserFn;
  user: User | null;
  signIn : SignInUserFn;
  logout: LogoutFn;
}

const UserContext = createContext<UserContextValues | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const createUser: CreateUserFn = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn: SignInUserFn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });

    // Check if there is a user already authenticated
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const contextValues: UserContextValues = {
    createUser,
    user,
    signIn,
    logout,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext)!;
};
