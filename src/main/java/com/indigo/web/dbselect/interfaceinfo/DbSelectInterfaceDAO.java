package com.indigo.web.dbselect.interfaceinfo;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.indigo.web.dbselect.condition.DbSelectConditionVO;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.List;

@Repository("DbSelectInterfaceDAO")
public class DbSelectInterfaceDAO extends SqlMapClientDaoSupport {
    @Resource(name = "sqlMapClient")
    public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
        super.setSqlMapClient(sqlMapClient);
    }

    public int updateDbSelectInterface(DbSelectInterfaceVO vo) throws SQLException {
        return getSqlMapClient().update("db_select_interface.updateDbSelectInterface", vo);
    }

    public int deleteDbSelectInterface(DbSelectInterfaceVO vo) throws SQLException {
        return getSqlMapClient().delete("db_select_interface.deleteDbSelectInterface", vo);
    }

    public void insertDbSelectInterface(DbSelectInterfaceVO vo) throws SQLException {
        getSqlMapClient().insert("db_select_interface.insertDbSelectInterface", vo);
    }

    @SuppressWarnings("unchecked")
    public List<DbSelectInterfaceVO> selectInterfaceList() throws SQLException {
        return getSqlMapClient().queryForList("db_select_interface.selectInterfaceList");
    }

    @SuppressWarnings("unchecked")
    public List<DbSelectInterfaceVO> selectInterfaceListByPatternDt() throws SQLException {
        return getSqlMapClient().queryForList("db_select_interface.selectInterfaceListByPatternDt");
    }
}
