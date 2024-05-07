// errorHandler.js

const errorHandler = (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err);
  
    // Check if the error is a known type and handle it accordingly
    switch (err.name) {
      case 'ValidationError':
        return res.status(400).json({ error: err.message }); // Bad request due to validation error
      case 'UnauthorizedError':
        return res.status(401).json({ error: 'Unauthorized' }); // Unauthorized access
      case 'NotFound':
        return res.status(404).json({ error: 'Not Found' }); // Resource not found
      default:
        // For all other errors, send a generic error response
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = errorHandler;