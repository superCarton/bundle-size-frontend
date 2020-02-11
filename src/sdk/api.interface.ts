export interface BundleSizeReply {
  data?: BundleSizes[];
  errors?: string[];
  warnings?: string[];
}

export interface BundleSizes {
  size: number;
  gzip: number;
  packageName: string;
  version: string;
}
