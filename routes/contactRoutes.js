const express = require("express");
const verifyToken = require("../middleware/validatetokenHandler.js");

const router = express.Router();
const {
    getContacts,
    createContact, 
    getContact, 
    updateContact, 
    deleteContact
} = require('../Controller/controller.js');

router.use(verifyToken);
/* Route same method different  */
router.route('/').get(getContacts).post(createContact);

// router.route('/').post(createContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);
// router.route('/:id').put(updateContact);
// router.route('/:id').delete(deleteContact);


module.exports = router;