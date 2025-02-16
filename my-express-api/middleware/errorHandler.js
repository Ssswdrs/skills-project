import InternalServerError from 'http-errors';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error("Error ===> ",err);
  // if the error is safe to expose to client
  if (err.expose === true) {
    res.status(err.status || 500).send(err);
  } else {
    res.status(500).send(InternalServerError());
  }
};

export default errorHandler;