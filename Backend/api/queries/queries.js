//Candidate queries
// const getCandidates = "SELECT * FROM jobberg_schema.fn_get_all_candidates()";
const getCandidates="SELECT * FROM jobberg_schema.users WHERE roles='candidate' and is_active='true'"
const checkUserEmailExists = "SELECT * FROM jobberg_schema.users WHERE email= $1 and is_active='true'";
const getCandidatePasswordByEmail = "SELECT * FROM jobberg_schema.users WHERE email=$1"
const addCandidate = "INSERT INTO jobberg_schema.users (first_name,last_name,email, password,roles,is_active) VALUES ($1,$2,$3,$4,'candidate','true')";
const addReturningCandidate = "SELECT * FROM jobberg_schema.fn_register_with_old_email($1, $2)";
const getCandidateIdByEmail="SELECT id FROM jobberg_schema.users WHERE email=$1";
const addDocuments="INSERT INTO jobberg_schema.candidate_bio (video_resume,certificate,resume,fk_candidate_id,highest_qualification,culture) VALUES ($1,$2,$3,$4,$5,$6)"
const getCandidateById="SELECT * FROM jobberg_schema.users where id=$1"

//Update candidate profile
const update_candi_profile = "select * from jobberg_schema.fn_update_candidate_profile($1, $2, $3, $4)";
const update_candi_bio = "select * from jobberg_schema.fn_update_candidate_bio($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";

//candidate delete profile from
const delete_account = "SELECT * FROM jobberg_schema.fn_delete_account_by_id($1)";

//Update password
const update_password = "SELECT * FROM jobberg_schema.fn_update_password($1, $2, $3)";

//Forgot password
const forgot_password = "SELECT * FROM jobberg_schema.fn_forgot_password($1, $2)";


const getUserRoleAndId = "SELECT id,roles FROM jobberg_schema.users where id =$1";
const getCandidateProfileById = "SELECT * FROM jobberg_schema.users users, jobberg_schema.candidate_bio bio WHERE users.id = $1 AND bio.fk_candidate_id = $1 AND users.is_active='true'"
const getCandidateProfiles = "SELECT * FROM jobberg_schema.users users, jobberg_schema.candidate_bio bio WHERE users.id = bio.fk_candidate_id AND users.is_active='true'";
const getCandidateProfilesByShortList = "SELECT * FROM jobberg_schema.users users, jobberg_schema.candidate_bio bio WHERE users.id = bio.fk_candidate_id AND is_active='true' ORDER BY bio.profile_hits DESC";

// const addDocuments="INSERT INTO jobberg_schema.candidate (profile_pic,resume,video_resume,certificate,fk_candidate_id) VALUES VALUES ($1,$2,$3,$4,$5)"



//Admin queries
const addAdmin = "INSERT INTO jobberg_schema.users (first_name,last_name,email, password,roles,is_active) VALUES ($1,$2,$3,$4,'admin','true')";
const getUsers="SELECT * FROM jobberg_schema.users"
const getActiveUsers="SELECT * FROM jobberg_schema.users where is_active='true'"
const getNonActiveUsers="SELECT * FROM jobberg_schema.users where is_active='false'"
const getAdmins="SELECT * FROM jobberg_schema.users WHERE roles='admin' and is_active='true'"
const removeUserById="UPDATE jobberg_schema.users SET is_active='false' WHERE id=$1";
const activeUserById="UPDATE jobberg_schema.users SET is_active='true' WHERE id=$1";

const getUserById="SELECT * FROM jobberg_schema.users where id=$1"

//Recruiter queries
const addRecruiter = "INSERT INTO jobberg_schema.users (first_name,last_name,email, password,roles,is_active,phone_number) VALUES ($1,$2,$3,$4,'recruiter','true',$5)";
const getRecruiters ="SELECT * FROM jobberg_schema.users WHERE roles='recruiter' and is_active='true'";
const getRecruiterById ="SELECT * FROM jobberg_schema.users WHERE roles='recruiter' AND id=$1 and is_active='true'";

//Search Queries
const search = "SELECT * FROM jobberg_schema.users users, jobberg_schema.candidate_bio bio WHERE users.id = bio.fk_candidate_id ";
const createNewMsg="INSERT INTO jobberg_schema.chats (fk_candidate_id,fk_guest_id,message,sender) VALUES($1,$2, $3, $4)"
const getMessages="SELECT * FROM jobberg_schema.chats WHERE fk_candidate_id=$1 AND fk_guest_id =$2";

//short list queries
const getRecruiterShortlist = "SELECT * FROM jobberg_schema.shortlists where fk_guest_id=$1";
const verifyShortlistedCandiExist= "SELECT * FROM jobberg_schema.shortlists where fk_guest_id=$1 AND fk_candidate_id=$2"
const addToShortList ="INSERT INTO jobberg_schema.shortlists (fk_guest_id, fk_candidate_id) VALUES ($1,$2)";
const removeShortlistCandidate="DELETE FROM jobberg_schema.shortlists WHERE fk_guest_id=$1 AND fk_candidate_id=$2 returning *";
const getshortListedCandidates="SELECT * FROM jobberg_schema.users users, jobberg_schema.candidate_bio bio, jobberg_schema.shortlists shortlist WHERE users.id =bio.fk_candidate_id AND users.is_active='true' AND shortlist.fk_candidate_id=users.id AND shortlist.fk_guest_id= $1"

//hits
const getHits="SELECT profile_hits FROM  jobberg_schema.candidate_bio WHERE fk_candidate_id=$1";
const addHits="UPDATE jobberg_schema.candidate_bio  SET profile_hits=$1 WHERE fk_candidate_id=$2";




//profile update queries
const updateCandidateProfile="UPDATE jobberg_schema.candidate_bio SET bio = $1, city = $2, skills = $3, experience = $4, interests = $5, job_title = $6, highest_qualification = $7, province=$8, education=$9, culture=$10 WHERE fk_candidate_id=$11";
const UserAccountUpdate= "UPDATE jobberg_schema.users SET phone_number = $1 where id=$2 ";
const UpdateProfilePic = "UPDATE jobberg_schema.candidate_bio SET profile_pic = $1 where fk_candidate_id=$2";
const updateResume = "UPDATE jobberg_schema.candidate_bio SET resume = $1 where fk_candidate_id=$2"
const updateVideoResume="UPDATE jobberg_schema.candidate_bio SET video_resume = $1 where fk_candidate_id=$2"
const updateCertificate="UPDATE jobberg_schema.candidate_bio SET certificate = $1 where fk_candidate_id=$2"


const updatePassword = "UPDATE jobberg_schema.users SET password = $1 WHERE email=$2"

module.exports = {
    //admin queries
    addAdmin,
    getUsers,
    getActiveUsers,
    getNonActiveUsers,
    getAdmins,
    removeUserById,
    activeUserById,
    getUserById,


    //candidate queries
    getCandidates,
    checkUserEmailExists,
    addCandidate,
    addReturningCandidate,
    update_candi_profile,
    update_candi_bio,
    update_password,
    forgot_password,
    delete_account,
    // candidate_Login,
    // guest_Login,
    getCandidateIdByEmail,
    addDocuments,
    getCandidateById,
    getCandidatePasswordByEmail,
    getUserRoleAndId,
    getCandidateProfileById,

    //recruiter queries
    addRecruiter,
    getRecruiters,
    getRecruiterById,

    //Search
    search,
    getCandidateProfiles,

    //chats
    createNewMsg,
    getMessages,

    //shortlists
    getRecruiterShortlist,
    addToShortList,
    removeShortlistCandidate,
    verifyShortlistedCandiExist,
    getshortListedCandidates,

    //hits
    getCandidateProfilesByShortList,
    getHits,
    addHits,

    //updateProfiles
    updateCandidateProfile,
    UserAccountUpdate,
    UpdateProfilePic,
    updateResume,
    updateVideoResume,
    updateCertificate,
    updatePassword



};
