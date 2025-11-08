package com.indigo.web.report.dao;


import com.indigo.web.report.vo.ReportVO;
import com.indigo.web.util.AbstractIBatisDAO;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository("reportDao")
public class ReportDAO extends AbstractIBatisDAO {

    /**
     * report 목록 조회
     *
     * @param paramMap
     * @return throws DataAccessException
     */
    public List selectReportList(HashMap<String, Object> paramMap) {
        return getSqlMapClientTemplate().queryForList("indigo_report.selectReportList", paramMap);
    }

    /**
     * 페이징을 위한 총 report 수 반환
     *
     * @param paramMap
     * @return throws DataAccessException
     */
    public int selectReportListTotal(HashMap<String, Object> paramMap) {
        return (Integer) getSqlMapClientTemplate().queryForObject("indigo_report.selectReportListTotal", paramMap);
    }

    /**
     * 리포트의 시퀀스번호로 조회된 리포트 정보 반환
     *
     * @param reportSeq 리포트의 시퀀스번호
     * @return throws DataAccessException
     */
    public ReportVO selectReport(int reportSeq) {
        return (ReportVO) getSqlMapClientTemplate().queryForObject("indigo_report.selectReport", reportSeq);
    }

    /**
     * report 등록
     *
     * @param reportVO 보고 정보를 담은 객체
     * throws DataAccessException
     */
    public void insertReport(ReportVO reportVO) {
        getSqlMapClientTemplate().insert("indigo_report.insertReport", reportVO);
    }
}
