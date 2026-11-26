import express from "express";

import {
  createCompany,
  getMyCompany,
  getAllCompanies,
  updateCompany,
  getCompanyById
} from "../controllers/companyController.js";


import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCompany);
router.get("/my-company", protect, getMyCompany);
router.put("/my-company", protect, updateCompany);
router.get("/", protect, getAllCompanies);

router.get("/:id", getCompanyById);

export default router;