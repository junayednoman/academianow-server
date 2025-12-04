import { Admin } from "@prisma/client";
import { TFile } from "../../interface/file.interface";
export declare const adminServices: {
    getProfile: (email: string) => Promise<{
        phone: string | null;
        email: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        profileImage: string | null;
    }>;
    updateProfile: (email: string, payload: Partial<Admin>, file?: TFile) => Promise<{
        phone: string | null;
        email: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        profileImage: string | null;
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map