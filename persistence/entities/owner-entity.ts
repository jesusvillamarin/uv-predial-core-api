import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany } from 'typeorm';
import { SexEnum, MaritalStatusEnum } from '@commons/enums';
import { Estate } from './estate-entity';

@Entity({ name: 'OWNER' })
export class Owner extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: 'ID',
        type: 'int',
    })
    id: number;

    @Column({
        name: 'NAME',
        type: 'varchar',
        length: 30,
        nullable: false
    })
    name: string;

    @Column({
        name: 'FIRST_SURNAME',
        type: 'varchar',
        length: 30,
        nullable: false
    })
    firstSurname: string;

    @Column({
        name: 'SECOND_SURNAME',
        type: 'varchar',
        length: 30,
        nullable: true
    })
    secondSurname?: string;

    @Column({
        name: 'SEX',
        type: 'enum',
        enum: SexEnum,
        nullable: false
    })
    sex: SexEnum;

    @Column({
        name: 'MARITAL_STATUS',
        type: 'enum',
        enum: MaritalStatusEnum,
        nullable: false
    })
    maritalStatus: MaritalStatusEnum;

    @Column({
        name: 'BIRTHDATE',
        type: 'date',
        nullable: false
    })
    birthdate: Date;

    @Column({
        name: 'BIRTHPLACE',
        type: 'varchar',
        length: 50,
        nullable: false
    })
    birthplace: string;

    @Column({
        name: 'PHONE_NUMBER',
        type: 'varchar',
        length: 10,
        nullable: false
    })
    phoneNumber: string;

    @Column({
        name: 'EMAIL',
        type: 'varchar',
        length: 50,
        nullable: true
    })
    email?: string;

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

    @OneToMany(type => Estate, estate => estate.owner)
    estate: Estate[];

    static getByEmail(email: string) {
        return this.createQueryBuilder('owner')
            .where('owner.email = :email', { email })
            .getOne();
    }

}