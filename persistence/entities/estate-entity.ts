import { Entity, BaseEntity, PrimaryColumn, Column, Timestamp, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Owner } from './owner-entity';
import { Debt } from './debt-entity';

@Entity({ name: 'ESTATE' })
export class Estate extends BaseEntity {

    @PrimaryColumn({
        name: 'CFN',
        type: 'int',
        generated: false,
        nullable: false
    })
    cfn: number;

    @Column({
        name: 'TYPE',
        type: 'varchar',
        length: 1,
        nullable: false
    })
    type: string;

    @Column({
        name: 'LOCALITY',
        type: 'varchar',
        length: 3,
        nullable: false
    })
    locality: string;

    @Column({
        name: 'REGION',
        type: 'varchar',
        length: 2,
        nullable: false
    })
    region: string;

    @Column({
        name: 'BLOCK',
        type: 'varchar',
        length: 3,
        nullable: false
    })
    block: string;

    @Column({
        name: 'LOT',
        type: 'varchar',
        length: 3,
        nullable: false
    })
    lot: string;

    @Column({
        name: 'LEVEL',
        type: 'varchar',
        length: 2,
        nullable: false
    })
    level: string;

    @Column({
        name: 'DEPARTMENT',
        type: 'varchar',
        length: 3,
        nullable: false
    })
    department: string;

    @Column({
        name: 'SUBURB_NAME',
        type: 'varchar',
        length: 50,
        nullable: false
    })
    suburbName: string;

    @Column({
        name: 'STREET_NAME',
        type: 'varchar',
        length: 50,
        nullable: false
    })
    streetName: string;

    @Column({
        name: 'STREET_NUMBER',
        type: 'varchar',
        length: 10,
        nullable: false
    })
    streetNumber: string;

    @Column({
        name: 'APARTMENT_NUMBER',
        type: 'varchar',
        length: 10,
        nullable: false
    })
    apartmentNumber: string;

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

    @ManyToOne(type => Owner, owner => owner.estate)
    @JoinColumn({ name: "OWNER_ID" })
    owner: Owner;

    @OneToMany(type => Debt, debt => debt.estate)
    debts: Debt[];

    static getByCfn(cfn: number) {
        return this.createQueryBuilder('estate')
            .leftJoinAndSelect('estate.owner', 'owner')
            .leftJoinAndSelect('estate.debts', 'debts')
            .where('estate.cfn = :cfn', { cfn })
            .getOne();
    }

}