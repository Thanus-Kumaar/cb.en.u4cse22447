import AppError from "../utils/appError.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(`[ERR]: ${err.name} - ${err.message}`);

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

export default errorHandler;
