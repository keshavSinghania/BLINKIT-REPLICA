import SubCategoryModel from "../models/subCategory.model.js";
import UserModel from "../models/user.model.js";


//function to add new sub-category inside database
export const addSubCategory = async (req, res) => {
  try {
    //user if from auth middleware
    const userId = req.userId;
    const userData = await UserModel.findById(userId);

    //checking user is admin or not
    if (userData.role !== "ADMIN") {
      return res.status(400).json({
        message: "Admin access is required to make these changes",
        error: true,
        success: false
      })
    };

    //extracting name , image , categoryId from body
    const { name, image, categoryId } = req.body;
    if (!name || !image || !categoryId) {
      return res.status(400).json({
        message: "Please fill all the necessary details i.e name , image , category id",
        error: true,
        success: false
      })
    };

    const payload = {
      name: name,
      image: image,
      categoryId: categoryId
    }

    const subCategory = new SubCategoryModel(payload);
    const addedSubCategory = await subCategory.save();
    if (!addedSubCategory) {
      return res.status(400).json({
        message: "Error whil adding new sub category inside db",
        error: true,
        success: false
      })
    };
    return res.status(200).json({
      message: "Successfully added new subcategory",
      error: false,
      success: true
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

// Function to get all the sub-category data from database
export const getSubCategory = async (req, res) => {
  try {
    const subCategoriesData = await SubCategoryModel.find().populate('categoryId'); // populate category details

    if (!subCategoriesData) {
      return res.status(400).json({
        message: "Error while fetching sub-categories from database",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Successfully got sub-categories data",
      error: false,
      success: true,
      data: subCategoriesData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//function to delete sub category data from database
export const deleteSubCategory = async (req, res) => {
  try {

    //from auth controller
    const userId = req.userId;
    const userDetails = await UserModel.findById(userId);
    if (userDetails.role !== "ADMIN") {
      return res.status(401).json({
        message: "Admin access is required to make these changes",
        error: true,
        success: false
      })
    }
    const { _id } = req.body;
    if (!_id) {
      return res.status(402).json({
        message: "Id required to delete sub category",
        error: true,
        success: false
      })
    }

    const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(_id);
    if (!deletedSubCategory) {
      return res.status(400).json({
        message: "error while deleting sub-category inside db",
        error: true,
        success: false
      })
    }
    return res.status(200).json({
      message: "SubCategory successfully deleted ",
      error: false,
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

export const editSubCategory = async (req, res) => {
  try {
    // From auth middleware
    const userId = req.userId;

    // Checking if user is admin
    const userData = await UserModel.findById(userId);
    if (userData.role !== "ADMIN") {
      return res.status(400).json({
        message: "Admin access is required to make these changes",
        error: true,
        success: false,
      });
    }

    const { _id, name, categoryId, image } = req.body;

    if (!_id || !name || !image || !categoryId) {
      return res.status(400).json({
        message: "Please provide all the necessary details before updating",
        error: true,
        success: false,
      });
    }

    const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
      _id,
      { name, categoryId, image },
      { new: true }
    );

    if (!updatedSubCategory) {
      return res.status(400).json({
        message: "Error while updating data inside db",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Successfully updated the sub-category",
      error: false,
      success: true,
      data: updatedSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
