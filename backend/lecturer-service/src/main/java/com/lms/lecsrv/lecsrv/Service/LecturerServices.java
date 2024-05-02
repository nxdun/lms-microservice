package com.lms.lecsrv.lecsrv.Service;

import com.lms.lecsrv.lecsrv.Entity.Lecturer;
import com.lms.lecsrv.lecsrv.Repo.LecturerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LecturerServices {

    @Autowired
    private LecturerRepo lecturerRepo;
    public void saveOrAddLecturer(Lecturer lecturer) {
        lecturerRepo.save(lecturer);
    }

    public Iterable<Lecturer> getAllLecturers() {
        return this.lecturerRepo.findAll();
    }

    public void deleteLecturer(String id) {
        this.lecturerRepo.deleteById(id);
    }

    public Lecturer getLecturer(String id) {
        if (this.lecturerRepo.findById(id).isPresent()) {
            return this.lecturerRepo.findById(id).get();
        } else {
            return null;
        }
    }
}
