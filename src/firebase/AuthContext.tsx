import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    logout: async () => { },
})

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubcrible = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubcrible;
    }, []);
    const logout = async () => {
        await signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}