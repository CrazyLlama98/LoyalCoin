import Award from './awardModel';
import mongoose from 'mongoose';
import NotFoundError from '../errors/notFoundError';
import ForbiddenError from '../errors/forbiddenError';
import UserService from '../users/userService';
import TransactionService from '../transactions/transactionService';

const userService = new UserService();
const transactionService = new TransactionService();

export default class AwardService {
  async getAll() {
    return (await Award.find()).map(award => award.toDto());
  }

  async getByRetailer(retailerId) {
    return (await Award.find({ retailerId })).map(award => award.toDto());
  }

  async getById(awardId) {
    const award = mongoose.Types.ObjectId.isValid(awardId) ?
      await User.findOne({
        '_id': awardId
      }) : null;

    if (!award) {
      throw new NotFoundError(`User with id ${userId} was not found`);
    }
    return award.toDto();
  }

  async add(award) {
    var retailer = await userService.getById(award.retailerId);

    var newAward = new Award(award);
    await newAward.save();

    var result = await transactionService.addAward(newAward.id.toString(), retailer.publicKey);

    if (!result) {
      newAward.remove();
      throw new Error();
    }

    return newAward.toDto();
  }

  async update(id, award) {
    const existingAward = mongoose.Types.ObjectId.isValid(id) ? await Award.findById(id) : null;

    if (!existingAward) throw new NotFoundError(`Award with id ${id} was not found`);

    var retailer = await userService.getById(existingAward.retailerId);

    if (!retailer) throw new NotFoundError("Retailer was not found");

    Object.assign(existingAward, award);

    await existingAward.save();
  }

  async remove(id, retailerId) {
    const existingAward = mongoose.Types.ObjectId.isValid(id) ? await Award.findById(id) : null;

    if (!existingAward) throw new NotFoundError(`Award with id ${id} was not found`);

    if (retailerId !== existingAward.retailerId.toString()) throw new ForbiddenError("You are not the owner of this award");

    var retailer = await userService.getById(existingAward.retailerId);

    await transactionService.deleteAward(id.toString(), retailer.publicKey);

    await existingAward.remove();
  }
}