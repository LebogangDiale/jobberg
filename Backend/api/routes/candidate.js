const {Router} = require('express');
const router = Router();


const controller = require('../controllers/candidates');



const multer  = require('multer');
const docUploader = multer({ dest: 'documents/' });
const vidUploader = multer({ dest: 'videos/' });
const resumeUploader = multer({ dest: 'resumes/' });
const imageUploader = multer({ dest: 'images/' });

router.get('/candidates',controller.get_candidates);
router.get('/getAllProfiles',controller.getAllCandidateProfiles); 
router.get('/getAllProfilesShortList',controller.getAllProfilesByShortList); 
router.get('/candidate/:id',controller.getCandidateById)
router.put('/candidateProfile/:id',controller.updateCandidateProfileById); 
router.put('/candidatePic/:id',controller.updateProfilePictureById);
router.get('/candidate/profile/:id',controller.getCandidateProfileById);
router.post('/candidate',controller.addCandidate);
router.patch('/updateCandidate',controller.updateCandidate);
// router.post('/candidateLogin/',controller.candidateLogin);
// router.post('/login',controller.login)
router.delete('/deleteAccount/:id',controller.deleteAccount);
router.patch('/updatePassword/:id',controller.updatePassword);
router.patch('/forgotPassword', controller.forgotPassword);

router.post('/sendDocument', docUploader.single("documents"),controller.sendDoc);
router.post('/sendVideo', vidUploader.single("videos"),controller.sendVid);
router.post('/sendResume', resumeUploader.single("resumes"),controller.sendResume);
router.post('/sendPic/:id',imageUploader.single('images'), controller.uploadProfilePicture)
router.post('/updateResume/:id', resumeUploader.single("resumes"),controller.updateResume);
router.post('/updateVideoResume/:id', vidUploader.single("videos"),controller.updateVideoResume);
router.post('/updateCertificate/:id', vidUploader.single("documents"),controller.updateCertificate);

router.post('/sendAttachments',controller.attachDocs);


router.put('/hits/:id',controller.updateHits);
router.get('/hits/:id',controller.getHits);






module.exports = router;


// router.post('/sendDocument', docUploader.single("documents"),controller.sendDoc);