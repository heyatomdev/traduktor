import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    CHATGPT_API_KEY: Joi.string().required(),
    CHATGPT_API_URL: Joi.string().required(),
    DISCORD_TOKEN: Joi.string().required(),
    CLIENT_ID: Joi.string().required(),
    GUILD_ID: Joi.string().required(),
});
