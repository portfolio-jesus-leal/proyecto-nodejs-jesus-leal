const Course = require("../models/course.model");

// El next es porque ya tenemos dfinido nuestro middleware para gestionar los errores
// Por lo que el catch deberá pasar el control a next con el error
const getAllCourses = async (req, res, next) => {
  try {
    const allCourses = await Course.find().populate("tutor");
    return res.status(200).json(allCourses);
  } catch (error) {
    return next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const tutor = await Course.findById(req.params.id);
    return res.status(200).json(tutor);
  } catch (error) {
    return next(error);
  }
};

const postNewCourse = async (req, res, next) => {
  try {
    const newCourse = new Course(req.body);
    console.log(newCourse);
    const newCourseInDB = await newCourse.save();
    return res.status(200).send(newCourseInDB);
  } catch (error) {
    return next(error);
  }
};

const updateCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;   

        // Falta implementa updateCourse
        // ???????????
        
        return res.status(200).json(updateCourse);
    } catch (error) {
        return next(error);  
    }
}

const pathNewTitle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const title = req.body.title;
    const updateCourseWithTitle = await Course.findByIdAndUpdate(id, {
      $set: { title: title },
    });
    return res.status(200).json(updateCourseWithTitle);
  } catch (error) {
    return next(error);
  }
};

const pathNewTutor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tutor = req.body.tutor;
    const updateCourseWithTutor = await Course.findByIdAndUpdate(id, {
      $set: { tutor: tutor },
    });
    return res.status(200).json(updateCourseWithTutor);
  } catch (error) {
    return next(error);
  }
};

const pathNewStartDate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const startDate = req.body.start_date;
    const updateCourseWithStartDate = await Course.findByIdAndUpdate(id, {
      $set: { startDate: startDate },
    });
    return res.status(200).json(updateCourseWithStartDate);
  } catch (error) {
    return next(error);
  }
};

const pathNewStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = req.body.status;
    const updateCourseWithStatus = await Course.findByIdAndUpdate(id, {
      $set: { status: status },
    });
    return res.status(200).json(updateCourseWithStatus);
  } catch (error) {
    return next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    //Buscar si existe algún alumno inscrito
    //??????????????

    await Course.delete(id);
    return res.status(200).json({});

  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  postNewCourse,
  deleteCourse,
  updateCourseById,
  pathNewTitle,
  pathNewTutor,
  pathNewStartDate,
  pathNewStatus,
};
