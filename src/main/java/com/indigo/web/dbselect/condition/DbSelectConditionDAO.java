package com.indigo.web.dbselect.condition;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.indigo.web.dbselect.interfaceinfo.DbSelectInterfaceVO;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.List;

@Repository("DbSelectConditionDAO")
public class DbSelectConditionDAO extends SqlMapClientDaoSupport {
    @Resource(name = "sqlMapClient")
    public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
        super.setSqlMapClient(sqlMapClient);
    }

    public int updateDbSelectCondition(DbSelectConditionVO vo) throws SQLException {
        return getSqlMapClient().update("db_select_condition.updateDbSelectCondition", vo);
    }

    public int deleteDbSelectCondition(DbSelectConditionVO vo) throws SQLException {
        return getSqlMapClient().delete("db_select_condition.deleteDbSelectCondition", vo);
    }

    public void insertDbSelectCondition(DbSelectConditionVO vo) throws SQLException {
        getSqlMapClient().insert("db_select_condition.insertDbSelectCondition", vo);
    }

    @SuppressWarnings("unchecked")
    public List<DbSelectConditionVO> findByInterfaceId(String interfaceId) throws SQLException {
        return getSqlMapClient().queryForList("db_select_condition.selectDbSelectConditionByInterfaceId", interfaceId);
    }
}
