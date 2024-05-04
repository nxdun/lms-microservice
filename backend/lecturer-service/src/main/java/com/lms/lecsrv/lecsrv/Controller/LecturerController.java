package com.lms.lecsrv.lecsrv.Controller;

import com.lms.lecsrv.lecsrv.Entity.Lecturer;
import com.lms.lecsrv.lecsrv.Service.LecturerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/lecturer")
public class LecturerController {

    @Autowired
    private LecturerServices lecturerServices;

    //adds new lecturer
    @PostMapping("/")
    private String addLecturer(@RequestBody Lecturer lecturer) {
        lecturerServices.saveOrAddLecturer(lecturer);
        return "Done!! "+lecturer.getName()+" Lecturer added as "+lecturer.get_id() + " to the system.";
    }
    //get all lecturers
    @GetMapping("/")
    private Iterable<Lecturer> getAllLecturers() {
        return lecturerServices.getAllLecturers();
    }


    //update lecturer
   @PutMapping("/{id}")
    private Lecturer updateLecturer(@PathVariable(name = "id") String _id, @RequestBody Lecturer lecturer) {
        lecturer.set_id(_id);
        lecturerServices.saveOrAddLecturer(lecturer);
        return lecturer;
    }

    //delete lecturer
    @DeleteMapping("/{id}")
    public String deleteLecturer(@PathVariable(name = "id") String id) {
        lecturerServices.deleteLecturer(id);
        return "Done!! Lecturer deleted from the system.";
    }

    //get lecturer by id
    @GetMapping("get/{id}")
    public Lecturer getLecturer(@PathVariable(name = "id") String id) {
        return lecturerServices.getLecturer(id);
    }
}

