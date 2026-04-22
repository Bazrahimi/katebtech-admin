import z from "zod";
export declare const sessionSchema: z.ZodObject<{
    userId: z.ZodCoercedNumber<unknown>;
    expiresAt: z.ZodPipe<z.ZodUnion<readonly [z.ZodISODateTime, z.ZodDate]>, z.ZodTransform<Date, string | Date>>;
    extra: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, z.core.$strip>;
//# sourceMappingURL=schema.d.ts.map