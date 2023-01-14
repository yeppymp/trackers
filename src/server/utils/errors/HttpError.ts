import HttpException from '../../exceptions/HttpException';

enum ErrorSource {
  EXTERNAL = 'external',
}

class HttpError extends HttpException {
  constructor(err: any) {
    super(err);

    this.setStatus(err.response.status);

    const { response } = err.response.data;

    this.setResponseData({
      source: ErrorSource.EXTERNAL,
      statusCode: this.status,
      name: response?.status,
      message: response?.message,
    });
  }
}

export default HttpError;
