import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    username: string;
    email?: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}


const loadAuthFromStorage = (): AuthState => {
    try {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            const parsed = JSON.parse(storedAuth);
            return {
                isAuthenticated: true,
                user: parsed.user,
                token: parsed.token,
            };
        }
    } catch (error) {
        console.error("Error loading auth from storage:", error);
    }
    return {
        isAuthenticated: false,
        user: null,
        token: null,
    };
};

const initialState: AuthState = loadAuthFromStorage();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{ username: string; token?: string }>
        ) => {
            state.isAuthenticated = true;
            state.user = { username: action.payload.username };
            state.token = action.payload.token || `token-${Date.now()}`;

            localStorage.setItem(
                "auth",
                JSON.stringify({
                    user: state.user,
                    token: state.token,
                })
            );
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;

            localStorage.removeItem("auth");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

