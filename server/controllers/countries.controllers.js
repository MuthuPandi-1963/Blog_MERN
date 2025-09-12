import prisma from "../config/prismaConfig.js";


// ✅ Create single country
export const createCountry = async (req, res) => {
  try {
    const { name, code, flag } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: "Name and code are required" });
    }

    const newCountry = await prisma.country.create({
      data: { name, code, flag },
    });

    res.status(201).json({ message: "Country created successfully", data: newCountry });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Country code must be unique" });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Create many countries
export const createManyCountries = async (req, res) => {
  try {
    const { countries } = req.body; // Expecting [{ name, code, flag }, ...]

    if (!Array.isArray(countries) || countries.length === 0) {
      return res.status(400).json({ message: "Countries array is required" });
    }

    const result = await prisma.country.createMany({
      data: countries,
      skipDuplicates: true, // Avoid duplicate country codes
    });

    res.status(201).json({ message: "Countries created successfully", count: result.count });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Get all countries
export const getCountries = async (req, res) => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ data: countries });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Get country by ID
export const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;

    const country = await prisma.country.findUnique({
      where: { id },
    });

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.status(200).json({ data: country });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Update country
export const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, flag } = req.body;

    const updatedCountry = await prisma.country.update({
      where: { id },
      data: { name, code, flag },
    });

    res.status(200).json({ message: "Country updated successfully", data: updatedCountry });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Country not found" });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ✅ Delete country
export const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.country.delete({
      where: { id },
    });

    res.status(200).json({ message: "Country deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Country not found" });
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
