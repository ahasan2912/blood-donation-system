import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // user Crete with email
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign in with email
    const userSignInEmail = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // sign in with google
    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    // update profile
    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    // signOut 
    const handleLogOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsbucribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // console.log(currentUser);
                setUser(currentUser);
            }
            else {
                setUser(currentUser);
            }
            setLoading(false);
        })

        return () => {
            unsbucribe();
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        userSignInEmail,
        loginWithGoogle,
        handleLogOut,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
