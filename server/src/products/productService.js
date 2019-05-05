import Product from './productModel';
import UserService from '../users/userService';
import NotFoundError from '../errors/notFoundError';
import ForbiddenError from '../errors/forbiddenError';
import mongoose from 'mongoose';

const userService = new UserService();

export default class ProductService {
  async add(product) {
    var retailer = await userService.getById(product.retailerId);

    if (!retailer) throw new NotFoundError("Retailer not found");

    var newProduct = new Product(product);
    await newProduct.save();

    return newProduct.toDto();
  }

  async getAll() {
    return (await Product.find()).map(product => product.toDto());
  }

  async getByRetailer(retailerId) {
    return (await Product.find({ retailerId })).map(product => product.toDto());
  }

  async update(id, product) {
    const existingProduct = mongoose.Types.ObjectId.isValid(id) ? await Product.findById(id) : null;

    if (!existingProduct) throw new NotFoundError(`Product with id ${id} was not found`);

    var retailer = await userService.getById(existingProduct.retailerId);
    if (!retailer) throw new NotFoundError("Retailer was not found");

    Object.assign(existingProduct, product);

    await existingProduct.save();
  }

  async remove(id, retailerId) {
    const existingProduct = mongoose.Types.ObjectId.isValid(id) ? await Product.findById(id) : null;

    if (!existingProduct) throw new NotFoundError(`Product with id ${id} was not found`);

    if (retailerId !== existingProduct.retailerId.toString()) throw new ForbiddenError("You are not the owner of this product");

    var retailer = await userService.getById(existingProduct.retailerId);
    if (!retailer) throw new NotFoundError("Retailer was not found");

    await existingProduct.remove();
  }
}