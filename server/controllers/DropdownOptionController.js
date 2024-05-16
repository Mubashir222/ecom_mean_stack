const DropdownOption = require("../models/DropdownOption");
const DropdownNestedOption = require("../models/DropdownNestedOption");

exports.addOption = async (req, res) => {
    let { option } = req.body;
    try {
        const allOptions = await DropdownOption.find({ option });

        if (allOptions.length > 0) {
            return res.status(400).json({
                error_code: "That option already exist!",
                message: "That option already exist!",
            });
        }

        const newOption = new DropdownOption({
            option,
        });

        await newOption.save();

        res.status(201).json({
            message: "Dropdown option added successfully!",
        });
    } catch (error) {
        res.status(400).json({
            error_code: "Option cannot stored!",
            message: "Error" + error,
        });
    }
};


exports.getOption = async (req, res) => {
    let { optionId } = req.body;
    try {
        const _id = optionId;
        const option = await DropdownOption.findById({ _id });
        if (!option) {
            return res.status(404).json({
                error_code: "Option not found!",
                message: "Option not found!",
            });
        }
        res.status(200).json(option);
    } catch (error) {
        res.status(400).json({
            error_code: "Error while getting that option!",
            message: "Error" + error,
        });
    }
}


exports.getAllOption = async (req, res) => {
    try {
        const options = await DropdownOption.find();
        res.status(200).json(options);
    } catch (error) {
        res.status(400).json({
            error_code: "User cannot approved!",
            message: "Error" + error,
        });
    }
}


exports.updateOption = async (req, res) => {
    let { id, option } = req.body;
    try {
        const _id = id;
        const updatedOption = await DropdownOption.findByIdAndUpdate(
            { _id },
            { option },
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



exports.deleteOption = async (req, res) => {
    const id = req.params.id
    try {
        const deletedOption = await DropdownOption.findByIdAndDelete({ _id: id });

        if (!deletedOption) {
            return res.status(404).json({
                error_code: "Option not found!",
                message: "Option not found!",
            });
        }

        // Delete related rows in DropdownNestedOption
        await DropdownNestedOption.deleteMany({ optionId: id });

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