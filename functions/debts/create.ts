import Response from "@commons/response";
import { BadRequestException, handlerException, InternalServerException } from "@commons/exceptions";
import { DebtService } from "@services/debt-service";

module.exports.handler = async (event, context, callback) => {
    console.info(`HANDLER. Starting function: ${ context.functionName } ...`);

    try {
        if(!event.body) throw new BadRequestException('UV.PREDIAL.MSG.02');

        const body = JSON.parse(event.body);

        if(!body.ctc) throw new BadRequestException('UV.PREDIAL.MSG.34');
        if(!body.debtDate) throw new BadRequestException('UV.PREDIAL.MSG.35');
        if(!body.initialTax || !body.totalTax) throw new BadRequestException('UV.PREDIAL.MSG.36');
        if(!body.monthlyInterest || !body.totalInterest) throw new BadRequestException('UV.PREDIAL.MSG.37');
        if(!body.cfn) throw new BadRequestException('UV.PREDIAL.MSG.38');
        if(isNaN(+body.ctc) || isNaN(+body.cfn)) throw new BadRequestException('UV.PREDIAL.MSG.39');
        if(body.ctc.length != 7) throw new BadRequestException('UV.PREDIAL.MGS.40', { ctc: body.ctc });
        if(body.cfn.length != 8) throw new BadRequestException('UV.PREDIAL.MGS.22', { cfn: body.cfn });
        if(!Date.parse(body.debtDate)) throw new BadRequestException('UV.PREDIAL.MSG.41', { date: body.debtDate });
        if(isNaN(+body.initialTax) || isNaN(+body.totalTax)) throw new BadRequestException('UV.PREDIAL.MSG.42');
        if(isNaN(+body.monthlyInterest) || isNaN(+body.totalInterest)) throw new BadRequestException('UV.PREDIAL.MSG.43');

        const debt = await DebtService.createDebt(body);

        console.info(`HANDLER. Ending function: ${ context.functionName } ...`);
        return Response.Ok({
            message: 'The debt has been created.',
            debt
        });
    }
    catch(errors) {
        console.error('HANDLER. Error exception.');
        if(errors instanceof BadRequestException) return handlerException(errors);
        return handlerException(new InternalServerException('UV.PREDIAL.COMMON.500', { errors }));
    }
};