class ErrorHandler {
    static handle(err, req, res, next) {
      let status = 500;
      console.log(err)
      let msg = 'Internal Server Error';
      if(err.name === 'Validation Error'){
        const messages = err.message.map((e)=> (e.message))
        res.status(err.status).json({messages}) 
      } 
      else if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        msg = err.errors.map(element => {
          return element.message;
        });
        msg = msg.join(', ');
        status = 400;
      } else if(err.name === 'TeacherUnauthorized' || err.name === 'JsonWebTokenError') {
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
      } else if (err.status) res.status(err.status).json({ message: err.message })
      res.status(status).json({ message: msg });
    }
  }
  
 module.exports = ErrorHandler;

//  class ErrorHandler {
//   static handle(err, req, res, next) {
//     let status = 500;
//     console.log(err)
//     let msg = 'Internal Server Error';
//     if(err.name === 'Validation Error'){
//       const messages = err.message.map((e)=> (e.message))
//       res.status(err.status).json({messages}) 
//     } 
//     else if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
//       msg = err.errors.map(element => {
//         return element.message;
//       });
//       msg = msg.join(', ');
//       status = 400;
//     }
//     res.status(status).json({ message: msg });
//   }

// }

// module.exports = ErrorHandler;

