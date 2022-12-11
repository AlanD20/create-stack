import _ from 'yup';
import __ from 'lodash';
import { Response } from 'express';

const NAME_VALIDATOR = _.string()
  .typeError('Name must be string')
  .required('Name is required')
  .min(3, 'Name must be at least 3 characters');

const EMAIL_VALIDATOR = _.string()
  .typeError('Email is required')
  .required('Email is required')
  .email()
  .typeError('Invalid email format');


const Schemas = {
  question: _.object().shape({
    name: NAME_VALIDATOR,
    email: EMAIL_VALIDATOR,
  }),
};

interface ValidatorState {
  response: Response;
  schema: keyof typeof Schemas;
  body: object;
}

export const validator = async (
  { response, schema, body }: ValidatorState,
  func: Function
) => {
  try {
    const validated = await Schemas[schema].camelCase().validate(body, {
      strict: true,
      stripUnknown: true,
      abortEarly: false,
    });

    const { data, error, message } = await func(validated);

    if (error) {
      throw new Error(error);
    }

    return response.status(200).json({
      message: message || 'Successful',
      status: 'success',
      code: 200,
      ...data,
    });
  } catch (err: any) {
    let errors = err.errors || [];

    // if (err instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (err.code === 'P2002') {
    //     const column = __.capitalize(err.meta.target.split('_')[1]);
    //     errors.push(`${column} is already exist`);
    //   }
    // }

    return response.status(422).json({
      message: `${err}`,
      errors: errors.length > 0 ? errors : undefined,
      status: 'failed',
      code: 422,
    });
  }
};
