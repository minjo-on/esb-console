package com.indigo.web.dbselect.interfaceinfo;

import com.indigo.web.common.IndigoJsonModel;
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
@RequestMapping("/DbSelectInterfaceController")
public class DbSelectInterfaceController {

    protected final Log log = LogFactory.getLog(getClass());

    @Resource(name = "dbSelectInterfaceService")
    private DbSelectInterfaceService dbSelectInterfaceService;

    @RequestMapping(params = "cmd=list")
    public ModelAndView selectInterfaceList(HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<DbSelectInterfaceVO> list = dbSelectInterfaceService.selectInterfaceList();

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("data", list);
        result.put("total", list.size());
        result.put("success", true);

        return new ModelAndView("jsonView", result);
    }

    @RequestMapping(params = "cmd=DTPlist")
    public ModelAndView selectInterfaceListByPatternDt(HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<DbSelectInterfaceVO> list = dbSelectInterfaceService.selectInterfaceListByPatternDt();

        Map<String, Object> result = new HashMap<String, Object>();
        result.put("data", list);
        result.put("total", list.size());
        result.put("success", true);

        return new ModelAndView("jsonView", result);
    }

    @RequestMapping(params = "cmd=add")
    public ModelAndView insertDbSelectInterface(@RequestParam String interfaceId,
                                             @RequestParam String tableName) throws Exception {
        log.info("#operation => db-select-interface-insert");
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            dbSelectInterfaceService.insertDbSelectInterface(interfaceId, tableName);
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
    public ModelAndView updateDbSelectInterface(@RequestParam String interfaceId,
                                                @RequestParam String tableName) throws Exception {
        log.info("#operation => db-select-interface-update");
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            int count = dbSelectInterfaceService.updateDbSelectInterface(interfaceId, tableName);
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
    public ModelAndView deleteDbSelectInterface(@RequestParam String interfaceId) throws Exception {
        log.info("#operation => db-select-interface-delete");
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            int count = dbSelectInterfaceService.deleteDbSelectInterface(interfaceId);
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
