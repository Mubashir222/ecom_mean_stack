const DropdownOptionData = require("../models/DropdownOptionData");
const mongoose = require("mongoose");

exports.addOptionData = async (req, res) => {
    let { optionId, optionData } = req.body;
    try {
        const allOptionsData = await DropdownOptionData.find({ data: optionData });

        if (allOptionsData.length > 0) {
            return res.status(400).json({
                error_code: "That option data already exist!",
                message: "That option data already exist!",
            });
        }

        const newOptionData = new DropdownOptionData({
            optionId: optionId,
            data: optionData,
        });

        await newOptionData.save();

        res.status(201).json({
            message: "Dropdown option data added successfully!",
        });
    } catch (error) {
        res.status(400).json({
            error_code: "Option data cannot stored!",
            message: "Error" + error,
        });
    }
};


exports.getOptionAllData = async (req, res) => {
    let { optionId } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(optionId)) {
            return res.status(400).send({ message: 'Invalid optionId' });
        }
        
        const optionAllData = await DropdownOptionData.find({optionId});
        
        if (optionAllData.length <= 0) {
            return res.status(404).json({
                error_code: "Option not found!",
                message: "Option not found!",
            });
        }

        res.status(200).json(optionAllData);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_code: "Error while getting that option!",
            message: "Error" + error,
        });
    }
}


exports.getOptionData = async (req, res) => {
    let { _id } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send({ message: 'Invalid optionId' });
        }
        
        const optionData = await DropdownOptionData.findById(_id);
        
        if (optionData.length <= 0) {
            return res.status(404).json({
                error_code: "Option not found!",
                message: "Option not found!",
            });
        }

        res.status(200).json(optionData);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_code: "Error while getting that option!",
            message: "Error" + error,
        });
    }
}


exports.getAllOptionData = async (req, res) => {
    try {
        const options = await DropdownOptionData.find();
        res.status(200).json(options);
    } catch (error) {
        res.status(400).json({
            error_code: "User cannot approved!",
            message: "Error" + error,
        });
    }
}


exports.updateOptionData = async (req, res) => {
    let { _id, optionData } = req.body;
    try {
        const updatedOption = await DropdownOptionData.findByIdAndUpdate(
            { _id },
            { data: optionData },
            { new: true }
        );

        if (!updatedOption) {
            return res.status(404).json({
                error_code: "Option not found!",
                message: "Option not found!",
            });
        }
        res.status(200).json({
            message: "Option updated successfully!",
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error_code: "Error while updating that option!",
            message: "Error" + error,
        });
    }
}



exports.deleteOptionData = async (req, res) => {
    const id = req.params.id
    try {
        const deletedOption = await DropdownOptionData.findByIdAndDelete({ _id: id });

        if (!deletedOption) {
            return res.status(404).json({
                error_code: "Option not found!",
                message: "Option not found!",
            });
        }
        res.status(200).json({
            message: "Option deleted successfully!",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error_code: "Error while deleting that option!",
            message: error,
        });
    }
}