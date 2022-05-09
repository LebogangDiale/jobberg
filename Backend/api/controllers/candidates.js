const pool = require('../../database');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');
const { cloudinary } = require('../../cloudinary/cloudinary');
const fs = require('fs');
const multer = require('multer')
require('dotenv').config();


const queries = require('../queries/queries');

const videoUrl = '';
const certificateUrl = '';
const resumeUrl = '';
const highestQualification = "";
const culture = "";
const imageUrl = "";


const getCandidateProfileById = async (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getCandidateProfileById, [id], (error, results) => {
        if (!results) return res.status(400).send("invalid input");
        if (!results.rows.length) {
            res.status(404).send('profile not found')
            //throw error
        } else {
            res.status(200).json(results.rows[0]);
        }

    })

}


const get_candidates = async (req, res) => {

    pool.query(queries.getCandidates, (error, results) => {
        if (this.error) {
            console.log(error);
            res.status(500).send(error);
            throw error;
        }
        res.status(200).json(results.rows)
    });
};

const getCandidateById = async (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getCandidateById, [id], (error, results) => {
        if (!results) return res.status(400).send("invalid input")
        if (!results.rows.length) {
            res.status(404).send('user not found')
            //throw error
        } else {
            res.status(200).json(results.rows);
        }
    });


};

//candidate registration
registeredUserId = 0;
registeredUserEmail = '';

const addCandidate = async (req, res) => {
    console.log('it works')
    this.registeredUserId = 'yes'
    var randomPassword = Math.random().toString(36).slice(-8);
    // console.log(randomPassword);
    const { first_name, last_name, email, highest_qualification, culture } = req.body;
    this.registeredUserEmail = email
    this.highestQualification = highest_qualification
    this.culture = culture;
    

    console.log(first_name + ' ' + last_name + ' ' + email + ' ' + randomPassword + ' ' + highest_qualification + '  ' + this.videoUrl + "  " + this.certificateUrl + "  " + this.resumeUrl)
    if (toString(randomPassword).length < 8) {
        res.status(400).json('Your Password should be longer than 7 characters');
    } else {

        // console.log(randomstring);
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(randomPassword, salt);

        // check if email exists
        pool.query(queries.checkUserEmailExists, [email], (error, results) => {
            console.log('email');
            console.log(results.rows.length)
            if (results.rows.length) {

                res.status(409).json({ error: "Email Already exists" });

            } else {

                //users can reactivate account
                pool.query(queries.addReturningCandidate, [email, randomPassword], (error, results) => {

                    let returnedCandidate = results.rows[0].fn_register_with_old_email;

                    if (returnedCandidate) {

                        addCandidateMailer(email, first_name, randomPassword);
                        res.status(201).json("Welcome back!");

                    } else {

                        pool.query(queries.addCandidate,
                            [first_name, last_name, email, passwordHash],
                            (error, results) => {
                                if (error) {
                                    res.status(500).json({ error: 'invalid input' })
                                    throw error;
                                } else {
                                    addCandidateMailer(email, first_name, randomPassword);
                                    getUserIdByEmail();
                                    res.status(201).json("User created successfully");
                                }
                            });
                    }
                });

            }
        })

    }
}


// login
const userIdSubmmittedy = ''
const login = async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;



    pool.query(queries.checkUserEmailExists, [email], (error, results) => {
        if (!results.rows.length) {
            res.status(404).json({ error: "email does not exist" });
        } else {
            console.log(password);
            pool.query(queries.getCandidatePasswordByEmail, [email], (error, results) => {
                console.log(results.rows[0]);
                const userIdSubmmitted = results.rows[0].id;
                const queryPassword = bcrypt.compareSync(password, results.rows[0].password);
                if (!queryPassword) {
                    res.status(404).json({ error: "Invalid password or email" });
                } else {
                    pool.query(queries.getUserRoleAndId, [userIdSubmmitted], (error, results) => {
                        console.log('it worked');
                        console.log(results.rows);
                        res.status(200).json(results.rows)
                    })
                }

            })
        }
    })
}


//Update candidate profil
const updateCandidate = (req, res) => {
    return new Promise((resolve, reject) => {

        let id = req.body.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let phone_number = req.body.phone_number;
        let profile_pic = req.body.profile_pic;
        let resume = req.body.resume;
        let video_resume = req.body.video_resume;
        let certificate = req.body.certificate;
        let highest_qualification = req.body.highest_qualification;
        let bio = req.body.bio;
        let skills = req.body.skills;
        let interests = req.body.interests;
        let qualifications = req.body.qualifications;
        let experience = req.body.experience;
        let province = req.body.province;
        let city = req.body.city;


        pool.query(queries.update_candi_profile, [id, first_name, last_name, phone_number])
            .then((data) => {
                let updated_profile = data.rows[0].fn_update_candidate_profile;

                if (updated_profile) {

                    pool.query(queries.update_candi_bio, [id, profile_pic, resume, video_resume, certificate, highest_qualification, bio, skills, interests, qualifications, experience, province, city])
                        .then((results) => {

                            let updated_bio = results.rows[0].fn_update_candidate_bio;

                            if (updated_bio) {
                                res.status(201).json({
                                    message: 'Profile successfully updated',
                                    result: data.rows,
                                });
                            } else {
                                res.status(401).json({
                                    message: 'Failed to update',
                                    result: results.rows,
                                });
                            }
                            resolve(data);
                        })
                        .catch((error) => {

                            res.status(500).json({
                                message: error,
                                error: error,
                                status: false
                            });
                            reject(error);
                        })

                } else {

                    res.status(401).json({
                        message: 'Failed to update',
                        result: data.rows,
                    });
                }

                resolve(data);

            })
            .catch((error) => {

                res.status(500).json({
                    message: error,
                    error: error,
                    status: false
                });
                reject(error);
            })
    })
};

//delete account
const deleteAccount = (req, res) => {
    return new Promise((resolve, reject) => {

        let id = req.params.id;


        pool.query(queries.delete_account, [id])
            .then((data) => {
                let profile_deleted = data.rows[0].fn_delete_account_by_id;
                console.log("updated: ", profile_deleted);

                if (profile_deleted) {

                    res.status(201).json({
                        message: 'Account successfully deleted',
                        result: data.rows,
                    });

                } else {

                    res.status(401).json({
                        message: 'Failed to delete',
                        result: data.rows,
                    });
                }

                resolve(data);

            })
            .catch((error) => {

                res.status(500).json({
                    message: error,
                    error: error,
                    status: false
                });
                reject(error);
            })
    })
};

//update password
const updatePassword = (req, res) => {
    return new Promise((resolve, reject) => {

        let id = req.params.id;
        let password = req.body.password;
        let new_password = req.body.newPassword


        pool.query(queries.update_password, [id, password, new_password])
            .then((data) => {
                let password_updated = data.rows[0].fn_update_password;
                console.log("updated: ", password_updated);

                if (password_updated) {

                    res.status(200).json({
                        message: 'Password successfully updated',
                        result: data.rows,
                    });

                } else if (!password_updated) {

                    res.status(401).json({
                        message: 'Current password is incorrect',
                        result: data.rows,
                    });

                } else {

                    res.status(401).json({
                        message: 'Failed to update password',
                        result: data.rows,
                    });
                }

                resolve(data);

            })
            .catch((error) => {

                res.status(500).json({
                    message: error,
                    error: error,
                    status: false
                });
                reject(error);
            })
    })
};

//Forgot password
const forgotPassword = (req, res) => {
    return new Promise((resolve, reject) => {

        let email = req.body.email;
        let randomPassword = Math.random().toString(36).slice(-8);
        let first_name = 'Candidate';

        pool.query(queries.checkUserEmailExists, [email])
            .then((result) => {

                if (result.rows.length <= 0) {
                    res.status(409).json({ error: "Email does not exist" });
                    console.log("results.... ", result.rows.length, email);
                } else {
                    pool.query(queries.forgot_password, [email, randomPassword])
                        .then((data) => {
                            let passwordRecovered = data.rows[0].fn_forgot_password;

                            if (passwordRecovered) {

                                addCandidateMailer(email, first_name, randomPassword);
                                res.status(201).json({
                                    message: 'New password is sent to your email address!',
                                    result: data.rows,
                                });

                            } else {

                                res.status(401).json({
                                    message: 'Failed to recover password',
                                    result: data.rows,
                                });
                            }

                            resolve(data);

                        })
                        .catch((error) => {

                            res.status(500).json({
                                message: error,
                                error: error,
                                status: false
                            });
                            reject(error);
                        })
                }
                resolve(result);
            })
            .catch((error) => {

                res.status(500).json({
                    message: error,
                    error: error,
                    status: false
                });
                reject(error);
            })
    })
};


// get user by email
const getUserIdByEmail = async (req, res) => {
    pool.query(queries.getCandidateIdByEmail, [this.registeredUserEmail], (error, results) => {
        console.log(this.registeredUserEmail)
        console.log(results.rows[0].id)

        console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy    yyyyyyyyyyyyyyyyyy  " + results.rows[0].id);
        this.registeredUserId = results.rows[0].id;
    });

}

//send files to database
const attachDocs = async (req, res) => {
    console.log('************************************** check if has data *********************************************');
    console.log("***************************res***** " + this.videoUrl + ' ' + this.certificateUrl + ' ' + this.resumeUrl + ' ' + this.registeredUserId + " " + this.highestQualification)

    // if (!(this.videoUrl && this.certificateUrl && this.resumeUrl && this.registeredUserId && this.highestQualification)){
    //     console.log("not working **********************************************************************");
    //     return 0;
    // }

    pool.query(queries.addDocuments, [this.videoUrl, this.certificateUrl, this.resumeUrl, this.registeredUserId, this.highestQualification, this.culture], (error, results) => {
        console.log('successfully uploaded****************************************************************************');

        console.log("yyyyyrguhrughwrigheurhgiurehgilwgfgjneiughqeuhguerqgoirhgheriguuy")
    });

}

//send document
const sendDoc = async (req, res) => {
    const documents = req.file;
    console.log(documents);
    try {
        const fileStr = req.file.path;
        console.log('***********************');
        console.log(fileStr)
        console.log('***********************');
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'documents',
            resource_type: 'raw'
        });

        const filepath = req.file.path;
        console.log('file path:');
        console.log(filepath);
        fs.unlinkSync(filepath);

        //    console.log(uploadResponse);
        console.log('*************the certificate is sent before the url******************');
        this.certificateUrl = uploadResponse.url

        res.json(uploadResponse.url);


    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong with the video' });
    }

};

//send video
const sendVid = async (req, res) => {
    const videos = req.file
    console.log(videos);
    try {
        const fileStr = req.file.path;
        console.log(fileStr)
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'videos',
            resource_type: 'video'
        });
        const filepath = req.file.path;
        console.log('file path:');
        console.log(filepath);
        fs.unlinkSync(filepath);

        //    console.log(uploadResponse);

        console.log('*************the video is sent before the url******************');
        this.videoUrl = uploadResponse.url;
        attachDocs();

        res.json(uploadResponse.url);

    } catch (err) {
        console.error(err);
        res.json({ msg: 'video uploaded' });
        res.status(500).json({ err: 'Something went wrong with the video' });
    }
};

//send profile picture
const sendPic = async (req, res) => {
    const images = req.file
    console.log(images);
    try {
        const fileStr = req.file.path;
        console.log(fileStr)
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'images',
            resource_type: 'image'
        });
        const filepath = req.file.path;
        console.log('file path:');
        console.log(filepath);
        fs.unlinkSync(filepath);

        //    console.log(uploadResponse);

        console.log('*************the image is sent before the url******************');
        this.imageUrl = uploadResponse.url;

        return await res.json(uploadResponse.url);





    } catch (err) {
        console.error(err);
        res.json({ msg: 'picture uploaded' });
        res.status(500).json({ err: 'Something went wrong with the image' });
    }
};

//send resume file
const sendResume = async (req, res) => {
    const resumes = req.file
    console.log(resumes);
    try {
        const fileStr = req.file.path;
        console.log(fileStr)
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'resumes',
            resource_type: 'raw'
        });
        const filepath = req.file.path;
        console.log('file path:');
        console.log(filepath);
        fs.unlinkSync(filepath);

        //    console.log(uploadResponse);

        console.log('*************the resume is sent before the url******************');
        this.resumeUrl = uploadResponse.url;

        res.json(uploadResponse.url);

    } catch (err) {
        console.error(err);
        res.json({ msg: 'resume uploaded' });
        res.status(500).json({ err: 'Something went wrong with the resume file' });
    }
};


const getAllCandidateProfiles = async (req, res) => {

    pool.query(queries.getCandidateProfiles, (error, results) => {
        if (this.error) {
            console.log(error);
            res.status(500).send(error);
            throw error;
        }
        res.status(200).json(results.rows)
    });

}

const getAllProfilesByShortList = async (req, res) => {

    pool.query(queries.getCandidateProfilesByShortList, (error, results) => {
        if (this.error) {
            console.log(error);
            res.status(500).send(error);
            throw error;
        }
        res.status(200).json(results.rows)
    });

}

const updateHits = async (req, res) => {

    const id = parseInt(req.params.id);
    pool.query(queries.getHits, [id], (error, results) => {
        if (this.error) {
            console.log(error);
            res.status(500).send(error);
            throw error;
        }
        const hits = parseInt(results.rows[0].profile_hits) + 1;
        console.log(hits);
        pool.query(queries.addHits, [hits, id], (error, results) => {
            res.status(200).json('updated');
        });
    });

}

const getHits = async (req, res) => {

    const id = parseInt(req.params.id);
    pool.query(queries.getHits, [id], (error, results) => {

        console.log(results.rows[0].profile_hits);

        if (this.error) {
            console.log(error);
            res.status(200).json(error);
            throw error;
        }
        res.status(200).json(results.rows[0]);
    });
}

const updateCandidateProfileById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { bio, city, skills, experience, interests, job_title, highest_qualification, province, phone_number, education, culture } = req.body

    pool.query(queries.getCandidateProfileById, [id], (error, results) => {
        if (!results) return res.status(400).send("invalid input");
        if (!results.rows.length) {
            res.status(404).send('profile not found')

        } else {
            pool.query(queries.updateCandidateProfile,
                [bio, city, skills, experience, interests, job_title, highest_qualification, province, education, culture,id],
                (error, results) => {
                    if (error) {
                        res.status(500).json({ error: 'invalid input' })
                        throw error;
                    } else {
                        pool.query(queries.UserAccountUpdate,
                            [phone_number, id],
                            (error, results) => {
                                if (error) {
                                    res.status(500).json({ error: 'invalid input' })
                                    throw error;
                                } else
                                    res.status(200).json("User updated successfully");

                            });

                    }
                });



        }

    })

}

const updateProfilePictureById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { profile_pic } = req.body
    console.log(id)
    pool.query(queries.UpdateProfilePic,
        [profile_pic, id],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'invalid input' })
                throw error;
            } else
                res.status(200).json("Profile picture successfully updated");
        });


}


const uploadProfilePicture = async (req, res) => {
    const images = req.file
    const id = parseInt(req.params.id);
    console.log(id);
    console.log(images);
    try {
        const fileStr = req.file.path
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'images',
            resource_type: 'image'
        })
        const filePath = req.file.path
        fs.unlinkSync(filePath)
        const imageUrl = uploadResponse.url;
        console.log(imageUrl);
        console.log(id)

        pool.query(queries.UpdateProfilePic, [imageUrl, id],
            (error, results) => {
                if (error) {
                    res.status(500).json(error)
                }
                res.status(200).json(results.rows)
            })
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'something went wrong' })
    }
}



const updateResume = async (req, res) => {
    const resumes = req.file
    const id = parseInt(req.params.id);
    console.log(id);
    console.log(resumes);
    try {
        const fileStr = req.file.path
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'resumes',
            resource_type: 'raw'
        })
        const filePath = req.file.path
        fs.unlinkSync(filePath)
        const resumeUrl = uploadResponse.url;
        console.log(resumeUrl);
        console.log(id)

        pool.query(queries.updateResume, [resumeUrl, id],
            (error, results) => {
                if (error) {
                    res.status(500).json(error)
                }
                res.status(200).json("Resume successfully updated")
            })
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' })
    }
}


const updateVideoResume = async (req, res) => {
    const videos = req.file
    const id = parseInt(req.params.id);
    console.log(id);
    console.log(videos);
    try {
        const fileStr = req.file.path
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'videos',
            resource_type: 'video'
        })
        const filePath = req.file.path
        fs.unlinkSync(filePath)
        const videoUrl = uploadResponse.url;
        console.log(videoUrl);
        console.log(id)

        pool.query(queries.updateVideoResume, [videoUrl, id],
            (error, results) => {
                if (error) {
                    res.status(500).json(error)
                }
                res.status(200).json("Video resume successfully updated")
            })
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' })
    }
}

const updateCertificate = async (req, res) => {
    const documents = req.file
    const id = parseInt(req.params.id);
    console.log(id);
    console.log(documents);
    try {
        const fileStr = req.file.path
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'documents',
            resource_type: 'raw'
        })
        const filePath = req.file.path
        fs.unlinkSync(filePath)
        const certificateUrl = uploadResponse.url;
        console.log(certificateUrl);
        console.log(id)

        pool.query(queries.updateCertificate, [certificateUrl, id],
            (error, results) => {
                if (error) {
                    res.status(500).json(error)
                }
                res.status(200).json("Video resume successfully updated")
            })
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' })
    }
}




const Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "ntsakokhozacc@gmail.com",
        pass: "pdthgosbwikeapvz"
    },
    tls: {
        rejectUnauthorized: false
    }
});

const addCandidateMailer = async (email, name, password) => {
    let mailOptions = {
        from: 'ntsakokhozacc@gmail.com', // sender address
        to: email, // list of receivers
        
        subject: 'Account successfully registered', // Subject line
        // text: text, // plain text body
        html:
            `<h3>Greetings ${name},</h3><br>
        <h3>This email serves to inform you that your account is now active😊, <br>
        
        Below are your login credentials you, your password can be updated at your own discretion on our platform:</h3><br>
        <h2><ul><u>Login Details</u><h2/>
        Username: ${email}<br>
        password: ${password}<br>
        visit our site at <a href="http://localhost:4315/login">Visit jobberg.co.za!</a><br><br>
        </ul><h3>
        kind Regards,<br>
         Jobberg Team
         </h3>`
        // html body
    };
    Transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        }
    });

}


module.exports = {
    get_candidates,
    addCandidate,
    updatePassword,
    forgotPassword,
    // candidateLogin,
    getCandidateById,
    getCandidateProfileById,
    sendDoc,
    sendVid,
    sendPic,
    sendResume,
    // addDocuments,
    getUserIdByEmail,
    attachDocs,
    login,
    updateCandidate,
    deleteAccount,
    getAllCandidateProfiles,
    getHits,
    updateHits,
    getAllProfilesByShortList,
    updateCandidateProfileById,
    // updateAccount,
    updateProfilePictureById,
    uploadProfilePicture,
    updateResume,
    updateVideoResume,
    updateCertificate,
    forgotPassword


};
