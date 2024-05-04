package com.lms.lecsrv.lecsrv.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.Map;

@Document(collection = "lecturer")
public class Lecturer {
    @Id
    private String _id;
    private String name;
    private String email;
    private String ppic;
    //list containing enrolleed courses
    private String[] courses;
    //list containing social media links in key value pair
    private String[] socialMedia;

    public Lecturer() {
    }

    public Lecturer(String[] socialMedia, String[] courses, String ppic, String email, String name, String _id) {
        this.socialMedia = socialMedia;
        this.courses = courses;
        this.ppic = ppic;
        this.email = email;
        this.name = name;
        this._id = _id;
    }

    @Override
    public String toString() {
        return "Lecturer{" +
                "_id='" + _id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", ppic='" + ppic + '\'' +
                ", courses=" + Arrays.toString(courses) +
                ", socialMedia=" + Arrays.toString(socialMedia) +
                '}';
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPpic() {
        return ppic;
    }

    public void setPpic(String ppic) {
        this.ppic = ppic;
    }

    public String[] getCourses() {
        return courses;
    }

    public void setCourses(String[] courses) {
        this.courses = courses;
    }

    public String[] getSocialMedia() {
        return socialMedia;
    }

    public void setSocialMedia(String[] socialMedia) {
        this.socialMedia = socialMedia;
    }
}
