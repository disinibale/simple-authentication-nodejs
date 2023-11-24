import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, Unique, CreatedAt, UpdatedAt, HasOne } from 'sequelize-typescript'

import { UserAttributes, UserCreationAttributes } from './interfaces/user.interface'

import Profile from './profile.model'

@Table({
    tableName: 'user'
})
export default class User extends Model<UserAttributes, UserCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @Column(DataType.STRING)
    fullname!: string

    @Unique(true)
    @Column(DataType.STRING)
    username!: string

    @Column(DataType.STRING)
    password!: string

    @HasOne(() => Profile, 'userId')
    profile!: Profile
    
    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    updatedAt!: Date;

}