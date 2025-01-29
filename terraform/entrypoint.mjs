export const handler = async (event, context) => {
    return {
        statusCode: 200,
        body: "Hello from Lambda!",
        headers: {
            'Content-Type': 'text/plain',
        },
    };
};
