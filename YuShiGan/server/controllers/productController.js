const {getDb} = require('../utils/db')
const {ObjectId} = require('mongodb')

//get all products
const getProducts = async (req, res) =>{
    try {
        const db = getDb();
        const productCollection = db.collection("Products");
        const products = await productCollection.find().toArray();
        res.status(200).json(products)
        console.log('Products fetched:', products);


    }catch(error){
        res.status(500).json({message: "Failed to fetch all products", error})
    }
};

//get products by id
const getProductsById = async (req,res)=>{
    try {
        const db = getDb();
        const productCollection  = db.collection('Products');
        const product = await productCollection.findOne({_id: new ObjectId(req.params.id)})
        console.log("the product is :", product)
        if (product){
            res.status(200).json(product);
        }
        else{
            res.status(404).json({message: "product not found"})
        }
    }
    catch(error){
        res.status(500).json({message: "failed to fetch product", product})
    }
};

//create new product
const createProducts = async (req, res) => {
    try{
        const db = getDb();
        const productCollection = db.collection("Products");
        const newProduct= req.body;
        const result = await productCollection.insertOne(newProduct)
        res.status(201).json({message: "Product create successfully", product: result.ops[0]});

    }catch(error){
        res.status(500).json({message: "Failed to create product", error});
    }
};

//update product by ID
const updateProducts = async (req, res)=>{

    try{
        //console.log('PUT /api/products/:id route hit with ID:', req.params.id); // Debugging log
        const trimmedId = req.params.id.trim();
        //console.log('Trimmed ID:', trimmedId); // Log the trimmed version of ID
        if (!ObjectId.isValid(trimmedId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

       
        const db = getDb();
        const productCollection = db.collection("Products");
        const updateData = req.body;
        //console.log('Update data:', updateData);

        const productExists = await productCollection.findOne({ _id: new ObjectId(trimmedId) });
        //console.log('Product found before update:', productExists);
        if (!productExists) {
            return res.status(404).json({ message: "Product not found" });
        }

        

        const result = await productCollection.updateOne(
            { _id: new ObjectId(trimmedId) },
            {$set: updateData},

        );

        if (result.matchedCount > 0) {
            res.status(200).json({ message: "Product updated successfully" });
        } else {
            console.log("Product not found for ID:", trimmedId);
            res.status(404).json({ message: "Product not found" });
        }

    }catch(error){
        res.status(500).json({message:"Failed to update product", error});
    }
}

//delete the product by id
const deleteProducts = async (req, res)=>{
    try{
        const db = getDb();
        const productCollection = db.collection("Products")
        const result = await productCollection.deleteOne({_id: new ObjectId(req.params.id)});
        console.log("the deleted product is ", result)
        if (result.deletedCount === 1){
            res.status(200).json({message: "Product deleted successfully"})

        }else{
            res.status(404).json({message: "Product not found"});
        }
        
    }catch(error){
        res.status(500).json({message: "Failed to delete product", error})

    }
}


module.exports ={
    getProducts,
    getProductsById,
    createProducts,
    updateProducts,
    deleteProducts
};