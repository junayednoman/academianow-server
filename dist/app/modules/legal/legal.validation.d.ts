import { z } from "zod";
export declare const legalInfoZod: z.ZodObject<{
    privacyPolicy: z.ZodString;
    termsAndConditions: z.ZodString;
    aboutUs: z.ZodString;
}, z.core.$strip>;
export type TLegalInfo = z.infer<typeof legalInfoZod>;
//# sourceMappingURL=legal.validation.d.ts.map