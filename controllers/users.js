const { where } = require("sequelize");
const User = require("../models/user");

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        if(users) {
            return res.status(200).json({users})
        };

        res.status(404).json({msg: "No users on database",users})
    } catch (error) {
        console.log(error)
    }
}

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findByPk(id);

        if(user){
            return res.status(200).json({msg: "User by id",user})
        };

        res.status(404).json({msg: "User not found"});

    } catch (error) {
        console.log(error);
    }
}

const postUser = async (req, res) => {

    const {nombre, fechanacimiento, numidentificacion} = req.body;

    const userExists = await User.findOne({where: {numidentificacion}})

    if(userExists) {
        return res.json({msg: `User with identification number ${numidentificacion} has already registered previously`, userExists})
    };
    
    const user = await User.create({nombre,fechanacimiento,numidentificacion}) 

    res.json({msg: "User created successfully", user})
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await User.findByPk(id);

        if(user){
            await user.destroy();

            return res.status(200)
            .json({msg: `user with identification number ${user.numidentificacion} was successfully deleted`});
        }

        res.status(404).json({msg: "User not found"});

    } catch (error) {
        console.log(error);
    }
}

const patchUser = async (req, res) => {
    try {
        const {body, params: {id}} = req;
        const {nombre, fechanacimiento, numidentificacion} = body;

        const user = await User.findByPk(id);

        const nombreUpdate = nombre ? nombre : user.nombre;
        const fechanacimientoUpdate = fechanacimiento ? fechanacimiento : user.fechanacimiento;
        const numidentificacionUpdate = numidentificacion ? numidentificacion : user.numidentificacion;

        if(user){
            const updateUser = await user.update(
                {nombre: nombreUpdate, fechanacimiento: fechanacimientoUpdate, numidentificacion: numidentificacionUpdate},
                {where: {id: id}}
            );
            
            return res.status(200).json({
                msg: `user with identification number ${user.numidentificacion} was successfully updated`,updateUser

            })
        }

        res.status(404).json({msg: "User not found",})

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers,
    getUserById,
    postUser,
    deleteUser,
    patchUser
}