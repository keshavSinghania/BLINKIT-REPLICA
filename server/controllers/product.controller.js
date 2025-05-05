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
        };
        //extracting sent data for updation
        const { name, image, category, subCategory, unit, stock, price, discount, description, more_details } = req.body;
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
            data: savedProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//function to get products from db
export const getProducts = async (req, res) => {
    try {
        let { page, limit, search } = req.body;

        //by default page will be 1 and limit will be 12
        if (!page) page = 1;
        if (!limit) limit = 12;

        const query = search ? {
            $text: {
                $search: search
            }
        } : {};

        const skip = (page - 1) * limit;

        const [data, totalCount] = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return res.status(200).json({
            message: "Product data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNoPages: Math.ceil(totalCount / limit),
            data: data
        })

    } catch (error) {
        res.status(500).json({
            message: error.message || message,
            error: true,
            success: false
        })
    }
}

//function to get products by category id
export const getProductsByCategoryId = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                message: "Please provide category id",
                error: true,
                success: false
            });
        }

        const productData = await ProductModel.find({
            category: { $in: _id }
        }).limit(15);

        return res.status(200).json({
            message: "Successfully fetched data based on your category id",
            error: false,
            success: true,
            data: productData 
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false
        });
    }
};

//function to get products using sub-category
export const getProductBySubCategoryId = async(req,res)=>{
    try {
        const _id = req.body;
        if(!_id){
            return res.status(400).json({
                message : "Please provide sub-categegory id",
                error : true,
                success : true
            })
        };

        const productData = await ProductModel.find({
            subCategory: { $in: _id }
        });

        return res.status(200).json({
            message: "Successfully fetched data based on your sub-category id",
            error: false,
            success: true,
            data: productData
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false
        });
    }
}

export const getProductById = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                message: "Please provide product ID",
                error: true,
                success: false
            });
        }

        const productDetails = await ProductModel.findById(_id);

        if (!productDetails) {
            return res.status(404).json({
                message: "Product not found in database",
                error: true,
                success: false
            });
        }

        return res.status(200).json({
            message: "Successfully fetched product details",
            error: false,
            success: true,
            data: productDetails
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};
