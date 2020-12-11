
const express = require('express')
const { getEvent  , createEvent , editEvent , deleteEvent} = require('../controllers/events')
const {renewToken} = require('../middleware/renew-token')
const {check} = require('express-validator')
const { isDate } = require('../helpers/isDate')
const { validatorEvent } = require('../middleware/validator-events')

const router = express.Router()

router.use(renewToken)

router.get('/' , 
getEvent

)

router.post('/' , 
[
    check('title' , 'Title is required').not().isEmpty(),
    check('start' , 'Star date required').custom(isDate),
    check('end' , 'End date is requerid').custom(isDate),
    validatorEvent
],  
createEvent
)
router.put('/:id' , editEvent)
router.delete('/:id' , deleteEvent)

module.exports = router