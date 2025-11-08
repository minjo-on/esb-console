package com.indigo.web.filetransfer.service;

import java.util.List;
import com.indigo.web.filetransfer.vo.FileMetaVO;

public interface FileMetaService {

    List<FileMetaVO> selectFileMetaList() throws Exception;

    void insertFileMeta(FileMetaVO vo) throws Exception;

    int updateFileMeta(FileMetaVO vo) throws Exception;

    int deleteFileMeta(FileMetaVO vo) throws Exception;
    
    List<Object> selectInterfaceList() throws Exception;

    int selectInterfaceCount() throws Exception;
}
