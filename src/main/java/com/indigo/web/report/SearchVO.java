package com.indigo.web.report;

import java.util.List;

public class SearchVO {
	
	private int limit;
	private int start;
	private String search_type;
	private String search_val;
	private List<String> group_id;
	
	
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public String getSearch_type() {
		return search_type;
	}
	public void setSearch_type(String search_type) {
		this.search_type = search_type;
	}
	public String getSearch_val() {
		return search_val;
	}
	public void setSearch_val(String search_val) {
		this.search_val = search_val;
	}
	public List<String> getGroup_id() {
		return group_id;
	}
	public void setGroup_id(List<String> group_id) {
		this.group_id = group_id;
	}
	@Override
	public String toString() {
		return "SearchVO [limit=" + limit + ", start=" + start + ", search_type=" + search_type + ", search_val="
				+ search_val + ", group_id=" + group_id + "]";
	}
}
