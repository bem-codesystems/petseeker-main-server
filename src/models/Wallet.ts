export interface IWallet {
    type: WalletType;
    id: string;
    balance: number;
    owner: string;
    isVerified: boolean;
    createdAt: number;
    updatedAt: number|null;
}

export enum WalletType {
    Regular,
    Crypto,
}

class Wallet {
    type: WalletType;
    id: string;
    balance: number;
    owner: string;
    isVerified: boolean;
    createdAt: number;
    updatedAt: number|null;
    constructor(type: WalletType,id: string,balance: number, owner: string, isVerified: boolean, createdAt: number,updatedAt: number|null) {
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
