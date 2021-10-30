const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
{
    title: { type: String, required:true, unique:true, trim:true },
    year: { type: Number, default:2000 },
    director: { type: String, required:true, trim:true },
    genre: { 
        type: String,
        trim: true,
        enum:['Accion', 'Drama', 'Animacion', 'Comedia romantica', 'Ciencia ficcion', 'Suspense', 'Desconocido' ],
        default: 'Desconocido'
    }
},
{
    timestamps: true
});

// Name of collection in MongoDB and schema
const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;