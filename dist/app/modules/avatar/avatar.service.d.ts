import { Avatar } from "@prisma/client";
import { TFile } from "../../interface/file.interface";
export declare const avatarServices: {
    createAvatar: (payload: Avatar, file: TFile) => Promise<{
        id: string;
        index: number;
        icon: string;
        price: number;
    }>;
    getAllAvatars: () => Promise<{
        id: string;
        index: number;
        icon: string;
        price: number;
    }[]>;
    updateAvatar: (id: string, payload: Partial<Avatar>, file?: TFile) => Promise<{
        id: string;
        index: number;
        icon: string;
        price: number;
    }>;
    deleteAvatar: (id: string) => Promise<{
        id: string;
        index: number;
        icon: string;
        price: number;
    }>;
    purchaseAvatar: (email: string, avatarId: string) => Promise<{
        avatarId: string;
        id: string;
        authId: string;
        date: Date;
    }>;
    getMyPurchasedAvatars: (id: string) => Promise<{
        avatar: {
            id: string;
            icon: string;
            price: number;
        };
    }[]>;
};
//# sourceMappingURL=avatar.service.d.ts.map