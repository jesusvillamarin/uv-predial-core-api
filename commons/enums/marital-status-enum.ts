export enum MaritalStatusEnum {
    UNMARRIED = 'UNMARRIED',
    MARRIED = 'MARRIED'
}

export const parseMaritalStatus = (value: string) => {

    if(!value)
        return null;
    
    switch (value) {
        case MaritalStatusEnum.UNMARRIED:
            return MaritalStatusEnum.UNMARRIED;

        case MaritalStatusEnum.MARRIED:
            return MaritalStatusEnum.MARRIED;
            
        default:
            return null;
    }
}