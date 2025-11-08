package com.indigo.web.filetransfer.controller;

import com.indigo.web.common.IndigoJsonModel;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import com.indigo.web.filetransfer.service.FileMetaService;
import com.indigo.web.filetransfer.vo.FileMetaVO;

@Controller
@RequestMapping("/FileTransferController")
public class FileTransferController {

    protected final Log log = LogFactory.getLog(getClass());

    @Resource(name = "fileMetaService")
    private FileMetaService fileMetaService;

    @RequestMapping(params = "cmd=list")
    public ModelAndView getFileMetaList(HttpServletRequest request, HttpServletResponse response) throws Exception {

        List<FileMetaVO> list = fileMetaService.selectFileMetaList();

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("data", list);
        result.put("total", list.size());
        result.put("success", true);

        return new ModelAndView("jsonView", result);
    }

    @RequestMapping(params = "cmd=interfaceList")
    public ModelAndView getInterfaceList(HttpServletRequest request, HttpServletResponse response) throws Exception {

        List<Object> list = fileMetaService.selectInterfaceList();
        int total = fileMetaService.selectInterfaceCount();

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("data", list);
        result.put("total", total);
        result.put("success", true);

        return new ModelAndView("jsonView", result);
    }

    @RequestMapping(params = "cmd=addFileMeta")
    public ModelAndView addFileMeta(HttpSession session,
            @RequestParam("interfaceId") String interfaceId,
            @RequestParam("tableName") String tableName,
            @RequestParam("delimiter") String delimiter,
            @RequestParam("columns") String columns,
            @RequestParam("encoding") String encoding,
            @RequestParam("hasHeader") String hasHeaderStr,
            @RequestParam("fileExtension") String fileExtension) {
        log.info("#operation => file-meta-insert");

        FileMetaVO fileMetaVO = new FileMetaVO();
        fileMetaVO.setInterfaceId(interfaceId);
        fileMetaVO.setTableName(tableName);
        fileMetaVO.setDelimiter(delimiter);
        fileMetaVO.setColumns(columns);
        fileMetaVO.setEncoding(encoding);
        fileMetaVO.setHasHeader(hasHeaderStr);
        fileMetaVO.setFileExtension(fileExtension);
        fileMetaVO.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        Map<String, Object> map = new HashMap<String, Object>();
        try {
            fileMetaService.insertFileMeta(fileMetaVO);
            map.put("status", "success");
        } catch (Exception e) {
            log.error(e, e);
            map.put("status", "fail");
            map.put("message", e.getMessage());
        }

        IndigoJsonModel indigoModel = new IndigoJsonModel(map);
        return indigoModel;
    }

    @RequestMapping(params = "cmd=deleteFileMeta")
    public ModelAndView deleteFileMeta(@RequestParam("interfaceId") String interfaceId,
            @RequestParam("tableName") String tableName) {
        log.info("#operation => file-meta-delete");

        Map<String, Object> map = new HashMap<String, Object>();
        try {
            FileMetaVO fileMetaVO = new FileMetaVO();
            fileMetaVO.setInterfaceId(interfaceId);
            fileMetaVO.setTableName(tableName);
            fileMetaService.deleteFileMeta(fileMetaVO);
            map.put("status", "success");
        } catch (Exception e) {
            log.error(e, e);
            map.put("status", "fail");
            map.put("message", e.getMessage());
        }

        IndigoJsonModel indigoModel = new IndigoJsonModel(map);
        return indigoModel;
    }

    @RequestMapping(params = "cmd=updateFileMeta")
    public ModelAndView updateFileMeta(HttpSession session,
            @RequestParam("interfaceId") String interfaceId,
            @RequestParam("tableName") String tableName,
            @RequestParam("delimiter") String delimiter,
            @RequestParam("columns") String columns,
            @RequestParam("encoding") String encoding,
            @RequestParam("hasHeader") String hasHeaderStr,
            @RequestParam("fileExtension") String fileExtension) {
        log.info("#operation => file-meta-update");

        FileMetaVO fileMetaVO = new FileMetaVO();
        fileMetaVO.setInterfaceId(interfaceId);
        fileMetaVO.setTableName(tableName);
        fileMetaVO.setDelimiter(delimiter);
        fileMetaVO.setColumns(columns);
        fileMetaVO.setEncoding(encoding);
        fileMetaVO.setHasHeader(hasHeaderStr);
        fileMetaVO.setFileExtension(fileExtension);
        fileMetaVO.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        Map<String, Object> map = new HashMap<String, Object>();
        try {
            fileMetaService.updateFileMeta(fileMetaVO);
            map.put("status", "success");
        } catch (Exception e) {
            log.error(e, e);
            map.put("status", "fail");
            map.put("message", e.getMessage());
        }

        IndigoJsonModel indigoModel = new IndigoJsonModel(map);
        return indigoModel;
    }
}
