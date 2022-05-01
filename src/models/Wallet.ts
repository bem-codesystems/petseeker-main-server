export enum WalletType {
    Regular,
    Crypto,
}

class Wallet {
    type: WalletType;
    id: string;
    balance: string;
    owner: string;
    isVerified: boolean;
    createdAt: number;
    updatedAt: number;
    constructor(type: WalletType,id: string,balance: string, owner: string, isVerified: boolean, createdAt: number,updatedAt: number) {
        this.type = type;
        this.id = id;
        this.balance = balance;
        this.owner = owner;
        this.isVerified = isVerified;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    };
}

export default Wallet;
