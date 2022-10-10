export interface IPet {
    id: string;
    type: PetType;
    size: PetSize;
    healthState: PetHealthState;
    pics: any[];
    createdAt: number;
    updatedAt?: number|null;
    updatePics?(pic: string): void;
}

export enum PetType {
    Dog = 0,
    Cat,
    Bird,
    Another,
}

export enum PetSize {
    SmallSize = 0,
    MediumSize,
    BigSize,
}

export enum PetHealthState {
    Unknown = 0,
    Healthy,
    Unhealthy,
}

class Pet implements IPet{
    id: string;
    type: PetType;
    size: PetSize;
    healthState: PetHealthState;
    pics: any[];
    createdAt: number;
    updatedAt: number|null;
    constructor(id: string,type: PetType,size: PetSize, healthState: PetHealthState, pics: any[],createdAt: number,updatedAt: number|null) {
        this.id = id;
        this.type = type;
        this.size = size;
        this.healthState = healthState;
        this.pics = pics;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    updatePics(picBlob: string) {
        this.pics.push(picBlob);
    }
}

export default Pet;


