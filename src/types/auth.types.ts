export interface AuthToken {
  token: string | null;
  refreshToken: string | null;
}
export type AuthContextType = {
  authState: AuthToken;
  setUserAuthInfo: (data: AuthToken) => void;
  isUserAuthenticated: () => boolean;
  refreshToken: () => void;
};