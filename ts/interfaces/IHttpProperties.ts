export default interface IHttpProperties {
  body?: BodyInit;
  endpoint: string;
  headers: HeadersInit,
  path: string,
}