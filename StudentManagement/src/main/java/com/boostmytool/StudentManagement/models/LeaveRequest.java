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
    public Student student;

    @ManyToOne
    @JoinColumn(name = "LecturerID")
    private Lecture lecturer;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id")
    public Course course;

    @Column(name = "Date")
    private Date date;

    @Column(name = "Reason")
    private String reason;

    @Column(name = "IsCompleted")
    public char isCompleted;

    @ManyToOne
    @JoinColumn(name = "ClassID")
    private Class myClass;

    @ManyToOne
    @JoinColumn(name = "TimeID")
    private StudySchedule studyTime;

    @ManyToOne
    @JoinColumn(name = "AdminID")
    public Admin adminid; 

    public int getLeaveId() {
        return leaveId;
    }

    public Class getMyClass() {
        return myClass;
    }

    public void setMyClass(Class classId) {
        this.myClass = classId;
    }

    public StudySchedule getStudyTime() {
        return studyTime;
    }

    public void setStudyTime(StudySchedule timeid) {
        this.studyTime = timeid;
    }

    public Admin getApprover() {
        return adminid;
    }
    
    public void setApprover(Admin approver) {
        this.adminid = approver;
    }
    

    public void setLeaveId(int leaveId) {
        this.leaveId = leaveId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student studentid) {
        this.student = studentid;
    }

    public Lecture getLecturer() {  
        return lecturer;
    }

    public void setLecturer(Lecture lecturerid) {
        this.lecturer = lecturerid;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course id) {
        this.course = id;
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

    public char isCompleted() {
        return isCompleted;
    }

    public void setCompleted(char completed) {
        isCompleted = completed;
    }
}
