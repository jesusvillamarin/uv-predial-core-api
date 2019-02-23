export enum PaymentStatusEnum {
    PENDING = 'PENDING',
    LIQUIDATED = 'LIQUIDATED'
}

export const parsePaymentStatus = (value: string) => {

    if(!value)
        return null;
    
    switch (value) {
        case PaymentStatusEnum.PENDING:
            return PaymentStatusEnum.PENDING;

        case PaymentStatusEnum.LIQUIDATED:
            return PaymentStatusEnum.LIQUIDATED;
            
        default:
            return null;
    }
}