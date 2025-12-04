import { TLegalInfo } from "./legal.validation";
export declare const legalService: {
    createOrUpdateLegal: (payload: TLegalInfo) => Promise<{
        id: string;
        updatedAt: Date;
        privacyPolicy: string;
        about: string;
        termsConditions: string;
    }>;
    getLegalInfo: () => Promise<{
        id: string;
        updatedAt: Date;
        privacyPolicy: string;
        about: string;
        termsConditions: string;
    } | null>;
};
//# sourceMappingURL=legal.service.d.ts.map