import { EstateRepository } from "@repositories/estate-repository";
import { OwnerRepository } from "@repositories/owner-repository";
import { ConflictException } from "@commons/exceptions";
import { Estate } from "@entities/index";

export class EstateService {

    static async createEstate(body: any) {
        console.info('SERVICE. Starting createEstate ...');

        const owner = await OwnerRepository.getByEmail(body.email);
        if(!owner) throw new ConflictException('UV.PREDIAL.MSG.14', { email: body.email });

        const estate = await EstateRepository.getByCfn(body.cfn);
        if(estate) throw new ConflictException('UV.PREDIAL.MSG.29', { cfn: body.cfn });
        
        body.owner = owner; // adding the owner to the request body
        const estateCreated = await EstateRepository.createEstate(body);
        if(!(estateCreated instanceof Estate)) throw new ConflictException('UV.PREDIAL.MSG.15');

        console.info('SERVICE. Ending createEstate ...');
        return estateCreated;
    }

}