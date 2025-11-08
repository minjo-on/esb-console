package com.indigo.web.agent.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.indigo.web.common.Utils;
import com.indigo.web.util.AbstracLogtIBatisDAO;

@Repository("customMessageLogDao")//1. Spring에서 Repository로 인식할 명칭
public class CustomMessageLogDAO extends AbstracLogtIBatisDAO { //2. MyBatis를 사용하기 위한 상속
	
	//3. 지정된 쿼리와 인자 값을 넘겨 List형식으로 받아온 메타데이터를 반환
	//※    여러번 쿼리를 실행하거나 Map형식으로 출력할 필요가 있는 경우 변경이 가능
	public List<Object> getAllCustomMessageLogToMap( Map<String, Object> paramMap) throws Exception{
		
		return  getSqlMapClientTemplate().queryForList(
				"custom_message_log.selectAllCustomMessageLogs", paramMap);
		
	}
	
	public List<Object> getAllCustomMessageLogCountToMap( Map<String, Object> paramMap) throws Exception{
		
		return  getSqlMapClientTemplate().queryForList(
				"custom_message_log.selectAllCustomMessageLogsCount", paramMap);
		
	}
	
}
