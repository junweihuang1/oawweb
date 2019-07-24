import { get, post, Delete, put } from "./http";
import { publicDecrypt } from "crypto";

// new接口
// export const apiTheme = theme => get("api/v1/theme", theme);

// login接口
export const apiLogin = login => post("loginVerify", login);

//当前用户信息
export const apiUserInf = data => get("getUser", data);

//获取流程代办
export const apiFindTaskList = data => get("findTaskList", data);

//外勤单信息接口
export const apigetField = data => get("getFieldPersonnelById", data);

//删除指定外勤单
export const apidelFieldPersonnel = data => post("delFieldPersonnel", data);

//办理外勤单流程接口
export const apipassField = data => post("passFieldPersonnel", data);

//获取用户打卡的信息接口
export const apiPunchInfo = data => get("getUserPunchDayInfo", data);

//获取用户当天打卡信息接口
export const apiDatePunchInfo = data => get("getUserDatePunchInfo", data);

//个人出勤统计接口
export const apiAttendance = data => get("getAttendanceStatistics", data);

//用户补卡申请
export const apiapplyFillCard = data => post("applyFillCard", data);

//获取指定补卡申请的详情
export const apiApplicationDetails = ApplyId =>
  get("getAssingnationAttendApply", ApplyId);

//获取未审核的补卡审批
export const apiNotAuditedCard = data => get("getUnreviewedAttendApply", data);

//同意补卡申请
export const apiagreeAttendApply = ApplyId => get("agreeAttendApply", ApplyId);

//拒绝补卡申请
export const apirejectAttendApply = ApplyId =>
  get("rejectAttendApply", ApplyId);

//获取所有用户信息
export const apiuserLists = data => get("userLists", data);

//用户信息修改接口
export const apieditUser = data => post("editUser", data);

//查询所有职员信息或搜索
export const apiroleLists = data => get("roleLists", data);

//加载权限树形菜单
export const apimenuTreeList = data => get("menuTreeList", data);

//删除指定角色
export const apideleRole = data => post("deleRole", data);

//新增角色
export const apisaveRole = data => post("saveRole", data);

//批量删除用户
export const apideleteUser = data => post("deleteUser", data);

//查询所有外勤单据
export const apiFieldPersonnelList = data => get("getFieldPersonnelList", data);

//发起外勤申请
export const apigoout = data => post("saveFieldPersonnel", data);

//获取审批人接口
export const apiLeaveData = data => get("getLeaveData", data);

//获取所有请假信息
export const apiLeaveList = data => get("getLeaveList", data);

//获取请假的审批流程
export const apiViewHisComment = data => get("getViewHisComment", data);

//发起请假
export const apisaveLeave = data => post("saveLeave", data);

//获取所有诚安标准模板
export const apitemplatelList = data => get("templatelList", data);

//删除诚安标准模板
export const apideleteTemplate = data => Delete("deleteTemplate", data);

//上传通讯录
export const apiuploadPdf = data => post("uploadPdf", data);

//获取当前用户的盖章申请
export const apigetSealList = data => get("getSealList", data);

//查看盖章申请的详情
export const apiSealById = data => get("getSealById", data);

//删除盖章接口
export const apidelSeal = data => post("delSeal", data);

//发起盖章流程
export const apisaveSeal = data => post("saveSeal", data);

//查询出所有总裁办信息
export const apiframeWorkList = data => post("frameWorkList", data);

//删除总裁办信息
export const apidelframeWork = data => Delete("save_frameWork", data);

//保存总裁办信息
export const apiaddframeWork = data => post("save_frameWork", data);

//所有请假记录
export const apiLeaveList2 = data => post("leaveList", data);

//获取所有公司信息
export const apigetAllCompanyInfo = data => get("getAllCompanyInfo", data);

//个人工资
export const apiuserWagesLibs1 = data => post("userWagesLibs1", data);

//发送邀请函
export const apiemail = data => post("email", data);

//职员信息--》公司层级菜单
export const apiuserTreeList = data => get("userTreeList", data);

//职员信息--》查询职员信息
export const apipmuserList = data => post("pmuserList", data);

//职员信息--》新增或修改职员信息
export const apisavePersonalRecords = data => post("savePersonalRecords", data);

//职员信息-->查询角色信息
export const apipersonalRecords = data => get("personalRecords", data);

//人力资源中心  --> 公司记录-->查询出所有公司信息
export const apicompanyList = data => get("companyList", data);

//人力资源中心  --> 公司记录-->保存或修改公司信息
export const apisaveCompany = data => post("saveCompany", data);

//人力资源中心  --> 公司记录-->删除指定公司信息
export const apideleCompany = id => Delete("deleCompany", id);

//人力资源中心  --> 部门记录-->查询出所有部门信息
export const apidepartmentList = data => post("departmentList", data);

//人力资源中心  --> 部门记录-->修改或保存部门信息
export const apisaveDepartment = data => post("saveDepartment", data);

//人力资源中心  --> 部门记录-->删除指定部门信息
export const apideleDepartment = data => delete ("deleDepartment", data);

//人力资源中心  --> 中心记录-->查询所有中心信息
export const apicenterHome = data => get("centerHome", data);

//人力资源中心  --> 中心记录-->修改或保存中心信息
export const apisaveCenter = data => post("saveCenter", data);

//人力资源中心  --> 中心记录-->删除中心信息
export const apideleCenter = data => Delete("deleCenter", data);

//人力资源中心  --> 目标管理-->查看所有用户目标信息
export const apiownGoalReport = data => post("ownGoalReport", data);

//人力资源中心  --> 目标管理-->查看指定用户目标信息
export const apiownGoalList = data => get("ownGoalList", data);

//人力资源中心  --> 目标管理-->新增个人目标
export const apisaveownGoal = data => post("save_ownGoal", data);

//人力资源中心  --> 目标管理-->完成指定目标
export const apifinishOwnGoal = data => post("finishOwnGoal", data);

//获取所有打卡地址信息
export const apiattendAddress = data => get("attendAddress", data);

//新增打卡地址信息
export const addattendAddress = data => post("attendAddress", data);

//查询指定地址的详细信息
export const apiAddressDetail = data => get("attendAddressDetail", data);

//删除指定打卡地址
export const delattendAddress = data => Delete("attendAddress", data);

//修改指定项目打开地址
export const modifyattendAddress = data => put("attendAddress", data);

//获取所有项目信息
export const apiconstructCheck = data => get("constructCheck", data);

//监察中心-->管理考评-->查询出所有管理考评信息
export const apisupOpinionLists = data => get("supOpinionLists", data);

//监察中心-->管理考评-->查询指定管理考评的详细信息
export const apisupOpinionView = id => get("supOpinionView", id);

//监察中心-->管理考评-->删除指定管理考评信息
export const apidelectsupOpinion = id => Delete("delect_supOpinion", id);

//监察中心-->管理考评-->查询出所有绩效考评信息
export const apiachReviewLists = data => get("achReviewLists", data);

//监察中心-->管理考评-->查看指定绩效考评详情
export const apiachReviewView = id => get("achReviewView", id);

//监察中心 --> 劳动力供应商对比-->查询出所有劳动力供应商对比信息
export const apisupplierformList = data => get("supplierformLists", data);

//监察中心 --> 劳动力供应商对比-->查看指定劳动力供应商详细信息
export const apisupplierformView = data => get("supplierformView", data);

//诚安人中心-->任务类-->任务管理
export const apiownWorkList = data => get("ownWorkList", data);

//任务类 --> 任务报表-->查询所有任务报表信息
export const apiownWorkReport = data => post("ownWorkReport", data);

//任务类 --> 诚安梦-->查询所有目标信息
export const apichengan_dream = data => post("ownGoalList", data);

//财务中心 --> 人员成本汇总-->查询所有汇总信息
export const apiuserWagesLists = data => get("userWagesLists", data);

//财务中心 --> 人员成本汇总-->查询历史汇总信息
export const apiuserWagesLibs = data => get("userWagesLibs", data);

//财务中心 --> 人员成本汇总-->删除工资信息
export const apidele_userWages = data => Delete("dele_userWages", data);

//财务中心 --> 人员成本汇总-->查询出建设公司材料结算信息
export const apibuild_settlements = data => get("build_settlements", data);

//财务中心 --> 人员成本汇总-->查询项目列表信息
export const apisettleConstructList = data => post("settleConstructList", data);

//财务中心 --> 人员成本汇总-->查询出所有支出合同信息
export const apicontractPayLists = data => get("contractPayLists", data);

//财务中心 --> 人员成本汇总-->查询出年份信息
export const apicontractPayList = data => get("contractPayList", data);

//财务中心 --> 人员成本汇总-->删除指定合同信息
export const apidelete_Contract = delId => Delete("delete_Contract", delId);

//财务中心 --> 人员成本汇总-->查询指定合同详细信息
export const apicontractPayNew = data => get("contractPayNew", data);

//财务中心 --> 人员成本汇总-->新增支出合同
export const apisaveContract = data => post("saveContract", data);
