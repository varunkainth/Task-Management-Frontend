import Joi from "joi";

// Email schema
const emailSchema = Joi.string()
  .email({ tlds: { allow: false } }) // Allow all top-level domains
  .required()
  .messages({
    "string.empty": "Email is required.",
    "string.email": "Please enter a valid email address.",
  });

// Password schema
const passwordSchema = Joi.string()
  .min(6)
  .pattern(new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
  .required()
  .messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one number, and one special character.",
  });

// Name schema
const nameSchema = Joi.string()
  .min(2)
  .max(30)
  .required()
  .messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 2 characters long.",
    "string.max": "Name must be no longer than 30 characters.",
  });

// Phone number schema
const phoneNumberSchema = Joi.string()
  .pattern(new RegExp("^[0-9]+$"))
  .min(10)
  .max(15)
  .required()
  .messages({
    "string.empty": "Phone number is required.",
    "string.pattern.base": "Phone number must contain only digits.",
    "string.min": "Phone number must be at least 10 digits long.",
    "string.max": "Phone number must be no longer than 15 digits.",
  });

// Gender schema
const genderSchema = Joi.string()
  .valid("Male", "Female", "Other")
  .required()
  .messages({
    "any.only": "Gender must be Male, Female, or Other.",
    "any.required": "Gender is required.",
  });

// Date of Birth schema
const dobSchema = Joi.date()
  .less("now")
  .required()
  .messages({
    "date.base": "Date of birth must be a valid date.",
    "date.less": "Date of birth cannot be in the future.",
    "any.required": "Date of birth is required.",
  });

// Complete user validation schema
export const validateUser = (data: {
  name?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  gender?: string;
  dob?: Date | null;
}) => {
  const schema = Joi.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    phoneNumber: phoneNumberSchema,
    gender: genderSchema,
    dob: dobSchema,
  });

  return schema.validate(data, { abortEarly: false });
};
