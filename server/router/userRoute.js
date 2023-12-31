import { Router } from "express"
import { authenticateUser, changePassword, registerUser, updateUser, logout } from "../Controllers/usersController.js"
import { auth } from "../middlewares/auth.js"

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
router.route('/update/:email').put(auth, updateUser)

/** To change password 
 * @param oldPassword
 * @param newPassword
*/
router.route('/change-password').put(auth, changePassword)

/** To log user out */
router.route('/logout').get(logout)

export default router