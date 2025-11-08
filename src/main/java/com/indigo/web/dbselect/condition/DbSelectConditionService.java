package com.indigo.web.dbselect.condition;

import java.sql.SQLException;
import java.util.List;

public interface DbSelectConditionService {
    int deleteDbSelectCondition(String interfaceId, String columnName) throws Exception;
    void insertDbSelectCondition(String interfaceId, String tableName, String columnName, String operator, String value, String updateValue, Integer used) throws Exception;
    List<DbSelectConditionVO> getByInterfaceId(String interfaceId) throws Exception;
    int updateDbSelectCondition(String interfaceId, String tableName, String columnName, String operator, String value, String updateValue, Integer used) throws SQLException;
}
