import Joi from "joi";

const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .required();

const passwordSchema = Joi.string()
  .min(6)
  .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
  .required()
  .messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one number, and one special character.",
  });

const userIdSchema = Joi.string()
  .pattern(new RegExp("^[0-9]{6,}$"))
  .required()
  .messages({
    "string.pattern.base":
      "User ID must be numeric and contain at least 6 digits.",
    "any.required": "User ID is required.",
  });

export const validateUser = (data: {
  email: string;
  password?: string;
  userId: string;
}) => {
  const schema = Joi.object({
    email: emailSchema,
    password: passwordSchema,
    userId: userIdSchema,
  });

  return schema.validate(data, { abortEarly: false });
};
