import { DataTypes , Model } from "sequelize";
import connection from "../../config/db.js";

class Users extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // 主键
      autoIncrement: true, // 自增
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // 非空
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false, // 非空
    }
  },
  {
    sequelize: connection, // 连接 sequelize 对象
    modelName: "users", // 表名
    timestamps: false, // 时间戳createdAt/updatedAt 
  }
);

export default Users;