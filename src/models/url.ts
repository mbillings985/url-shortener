import {
  Table,
  Column,
  Model,
  DataType,
  Index,
} from "sequelize-typescript";

@Table
export class Url extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true
  })
  shortUrl!: string;

  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  longUrl!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  clicks!: number;
}

export default Url;
