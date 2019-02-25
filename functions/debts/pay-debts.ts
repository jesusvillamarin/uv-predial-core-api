import Response from "@commons/response";
import { BadRequestException, handlerException, InternalServerException } from "@commons/exceptions";
import { DebtService } from "@services/debt-service";

module.exports.handler = async (event, context, callback) => {
    console.info(`HANDLER. Starting function: ${ context.functionName } ...`);

    try {
        if(!event.body) throw new BadRequestException('UV.PREDIAL.MSG.02');

        const { keys } = JSON.parse(event.body);

        if(keys.length == 0) throw new BadRequestException('UV.PREDIAL.MSG.47');

        for (let ctc of keys) {
            if(ctc.length != 7) throw new BadRequestException('UV.PREDIAL.MSG.40', { ctc });
            if(isNaN(+ctc)) throw new BadRequestException('UV.PREDIAL.MSG.48', { ctc });
        }

        const result = await DebtService.updateDebtsStatus(keys);

        console.info(`HANDLER. Ending function: ${ context.functionName } ...`);
        return Response.Created({
            message: 'The transaction has been completed successfully.',
            result
        });
    }
    catch(errors) {
        console.error('HANDLER. Error exception.');
        if(!(errors instanceof InternalServerException)) return handlerException(errors);
        return handlerException(new InternalServerException('UV.PREDIAL.COMMON.500', { errors }));
    }
};