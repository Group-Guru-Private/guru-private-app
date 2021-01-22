
class ErrorHandler {
    static handle(err, req, res, next) {
      let status = 500;
      console.log(err)
      let msg = 'Internal Server Error';
      if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        msg = err.errors.map(element => {
          return element.message;
        });
        msg = msg.join(', ');
        status = 400;
      } else if(err.name === 'UserUnauthorized' || err.name === 'JsonWebTokenError') {
        msg = 'You have no permission to access';
        status = 401;
      } else if(err.name === 'NotFound') {
        msg = 'Error, not found';
        status = 404;
      } else if(err.name === 'WrongEmailPassword') {
        msg = 'Email/password incorrect';
        status = 401;
      } else if(err.name === 'OutOfAuthority') {
        msg = 'You are out of authority';
        status = 401;
      }
      res.status(status).json({ message: msg });
    }
  }
  
  module.exports = ErrorHandler;
