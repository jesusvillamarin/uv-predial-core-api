import { Connection, createConnection } from "typeorm";
import pool, { connectionOpts } from '@commons/connection'
import { Debt } from "@entities/index";
import { InternalServerException } from "@commons/exceptions";

export class DebtRepository {

    static async getByCtc(ctc: number) {
        console.info('REPOSITORY. Starting getByCtc ...');

        let conn: Connection;
        try {
            conn = await pool;
            if(!conn || !conn.isConnected)
                conn = await createConnection(connectionOpts);

            const debt = await Debt.getByCtc(ctc);
            if(!debt) return null;

            console.info('REPOSITORY. Ending getByCtc ...');
            return debt;
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

    static async createDebt(body: any) {
        console.info('REPOSITORY. Starting createDebt ...');

        let conn: Connection;
        try {
            conn = await pool;
            if(!conn || !conn.isConnected)
                conn = await createConnection(connectionOpts);

            const newDebt = new Debt;
            newDebt.ctc = body.ctc;
            newDebt.debtDate = new Date(body.debtDate);
            newDebt.initialTax = body.initialTax;
            newDebt.monthlyInterest = body.firstSurname;
            newDebt.totalInterest = body.totalInterest;
            newDebt.totalTax = body.totalTax;
            newDebt.estate = body.estate;
            const debtCreated = await newDebt.save();

            console.info('REPOSITORY. Ending createDebt ...');
            return debtCreated;
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

    static async updateDebtStatus(keys: number[]) {
        console.info('REPOSITORY. Starting updateDebtStatus ...');

        let conn: Connection;
        try {
            conn = await pool;
            if(!conn || !conn.isConnected)
                conn = await createConnection(connectionOpts);

            const result = await Debt.updateStatus(keys);

            console.info('REPOSITORY. Ending updateDebtStatus ...');
            return result;
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