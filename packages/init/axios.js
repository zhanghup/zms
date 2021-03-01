import axios from "axios";

class Axios {
  constructor() {
    this.http = axios.create();
  }

  setHeader(header = {}) {
    let common = this.http.defaults.headers.common;
    this.http.defaults.headers.common = { ...common, ...header };
  }

  requestInterceptor(success, error) {
    this.http.interceptors.request.use(success, error);
  }
  responseInterceptor(success, error) {
    this.http.interceptors.response.use(success, error);
  }

  request(data) {
    return this.http.request(data);
  }

  get(url, data) {
    return this.http.get(url, data);
  }

  delete(url, data) {
    return this.http.delete(url, data);
  }

  head(url, data) {
    return this.http.head(url, data);
  }

  post(url, data) {
    return this.http.post(url, data);
  }

  put(url, data) {
    return this.http.put(url, data);
  }

  patch(url, data) {
    return this.http.patch(url, data);
  }
}

export default new Axios();
