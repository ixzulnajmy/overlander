import type { Resolver } from 'react-hook-form'
import type { ZodSchema } from 'zod'

export function localZodResolver<TSchema extends ZodSchema<any>>(
  schema: TSchema
): Resolver<any> {
  return async (values) => {
    const result = await schema.safeParseAsync(values)
    if (result.success) return { values: result.data, errors: {} }

    const fieldErrors: Record<string, any> = {}
    for (const issue of result.error.issues) {
      const path = issue.path.join('.') || 'root'
      fieldErrors[path] = { type: issue.code, message: issue.message }
    }
    return { values: {}, errors: fieldErrors as any }
  }
}
