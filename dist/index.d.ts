type Uploader = "imgbb" | "smms";
export type UploaderConfig = {
    uploader?: Uploader;
    token: string;
};
export declare function persistImage(tempUrl: string, config: UploaderConfig): Promise<string>;
export {};
