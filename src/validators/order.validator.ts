import Joi from 'joi';

const orderValidator = Joi.object({
  // todo нормальну валідацію для ордера
  age: Joi.number().min(0).max(100).messages({ 'number.base': 'From 0 to 100' }),
});

export { orderValidator };
