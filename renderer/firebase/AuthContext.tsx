import { createContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router";


// interface IAuth {
//     user: User | null;
// }
// TODO: 유저 찾기
export const AuthContext = createContext<any>({})

interface AuthProviderProps {
    children: React.ReactNode;
}
  

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
                // console.log("authcontext", user); 
            }
                
            else {
                // User is signed out
                setUser(null);
                router.push("/login");
            };
            });

        return () => {
            unsub();
        };
    }, []);

    const memoedValue = useMemo(
        () => ({
            user,
        }),
        [user]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
          {children}
        </AuthContext.Provider>
      );
}