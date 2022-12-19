import { z } from 'zod';
import __ from 'lodash';
import { Response } from 'express';
import { Prisma } from '@prisma/client';


// ZOD error handling
// https://github.com/colinhacks/zod/blob/master/ERROR_HANDLING.md

const Schemas = {
  newsletter: z.object({
    name: z.string({}).min(3, "Name must be at least 3 characters"),
    email: z.string().email('email must be valid email address'),
    subscribe: z.boolean().nullish().default(false)
  }).strict(),
};

// Extract types from schema
export type Newsletter = z.infer<typeof Schemas.newsletter>

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
    // Throw error
    const validated = Schemas[schema].parse(body);

    const { data, error, message } = await func(validated);

    if (error) {
      throw new Error(error);
    }

    return response.status(200).json({
      data,
      message: message || 'Successful',
      status: 'success',
      code: 200,
    });

  } catch (err: any) {

    let errors: any = [];

    if (err instanceof Prisma.PrismaClientKnownRequestError) {

      errors = parsePrismaErrors(err);
    }
    else if (err instanceof z.ZodError) {

      errors = parseZodErrors(err);
    }
    else {

      errors = err.errors;
    }

    const isErrorArray = Array.isArray(errors) && errors.length > 0

    return response.status(422).json({
      errors: isErrorArray ? errors : undefined,
      status: 'failed',
      code: 422,
    });
  }
};

function parsePrismaErrors(err: Prisma.PrismaClientKnownRequestError) {

  const errors: string[] = []

  if (err.code === 'P2002') {
    // @ts-ignore
    const target: string = err.meta.target.split('_')[1]
    const column = __.capitalize(target);
    errors.push(`${column} is already exist`);
  }

  return errors;
}

function parseZodErrors(zodError: z.ZodError): string[] {

  const errors: string[] = [];
  zodError.issues.forEach((issue: z.ZodIssue) => {

    const fieldName = issue.path[0];

    errors.push(`${fieldName} field ${issue.message}`)
  });

  return errors;
}
