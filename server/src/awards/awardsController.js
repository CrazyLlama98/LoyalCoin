import {
  Router
} from 'express';
import AwardService from './awardService';
import {
  RETAILER_ROLENAME,
  ADMIN_ROLENAME
} from '../constants';
import {
  authorize
} from '../middlewares/jwt';

const awardService = new AwardService();
const router = new Router({
  mergeParams: true
});

router.get('/', getAllByRetailer);

router.post('/', authorize([ADMIN_ROLENAME, RETAILER_ROLENAME]), addAward);

router.delete('/:awardId', authorize([ADMIN_ROLENAME, RETAILER_ROLENAME]), removeAward);

function getAllByRetailer(req, res, next) {
  var retailerId = req.params.retailerId;

  awardService.getByRetailer(retailerId)
    .then((awards) => res.json(awards))
    .catch(err => next(err));
}

function addAward(req, res, next) {
  if (req.user.sub !== req.params.retailerId && (!req.user.role || !req.user.role.includes(ADMIN_ROLENAME))) {
    res.status(401).send();
  } else {

    var award = {
      amount: req.body.amount,
      retailerId: req.params.retailerId,
      title: req.body.title
    };

    awardService.add(award)
      .then(award => res.json(award))
      .catch(err => next(err));
  }
}

function removeAward(req, res, next) {
  if (req.user.sub !== req.params.retailerId && (!req.user.role || !req.user.role.includes(ADMIN_ROLENAME))) {
    res.status(401).send();
  } else {

    awardService.remove(req.params.awardId, req.params.retailerId)
      .then(award => res.json(award))
      .catch(err => next(err));
  }
}

export default router;