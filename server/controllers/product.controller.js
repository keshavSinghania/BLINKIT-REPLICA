import UserModel from "../models/user.model.js"
import ProductModel from "../models/product.model.js"

//function to add new product
export const uploadProduct = async (req, res) => {
    try {
        //from auth middleware
        const userId = req.userId;

        //checking admin role
        const userData = await UserModel.findById(userId);
        if (!userData) {
            return res.status(400).json({
                message: "Error while fetching user details",
                error: true,
                success: false
            })
        };
        if (userData.role !== "ADMIN") {
            return res.status(400).json({
                message: "Admin access is required to make these changes",
                error: true,
                success: false
            })
        }
        //extracting sent data for updation
        const { name, image, category, subCategory, unit, stock, price, discount, description,more_details } = req.body;
        // console.log(name)
        // console.log(image,"image")
        // console.log(category,"category")
        // console.log(subCategory,"subcategory")
        // console.log(unit,"unit")
        // console.log(stock,"stock")
        // console.log(price,"price")
        // console.log(discount,"discount")
        // console.log(description,"desciption")
        if (!name || !image || !category || !subCategory || !unit || !stock || !price || !discount || !description) {
            return res.status(400).json({
                message: "Please provide  all the necessary details",
                error: true,
                success: false
            });
        };
        const payload = {
            name,
            image,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details
        }
        const newProduct = new ProductModel(payload);
        const savedProduct = await newProduct.save();
        if (!savedProduct) {
            return res.status(500).json({
                message: "Error while saving product into database",
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            message: "Successfully added new product",
            error: false,
            success: true,
            data : savedProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}