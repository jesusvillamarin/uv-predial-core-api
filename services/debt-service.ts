import { DebtRepository } from "@repositories/debt-repository";
import { EstateRepository } from "@repositories/estate-repository";
import { ConflictException, InternalServerException } from "@commons/exceptions";
import { Debt } from "@entities/index";
import Response from "@commons/response";

export class DebtService {

    static async createDebt(body: any) {
        console.info('SERVICE. Starting createDebt ...');

        const estate = await EstateRepository.getByCfn(body.cfn);
        if(!estate) throw new ConflictException('UV.PREDIAL.MSG.31', { cfn: body.cfn });

        const debt = await DebtRepository.getByCtc(body.ctc);
        if(debt) throw new ConflictException('UV.PREDIAL.MSG.32', { ctc: body.ctc });
        
        body.estate = estate; // adding the estate to the request body
        const debtCreated = await DebtRepository.createDebt(body);
        if(!(debtCreated instanceof Debt)) throw new ConflictException('UV.PREDIAL.MSG.33');
        delete debtCreated.estate.debts;

        console.info('SERVICE. Ending createDebt ...');
        return debtCreated;
    }

    static async updateDebtsStatus(keys: number[]) {
        console.info('SERVICE. Starting updateDebtsStatus ...');

        for (let ctc of keys) {
            const debt = await DebtRepository.getByCtc(ctc);
            if(!debt) throw new ConflictException('UV.PREDIAL.MSG.49', { ctc });
        }

        const result = await DebtRepository.updateDebtStatus(keys);
        if(!result) throw new ConflictException('UV.PREDIAL.MSG.46');

        console.info('SERVICE. Ending updateDebtsStatus ...');
        return result;
    }

}