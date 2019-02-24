import { OwnerRepository } from "@repositories/owner-repository";
import { ConflictException } from "@commons/exceptions";
import { Owner } from "@entities/index";

export class OwnerService {

    static async createOwner(body: any) {
        console.info('SERVICE. Starting createOwner ...');

        const owner = await OwnerRepository.getByEmail(body.email);
        if(owner) throw new ConflictException('UV.PREDIAL.MSG.12', { email: body.email });
        
        const ownerCreated = await OwnerRepository.createOwner(body);
        if(!(ownerCreated instanceof Owner)) throw new ConflictException('UV.PREDIAL.MSG.13');

        console.info('SERVICE. Ending createOwner ...');
        return ownerCreated;
    }

}