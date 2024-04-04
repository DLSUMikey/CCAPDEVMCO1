const express = require('express')
const router = express.Router()
const userSchema = require('../models/userData')

router.use(express.json())

//gets everything
router.get('/', async (req, res) => {
    try {
        const userdatas = await userSchema.find()
        res.json(userdatas)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//gets 1
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

//posts 1
router.post('/', async (req, res) => {
    const user = new userSchema({
        userName: req.body.userName,
        userPassword: req.body.userPassword,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        fiveStarPity: req.body.fiveStarPity,
        fourStarPity: req.body.fourStarPity,
        dateCreated: req.body.dateCreated
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)

    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//edits 1
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.userName != null) {
        res.user.userName = req.body.userName
    }
    if (req.body.userPassword != null) {
        res.user.userPassword = req.body.userPassword
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.isAdmin != null) {
        res.user.isAdmin = req.body.isAdmin
    }
    if (req.body.fiveStarPity != null) {
        res.user.fiveStarPity = req.body.fiveStarPity
    }
    if (req.body.fourStarPity != null) {
        res.user.fourStarPity = req.body.fourStarPity
    }
    if (req.body.credits != null) {
        res.user.credits = req.body.credits
    }
    if (req.body.Rolls != null) {
        res.user.Rolls = req.body.Rolls
    }
    if (req.body.TotalRolls != null) {
        res.user.TotalRolls = req.body.TotalRolls
    }
    if (req.body.TotalTasksCompleted != null) {
        res.user.TotalTasksCompleted = req.body.TotalTasksCompleted
    }
    try{
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }

})

//removes 1
router.delete('/:id', getUser, async (req, res) => {
    try{
        await res.user.deleteOne()
        res.json({ message: "deleted user"})
    } catch  (err){
        res.status(500).json({message: err.message})
    }
})


async function getUser(req, res, next) {//fix this
    let user
    try {
        user = await userSchema.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message:"cannot find User"})
        }
    } catch(err) {
        res.status(500).json({message: err.message})
    }

    res.user = user
    next()
}

module.exports = router
