import { Connection, createConnection } from "typeorm";
import pool, { connectionOpts } from '@commons/connection'
import { Owner } from "@entities/index";
import { InternalServerException } from "@commons/exceptions";

export class OwnerRepository {

    static async getByEmail(email: string) {
        console.info('REPOSITORY. Starting getByEmail ...');

        let conn: Connection;
        try {
            conn = await pool;
            if(!conn || !conn.isConnected)
                conn = await createConnection(connectionOpts);

            const owner = await Owner.getByEmail(email);
            if(!owner) return null;

            console.info('REPOSITORY. Ending getByEmail ...');
            return owner;
        }
        catch(errors) {
            console.error('REPOSITORY. Error exception.');
            if(conn) {
                try {
                    await conn.close();
                }
                catch(errors) {
                    console.error('Error when trying to close the connection to the database.');
                    throw new InternalServerException('UV.PREDIAL.COMMON.500', { errors });
                }
            }

            throw new InternalServerException('UV.PREDIAL.COMMON.500', { errors });
        }
    }

    static async createOwner(body: any) {
        console.info('REPOSITORY. Starting createOwner ...');

        let conn: Connection;
        try {
            conn = await pool;
            if(!conn || !conn.isConnected)
                conn = await createConnection(connectionOpts);

            const newOwner = new Owner;
            newOwner.name = body.name;
            newOwner.firstSurname = body.firstSurname;
            newOwner.secondSurname = body.secondSurname? body.secondSurname : null;
            newOwner.sex = body.sex;
            newOwner.maritalStatus = body.maritalStatus;
            newOwner.birthdate = new Date(body.birthdate);
            newOwner.birthplace = body.birthplace;
            newOwner.phoneNumber = body.phoneNumber;
            newOwner.email = body.email? body.email : null;
            const ownerCreated = await newOwner.save();

            console.info('REPOSITORY. Ending createOwner ...');
            return ownerCreated;
        }
        catch(errors) {
            console.error('REPOSITORY. Error exception.');
            if(conn) {
                try {
                    await conn.close();
                }
                catch(errors) {
                    console.error('Error when trying to close the connection to the database.');
                    throw new InternalServerException('UV.PREDIAL.COMMON.500', { errors });
                }
            }

            throw new InternalServerException('UV.PREDIAL.COMMON.500', { errors });
        }
    }

}