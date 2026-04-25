export interface ICompanyResolver {
  resolve(userId: string): Promise<string | null>;
}
