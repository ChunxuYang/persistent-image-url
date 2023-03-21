export type UploaderConfig = {
    token: string;
};
export declare function persistImage(tempUrl: string, config: UploaderConfig): Promise<string>;
