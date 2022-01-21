const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const container = require('../startup/container');
container.loadModules(['repositories/*.js','services/*.js','database/models/*.js']);
require('dotenv').config();

const jwtOptions = {
  secretOrKey: process.env.SECRET_JWT,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    console.log(payload.id)
    const user = await container.cradle.UserService.getById(payload.id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const strategyJwt = new JwtStrategy(jwtOptions, jwtVerify);


module.exports = strategyJwt;