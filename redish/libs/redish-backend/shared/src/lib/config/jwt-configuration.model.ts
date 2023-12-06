export interface JwtConfiguration {
  secret: string;
  expiry: string;
  refreshSecret: string;
  refreshExpiry: string;
}
