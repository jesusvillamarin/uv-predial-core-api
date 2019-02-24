import Response from "@commons/response";

module.exports.handler = async (event, context, callback) => {
    console.info(`HANDLER. Starting function: ${ context.functionName } ...`);

    return Response.Ok({
        message: 'List of debts'
    });
};