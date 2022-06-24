const bcrypt = require("bcrypt-nodejs");
//const { restart } = require("nodemon");
const Subject = require("../models/subject");


// crear una asignatura
const createSubject = (req,res) => {

    const subject = new Subject();
    const { department,
            academic_activity,
            activity_code,
            number_credits,
            piaa_version,
            file_number,
            file_date,
            theory_hours,
            offsite_hours,
            hoursnon_attendance_reprovals,            
            duration_semester,
            practical_hours,
            presential_teacher_hours,
            maximum_quotas,
            passing_score,
            weeks_duration
        } = req.body;

        subject.department = department;
        subject.academic_activity = academic_activity;
        subject.activity_code = activity_code;
        subject.number_credits = number_credits;
        subject.piaa_version = piaa_version;
        subject.piaa_status=true; //por defecto
        subject.file_number= file_number;
        subject.file_date = file_date;
        subject.theory_hours = theory_hours;
        subject.offsite_hours = offsite_hours;
        subject.hoursnon_attendance_reprovals = hoursnon_attendance_reprovals;
        subject.last_chance = true; // por defecto
        subject.duration_semester = duration_semester;
        subject.practical_hours = practical_hours;
        subject.presential_teacher_hours = presential_teacher_hours;
        subject.maximum_quotas = maximum_quotas;
        subject.passing_score = passing_score;
        subject.weeks_duration = weeks_duration;

        

    // validamos que todos los cmapos esten diligenciados
    if (
        !department || 
        !academic_activity ||
        !activity_code ||
        !number_credits ||
        !piaa_version ||         
        !file_number||
        !file_date || 
        !theory_hours || 
        !offsite_hours ||  
        !hoursnon_attendance_reprovals ||        
        !duration_semester ||
        !practical_hours ||  
        !presential_teacher_hours ||  
        !maximum_quotas ||
        !passing_score || 
        !weeks_duration 
        ) {

        res.status(404).send({ message: "Todos los campos son obligatorios"});

    } else {
        subject.save((err, subjectStored) => {
            if (err) {
                res.status(500).send({ message: "La asignatura ya existe"})
            } else {
                if (!subjectStored) {
                    res.status(404).send({ messgae: "Error al crear la asginatura."});
                } else {
                    res.status(200).send({ subject: subjectStored});
                }
            }
        })
    };
};

// aceder a las asignaturas creadas

const getsubjects = (req, res) => {
    Subject.find().then((subjects) => {
        !subjects 
            ? res.status(404).send({ message: "No se encontro ninguna asignatura"})
            : res.status(200).send({ subjects });
    });
};

// actualizar una asignatura

async function updateSubjects(req, res) {

    let subjectData = req.body;    
    const params = req.params;
  
    /* Actualizamos el resto de los datos */
    Subject.findByIdAndUpdate({ _id: params.id }, subjectData, (err, subjectUpdate) => {
      err
        ? res.status(500).send({ message: "Error del servidor." })
        : !subjectUpdate
        ? res.status(404).send({ message: "No se encontro el usuario." })
        : res.status(200).send({ message: "Usuario actualizado correctamente." });
    });
};

const deletSubject = (req, res) => {
    const { id } = req.params;

    Subject.findByIdAndRemove(id, (err, subjectDeleted) =>{
        err
            ? res.status(500).send({ messge: "Error en el servidor"})
            : !subjectDeleted
            ? res.status(404).send({ message: "Asignatura no encontrada"})
            : res
                 .status(200)
                 .send({ message: "El usuario ha sido eliminado correctamente"});
    });
};

// filtrar asignaturas por version del PiAA

const getVersionPiia = (req, res) =>{
    const {version} = req.params;    
    Subject.find({piaa_version:version})
        .then((subjects) =>{
            !subjects
                ? res.status(404).send({ messgae: "No existe alguna asignatira con esa version de piia"})
                : res.status(200).send({ subjects });
        })
};

// ver los PIIA´s activos

const getActiveSubjects = (req, res) => {
    const {activeSubjects} = req.query;
    Subject.find({ piaa_status: true }).then((subjects) => {
      !subjects
        ? res.status(404).send({ message: "No se ha encontrado ninguna asignatura" })
        : res.status(200).send({ subjects });
    });
};

// ver los PIIA´s inactivos activos

const getInactiveSubjects = (req, res) => {
    const activeSubjects = req.query;
    Subject.find({ piaa_status: false }).then((subjects) => {
      !subjects
        ? res.status(404).send({ message: "No se ha encontrado ninguna asignatura" })
        : res.status(200).send({ subjects });
    });
};

// activar o desactivar

const activateSubjects = (req, res) => {
    const { id } = req.params;
    const { piaa_status } = req.body;
  
    Subject.findByIdAndUpdate(id, { piaa_status }, (err, subjectStored) => {
      err
        ? res.status(500).send({ message: "Error del servidor." })
        : !subjectStored
        ? res.status(404).send({ message: "No se ha encontrado el pIIa." })
        : piaa_status === true
        ? res.status(200).send({ message: "PIIA activado correctamente." })
        : res.status(200).send({ message: "PIIA desactivado correctamente." });
    });
  };


// file_number despues ver como se debe trajar este campo
module.exports={
    createSubject,
    getsubjects,
    getVersionPiia,
    deletSubject,
    updateSubjects,
    getActiveSubjects,
    activateSubjects,
    getInactiveSubjects
};
