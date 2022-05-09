const {Router} = require('express');
const controller = require('../controllers/guest');

const router = Router();

// router.post('/guestLogin/',controller.guestLogin);
router.post('/recruiter',controller.addRecruiter)
router.get('/recruiter', controller.getRecruiters)
router.get('/recruiter/:id',controller.getRecruiterById)
router.get('/recruiter/search/',controller.searchCandidates);
router.post('/recruiter/shortlist',controller.addToShortlist);
router.delete('/recruiter/shortlist/:id',controller.deleteShortlistedCandidate);
router.get('/recruiter/shortlist/:id', controller.getshortListedCandidates);



module.exports = router;