import { Avatar } from "@prisma/client";
import { TFile } from "../../interface/file.interface";
export declare const avatarServices: {
    createAvatar: (payload: Avatar, file: TFile) => Promise<{
        id: string;
        index: number;
        icon: string;
    }>;
    getAllAvatars: () => Promise<{
        id: string;
        index: number;
        icon: string;
    }[]>;
    updateAvatar: (id: string, payload: Partial<Avatar>, file?: TFile) => Promise<{
        id: string;
        index: number;
        icon: string;
    }>;
    deleteAvatar: (id: string) => Promise<{
        id: string;
        index: number;
        icon: string;
    }>;
};
//# sourceMappingURL=avatar.service.d.ts.map