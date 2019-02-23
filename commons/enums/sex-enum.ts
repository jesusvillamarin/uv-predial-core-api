export enum SexEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export const parseSex = (value: string) => {

    if(!value)
        return null;
    
    switch (value) {
        case SexEnum.MALE:
            return SexEnum.MALE;

        case SexEnum.FEMALE:
            return SexEnum.FEMALE;
            
        default:
            return null;
    }
}