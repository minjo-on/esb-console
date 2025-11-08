package com.indigo.web.report.controller;

import com.indigo.web.common.IndigoJsonModel;
import com.indigo.web.common.IndigoWebConstants;
import com.indigo.web.report.SearchVO;
import com.indigo.web.report.impl.ReportServiceImpl;
import com.indigo.web.report.vo.ReportVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
public class ReportController {
    private Log log = LogFactory.getLog(ReportController.class);

    @Resource(name = "reportService")
    private ReportServiceImpl reportService;


    /**
     * 리포트 목록 정보를 담은 맵 반환f
     * @param searchVO
     */
    @RequestMapping(value = "/ReportController", params = "cmd=get-report-list")
    public ModelAndView getReportList(SearchVO searchVO) {
        log.info("#operation => get-report-list");

        // db에서 데이터 리턴받기
        Map<String, Object> map = reportService.selectReportList(searchVO);
        IndigoJsonModel indigoModel = new IndigoJsonModel(map);
        
        System.out.println("출력된 데이터 ==========================================================");
        System.out.println(map);
        System.out.println(indigoModel);

        return indigoModel;

    }

    /**
     * 리포트 시퀀스 번호를 통해 조회한 정보 반환
     * @param reportSeq
     */
    @RequestMapping(value = "/ReportController", params = "cmd=get-report")
    public ModelAndView getReport(@RequestParam int reportSeq) {
        log.info("#operation => get-report");

        // db에서 데이터 리턴받기
        Map<String, Object> map = reportService.selectReport(reportSeq);

        IndigoJsonModel indigoModel = new IndigoJsonModel(map);

        return indigoModel;
    }

    /**
     * 리포트 DB에 입력
     *
     * @param session
     * @param reportVO
     */
    @RequestMapping(value = "/ReportController", params = "cmd=insert-report")
    public ModelAndView InsertReport(HttpSession session, @RequestBody ReportVO reportVO) {
        log.info("#operation => insert-report");

        // 세션에서 LOGIN_ID값 가져오기
        reportVO.setUser_Id((String) session.getAttribute(IndigoWebConstants.SESSION_LOGIN_ID));

        Map<String, Object> map = new HashMap<String, Object>();
        try {
            // 받아온 VO 데이터를 DB에 저장하도록 서비스에 명령
            reportService.insertReport(reportVO);
            map.put("status", "success");
        } catch (DataAccessException e) {
            log.error(e, e);
            map.put("status", "fail");
        }

        IndigoJsonModel indigoModel = new IndigoJsonModel(map);
        return indigoModel;
    }
}
