const { Router } = require('express');
const router = Router();

const Account = require('../models/Account.js');

/* 
    TODO 1:   This request handler listens for GET requests to the path `/`.
            This displays `index.hbs` with all the debt accounts currently stored
            in the database. The list should be sorted by last updated, in descending order (i.e., the most recent update is at the top)
*/
router.get('/', async function(req, res) {
    try {
        const accounts = await Account.find({}).lean().exec();
        res.render('index', {
            debtItem: accounts
        });  
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
        
});

/* 
    TODO 2:   This request handler listens for POST requests to the path `/add-debt`.
            This updates the database by either: (a) creating a new account, if the accountName specified in the request does not exist in the DB yet,
            or (b) updates an existing account by adding the debt, if the accountName specified in the request already exists in the DB.
            Both instances sets the lastUpdated field to the current datetime.

            If successful, sends a response with status code 200, and informs the client whether an account has been created,
            or an existingaccount was simply updated.
            If unsuccessful, sends a response with status code 500.
*/
router.post('/add-debt', async function(req, res) {
    
    const body = req.body
    try{
        const foundAcc = await Account.findOne({accountName: body.accountName}).exec();
        if(foundAcc != null){
            await Account.updateOne({
                accountName: body.accountName
            }, {
                $set: {
                debtAmount: body.debtAmount,
                lastUpdate: body.lastUpdate
                }
            })
            res.sendStatus(200)
            console.log(foundAcc)
            return
        }else {
            const newAccount = new Account({
                accountName: body.accountName,
                debtAmount: body.debtAmount,
                lastUpdate: body.lastUpdate
            })
            await newAccount.save()
            res.sendStatus(201)
            return
        }
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
});

module.exports = router;