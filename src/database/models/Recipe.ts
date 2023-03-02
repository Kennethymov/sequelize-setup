import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import User from './User';

class Recipe extends Model {
  id!: number;
  name!: string;
  ingredients!: string;
  preparation!: string;
  userId!: number;
}

Recipe.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  ingredients: {
    type: STRING,
    allowNull: false,
  },
  preparation: {
    type: STRING,
    allowNull: false,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'recipes',
  timestamps: false,
  underscored: true,
});

Recipe.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Recipe;
