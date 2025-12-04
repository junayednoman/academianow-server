import { GoldPackage } from "@prisma/client";
export declare const goldPackageServices: {
    createGoldPackage: (payload: GoldPackage) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        golds: number;
        price: number;
    }>;
    getAllGoldPackages: () => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        golds: number;
        price: number;
    }[]>;
    getSingleGoldPackage: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        golds: number;
        price: number;
    } | null>;
    updateGoldPackage: (id: string, payload: Partial<GoldPackage>) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        golds: number;
        price: number;
    }>;
    deleteGoldPackage: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        golds: number;
        price: number;
    }>;
};
//# sourceMappingURL=goldPackage.service.d.ts.map