import { Router } from "express";

import { getCards, getCreatedCards, saveCard } from "../Controllers/cardsController.js"
import { auth } from "../middlewares/auth.js"

const router = Router();


/** See only public cards */
router.route('/public').get(getCards);

/** See all the flash cards and user must be authenticated 
 * params: username
 */
router.route('/:email').get(auth, getCreatedCards);

/** Save the flash cards and user must be authenticated 
 * /save
 * body: {
 * front: ''
 * back: ''
 * createdBy: ''
 * share: boolean
 * }
 */
router.route('/save').post(auth, saveCard);

export default router;