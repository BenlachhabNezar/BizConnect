import Company from "../models/Company.js";

// CREATE COMPANY
export const createCompany = async (req, res) => {
  try {
    const {
      companyName,
      sector,
      description,
      website,
      phone,
      address,
      country
    } = req.body;

    if (!companyName || !sector || !description || !phone || !address) {
      return res.status(400).json({
        message: "Please fill in all required fields"
      });
    }

    const existingCompany = await Company.findOne({
      owner: req.user.id
    });

    if (existingCompany) {
      return res.status(409).json({
        message: "You already have a company profile"
      });
    }

    const company = await Company.create({
      companyName,
      sector,
      description,
      website,
      phone,
      address,
      country,
      owner: req.user.id
    });

    res.status(201).json({
      message: "Company created successfully",
      company
    });

  } catch (error) {
    res.status(500).json({
      message: "Company creation failed",
      error: error.message
    });
  }
};


// GET MY COMPANY
export const getMyCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      owner: req.user.id
    });

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found"
      });
    }

    res.status(200).json({
      message: "Company retrieved successfully",
      company
    });

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving company",
      error: error.message
    });
  }
};


// GET ALL COMPANIES WITH SEARCH AND FILTER
export const getAllCompanies = async (req, res) => {
  try {
    const { search, sector } = req.query;

    const filter = {};

    if (search) {
      const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.companyName = {
        $regex: safeSearch,
        $options: "i"
      };
    }

    if (sector) {
      const safeSector = sector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.sector = {
        $regex: safeSector,
        $options: "i"
      };
    }

    const companies = await Company.find(filter)
      .select("-__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Companies retrieved successfully",
      count: companies.length,
      companies
    });

  } catch (error) {
    res.status(500).json({
      message: "Company search failed",
      error: error.message
    });
  }
};


// UPDATE MY COMPANY
export const updateCompany = async (req, res) => {
  try {
    const allowedFields = [
      "companyName",
      "sector",
      "description",
      "website",
      "phone",
      "address",
      "country"
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update"
      });
    }

    const company = await Company.findOneAndUpdate(
      { owner: req.user.id },
      { $set: updates },
      {
        new: true,
        runValidators: true
      }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    res.status(200).json({
      message: "Company updated successfully",
      company
    });

  } catch (error) {
    res.status(500).json({
      message: "Company update failed",
      error: error.message
    });
  }
};
// GET COMPANY BY ID
export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        message: "Invalid company ID"
      });
    }

    // Find company
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    res.status(200).json({
      message: "Company retrieved successfully",
      company
    });

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving company",
      error: error.message
    });
  }
};