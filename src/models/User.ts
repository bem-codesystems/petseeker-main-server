class User {
    id: string;
    name: string;
    email: string;
    createdAt: number;
    hasWallet: boolean;
   constructor(id: string,name: string,email: string,createdAt: number,hasWallet: boolean){
       this.id = id;
       this.name = name;
       this.email = email;
       this.createdAt = createdAt;
       this.hasWallet = hasWallet;
   };
}

export default User;
