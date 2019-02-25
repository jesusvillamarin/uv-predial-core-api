import Response from "@commons/response";
import { BadRequestException, handlerException, InternalServerException } from "@commons/exceptions";
import { parseSex, parseMaritalStatus } from "@commons/enums";
import UVPredialUtils from "@commons/uv-predial-utils";
import { OwnerService } from "@services/owner-service";

module.exports.handler = async (event, context, callback) => {
    console.info(`HANDLER. Starting function: ${ context.functionName } ...`);

    try {
        if(!event.body) throw new BadRequestException('UV.PREDIAL.MSG.02');

        const body = JSON.parse(event.body);

        if(!body.name || !body.firstSurname) throw new BadRequestException('UV.PREDIAL.MSG.03');
        if(!body.sex || !body.maritalStatus) throw new BadRequestException('UV.PREDIAL.MSG.04');
        if(!body.birthdate || !body.birthplace) throw new BadRequestException('UV.PREDIAL.MSG.05');
        if(!body.phoneNumber) throw new BadRequestException('UV.PREDIAL.MSG.06');
        if(!parseSex(body.sex)) throw new BadRequestException('UV.PREDIAL.MSG.07', { sex: body.sex });
        if(!parseMaritalStatus(body.maritalStatus)) throw new BadRequestException('UV.PREDIAL.MSG.08', { status: body.maritalStatus });
        if(!Date.parse(body.birthdate)) throw new BadRequestException('UV.PREDIAL.MSG.09', { date: body.birthdate });
        if(isNaN(+body.phoneNumber) || body.phoneNumber.length != 10) throw new BadRequestException('UV.PREDIAL.MSG.10', { number: body.phoneNumber });
        if(body.email && !UVPredialUtils.validateEmailFormat(body.email)) throw new BadRequestException('UV.PREDIAL.MSG.11', { email: body.email });

        const owner = await OwnerService.createOwner(body);

        console.info(`HANDLER. Ending function: ${ context.functionName } ...`);
        return Response.Created({
            message: 'The owner has been created.',
            owner
        });
    }
    catch(errors) {
        console.error('HANDLER. Error exception.');
        if(!(errors instanceof InternalServerException)) return handlerException(errors);
        return handlerException(new InternalServerException('UV.PREDIAL.COMMON.500', { errors }));
    }
};