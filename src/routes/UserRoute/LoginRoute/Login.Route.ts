import { Request, Response, NextFunction, Router, RouterOptions } from 'express'

import UserService from '../../../services/UserService/User.Service'
import * as userErrors from '../../../exceptions/CustomErrors/UserErrors/UserRouteErrors/index'
import Validations from '../../../middlewares/Validations.Middleware'

import UserJoiSchema from '../../../middlewares/JoiSchemas/UserSchema/UserJoiSchema'

import * as passport from 'passport'
import * as initPassport from '../../../middlewares/PassportAuth/passportConfig'

class LoginRouteClass {
  router: Router
  private UserService: UserService

  constructor() {
    this.router = Router()
    this.UserService = new UserService()
    initPassport.initialize(passport)
    this.initRoutes()
  }

  async loginRoute(req: Request, res: Response, next: NextFunction) {
    try {
      const _user = req.body
      const user = await this.UserService.FindUserByUsername(_user.username)
      res.render('main')
    } catch (e) {
      next(new userErrors.errs.UserRouteError(e.message))
    }
  }

  initRoutes() {
    this.router.get('/login', (req: Request, res: Response) => {
      req.flash('error')
      res.render('login', { message: '' })
    })
    this.router.post('/login', [
      passport.authenticate('local', {
        successRedirect: '/main',
        failureRedirect: '/login',
        failureFlash: true,
        failureMessage: 'Fail'
      })
    ])
  }
}

export const LoginRouter = new LoginRouteClass().router
