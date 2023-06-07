export default interface IHttpProperties {
  body?: BodyInit;
  baseUrl: string;
  headers: HeadersInit,
  path?: string,
}