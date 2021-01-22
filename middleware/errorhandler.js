module.exports = (err, req, res, next) => {
  if(err.name === 'Validation Error'){
    const messages = err.message.map((e)=> (e.message))
    res.status(err.status).json({messages}) 
  } if (err.status) res.status(err.status).json({ message: err.message })
  else res.status(500).json({ message: 'Internal Server Error' })
}