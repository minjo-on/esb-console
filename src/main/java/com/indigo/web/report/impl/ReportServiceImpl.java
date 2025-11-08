package com.indigo.web.report.impl;

import com.indigo.web.common.Utils;
import com.indigo.web.report.SearchVO;
import com.indigo.web.report.dao.ReportDAO;
import com.indigo.web.report.vo.ReportVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("reportService")
public class ReportServiceImpl {
	private Log logger = LogFactory.getLog(ReportServiceImpl.class);

	@Resource(name = "reportDao")
	private ReportDAO reportDao;

	/**
	 * 리포트 정보 조회후 리포트 목록 및 페이징 데이터를 담은 맵 반환
	 * @param searchVO
	 * @return Map
	 */
	public Map<String, Object> selectReportList(SearchVO searchVO) {
		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		HashMap<String, Object> returnMap = new HashMap<String, Object>();

		int pageNum = Utils.nvlInt(searchVO.getStart(), 0);
		int pageRow = Utils.nvlInt(searchVO.getLimit(), 40);
		if(searchVO.getSearch_type() != null && searchVO.getSearch_type().equals(""))
			searchVO.setSearch_type(null);

		paramMap.put("start", pageNum);
		paramMap.put("limit", pageRow);
		paramMap.put("max", pageNum + pageRow);
		paramMap.put("search_val", searchVO.getSearch_val());
		paramMap.put("search_type", searchVO.getSearch_type());
		paramMap.put("group_id", searchVO.getGroup_id());

		int total_count = reportDao.selectReportListTotal(paramMap);
		List rsList = reportDao.selectReportList(paramMap);
		returnMap.put("total_count", total_count);
		returnMap.put("rs_list", rsList);

		return returnMap;
	}

	/**
	 * 리포트 시퀀스 번호를 통해 조회한 리포트 정보를 담은 맵 반환
	 * @param reportSeq
	 * @return Map
	 */
	public Map<String, Object> selectReport(int reportSeq) {
		HashMap<String, Object> returnMap = new HashMap<String, Object>();

		returnMap.put("rs", reportDao.selectReport(reportSeq));

		return returnMap;
	}

	/**
	 * 리포트 등록
	 * @param reportVO
	 */
	@Transactional
	public void insertReport(ReportVO reportVO) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		String regDate = sdf.format(new Date());
		reportVO.setReg_Date(regDate);
		reportDao.insertReport(reportVO);
	}
}
