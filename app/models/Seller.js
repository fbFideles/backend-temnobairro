module.exports = (sequelize, DataTypes) => {
	const Seller = sequelize.define('Seller', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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

    Seller.associate = models => {
        Seller.hasMany(models.Commerce, {
            foreignKey: 'id_seller'
        })
    }

	return Seller;
}
