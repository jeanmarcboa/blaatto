export type User = {
  id: string;
  lastname: string;
  firstname: string;
  email: string;
  phoneNumber: string;
  username: string;
  passwordUpdated: boolean;
  resetPasswordTimestamp: number;
  resetPasswordToken: string;
  enabled: boolean;
  loginAttempt: number;
  roleId: string;
  createdAt: string;
  updatedAt: string;
};
