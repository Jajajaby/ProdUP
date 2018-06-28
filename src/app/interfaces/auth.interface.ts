export interface Auth {
   uid: string,
   email: string,
   emailVerified: boolean,
   creationTime: string,
   login: boolean,
   lastSignInTime?: string
} 