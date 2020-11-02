module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    id_commerce: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    available: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Commerce, {
      foreignKey: "id_commerce",
    });
  };

  return Product;
};
