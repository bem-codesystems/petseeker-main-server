export enum PetType {
    Dog,
    Cat,
    Bird,
    Another,
}

export enum PetSize {
    SmallSize,
    MediumSize,
    BigSize,
}

export enum PetHealthState {
    Unknown,
    Healthy,
    Unhealthy,
}

class Pet {
    type: PetType;
    size: PetSize;
    healthState: PetHealthState;
    pics: any[];
    constructor(type: PetType,size: PetSize, healthState: PetHealthState, pics: any[]) {
        this.type = type;
        this.size = size;
        this.healthState = healthState;
        this.pics = pics;
    }
    updatePics(picBlob: string) {
        this.pics.push(picBlob);
    }
}

export default Pet;


