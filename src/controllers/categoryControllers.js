const Category = require("../models/category");

exports.createCategory = async function (req, res) {
    const { category } = req.body;
    try {
        const newcategory = await Category.create({ category });
        return res.status(201).json({ status: 'Successfully created CATEGORY', data: newcategory })
    } catch (err) {
        return res.status(400).json({ status: "fail to create CATEGORY", error: err.message })
    }
}
exports.readCategories = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json({ status: "successfully show ALL CATEGORIES!", data: category });
    } catch (error) {
        res.status(400).json({ status: "fail to show ALL CATEGORIES!", message: error.message });
    };
};
exports.deleteCategory = async (req, res) => {
    const { cId } = req.params;
    try {
        await Category.findByIdAndDelete(cId)
        return res.status(204).json({ status: "Successfully deleted CATEGORY", data: null })
    }
    catch (er) {
        return res.status(400).json({ status: "failed to delete CATEGORY", error: err.message })
    }
}
exports.readSingleCategory = async (req, res) => { 
    const { cId } = req.params;
    try {   
        let singleCat= await Category.findById(cId)
        return res.status(200).json({ status: "Successfully show a single CATEGORY", data: singleCat })
    }
    catch (err) {   
        return res.status(400).json({ status: "failed to show a single CATEGORY", error: err.message })
}};
exports.updateCategory = async (req, res) => {
    const {cId} = req.params;
    try {
    const category = await Category.findByIdAndUpdate(cId,{category:req.body.category},{new:true})
    return res.status(201).json({ status: "Successfully updated CATEGORY", data: category })
    }
    catch (error) {
    return res.status(400).json({ status: "failed to update CATEGORY", error:"???" })
    }
}
    