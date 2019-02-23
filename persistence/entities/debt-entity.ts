import { Entity, BaseEntity, PrimaryColumn, Column, Timestamp, ManyToOne, Double } from 'typeorm';
import { PaymentStatusEnum } from '@commons/enums';
import { Estate } from './estate-entity';

@Entity({ name: 'DEBT' })
export class Debt extends BaseEntity {

    @PrimaryColumn({
        name: 'CTC',
        type: 'int',
        length: 7,
        generated: false,
        nullable: false
    })
    ctc: number;

    @Column({
        name: 'DEBT_DATE',
        type: 'date',
        nullable: false
    })
    debtDate?: Date;

    @Column({
        name: 'INITIAL_TAX',
        type: 'decimal',
        precision: 8,
        scale: 2,
        nullable: false
    })
    initialTax?: number;

    @Column({
        name: 'MONTHLY_INTEREST',
        type: 'float',
        precision: 5,
        scale: 2,
        nullable: false
    })
    monthlyInterest?: number;

    @Column({
        name: 'TOTAL_INTEREST',
        type: 'float',
        precision: 5,
        scale: 2,
        nullable: false
    })
    totalInterest?: number;

    @Column({
        name: 'TOTAL_TAX',
        type: 'decimal',
        precision: 8,
        scale: 2,
        nullable: false
    })
    totalTax?: number;
    
    @Column({
        name: 'PAYMENT_STATUS',
        type: 'enum',
        enum: PaymentStatusEnum,
        nullable: false
    })
    paymentStatus: PaymentStatusEnum;

    @Column({
        name: 'CREATION_DATE',
        type: 'timestamp',
        nullable: false
    })
    creationDate?: Timestamp;

    @Column({
        name: 'MODIFICATION_DATE',
        type: 'timestamp',
        nullable: false
    })
    modificationDate?: Timestamp;

    @ManyToOne(type => Estate, estate => estate.debts)
    estate: Estate;

}