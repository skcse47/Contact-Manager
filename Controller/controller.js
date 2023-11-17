const asyncHandler = require("express-async-handler")
const contact = require("../models/contactModel")

//@desc Get all Contact
//@route GET api/contact
//@access private
const getContacts = asyncHandler(async(req,res) =>{
    const contacts = await contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
    // res.status(200).json({msg:'I Got all Contacts'});
});


//@desc Create all Contact
//@route POST api/contact
//@access private
const createContact = asyncHandler(async(req,res) =>{
    console.log('The data in body is:', req.body);
    const {name,email,Phone} = req.body;

    if(!name || !email || !Phone){
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    console.log(req.user.id)
    const createContact = await contact.create({
        name,
        email,
        Phone,
        user_id: req.user.id
    });

    res.status(201).json(createContact);
    // res.status(201).json({msg:'Create a Contact'});
});


//@desc Create a Contact
//@route GET api/contact/:id
//@access private
const getContact = asyncHandler(async(req,res) =>{
    const {id} = req.params;
    const getContactid = await contact.findById(id);
    if(!getContactid){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(getContactid);
    // res.status(200).json({msg:`Get contact of ${id}`});
});


//@desc Update a Contact
//@route PUT api/contact/:id
//@access private
const updateContact = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const Update = await contact.findByIdAndUpdate(id,req.body,{new: true});

    if(!Update){
        res.status(400);
        throw new Error("Unable to Update");
    }
    res.status(200).json(Update);
    // res.status(200).json({msg:`Update contact of ${id}`});

});


//@desc delete a Contact
//@route DELETE api/contact/:id
//@access private
const deleteContact = asyncHandler(async(req,res) => {
    const {id} = req.params;
    // const findtodelete = await contact.findOneAndDelete(id);
    const findtodelete = await contact.findById(id);

    if(!findtodelete){
        res.status(404)
        throw new Error("Not found");
    }

    await findtodelete.deleteOne({_id: id});
    res.status(200).json(findtodelete);
    // res.status(200).json({msg:`Delete contact of ${id}`});

});




module.exports = {getContacts,createContact, getContact, updateContact, deleteContact}