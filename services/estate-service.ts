import { EstateRepository } from "@repositories/estate-repository";
import { OwnerRepository } from "@repositories/owner-repository";
import { ConflictException } from "@commons/exceptions";
import { Estate } from "@entities/index";

export class EstateService {

    static async getEstateByCfn(cfn: number) {
        console.info('SERVICE. Starting getEstateByCfn ...');

        const estate = await EstateRepository.getByCfn(cfn);
        if(!estate) throw new ConflictException('UV.PREDIAL.MSG.44', { cfn });

        console.info('SERVICE. Ending getEstateByCfn ...');
        return estate;
    }

    static async getEstateByCck(params: any) {
        console.info('SERVICE. Starting getEstateByCfn ...');
        const { type, locality, region, block, lot, level, department } = params;
        const cck = type + locality + region + block + lot + level + department;

        const estate = await EstateRepository.getByCck(type, locality, region, block, lot, level, department);
        
        if(!estate) throw new ConflictException('UV.PREDIAL.MSG.45', { cck });

        console.info('SERVICE. Ending getEstateByCfn ...');
        return { cck, estate };
    }

    static async createEstate(body: any) {
        console.info('SERVICE. Starting createEstate ...');

        const owner = await OwnerRepository.getByEmail(body.email);
        if(!owner) throw new ConflictException('UV.PREDIAL.MSG.14', { email: body.email });

        const estate = await EstateRepository.getByCfn(+body.cfn);
        if(estate) throw new ConflictException('UV.PREDIAL.MSG.30', { cfn: body.cfn });
        
        body.owner = owner; // adding the owner to the request body
        const estateCreated = await EstateRepository.createEstate(body);
        if(!(estateCreated instanceof Estate)) throw new ConflictException('UV.PREDIAL.MSG.15');

        console.info('SERVICE. Ending createEstate ...');
        return estateCreated;
    }

}