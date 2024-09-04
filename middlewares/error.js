class ErrorHandler extends Error {
   constructor(message, statusCode) {
     super(message);
     this.statusCode = statusCode;
 
     // Capture the stack trace (useful for debugging)
     if (Error.captureStackTrace) {
       Error.captureStackTrace(this, this.constructor);
     }
   }
 }
 
 export const errorMiddleware = (err, req, res, next) => {
   // Set default values for message and status code if not provided
   err.message = err.message || "Internal Server Error";
   err.statusCode = err.statusCode || 500;
 
   // Log error in development mode for debugging purposes
   if (process.env.NODE_ENV === "development") {
     console.error(err.stack);
   }
 
   // Send error response
   return res.status(err.statusCode).json({
     success: false,
     message: err.message,
     ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Only include stack in development
   });
 };
 
 // Export the ErrorHandler as a named export
 export { ErrorHandler };
 