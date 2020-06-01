module.exports = (sequelize, DataTypes) => {
	const Commerce = sequelize.define('Commerce', {
      id_seller: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },  
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      zipcode: {
        allowNull: false,
        type:DataTypes.INTEGER,
      },
      street: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      number: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      complement: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      neighborhood: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING
      },
      open_hours: {
        allowNull: false,
        type: DataTypes.STRING
      },
      open_days: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING)
      }
	})

    Commerce.associate = models => {
        Commerce.belongsTo(models.Seller, {
          foreignKey: 'id_seller'
        })
    }

	return Commerce
}