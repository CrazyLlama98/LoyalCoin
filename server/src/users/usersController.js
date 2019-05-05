import {
  Router
} from 'express';
import UserService from './userService';
import TransactionService from '../transactions/transactionService';
import {
  USER_ROLENAME,
  RETAILER_ROLENAME,
  ADMIN_ROLENAME
} from '../constants';
import {
  authorize
} from '../middlewares/jwt';

const userService = new UserService();
const transactionService = new TransactionService();
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/retailers/register', authorize(ADMIN_ROLENAME), registerRetailer);

router.get('/', get);
router.get('/:id', getById);
router.get('/authenticated/current', getCurrent);
router.get('/search/:username', search);

router.put('/:id', update);

router.delete('/:id', remove);

function register(req, res, next) {
  let user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstname: req.body.firstName,
    lastname: req.body.lastName
  };

  userService.createUser(user, USER_ROLENAME)
    .then((newUser) =>
      transactionService.addGasToUser(newUser.publicKey, 0.100)
      .then(() => res.json(newUser))
      .catch(err => userService.remove(newUser.id).then(() => next(err))))
    .catch(err => next(err));
}

function registerRetailer(req, res, next) {
  let user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  userService.createUser(user, RETAILER_ROLENAME)
    .then((newUser) =>
      transactionService.addGasToUser(newUser.publicKey, 5)
      .then(() => transactionService.addAwarder(newUser.publicKey).then(() => res.json(newUser)))
      .catch(err => userService.remove(newUser.id).then(() => next(err)))
    )
    .catch(err => {
      next(err);
    });
}

function login(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  userService.login(username, password)
    .then(token => res.json(token))
    .catch(err => next(err));
}

function get(req, res, next) {
  const username = req.query.username;

  if (!username)
    userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
  else
    userService.getByUsername(username)
    .then(user => res.json(user))
    .catch(err => next(err));
}

function getById(req, res, next) {
  const userId = req.params.id;

  userService.getById(userId)
    .then(user => res.json(user))
    .catch(err => next(err));
}

function search(req, res, next) {
  const username = req.params.username;

  userService.searchByUsername(username)
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  const userId = req.user.sub;

  userService.getById(userId)
    .then(user => res.json(user))
    .catch(err => next(err));
}

function update(req, res, next) {
  const userId = req.params.id;
  const currentUser = req.user.sub;

  if (userId != currentUser)
    res.status(401).send();
  else {
    var user = {
      username: req.body.username,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      password: req.body.password,
      email: req.body.email
    }
    Object.keys(user).forEach(key => user[key] === undefined && delete user[key]);

    userService.update(userId, user)
      .then(() => res.status(204).send())
      .catch(err => next(err));
  }
}

function remove(req, res, next) {
  const userId = req.params.id;
  const currentUser = req.user.sub;

  if (userId != currentUser)
    res.status(401).send();
  else
    userService.remove(userId)
    .then(() => res.status(204).send())
    .catch(err => next(err));
}

export default router;