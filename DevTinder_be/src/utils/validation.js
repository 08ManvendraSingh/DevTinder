const validateSignupData=(req,res)=>{
    const { firstName, lastName, emailId, password } = req.body;

    if(!firstName || !lastName || !emailId || !password){
        throw new Error('All fields are required')
    }

}

const validateLoginData=(req,res)=>{
    const {emailId, password } = req.body;

    if(!emailId || !password){
        throw new Error('All fields are required')
    }

}

module.exports={validateSignupData,validateLoginData};