export interface IUser {
    id: string;
    name: string;
    email: string;
    createdAt: number;
    hasWallet: boolean;
    updatedAt: number;
}

class User {
    id: string;
    name: string;
    email: string;
    createdAt: number;
    hasWallet: boolean;
    updatedAt: number;
   constructor(id: string,name: string,email: string,createdAt: number,hasWallet: boolean, updatedAt: number){
       this.id = id;
       this.name = name;
       this.email = email;
       this.createdAt = createdAt;
       this.hasWallet = hasWallet;
       this.updatedAt = updatedAt;
   };
}

export default User;
