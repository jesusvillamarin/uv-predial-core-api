import Response from "@commons/response";

module.exports.handler = async (event, context, callback) => {
    console.info(`HANDLER. Starting function: ${ context.functionName } ...`);

    const { ctc } = event.pathParameters;

    return Response.Ok({
        message: `Details of debt with CTC: ${ ctc }`
    })
};