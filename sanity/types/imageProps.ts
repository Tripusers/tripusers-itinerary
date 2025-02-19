export type ImagePropsSanity = {
    asset: {
        _id: string;
        url: string;
        metadata: {
            lqip: string;
        };
    };
    hotspot?: {
        height: number;
        width: number;
        x: number;
        y: number;
    };
    crop?: {
        right: number;
        top: number;
        left: number;
        bottom: number;
    };
};