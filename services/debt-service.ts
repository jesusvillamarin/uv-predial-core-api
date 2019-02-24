import { DebtRepository } from "@repositories/debt-repository";
import { EstateRepository } from "@repositories/estate-repository";
import { ConflictException } from "@commons/exceptions";
import { Debt } from "@entities/index";

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

        console.info('SERVICE. Ending createDebt ...');
        return debtCreated;
    }

}