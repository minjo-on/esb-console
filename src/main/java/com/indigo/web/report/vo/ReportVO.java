package com.indigo.web.report.vo;

import java.sql.Timestamp;

public class ReportVO {
    private int reportSeq;
    private String report_Type;
    private String title;
    private String reg_Date;
    private String department;
    private String user_Id;
    private String contact_Number;
    private String receive_Email;
    private String current_Situation;


    public int getReportSeq() {
        return reportSeq;
    }

    public void setReportSeq(int reportSeq) {
        this.reportSeq = reportSeq;
    }

    public String getReport_Type() {
        return report_Type;
    }

    public void setReport_Type(String report_Type) {
        this.report_Type = report_Type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    //	public Timestamp getReg_Date() {
//		return reg_Date;
//	}
//	public void setReg_Date(Timestamp reg_Date) {
//		this.reg_Date = reg_Date;
//	}
    public String getDepartment() {
        return department;
    }

    public String getReg_Date() {
        return reg_Date;
    }

    public void setReg_Date(String reg_Date) {
        this.reg_Date = reg_Date;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(String user_Id) {
        this.user_Id = user_Id;
    }

    public String getContact_Number() {
        return contact_Number;
    }

    public void setContact_Number(String contact_Number) {
        this.contact_Number = contact_Number;
    }

    public String getReceive_Email() {
        return receive_Email;
    }

    public void setReceive_Email(String receive_Email) {
        this.receive_Email = receive_Email;
    }

    public String getCurrent_Situation() {
        return current_Situation;
    }

    public void setCurrent_Situation(String current_Situation) {
        this.current_Situation = current_Situation;
    }
}
