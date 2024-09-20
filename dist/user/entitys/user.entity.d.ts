export declare class UserEntity {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    celular: number;
    authConfirmToken?: string;
    isSelectedInfo: boolean;
    isSelectedPolicy: boolean;
    isVerified?: boolean;
    verificationCode?: number;
    createdAt?: Date;
    confirmPassword: string;
}
