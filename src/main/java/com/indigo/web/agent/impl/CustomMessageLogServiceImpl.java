package com.indigo.web.agent.impl;

import java.io.File;
import java.io.Serializable;
import java.math.BigInteger;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.jms.Session;
import javax.jms.TextMessage;

import org.apache.camel.CamelExecutionException;
import org.apache.camel.component.file.GenericFile;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.indigo.esb.security.Base64;
import com.indigo.web.agent.dao.AgentInterfaceDAO;
import com.indigo.web.agent.dao.CustomMessageLogDAO;
import com.indigo.web.agent.dao.ImsDAO;
import com.indigo.web.agent.resource.LogMessagePostProcessor;
import com.indigo.web.common.IndigoWebConstants;
import com.indigo.web.common.JmsUtil;
import com.indigo.web.common.Utils;
import com.indigo.web.common.agent.MBeanManager;
import com.indigo.web.login.IndigoAuthenticationProvider;
import com.indigo.web.mgmt.IndigoCodeDAO;
import com.indigo.web.mgmt.vo.IndigoCodeVO;
import com.indigo.web.visualization.modeler.dao.IndigoModelerMessageTracedDao;
import com.indigo.web.visualization.modeler.vo.IndigoModelerMessageTracedVo;
import com.indigo.web.visualization.modeler.vo.IndigoModelerRouteInputOutputVo;

import net.sf.json.JSONObject;

@Service("customMessageLogService") //1. Spring에서 Service로 인식할 명칭
public class CustomMessageLogServiceImpl { //2. @Service를 통해 가상의 Service를 내부적으로 상속받음
	private Log logger = LogFactory.getLog(CustomMessageLogServiceImpl.class);

	@Resource(name="customMessageLogDao") //3. 해당 Field에 사용할 DAO를 지정
	private CustomMessageLogDAO customMessageLogDao;

	//4.  DAO를 통해 받은 메타데이터를 Map형식으로 변경하여 반환
	public Map<String, Object> selectAllCustomMsgLog(Map<String, Object> paramMap) throws Exception{

		Map<String, Object> returnMap = new HashMap<String,Object>();
		
		returnMap.put("returnMsg", "SUCCESS");
		returnMap.put("local_data_list", customMessageLogDao.getAllCustomMessageLogToMap(paramMap));
		returnMap.put("total_count", customMessageLogDao.getAllCustomMessageLogCountToMap(paramMap).get(0));

		return returnMap;
	}
}
