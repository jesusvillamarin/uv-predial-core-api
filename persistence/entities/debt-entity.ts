import { Entity, BaseEntity, PrimaryColumn, Column, Timestamp, ManyToOne, JoinColumn } from 'typeorm';
import { PaymentStatusEnum } from '@commons/enums';
import { Estate } from './estate-entity';
import {getConnection} from "typeorm";

@Entity({ name: 'DEBT' })
export class Debt extends BaseEntity {

    @PrimaryColumn({
        name: 'CTC',
        type: 'int',
        generated: false,
        nullable: false
    })
    ctc: number;

    @Column({
        name: 'DEBT_DATE',
        type: 'date',
        nullable: false
    })
    debtDate: Date;

    @Column({
        name: 'INITIAL_TAX',
        type: 'decimal',
        precision: 8,
        scale: 2,
        nullable: false
    })
    initialTax: number;

    @Column({
        name: 'MONTHLY_INTEREST',
        type: 'float',
        precision: 5,
        scale: 2,
        nullable: false
    })
    monthlyInterest: number;

    @Column({
        name: 'TOTAL_INTEREST',
        type: 'float',
        precision: 5,
        scale: 2,
        nullable: false
    })
    totalInterest: number;

    @Column({
        name: 'TOTAL_TAX',
        type: 'decimal',
        precision: 8,
        scale: 2,
        nullable: false
    })
    totalTax: number;
    
    @Column({
        name: 'PAYMENT_STATUS',
        type: 'enum',
        enum: PaymentStatusEnum,
        nullable: false
    })
    paymentStatus?: PaymentStatusEnum;

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
    @JoinColumn({ name: "CFN_ESTATE" })
    estate: Estate;

    static getByCtc(ctc: number) {
        return this.createQueryBuilder('debt')
            .where('debt.ctc = :ctc', { ctc })
            .getOne();
    }

    static updateStatus = async (keys: number[]) => {
        // get a connection and create a new query runner:
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();

        // establish real database connection using query runner:
        await queryRunner.connect();

        // lets now open a new transaction:
        await queryRunner.startTransaction();

        let result = keys;
        try {
            // executing operations:
            for (let ctc of keys) {
                await queryRunner.manager.createQueryBuilder()
                .update(Debt)
                .set({paymentStatus: PaymentStatusEnum.LIQUIDATED})
                .where({ctc: ctc})
                .execute();
            }

            // commit transaction now:
            await queryRunner.commitTransaction();      
        } catch (err) {
            // rollback to the changes we made:
            await queryRunner.rollbackTransaction();

            result = null;
        } finally {
            // releasing query runner:
            await queryRunner.release();

            return result;
        }
    }

}