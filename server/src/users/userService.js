import User from './userModel';
import {
  sign
} from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import {
  SECRET_KEY,
  ETHEREUM_URL
} from '../constants';
import NotFoundError from '../errors/notFoundError';
import mongoose from 'mongoose';
import ProcessEntityError from '../errors/processEntityError';

import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_URL));


class UserService {

  async createUser(user, role) {
    const existingUser = await User.findOne({
      'username': user.username
    });

    if (existingUser) {
      throw new ProcessEntityError(`Username ${user.username} already exists`);
    }
    try {
      const newUser = new User();
      newUser.username = user.username;
      newUser.passwordHash = bcrypt.hashSync(user.password);
      newUser.email = user.email;
      newUser.firstname = user.firstname;
      newUser.lastname = user.lastname;
      newUser.publicKey = web3.personal.newAccount(user.password);
      newUser.roles = [role];

      await newUser.save();

      return newUser.toDto();
    } catch (err) {
      console.log(err);
      throw new Error(`Unknown error`);
    }
  }

  async login(username, password) {
    const user = await User.findOne({
      'username': username
    });
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      throw new ProcessEntityError('username or password is incorrect');
    }

    const token = sign({
      sub: user._id,
      name: user.username,
      role: user.roles
    }, SECRET_KEY, {
      expiresIn: '2h'
    });

    return {
      token
    };
  }

  async getAll() {
    return (await User.find()).map(user => user.toDto());
  }

  async getById(userId) {
    const user = await mongoose.Types.ObjectId.isValid(userId) ?
      await User.findOne({
        '_id': userId
      }) : null;

    if (!user) {
      throw new NotFoundError(`User with id ${userId} was not found`);
    }
    return user.toDto();
  }

  async getByUsername(userName) {
    let query = {
      username: {
        $regex: `.*${userName}.*`,
        $options: 'i'
      }
    };

    return (await User.find(query)).map(user => user.toDto());
  }

  async searchByUsername(search) {
    return (await User.find({
      username: {
        $regex: `${search}.*`,
        $options: 'i'
      }
    })).map(user => user.toDto());
  }

  async update(id, user) {
    const existingUser = await mongoose.Types.ObjectId.isValid(id) ? await User.findById(id) : null;

    if (!existingUser) throw new NotFoundError(`User with id ${id} was not found`);

    if (existingUser.username !== user.username && await User.findOne({
        username: user.username
      })) {
      throw new ProcessEntityError('Username "' + user.username + '" is already taken');
    }

    if (user.password) {
      existingUser.passwordHash = bcrypt.hashSync(user.password);
    }

    Object.assign(existingUser, user);

    await existingUser.save();
  }

  async remove(id) {
    const existingUser = await mongoose.Types.ObjectId.isValid(id) ? await User.findById(id) : null;

    if (!existingUser) throw new NotFoundError(`User with id ${id} was not found`);

    await existingUser.remove();
  }
};

export default UserService;