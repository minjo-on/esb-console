package com.indigo.web.agent.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.indigo.web.agent.impl.CustomMessageLogServiceImpl;
import com.indigo.web.common.IndigoJsonModel;

@Controller // 1. 컨트롤러로써 사용될 클래스를 칭하기 위해 사용
public class CustomMessageLogController {
	private Log log = LogFactory.getLog(CustomMessageLogController.class);

	@Resource(name = "customMessageLogService") // 2. Service클래스로 사용될 Field 지정
	CustomMessageLogServiceImpl customMessageLogService;

	// 3. 해당 컨트롤러가 동작할 URL 주소와 주고받을 인자값 지정
	@RequestMapping(value = "/customMessageLogController", params = "cmd=custom-msg-log-list")
	public ModelAndView viewCustomMsgLog(@RequestParam HashMap<String, Object> paramMap) throws Exception { // 4.
																											// Service를
																											// 통해 얻어온
																											// 메타데이터를
																											// ModelAndView
																											// 형식으로 반환
		log.debug("#operation => /customMessageLogController?cmd=custom-msg-log-list");
		Map<String, Object> map = customMessageLogService.selectAllCustomMsgLog(paramMap);

		IndigoJsonModel indigoModel = new IndigoJsonModel(map);

		return indigoModel;
	}
}
