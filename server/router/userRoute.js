import { Router } from "express"
import { authenticateUser, changePassword, registerUser, updateUser } from "../Controllers/usersController"
import { auth } from "../middlewares/auth"

const router = Router()

/** To register user
 * @param name
 * @param email
 * @param mobile
 * @param password
 * @param profile
 */
router.route('/register').post(registerUser)

/** To authenticate user
 * @param email
 * @param password
 */
router.route('/auth').post(authenticateUser)

/**To update user details
 * @param email
 * @param mobile
 * @param name
 * @param profile
 */
router.route('/update').put(auth, updateUser)

/** To change password 
 * @param oldPassword
 * @param newPassword
*/
router.route('/change-password').put(auth, changePassword)

/** To log user out */
router.route('/logout').get(auth, logout)

export default router