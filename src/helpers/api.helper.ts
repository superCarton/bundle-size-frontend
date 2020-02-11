export class RequestFailedError extends Error {
  constructor(public messages: string[]) {
    super(`[Request error]: ${messages.join(', ')}`);
  }
}

/**
 * prepares the url to be called
 * @param url base url to be used
 * @param queryParameters key value pair with the parameters. If the value is undefined, the key is dropped
 */
export function prepareUrl(url: string, queryParameters: { [key: string]: string | undefined } = {}) {
  const queryPart = Object.keys(queryParameters)
    .filter((name) => typeof queryParameters[name] !== 'undefined')
    .map((name) => `${name}=${encodeURIComponent(queryParameters[name])}`)
    .join('&');

  const paramsPrefix = url.indexOf('?') > -1 ? '&' : '?';

  return url + (!queryPart ? '' : paramsPrefix + queryPart);
}

/**
 * Process GET call
 */
export async function processCall<T>(url: string, queryParameters: {[key: string]: any} = {}): Promise<T> {
  const builtUrl = prepareUrl(url, queryParameters);
  try {
    const res = await fetch(builtUrl);
    const body = await res.text();
    const parsed = body ? JSON.parse(body) : undefined;
    return parsed as T;
  } catch (e) {
    throw new RequestFailedError([e]);
  }
}
