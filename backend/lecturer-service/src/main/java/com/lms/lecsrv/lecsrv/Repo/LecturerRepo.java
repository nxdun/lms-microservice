package com.lms.lecsrv.lecsrv.Repo;

import com.lms.lecsrv.lecsrv.Entity.Lecturer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LecturerRepo extends MongoRepository<Lecturer,String> {

}
