package com.indigo.web.dbselect.interfaceinfo;

import com.indigo.web.dbselect.condition.DbSelectConditionVO;

import java.sql.SQLException;
import java.util.List;

public interface DbSelectInterfaceService {
    int deleteDbSelectInterface(String interfaceId) throws Exception;
    void insertDbSelectInterface(String interfaceId, String tableName) throws Exception;
    List<DbSelectInterfaceVO> selectInterfaceList() throws Exception;
    int updateDbSelectInterface(String interfaceId, String tableName) throws SQLException;
    List<DbSelectInterfaceVO> selectInterfaceListByPatternDt() throws SQLException;
}
