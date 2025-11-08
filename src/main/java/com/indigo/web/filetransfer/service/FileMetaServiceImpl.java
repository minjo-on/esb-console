package com.indigo.web.filetransfer.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indigo.web.filetransfer.dao.FileMetaDAO;
import com.indigo.web.filetransfer.vo.FileMetaVO;

@Service("fileMetaService")
@Transactional
public class FileMetaServiceImpl implements FileMetaService {

    @Resource(name = "fileMetaDAO")
    private FileMetaDAO fileMetaDAO;

    @Override
    public List<FileMetaVO> selectFileMetaList() throws Exception {
        return fileMetaDAO.selectFileMetaList();
    }

    @Override
    public void insertFileMeta(FileMetaVO vo) throws Exception {
        fileMetaDAO.insertFileMeta(vo);
    }

    @Override
    public int updateFileMeta(FileMetaVO vo) throws Exception {
        return fileMetaDAO.updateFileMeta(vo);
    }

    @Override
    public int deleteFileMeta(FileMetaVO vo) throws Exception {
        return fileMetaDAO.deleteFileMeta(vo);
    }
    
    @Override
    public List<Object> selectInterfaceList() throws Exception {
        return fileMetaDAO.selectInterfaceList();
    }

    @Override
    public int selectInterfaceCount() throws Exception {
        return fileMetaDAO.selectInterfaceCount();
    }
}
