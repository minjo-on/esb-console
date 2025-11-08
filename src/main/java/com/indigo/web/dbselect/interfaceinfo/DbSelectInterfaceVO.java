package com.indigo.web.dbselect.interfaceinfo;

import java.io.Serializable;

public class DbSelectInterfaceVO implements Serializable {

    private static final long serialVersionUID = 1L;

    private String interfaceId;

    private String interfaceName;

    private String tableName;

    // Getters and Setters
    public String getInterfaceId() {
        return interfaceId;
    }

    public void setInterfaceId(String interfaceId) {
        this.interfaceId = interfaceId;
    }

    public String getInterfaceName() {
        return interfaceName;
    }

    public void setInterfaceName(String interfaceName) {
        this.interfaceName = interfaceName;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }
}
