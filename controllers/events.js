const {request , response} = require('express')
const Events = require('../model/Events')



const getEvent = async (req = request , res = response) => {

    const eventos = await Events.find().populate('user' , 'name')
    try {
        
        res.status(200).json({
            ok : true,
            evento : eventos 
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok : false,
            mgs : 'Comuniquese con soporte tecnico'
        })
   }
}
const createEvent = async (req = request , res = response) => {

    const evento = new Events(req.body)

    try {
        evento.user = req.uuid
        const eventoGuardado = await evento.save()
        res.status(200).json({
            ok : true,
            evento : eventoGuardado
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok : false,
            mgs : 'Comuniquese con soporte tecnico'
        })
    }

}
const editEvent = async (req = request , res = response) => {

    const eventId = req.params.id
    const idUser = req.uuid

    try {
        
        const evento = await Events.findById(eventId)

        if(!evento) {
            return res.status(404).json({
                ok : false,
                msg : 'not found id'
            })
        }
        if(evento.user.toString() !== idUser) {
            return res.status(401).json({
                ok : false,
                mgs : 'No se puede actualizar el evento que no creo'
            })
        }

        const newEvent = {
            ...req.body,
            user: idUser 
        }

        const eventUpdate = await Events.findByIdAndUpdate(eventId ,newEvent , {new : true})

        res.status(200).json({
            ok : true,
            evento: eventUpdate
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok : false,
            mgs : 'Comuniquese con soporte tecnico'
        })
    }
  
}
const deleteEvent = async (req = request , res = response) => {
    
    const eventId = req.params.id
    const idUser = req.uuid

    try {
        
        const evento = await Events.findById(eventId)

        if(!evento) {
            return res.status(404).json({
                ok : false,
                msg : 'not found id'
            })
        }
        if(evento.user.toString() !== idUser) {
            return res.status(401).json({
                ok : false,
                mgs : 'No se puede eliminar el evento que no creo'
            })
        }

       await Events.findByIdAndDelete(eventId)

        res.status(200).json({
            ok : true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok : false,
            mgs : 'Comuniquese con soporte tecnico'
        })
    }
  

}



module.exports={
    getEvent,
    createEvent,
    editEvent,
    deleteEvent
}