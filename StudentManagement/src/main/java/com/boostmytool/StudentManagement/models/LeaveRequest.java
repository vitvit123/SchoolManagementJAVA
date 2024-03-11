package com.boostmytool.StudentManagement.models;

import java.util.Date;
import jakarta.persistence.*;

@Entity
@Table(name = "LeaveRequest")
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LeaveID")
    private int leaveId;

    @ManyToOne
    @JoinColumn(name = "StudentID")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "LecturerID")
    private Lecture lecturer;

    @ManyToOne
    @JoinColumn(name = "CourseID")
    private Course course;

    @Column(name = "Date")
    private Date date;

    @Column(name = "Reason")
    private String reason;

    @Column(name = "IsCompleted")
    private boolean isCompleted;

    @ManyToOne
    @JoinColumn(name = "ClassID") 
    private Class myClass;

    @ManyToOne
    @JoinColumn(name = "TimeID") 
    private StudySchedule studyTime;

    @Column(name = "ApproveID")
    private String approveId;


    public int getLeaveId() {
        return leaveId;
    }

    public Class getMyClass() {
        return myClass;
    }

    public void setMyClass(Class myClass) {
        this.myClass = myClass;
    }

    public StudySchedule getStudyTime() {
        return studyTime;
    }

    public void setStudyTime(StudySchedule studyTime) {
        this.studyTime = studyTime;
    }

    public String getApproveId() {
        return approveId;
    }

    public void setApproveId(String approveId) {
        this.approveId = approveId;
    }

    public void setLeaveId(int leaveId) {
        this.leaveId = leaveId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Lecture getLecturer() {
        return lecturer;
    }

    public void setLecturer(Lecture lecturer) {
        this.lecturer = lecturer;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }
}
