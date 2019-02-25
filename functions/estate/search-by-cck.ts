import Response from "@commons/response";
import { BadRequestException, handlerException, InternalServerException } from "@commons/exceptions";
import { EstateService } from "@services/estate-service";

module.exports.handler = async (event, context, callback) => {
    console.info(`HANDLER. Starting function: ${ context.functionName } ...`);

    try {
        if(!event.queryStringParameters) throw new BadRequestException('UV.PREDIAL.MSG.02');

        const params = event.queryStringParameters;

        if(!params.type || !params.locality || !params.region || !params.block || !params.lot || !params.level || !params.department) throw new BadRequestException('UV.PREDIAL.MSG.17');
        if(params.type.length != 1) throw new BadRequestException('UV.PREDIAL.MSG.23', { type: params.type });
        if(params.locality.length != 3) throw new BadRequestException('UV.PREDIAL.MSG.24', { locality: params.locality });
        if(params.region.length != 2) throw new BadRequestException('UV.PREDIAL.MSG.25', { region: params.region });
        if(params.block.length != 3) throw new BadRequestException('UV.PREDIAL.MSG.26', { block: params.block });
        if(params.lot.length != 3) throw new BadRequestException('UV.PREDIAL.MSG.27', { lot: params.lot });
        if(params.level.length != 2) throw new BadRequestException('UV.PREDIAL.MSG.28', { level: params.level });
        if(params.department.length != 3) throw new BadRequestException('UV.PREDIAL.MSG.29', { department: params.department });

        const result = await EstateService.getEstateByCck(params);

        console.info(`HANDLER. Ending function: ${ context.functionName } ...`);
        return Response.Ok({
            message: `Search by cadastral compound key. CCK: ${result.cck}`,
            estate: result.estate
        });
    }
    catch(errors) {
        console.error('HANDLER. Error exception.');
        if(!(errors instanceof InternalServerException)) return handlerException(errors);
        return handlerException(new InternalServerException('UV.PREDIAL.COMMON.500', { errors }));
    }
};