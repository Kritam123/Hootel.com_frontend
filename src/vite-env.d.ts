/// <reference types="vite/client" />


interface UserType {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignInFormData {
    email: string;
    password: string;
}