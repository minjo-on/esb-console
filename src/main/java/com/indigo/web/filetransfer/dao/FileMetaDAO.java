package com.indigo.web.filetransfer.dao;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Repository;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.indigo.web.filetransfer.vo.FileMetaVO;

@Repository("fileMetaDAO")
public class FileMetaDAO extends SqlMapClientDaoSupport {

    @Resource(name = "sqlMapClient")
    public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
        super.setSqlMapClient(sqlMapClient);
    }

    @SuppressWarnings("unchecked")
    public List<FileMetaVO> selectFileMetaList() throws SQLException {
        return getSqlMapClient().queryForList("file_meta.selectFileMetaList");
    }

    public void insertFileMeta(FileMetaVO vo) throws SQLException {
        getSqlMapClient().insert("file_meta.insertFileMeta", vo);
    }

    public int updateFileMeta(FileMetaVO vo) throws SQLException {
        return getSqlMapClient().update("file_meta.updateFileMeta", vo);
    }

    public int deleteFileMeta(FileMetaVO vo) throws SQLException {
        return getSqlMapClient().delete("file_meta.deleteFileMeta", vo);
    }
    
    @SuppressWarnings("unchecked")
    public List<Object> selectInterfaceList() throws SQLException {
        return getSqlMapClient().queryForList("file_meta.selectInterfaceList");
    }

    public int selectInterfaceCount() throws SQLException {
        return (Integer) getSqlMapClient().queryForObject("file_meta.selectInterfaceCount");
    }
}
