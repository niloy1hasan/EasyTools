import useAxios from '@/Hooks/useAxios';
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
    const axiosInstance = useAxios();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [config, setConfig] = useState([]);
    const [configLoading, setConfigLoading] = useState(true);
    const [theme, setTheme] = useState([]);
    // const createUser = (email, password) =>{
    //     setLoading(true);
    //     return createUserWithEmailAndPassword(auth, email, password);
    // }

    // const loginUser = (email, password) => {
    //     setLoading(true);
    //     return signInWithEmailAndPassword(auth, email, password);
    // }

    // const googleSignIn = () => {
    //     setLoading(true);
    //     return signInWithPopup(auth, googleProvider);
    //   }

    // const logoutUser = () => {
    //     setLoading(true);
    //     return signOut(auth);
    // }

    // const updateUserProfile = (profile) => {
    //     return updateProfile(auth.currentUser, profile);
    // }

    // const addUserOnDb = async(newUser) => {
    // const url = '/users';

    // try {
    //     const res = await axiosInstance.post(url, newUser);
    //     console.log(res.data);
    //     return res.data;
    // } catch (error) {
    //     console.error(error);
    //     throw error;
    // }
    // };


    //     const isUserExist = (email) => {
    //         const url = `/users/${email}`;
    //         return axiosInstance.get(url);
    //     }

    //     const getDBUser = async(email) => {
    //           const token = await auth.currentUser.getIdToken();
    //           console.log(`jwt token: ${token.slice(0, 30)}...`);
    //         try {
    //             const res = await axiosInstance.get(`/users/${email}`, {
    //                 headers: {
    //                     authorization : `Bearer ${token}`
    //                 }
    //             });
    //             return res.data;
    //         } catch (error) {
    //             console.error(error);
    //             throw error;
    //         }
    //     }


    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    //         if (currentUser) {
    //         try {
    //             const dbUser = await getDBUser(currentUser.email);
    //             setUser({ ...currentUser, ...dbUser });
    //         } catch (error) {
    //             console.error(error);
    //             setUser(currentUser);
    //         }
    //         } else {
    //         setUser(null);
    //         }
    //         setLoading(false);
    //     });

    //     return () => unsubscribe();
    // }, []);


    useEffect(() => {
        const loadConfiguration = async () => {
            try {
               
            } catch (error) {
                
            } finally {
                setConfigLoading(false);
            }
        };
        loadConfiguration();
    }, []);

    // useEffect(()=>{
    //     const serverTheme = {primary_color: config.primary_color, secondary_color: config.secondary_color};
    //     const currentTheme = buildTheme(serverTheme);
    //     setTheme(currentTheme);
    // }, [config]);


    const authInfo = {
        // user,
        // setUser,
        // loading,
        // createUser,
        // loginUser,
        // googleSignIn,
        // logoutUser,
        // updateUserProfile,
        // addUserOnDb,
        // isUserExist

        config,
        setConfig,
        configLoading,
        theme,
        setTheme
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;