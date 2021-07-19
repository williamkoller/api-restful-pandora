export interface HasherComparer {
  compare: (plaintext: string, digest: string) => Promise<boolean>;
}
