package com.indigo.web.dbselect.condition;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.List;

@Service("dbSelectConditionService")
public class DbSelectConditionServiceImpl implements DbSelectConditionService {

    @Resource(name = "DbSelectConditionDAO")
    private DbSelectConditionDAO dbSelectConditionDAO;

    @Override
    @Transactional
    public int deleteDbSelectCondition(String interfaceId, String columnName) throws Exception {
        DbSelectConditionVO vo = new DbSelectConditionVO();
        vo.setInterfaceId(interfaceId);
        vo.setColumnName(columnName);
        return dbSelectConditionDAO.deleteDbSelectCondition(vo);
    }

    @Override
    @Transactional
    public void insertDbSelectCondition(String interfaceId, String tableName, String columnName, String operator, String value, String updateValue, Integer used) throws Exception {
        DbSelectConditionVO vo = new DbSelectConditionVO();
        vo.setInterfaceId(interfaceId);
        vo.setTableName(tableName);
        vo.setColumnName(columnName);
        vo.setOperator(operator);
        vo.setValue(value);
        vo.setUpdateValue(updateValue);
        vo.setUsed(used);
        dbSelectConditionDAO.insertDbSelectCondition(vo);
    }

    @Override
    public List<DbSelectConditionVO> getByInterfaceId(String interfaceId) throws Exception {
        return dbSelectConditionDAO.findByInterfaceId(interfaceId);
    }

    @Override
    @Transactional
    public int updateDbSelectCondition(String interfaceId, String tableName, String columnName, String operator, String value, String updateValue, Integer used) throws SQLException {
        DbSelectConditionVO vo = new DbSelectConditionVO();
        vo.setInterfaceId(interfaceId);
        vo.setTableName(tableName);
        vo.setColumnName(columnName);
        vo.setOperator(operator);
        vo.setValue(value);
        vo.setUpdateValue(updateValue);
        vo.setUsed(used);

        return dbSelectConditionDAO.updateDbSelectCondition(vo);
    }
}
