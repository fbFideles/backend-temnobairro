const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization

  if(!authHeader) {
    return response.status(401).json({ error: "Did not provided a token" })
  }

  const parts = authHeader.split(' ')

  if(parts.length != 2) {
    return response.status(401).json({ error: "Token error" })
  }
  
  const [ scheme, token ] = parts

  if(!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ error: "Token malformatted" })
  }

  jwt.verify(token, "5bf40166a4e755b78b65c778d22026e4", (error, decoded) => {
    if(error) {
      return response.status(401).json({ error: "Invalid token" })
    }

    request.userId = decoded.id
    return next()
  })
}