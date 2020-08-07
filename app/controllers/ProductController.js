const { Product } = require("../models");
const status = require("http-status-codes");

module.exports = {
  create_a_product: async (request, response) => {
    try {
      request.body.name = request.body.name.toLowerCase();

      await Product.create(request.body);

      return response.status(status.CREATED).json(request.body);
    } catch (error) {
      return response
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: "Could not create product", error });
    }
  },
  update_a_product: async (request, response) => {
    try {
      const deprecated_product = await Product.findOne({
        where: { id: request.params.id },
        attributes: ["name", "available"],
      });

      if (!deprecated_product) {
        throw new Error({
          name: "Product not found",
          message: "Could not find the product with the requested ID.",
        });
      }

      const updated_product = {
        name: deprecated_product.name || request.body.name,
        available: deprecated_product.name || request.body.available,
      };

      const updated = await deprecated_product.update(updated_product);

      if (updated)
        return response
          .status(status.OK)
          .json({ message: "Product updated", updated_product });
    } catch (error) {
      return response
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: "Could not update m8, sorry", error });
    }
  },
  delete_a_product: async (request, response) => {
    try {
      await Product.destroy({ where: { id: request.params.id } });

      return response.status(status.GONE).json({ message: "Product is gone" });
    } catch (error) {
      return response
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ message: "Could not delete this one m8", error });
    }
  },
};
