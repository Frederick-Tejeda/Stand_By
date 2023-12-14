const controller = {}
const Users = require('../model/usersModel')

controller.getUsers = async (req, res) => {
    const users = await Users.find()
    //{"message": 'It seems that is empty...'}
    res.json((users.length == 0) ? [] : users)
}

controller.createUser = async (req, res) => {
    const {username, password, name} = req.body
    const newUser = new Users({username, password, name})
    await newUser.save()
    res.json({"message": 'User created'})
}

controller.getUser = async (req, res) => {
    const user = await Users.findById(req.params.id)
    //{"message": "It seems that doesn't exist..."}
    res.json((user == null) ? [] : user)
}

controller.updateUser = async (req, res) => {
    const oldUsername = await Users.findById(req.params.id)
    if(oldUsername == null){
        res.json({"message": 'Something went wrong while updating...'})
    }
    else{
        await Users.findByIdAndUpdate(req.params.id, req.body)
        res.json({"message": 'User updated'})
    }
}

controller.deleteUser = async (req, res) => {
    const oldUsers = await Users.find()
    await Users.findByIdAndDelete(req.params.id)
    const currentUsers = await Users.find()
    res.json((oldUsers.length == currentUsers.length) ? {"message": 'Something went wrong while deleting...'} : {"message": 'User deleted'})
}

module.exports = controller
