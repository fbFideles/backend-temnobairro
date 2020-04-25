module.exports = (sequelize, DataTypes) => {
	const Seller = sequelize.define('Seller', {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      }
	})

  Seller.associate = (models) => {
    Seller.hasMany(models.Commerce, { as: 'commerce' })
  }

	return Seller;
}
