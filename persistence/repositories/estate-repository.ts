import { Connection, createConnection } from "typeorm";
import pool, { connectionOpts } from '@commons/connection'
import { Estate } from "@entities/index";
import { InternalServerException } from "@commons/exceptions";

export class EstateRepository {

    static async getByCfn(cfn: number) {
        console.info('REPOSITORY. Starting getByCfn ...');

        let conn: Connection;
        try {
            conn = await pool;
            if(!conn || !conn.isConnected)
                conn = await createConnection(connectionOpts);

            const estate = await Estate.getByCfn(cfn);
            if(!estate) return null;

            console.info('REPOSITORY. Ending getByCfn ...');
            return estate;
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

    static async createEstate(body: any) {
        console.info('REPOSITORY. Starting createEstate ...');

        let conn: Connection;
        try {
            conn = await pool;
            if(!conn || !conn.isConnected)
                conn = await createConnection(connectionOpts);

            const newEstate = new Estate;
            newEstate.cfn = body.cfn;
            newEstate.type = body.type;
            newEstate.locality = body.locality;
            newEstate.region = body.region;
            newEstate.block = body.block;
            newEstate.lot = body.lot;
            newEstate.level = body.level;
            newEstate.department = body.department;
            newEstate.suburbName = body.suburbName;
            newEstate.streetName = body.streetName;
            newEstate.streetNumber = body.streetNumber;
            newEstate.apartmentNumber = body.apartmentNumber;
            newEstate.owner = body.owner;
            const estateCreated = await newEstate.save();

            console.info('REPOSITORY. Ending createEstate ...');
            return estateCreated;
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