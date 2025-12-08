import { GoldPackage } from "@prisma/client";
export declare const goldPackageServices: {
    createGoldPackage: (payload: GoldPackage) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        golds: number;
    }>;
    getAllGoldPackages: () => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        golds: number;
    }[]>;
    getSingleGoldPackage: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        golds: number;
    } | null>;
    updateGoldPackage: (id: string, payload: Partial<GoldPackage>) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        golds: number;
    }>;
    deleteGoldPackage: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        golds: number;
    }>;
};
//# sourceMappingURL=goldPackage.service.d.ts.map