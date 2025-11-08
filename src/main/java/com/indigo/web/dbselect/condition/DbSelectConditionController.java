package com.indigo.web.dbselect.condition;

import com.indigo.web.common.IndigoJsonModel;
import com.indigo.web.dbselect.interfaceinfo.DbSelectInterfaceVO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/DbSelectConditionController")
public class DbSelectConditionController {

    protected final Log log = LogFactory.getLog(getClass());

    @Resource(name = "dbSelectConditionService")
    private DbSelectConditionService dbSelectConditionService;

    @RequestMapping(params = "cmd=list")
    public ModelAndView getByInterfaceId(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String interfaceId = request.getParameter("interfaceId");
        List<DbSelectConditionVO> list = dbSelectConditionService.getByInterfaceId(interfaceId);

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("data", list);
        result.put("total", list.size());
        result.put("success", true);

        return new ModelAndView("jsonView", result);
    }

    @RequestMapping(params = "cmd=add")
    public ModelAndView addDbSelectCondition(@RequestParam String interfaceId,
                                             @RequestParam String tableName,
                                             @RequestParam String columnName,
                                             @RequestParam String operator,
                                             @RequestParam String value,
                                             @RequestParam(required = false) String updateValue,
                                             @RequestParam Integer used) throws Exception {
        log.info("#operation => file-meta-insert");
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            dbSelectConditionService.insertDbSelectCondition(
                    interfaceId, tableName, columnName, operator, value, updateValue, used
            );
            map.put("status", "success");
        } catch (Exception e) {
            log.error(e, e);
            map.put("status", "fail");
            map.put("message", e.getMessage());
        }

        IndigoJsonModel indigoModel = new IndigoJsonModel(map);
        return indigoModel;
    }

    @RequestMapping(params = "cmd=update")
    public ModelAndView updateDbSelectCondition(@RequestParam String interfaceId,
                                                @RequestParam String tableName,
                                                @RequestParam String columnName,
                                                @RequestParam String operator,
                                                @RequestParam String value,
                                                @RequestParam(required = false) String updateValue,
                                                @RequestParam Integer used) throws Exception {
        log.info("#operation => db-select-condition-update");
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            int count = dbSelectConditionService.updateDbSelectCondition(
                    interfaceId, tableName, columnName, operator, value, updateValue, used
            );
            map.put("status", "success");
            map.put("updatedCount", count);
        } catch (Exception e) {
            log.error(e, e);
            map.put("status", "fail");
            map.put("message", e.getMessage());
        }

        IndigoJsonModel indigoModel = new IndigoJsonModel(map);
        return indigoModel;
    }

    @RequestMapping(params = "cmd=delete")
    public ModelAndView deleteDbSelectCondition(@RequestParam String interfaceId,
                                                @RequestParam String columnName) throws Exception {
        log.info("#operation => db-select-condition-delete");
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            int count = dbSelectConditionService.deleteDbSelectCondition(interfaceId, columnName);
            map.put("status", "success");
            map.put("deletedCount", count);
        } catch (Exception e) {
            log.error(e, e);
            map.put("status", "fail");
            map.put("message", e.getMessage());
        }

        IndigoJsonModel indigoModel = new IndigoJsonModel(map);
        return indigoModel;
    }
}
