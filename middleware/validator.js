const Joi = require('joi');

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()[\]-])[A-Za-z\d@$!%*?&.#^()[\]-]{8,}$/;

exports.signupSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({ tlds: { allow: ['com', 'net'] } }),

  password: Joi.string().required().pattern(passwordPattern).messages({
    'string.pattern.base':
      'Password must contain at least 8 characters, including uppercase, lowercase, number, and one special character (@$!%*?&.#^()[]-)',
  }),
});

exports.signinSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({ tlds: { allow: ['com', 'net'] } }),

  password: Joi.string().required().pattern(passwordPattern).messages({
    'string.pattern.base':
      'Password must contain at least 8 characters, including uppercase, lowercase, number, and one special character (@$!%*?&.#^()[]-)',
  }),
});

exports.acceptCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ['com', 'net'] },
    }),

  providedCode: Joi.string() // ← Changed to string
    .length(6)
    .pattern(/^\d{6}$/) // ← Must be exactly 6 digits
    .required()
    .messages({
      'string.length': 'Verification code must be exactly 6 digits',
      'string.pattern.base': 'Verification code must contain only numbers',
      'any.required': 'Verification code is required',
    }),
});


exports.changePasswordSchema = Joi.object({
  newPassword: Joi.string()
  .required()
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.#^()[\\]-])[A-Za-z\\d@$!%*?&.#^()[\\]-]{8,}$')),
  oldPassword: Joi.string()
  .required()
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.#^()[\\]-])[A-Za-z\\d@$!%*?&.#^()[\\]-]{8,}$')),
});

exports.FPCodeSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({ tlds: { allow: ['com', 'net'] } }),

  providedCode: Joi.string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required(),
});


exports.createPostSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(60)
    .required(),
    
  description: Joi.string()
    .min(3)
    .max(600)
    .required(),
    userId: Joi.string().required(),
});