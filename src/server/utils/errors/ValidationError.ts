import HttpException from '../../exceptions/HttpException';

enum ErrorSource {
  INTERNAL = 'internal',
}

class ValidationError extends HttpException {
  constructor(err: any) {
    super(err);

    this.setStatus(422);

    const { name, details } = err;
    const [error] = details;

    this.setResponseData({
      source: ErrorSource.INTERNAL,
      statusCode: this.status,
      name,
      message: error.message,
    });
  }
}

export default ValidationError;
