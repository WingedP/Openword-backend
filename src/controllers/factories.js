

exports.deleteOne = Model => async (req, res) => {
    console.log("running?")
    try {
        let id;
        switch (Model.modelName) {
            case "Book":
                id = req.params.bId
                break;
            case "Review":
                id = req.params.rId
                break;
            case "Cart":
                    id = req.params.rId
                break;
          default:
                id = req.params.id
        }
        console.log("book id",req.params.bId)
        await Model.findOneAndDelete({ _id: id })
        res.status(204).end()
    } catch (e) {
        res.status(400).json({ status: "fail", message: "error.message" })
    }
};


exports.updateOne = Model => async (req, res) => {
    try {
        let allows = []
        let id;
        switch (Model.modelName) {
            case "Book":
                allows = ["title", "description", "category", "author", "availability", "price"]
                id = req.params.bId
                break;
            case "User":
                allows = ["name","email","password" ]
                id = req.params.uId
                break;
            
            default:
                id = req.params.id
        }
        Object.keys(req.body).forEach(el => {
            if (!allows.includes(el))
                delete req.body[el]
        })
        const itemUpdated = await Model.findOneAndUpdate({ _id: id }, req.body, { new: true })
        
        res.status(200).json({status:"ok, updated",data:itemUpdated})
    }
    
    catch (e) { 
        console.log("Pass in factories.js:",req.body.password)
        res.status(400).json({ status: "Failed. Not Updated",  message: e.message }) }
}