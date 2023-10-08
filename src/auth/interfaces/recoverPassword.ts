export interface RecoverPassword {
  email: string;
  code: string;
  password: string;
}

export interface CodeVerification {
  email: string;
  code: string;
}
