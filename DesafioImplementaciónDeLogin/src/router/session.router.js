import { Router } from 'express'
import { createHash, isValidPassword } from '../utils.js'
import User from '../models/user.js'

const routerS = Router()

routerS.post('/register', async (req, res) => {
const { first_name, last_name, email, age, password,role } = req.body;
    try {
        const newUser = new User({
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role
        })
        await newUser.save()
        if (newUser.role ==='admin') {
            return res.redirect('/realTimeProducts')
        }
        else{
            
            res.redirect('/')
        }
    } catch (err) {
        console.log('Error al registrar usuario:', err)
        res.status(500).send('Error al registrar usuario')
    } 
    }
)

routerS.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) return res.status(404).send('Usuario no encontrado');
        if (!isValidPassword(user, password)) return res.status(403).send({ status: "error", error: "Password incorrecto" })
        delete user.password
        req.session.user = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role
        }
        console.log(req.session.user)
        if (user.role ==='admin') {
            return res.redirect('/realTimeProducts')
        }
        else{
            
            res.redirect('/')
        }

    } catch (err) {
        res.status(500).send('Error al iniciar sesión')
    }
})

routerS.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login')
    })
})

export default routerS
