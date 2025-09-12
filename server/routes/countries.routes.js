import { Router } from "express";

import asyncHandler from "../handlers/asynchandlers.js";
import {
  createCountry,
  createManyCountries,
  deleteCountry,
  getCountries,
  getCountryById,
  updateCountry,
} from "../controllers/countries.controllers.js";

const countriesRouter = Router();

countriesRouter.post("/", asyncHandler(createCountry)); // Create single
countriesRouter.post("/all", asyncHandler(createManyCountries)); // Create many
countriesRouter.get("/", asyncHandler(getCountries)); // Get all
countriesRouter.get("/:id", asyncHandler(getCountryById)); // Get by ID
countriesRouter.put("/:id", asyncHandler(updateCountry)); // Update
countriesRouter.delete("/:id", asyncHandler(deleteCountry)); // Delete

export default countriesRouter;
