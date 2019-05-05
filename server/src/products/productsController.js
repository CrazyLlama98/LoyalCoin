import {
  Router
} from 'express';
import ProductService from './productService';
import {
  RETAILER_ROLENAME,
  ADMIN_ROLENAME
} from '../constants';
import {
  authorize
} from '../middlewares/jwt';

const productService = new ProductService();
const router = new Router({
  mergeParams: true
});

router.get('/', getAllByRetailer);

router.post('/', authorize([ADMIN_ROLENAME, RETAILER_ROLENAME]), addProduct);

router.delete('/:productId', authorize([ADMIN_ROLENAME, RETAILER_ROLENAME]), removeProduct);

function getAllByRetailer(req, res, next) {
  var retailerId = req.params.retailerId;

  productService.getByRetailer(retailerId)
    .then((products) => res.json(products))
    .catch(err => next(err));
}

function addProduct(req, res, next) {
  if (req.user.sub !== req.params.retailerId && (!req.user.role || !req.user.role.includes(ADMIN_ROLENAME))) {
    res.status(401).send();
  } else {

    var newProduct = {
      price: req.body.price,
      retailerId: req.params.retailerId,
      title: req.body.title,
      description: req.body.description
    };

    productService.add(newProduct)
      .then(product => res.json(product))
      .catch(err => next(err));
  }
}

function removeProduct(req, res, next) {
  if (req.user.sub !== req.params.retailerId && (!req.user.role || !req.user.role.includes(ADMIN_ROLENAME))) {
    res.status(401).send();
  } else {

    productService.remove(req.params.productId, req.params.retailerId)
      .then(() => res.status(204).send())
      .catch(err => next(err));
  }
}

export default router;