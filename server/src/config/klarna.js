const environment = process.env.KLARNA_ENVIRONMENT || "playground";

const baseUrls = {
    playground: "https://api-na.playground.klarna.com",
    production: "https://api-na.klarna.com"
};

export const klarnaConfig = {
    baseUrl: baseUrls[environment],

    authorizationHeader: `Basic ${Buffer.from(
        `${process.env.KLARNA_USERNAME}:${process.env.KLARNA_PASSWORD}`
    ).toString("base64")}`
};