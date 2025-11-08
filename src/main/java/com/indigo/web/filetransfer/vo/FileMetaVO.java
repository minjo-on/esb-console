package com.indigo.web.filetransfer.vo;

import java.io.Serializable;

public class FileMetaVO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String interfaceId;
    private String tableName;
    private String delimiter;
    private String columns;
    private String encoding;
    private String hasHeader;
    private String fileExtension;
    private String createdAt;
    private String updatedAt;
    
    // Getters and Setters
    public String getInterfaceId() {
        return interfaceId;
    }

    public void setInterfaceId(String interfaceId) {
        this.interfaceId = interfaceId;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getDelimiter() {
        return delimiter;
    }

    public void setDelimiter(String delimiter) {
        this.delimiter = delimiter;
    }

    public String getColumns() {
        return columns;
    }

    public void setColumns(String columns) {
        this.columns = columns;
    }

    public String getEncoding() {
        return encoding;
    }

    public void setEncoding(String encoding) {
        this.encoding = encoding;
    }

    public String getHasHeader() {
        return hasHeader;
    }

    public void setHasHeader(String hasHeader) {
        this.hasHeader = hasHeader;
    }

    public String getFileExtension() {
        return fileExtension;
    }

    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
