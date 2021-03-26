const User = require("../../models/user");


/**
 * Save new user in the system
 * @param {*} req 
 * @param {*} res 
 */
const addNewUser = async(req, res)=>{
    // Get all body content
  const {matricule, firstname, lastname, email, phone, address} = req.body;

      // Insert the new user if they do not exist yet
     const user = new User({
          matricule: matricule,
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone
      });
      user.address.push(address)
      await user.save()
      .then((user)=>{
        return res.status(200).json(
            {
              success: true,
              message: "User created !",
              user: user
          }
        );
      })
      .catch((err)=>{
          console.log(err);
          return res.status(500).json(
              {
                success: false,
                message: "Internal server Error!"
            }
          );
      }) 
}


/**
 * Get user by ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getOne = async(req, res)=>{
    const id = req.params.id;
    User.findOne({_id: id})
    .then(user => {
        return res.status(200).json({
            success: true,
            message: "User infos",
            user: user
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json(
            {
                success: false,
                message: "Internal server Error!"
            }
        )
    })

}


/**
 * Get all users
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getAll = async(req, res)=>{
    User.find({})
    .exec()
    .then(users => {
        return res.status(200).json({
            success: true,
            message: "all users",
            users: users
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json(
            {
                success: false,
                message: "Internal server Error!"
            }
        )
    })
}

/**
 * Update user by ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const updateOne = (req, res)=>{
    const id = req.params.id;
    const data = req.body;
    User.findOneAndUpdate({_id: id}, data)
    .then(user => {
        return res.status(200).json({
            success: true,
            message: "The user has been updated successfully!",
            user: user
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json(
            {
                success: false,
                message: "Internal server Error!"
            }
        )
    })
}

/**
 * Delete user by ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteOne = async(req, res)=>{
    const id = req.params.id;
    User.findOneAndDelete({_id: id})
    .then(resp => {
        return res.status(200).json({
            success: true,
            message: "The user has deleted successfully"
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json(
            {
                success: false,
                message: "Internal server Error!"
            }
        )
    })
}


module.exports = {
    addNewUser,
    getOne,
    getAll,
    updateOne,
    deleteOne
}