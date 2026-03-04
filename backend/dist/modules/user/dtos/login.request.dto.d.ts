import z from "zod";
export declare const LoginUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.z.core.$strip>;
export type LoginRequestDto = z.infer<typeof LoginUserSchema>;
//# sourceMappingURL=login.request.dto.d.ts.map