import Response from "@commons/response";
import { BadRequestException, handlerException, InternalServerException } from "@commons/exceptions";
import { EstateService } from "@services/estate-service";
import UVPredialUtils from "@commons/uv-predial-utils";

module.exports.handler = async (event, context, callback) => {
    console.info(`HANDLER. Starting function: ${ context.functionName } ...`);

    try {
        if(!event.body) throw new BadRequestException('UV.PREDIAL.MSG.02');

        const body = JSON.parse(event.body);

        if(!body.cfn) throw new BadRequestException('UV.PREDIAL.MSG.16');
        if(!body.type || !body.locality || !body.region || !body.block || !body.lot || !body.level || !body.department) throw new BadRequestException('UV.PREDIAL.MSG.17');
        if(!body.suburbName || !body.streetName) throw new BadRequestException('UV.PREDIAL.MSG.18');
        if(!body.streetNumber || !body.apartmentNumber) throw new BadRequestException('UV.PREDIAL.MSG.19');
        if(!body.email) throw new BadRequestException('UV.PREDIAL.MSG.20');
        if(!UVPredialUtils.validateEmailFormat(body.email)) throw new BadRequestException('UV.PREDIAL.MSG.11', { email: body.email });
        if(isNaN(+body.cfn)) throw new BadRequestException('UV.PREDIAL.MGS.21', { cfn: body.cfn });
        if(body.cfn.length != 8) throw new BadRequestException('UV.PREDIAL.MGS.22', { cfn: body.cfn });
        if(body.type.length != 1) throw new BadRequestException('UV.PREDIAL.MGS.23', { type: body.type });
        if(body.locality.length != 3) throw new BadRequestException('UV.PREDIAL.MGS.24', { locality: body.locality });
        if(body.region.length != 2) throw new BadRequestException('UV.PREDIAL.MGS.25', { region: body.region });
        if(body.block.length != 3) throw new BadRequestException('UV.PREDIAL.MGS.26', { block: body.block });
        if(body.lot.length != 3) throw new BadRequestException('UV.PREDIAL.MGS.27', { lot: body.lot });
        if(body.level.length != 2) throw new BadRequestException('UV.PREDIAL.MGS.28', { level: body.level });
        if(body.department.length != 3) throw new BadRequestException('UV.PREDIAL.MGS.29', { department: body.department });

        const estate = await EstateService.createEstate(body);

        console.info(`HANDLER. Ending function: ${ context.functionName } ...`);
        return Response.Ok({
            message: 'The estate has been created.',
            estate
        });
    }
    catch(errors) {
        console.error('HANDLER. Error exception.');
        if(errors instanceof BadRequestException) return handlerException(errors);
        return handlerException(new InternalServerException('UV.PREDIAL.COMMON.500', { errors }));
    }
};