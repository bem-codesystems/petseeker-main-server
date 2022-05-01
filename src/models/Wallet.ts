enum WalletType {
    Regular,
    Crypto,
}

class Wallet {
    type: WalletType;
    id: string;
    balance: string;
    owner: string;
    isVerified: boolean;
    constructor(type: WalletType,id: string,balance: string, owner: string, isVerified: boolean) {
        this.type = type;
        this.id = id;
        this.balance = balance;
        this.owner = owner;
        this.isVerified = isVerified;
    };
}

export default Wallet;
