import Response from "@commons/response";
import { BadRequestException, handlerException, InternalServerException } from "@commons/exceptions";
import { EstateService } from "@services/estate-service";

module.exports.handler = async (event, context, callback) => {
    console.info(`HANDLER. Starting function: ${ context.functionName } ...`);

    try {
        if(!event.queryStringParameters) throw new BadRequestException('UV.PREDIAL.MSG.01');

        const { cfn } = event.queryStringParameters;

        if(!cfn) throw new BadRequestException('UV.PREDIAL.MSG.16');
        if(isNaN(+cfn)) throw new BadRequestException('UV.PREDIAL.MGS.21', { cfn: cfn });
        if(cfn.length != 8) throw new BadRequestException('UV.PREDIAL.MGS.22', { cfn: cfn });

        const estate = await EstateService.getEstateByCfn(+cfn);

        console.info(`HANDLER. Ending function: ${ context.functionName } ...`);
        return Response.Ok({
            message: `Search by cadastral file number. CFN: ${estate.cfn}`,
            estate
        });
    }
    catch(errors) {
        console.error('HANDLER. Error exception.');
        if(errors instanceof BadRequestException) return handlerException(errors);
        return handlerException(new InternalServerException('UV.PREDIAL.COMMON.500', { errors }));
    }
};