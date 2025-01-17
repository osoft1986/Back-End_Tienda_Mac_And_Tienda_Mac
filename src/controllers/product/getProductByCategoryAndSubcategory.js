const { Product, Category, Brand, Subcategories, Capacities, Colors, Image } = require("../../db");

const getProductByCategoryAndSubcategory = async (req, res) => {
  const { category, subcategory } = req.params;

  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
          where: {
            name: category
          }
        },
        {
          model: Brand,
          attributes: ['id', 'name'],
        },
        {
          model: Subcategories,
          attributes: ['id', 'name'],
          where: {
            name: subcategory
          }
        },
        {
          model: Capacities,
          attributes: ['id', 'name'],
        },
        {
          model: Colors,
          attributes: ['id', 'name'],
        },
        {
          model: Image,
          attributes: ['id', 'path'], // Incluir los atributos que desees de Image
        },
      ],
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    const formattedProducts = products.map((product) => {
      const {
        id,
        itemId,
        name,
        description,
        price,
        priceUsd,
        quantity,
        guarantee,
        currency,
        tax,
        barcode,
        Category,
        Brand,
        Subcategory,
        Capacity,
        Color,
        Image, // Incluir la relación con Image
      } = product;

      const { id: categoryId, name: categoryName } = Category;
      const { id: brandId, name: brandName } = Brand;
      const { id: subcategoryId, name: subcategoryName } = Subcategory;
      const { id: capacityId, name: capacityName } = Capacity;
      const { id: colorId, name: colorName } = Color;

      const imageId = Image ? Image.id : null; // Verificar si Image existe antes de acceder a su propiedad id
      const imagePath = Image ? Image.path : null; // Verificar si Image existe antes de acceder a su propiedad path

      return {
        id,
        itemId,
        name,
        description,
        price,
        priceUsd,
        quantity,
        guarantee,
        currency,
        tax,
        barcode,
        categoryId,
        categoryName,
        brandId,
        brandName,
        subcategoryId,
        subcategoryName,
        capacityId,
        capacityName,
        colorId,
        colorName,
        imageId, // Incluir el ID de la imagen en la respuesta
        imagePath, // Incluir la ruta de la imagen en la respuesta
      };
    });

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Error getting products" });
  }
};

module.exports = getProductByCategoryAndSubcategory;
