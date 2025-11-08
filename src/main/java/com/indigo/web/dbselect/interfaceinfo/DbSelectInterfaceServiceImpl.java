package com.indigo.web.dbselect.interfaceinfo;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

@Service("dbSelectInterfaceService")
public class DbSelectInterfaceServiceImpl implements DbSelectInterfaceService {

    @Resource(name = "DbSelectInterfaceDAO")
    private DbSelectInterfaceDAO dbSelectInterfaceDAO;

    @Override
    @Transactional
    public int deleteDbSelectInterface(String interfaceId) throws Exception {
        DbSelectInterfaceVO vo = new DbSelectInterfaceVO();
        vo.setInterfaceId(interfaceId);

        return dbSelectInterfaceDAO.deleteDbSelectInterface(vo);
    }

    @Override
    @Transactional
    public void insertDbSelectInterface(String interfaceId, String tableName) throws Exception {
        DbSelectInterfaceVO vo = new DbSelectInterfaceVO();
        vo.setInterfaceId(interfaceId);
        vo.setTableName(tableName);
        dbSelectInterfaceDAO.insertDbSelectInterface(vo);
    }

    @Override
    public List<DbSelectInterfaceVO> selectInterfaceList() throws Exception {
        return dbSelectInterfaceDAO.selectInterfaceList();
    }

    @Override
    @Transactional
    public int updateDbSelectInterface(String interfaceId, String tableName) throws SQLException {
        DbSelectInterfaceVO vo = new DbSelectInterfaceVO();
        vo.setInterfaceId(interfaceId);
        vo.setTableName(tableName);
        return dbSelectInterfaceDAO.updateDbSelectInterface(vo);
    }

    @Override
    public List<DbSelectInterfaceVO> selectInterfaceListByPatternDt() throws SQLException {
        return dbSelectInterfaceDAO.selectInterfaceListByPatternDt();
    }
}
