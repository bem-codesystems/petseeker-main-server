export interface IVet {
    type: VetType;
    contract: VetTributes;
    createdAt: number;
    updatedAt: number|null;
    name: string;
    email: string;
    classRegisterNumber: string;
    state: string;
    city: string;
    address: string;
    complement: string;
}

export enum VetType {
    Public,
    Particular
}

export enum VetTributes {
    PF,
    PJ,
}

class Vet implements IVet {
    type: VetType;
    contract: VetTributes;
    createdAt: number;
    updatedAt: number|null;
    name: string;
    email: string;
    classRegisterNumber: string;
    state: string;
    city: string;
    address: string;
    complement: string;
    constructor(type: VetType,contract: VetTributes, name: string, email: string,classRegisterNumber: string,state: string,city: string,address: string,complement: string,createdAt: number,updatedAt: number|null) {
        this.type = type;
        this.contract = contract;
        this.classRegisterNumber = classRegisterNumber;
        this.state = state;
        this.city = city;
        this.address = address;
        this.complement = complement;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default Vet;

