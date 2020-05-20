const express = require('express');
const router = express.Router();
const ROUTES = require('../../constants/routes.constant');
const apiHelper = require('../../helpers/api.helper');
const User = require('../../models/user.model');
const ERROR_LITERALS = require('../../constants/error-literals.constant');
const joiMiddleware = require('../../middlewares/joi.middleware');
const { createUser } = require('../../joi-validators/user.validator');

router.post(`${ROUTES.USER.CREATE_USER.URL}`, joiMiddleware(createUser), async (req, res) => {
    try {
        const { body } = req;
        const userInstance = new User({
            ...body
        });
        const user = await userInstance.save();
        if (user && Object.keys(user).length) {
            return apiHelper.success(res, { user }, ERROR_LITERALS.USER.CREATE_USER);
        }
        return apiHelper.success(res, { users }, ERROR_LITERALS.USER.CREATE_USER_ERR);
    } catch (error) {
        return apiHelper.failure(res, [error], ERROR_LITERALS.CATCH.ERR);
    }
});

router.put(`${ROUTES.USER.UPDATE_USER.URL}`, async (req, res) => {
    try {
        const userId = req.params;
        if (userId) {
            const { body } = req;
            const user = await User.find({ id: +userId.id });
            if (user && Object.keys(user).length) {
                const user = await User.update({
                    ...body
                });
                if (user && Object.keys(user).length) {
                    return apiHelper.success(res, {}, ERROR_LITERALS.USER.UPDATE_USER);
                }
                return apiHelper.success(res, { users }, ERROR_LITERALS.USER.UPDATE_USER_ERR);
            }
            return apiHelper.success(res, { user }, ERROR_LITERALS.USER.USER_NOT_FOUND);
        } else {
            return apiHelper.failure(res, [], ERROR_LITERALS.USER.USER_ID);
        }
    } catch (error) {
        return apiHelper.failure(res, [error], ERROR_LITERALS.CATCH.ERR);
    }
});

router.delete(`${ROUTES.USER.DELETE_USER.URL}`, async (req, res) => {
    try {
        const userId = req.params;
        if (userId) {
            const user = await User.remove({ id: +userId.id });
            if (user && Object.keys(user).length) {
                return apiHelper.success(res, {}, ERROR_LITERALS.USER.DELETE_USER);
            }
            return apiHelper.success(res, { user }, ERROR_LITERALS.USER.DELETE_USER_ERR);
        } else {
            return apiHelper.failure(res, [], ERROR_LITERALS.USER.DELETE_UDER_ID);
        }
    } catch (error) {
        return apiHelper.failure(res, [error], ERROR_LITERALS.CATCH.ERR);
    }
});

router.get(`${ROUTES.USER.GET_ALL_USERS.URL}`, async (req, res) => {
    try {
        const users = await User.find();
        if (users && users.length) {
            return apiHelper.success(res, { users }, ERROR_LITERALS.USER.GET_ALL_USERS);
        }
        return apiHelper.success(res, { users }, ERROR_LITERALS.USER.USER_NOT_FOUND);
    } catch (error) {
        return apiHelper.failure(res, [error], ERROR_LITERALS.CATCH.ERR);
    }
});

router.get(`${ROUTES.USER.GET_USER_BY_ID.URL}`, async (req, res) => {
    try {
        const userId = req.params;
        if (userId) {
            const user = await User.find({ id: +userId.id });
            if (user && Object.keys(user).length) {
                return apiHelper.success(res, { user }, ERROR_LITERALS.USER.GET_USER);
            }
            return apiHelper.success(res, { user }, ERROR_LITERALS.USER.USER_NOT_FOUND);
        } else {
            return apiHelper.failure(res, [], ERROR_LITERALS.USER.USER_ID);
        }
    } catch (error) {
        return apiHelper.failure(res, [error], ERROR_LITERALS.CATCH.ERR);
    }
});

router.get(`${ROUTES.USER.SEARCH_API.URL}`, async (req, res) => {
    try {
        const searchInput = req.params;
        console.log(searchInput.input);
        const data = await User.find({ $text: { $search: searchInput.input } });
        if (data && data.length) {
            return apiHelper.success(res, { user }, ERROR_LITERALS.USER.SEARCH);
        }
        return apiHelper.success(res, { user }, ERROR_LITERALS.USER.SEARCH_ERR);
    } catch (error) {
        return apiHelper.failure(res, [error], ERROR_LITERALS.CATCH.ERR);
    }
});

module.exports = router;