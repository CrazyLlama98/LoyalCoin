import expressJwt from 'express-jwt';
import UserService from '../users/userService';
import {
  SECRET_KEY
} from '../constants';

const userService = new UserService();

export default function jwt() {
  return expressJwt({
    secret: SECRET_KEY,
    isRevoked
  }).unless({
    path: [
      // public routes that don't require authentication
      '/api/users/login',
      '/api/users/register'
    ]
  });
}

async function isRevoked(req, payload, done) {
  try {
    let user = await userService.getById(payload.sub);
    if (!user) {
      return done(null, true);
    }
  } catch (error) {
    done(null, true);
  }

  done();
};

export function authorize(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    jwt(),
    (req, res, next) => {
      if (roles.length && !req.user.role.some(userRole => roles.includes(userRole))) {
        return res.status(401).json({
          message: 'Unauthorized'
        });
      }

      next();
    }
  ];
}