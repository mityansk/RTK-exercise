export interface IServerResponse<Type = null> {
  statusCode: number;
  message: string;
  data: Type;
  error?: string;
}
