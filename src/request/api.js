import {get, post, Delete, put } from "./http";
// import { publicDecrypt } from "crypto";

// new接口
// export const apiTheme = theme => get("api/v1/theme", theme);

// login接口
export const apiLogin = login => post("loginVerify", login);

//当前用户信息
export const apiUserInf = data => get("getUser", data);

export const apiuserMenuTree = () => get("userMenuTree");

//获取流程代办
export const apiFindTaskList = data => get("findTaskList", data);

//
export const apialreadyHandleTask = data => get("alreadyHandleTask", data);

//根据待办id查询流程图
export const apipersonManagem_s = id => get("personManagem_s", id);

//查询所有代办类型
export const apifindTaskType = () => get("findTaskType");

//获取当前用户所有代办信息
export const apifindTaskLists = data => get("findTaskList", data);

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

//修改角色
export const apieditRole = data => get("editRole", data);

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

//删除指定请假记录
export const apideleLeave = id => Delete("deleLeave", id);

//根据请假单查询详情
export const apiLeaveListById = id => get("getLeaveListById", id);

//获取请假的审批流程
export const apiViewHisComment = data => get("getViewHisComment", data);

//办理请假流程
export const apipassLeave = data => post("passLeave", data);

//行政类-->公告
export const apinoticeListViews = data => get("noticeListViews", data);

//行政类-->查看公告详情
export const apinoticeviewss = data => get("noticeviewss", data);

//发起请假
export const apisaveLeave = data => post("saveLeave", data);

//获取所有诚安标准模板
export const apitemplatelList = data => get("templatelLists", data);

//删除诚安标准模板
export const apideleteTemplate = data => Delete("deleteTemplate", data);

//保存或修改诚安标准模板
export const apisaveTemplatel = data => post("saveTemplatel", data);

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

//辦理盖章流程
export const apipassSeal = data => post("passSeal", data);

//费用类-->查询所有费用申请
export const apigetCostappList = data => get("getCostappList", data);

//费用类-->查询指定的费用详情
export const apigetCostappById = data => get("getCostappById", data);

//费用类-->提交费用申请
export const apisaveCostapp = data => post("saveCostapp", data);

//费用类-->办理费用申请
export const apipassCostapp = data => post("passCostapp", data);

//费用类-->修改费用申请
export const apimodCostapp = data => post("modCostapp", data);

//费用类-->删除费用申请单
export const apidelCostapp = data => post("delCostapp", data);

//费用类-->物品采购列表
export const apigetOwnHeadList = data => get("getOwnHeadList", data);

//费用类-->物品采购-->提交保存
export const apisaveOwnHead = data => post("saveOwnHead", data);

//费用类-->物品采购-->查看指定id
export const apiOwnHeadListById = data => get("getOwnHeadListById", data);

//费用类-->物品采购-->办理普通采购单
export const apipassOwnHead = data => post("passOwnHead", data);

//费用类-->物品采购-->删除指定采购物品
export const apidelOwnEntry = data => post("delOwnEntry", data);

//费用类-->物品采购-->获取下一审核人
export const apiNextProcess = data => get("getOwnHeadProcessList", data);

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
export const apiuserWagesLibs1 = data => get("userWagesLibs1", data);

//发送邀请函
export const apiemail = data => post("email", data);

//职员信息--》公司层级菜单
export const apiuserTreeList = data => get("userTreeList", data);

//职员信息--》查询职员信息
export const apipmuserList = data => post("pmuserList", data);

//职员信息-->获取所有未转正
export const apibecomeList = data => post("becomeList", data);

//职员信息-->查看指定未转正员工信息
export const apiBecome_for = data => get("Become_for", data);

//职员信息-->办理转正
export const apibecome_pass = data => post("become_pass", data);

//职员信息-->保存转正申请信息并启动转正申请流程
export const apisubmitBecome = data => post("submitBecome", data);

//职员信息-->查询出所有员工的打卡信息
export const apiworkerAttendLists = data => get("workerAttendLists", data);

//职员信息--》新增或修改职员信息
export const apisavePersonalRecords = data => post("savePersonalRecords", data);

//职员信息-->查询角色信息
export const apipersonalRecords = data => get("personalRecords", data);

//职员信息-->保存并启动离职申请
export const apiaddResign = data => post("addResign", data);

//职员信息-->查看离职申请詳情
export const apiresignView = data => get("resignView", data);

//职员信息-->办理离职申请
export const apiresignPass = data => post("resignPass", data);

//职员信息-->保存签字图片
export const apiuploadSignature = data => post("uploadSignature", data);

//人力资源中心  --> 公司记录-->查询出所有公司信息
export const apicompanyList = data => get("companyList", data);

//人力资源中心  --> 公司记录-->保存或修改公司信息
export const apisaveCompany = data => post("saveCompany", data);

//人力资源中心  --> 公司记录-->删除指定公司信息
export const apideleCompany = id => post("deleCompany", id);

//人力资源中心  -->公告-->查询所有公告
export const apinoticeLists = data => get("noticeLists", data);

//人力资源中心  -->公告-->新增公告
export const apiadd_Notice = data => post("add_Notice", data);

//人力资源中心  -->公告-->删除公告
export const apideleteNotice = data => Delete("deleteNotice", data);

//人力资源中心  --> 部门记录-->查询出所有部门信息
export const apidepartmentList = data => post("departmentList", data);

//人力资源中心  --> 部门记录-->修改或保存部门信息
export const apisaveDepartment = data => post("saveDepartment", data);

//人力资源中心  --> 部门记录-->删除指定部门信息
export const apideleDepartment = data => post("deleDepartment", data);

//人力资源中心  --> 中心记录-->查询所有中心信息
export const apicenterHome = data => get("centerHome", data);

//人力资源中心  --> 中心记录-->修改或保存中心信息
export const apisaveCenter = data => post("saveCenter", data);

//人力资源中心  --> 中心记录-->删除中心信息
export const apideleCenter = data => post("deleCenter", data);

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

//监察中心-->管理考评-->查询下一下审核用户信息
export const apisupOpinionNew = () => get("supOpinionNew");

//监察中心-->管理考评-->保存管理考评信息
export const apisave_supOpinion = data => post("save_supOpinion", data);

//监察中心-->管理考评-->查询指定管理考评的详细信息
export const apisupOpinionView = id => get("supOpinionView", id);

//监察中心-->管理考评-->删除指定管理考评信息
export const apidelectsupOpinion = id => Delete("delect_supOpinion", id);

//监察中心-->绩效考评-->查询出所有绩效考评信息
export const apiachReviewLists = data => get("achReviewLists", data);

//监察中心-->绩效考评-->查看指定绩效考评详情
export const apiachReviewView = id => get("achReviewView", id);

//监察中心-->绩效考评-->保存绩效考评信息
export const apisave_achReview = data => post("save_achReview", data);

//监察中心 --> 劳动力供应商对比-->查询出所有劳动力供应商对比信息
export const apisupplierformList = data => get("supplierformLists", data);

//监察中心 --> 劳动力供应商对比-->查看指定劳动力供应商详细信息
export const apisupplierformView = data => get("supplierformView", data);

//诚安人中心-->任务类-->任务管理
export const apiownWorkList = data => get("ownWorkLists", data);

//任务类 --> 任务报表-->查询所有任务报表信息
export const apiownWorkReport = data => post("ownWorkReport", data);

//任务类 --> 诚安梦-->查询所有目标信息
export const apichengan_dream = data => post("ownGoalList", data);

//财务中心 --> 人员成本汇总-->查询所有汇总信息
export const apiuserWagesLists = data => get("userWagesLists", data);

//财务中心 --> 人员成本汇总-->保存个人工资信息
export const apisubmitWages = data => post("submitWages", data);

//财务中心 --> 人员成本汇总-->查询历史汇总信息
export const apiuserWagesLibs = data => get("userWagesLibs", data);

//财务中心 --> 人员成本汇总-->删除工资信息
export const apidele_userWages = data => Delete("dele_userWages", data);

//财务中心 --> 人员成本汇总-->保存工资信息
export const apisaveHistoricalWage = data => post("saveHistoricalWage", data);

//财务中心 --> 人员成本汇总-->查询用户选择
export const apiuserListChecks = data => get("userListChecks", data);

//财务中心 --> 人员成本汇总-->保存工资信息(存档)
export const apisave_userWages = data => post("save_userWages", data);

//财务中心 --> 人员成本汇总-->查询出建设公司材料结算信息
export const apibuild_settlements = data => get("build_settlements", data);

//财务中心 --> 人员成本汇总-->查询项目列表信息
export const apisettleConstructList = data => post("settleConstructList", data);

//财务中心 --> 人员成本汇总-->查询付款单信息
export const apisettlePayList = data => post("settlePayList", data);

//财务中心 --> 人员成本汇总-->更新
export const apiupdate_Wages = () => post("update_Wages");

//财务中心 --> 支出合同管理-->查询出所有支出合同信息
export const apicontractPayLists = data => get("contractPayLists", data);

//财务中心 --> 支出合同管理-->查询出年份信息
export const apicontractPayList = data => get("contractPayList", data);

//财务中心 --> 支出合同管理-->删除指定合同信息
export const apidelete_Contract = delId => Delete("delete_Contract", delId);

//财务中心 --> 支出合同管理-->查询指定合同详细信息
export const apicontractPayNew = data => get("contractPayNew", data);

//财务中心 --> 支出合同管理-->新增支出合同
export const apisaveContract = data => post("saveContract", data);

//财务中心 --> 合同管理-->查出所有合同信息
export const apicontractLists = data => get("contractLists", data);

//财务中心 --> 合同审批-->查出所有合同审批
export const apicontractapprove = data => get("contractapproveLists", data);

//财务中心 --> 合同审批-->删除指定审批
export const apideleteContract = Did => Delete("delete_Contractapprove", Did);

//财务中心 --> 合同审批-->查询指定审批详细信息
export const apicontractapproveNew = data => get("contractapproveNew", data);

//财务中心 --> 合同审批-->提交审批
export const apisave_conApprove = data => post("save_conApprove", data);

//财务中心 --> 合同审批-->办理合同审批
export const apicontractapprovePass = data => post("contractapprovePass", data);

//成本中心-->分供方台账-->查询所有供应商信息、
export const apisupplierList = data => post("supplierList", data);

//成本中心-->分供方台账-->删除指定供应商信息、
export const apideleSupplier = idarr => Delete("deleSupplier", idarr);

//成本中心-->分供方台账-->保存供应商信息、
export const apisaveMaterialSupplier = data =>
    post("saveMaterialSupplier", data);

//成本中心-->分供方台账-->保存供应商信息、
export const apisaveSupplier = data => post("saveSupplier", data);

//成本中心-->分供方台账-->查询指定供应商的台账
export const apimaterialPrices = data => post("materialPrices", data);

//成本中心-->分供方台账-->保存台账信息
export const apiaddmaterialprice = data => post("addmaterialprice", data);

//成本中心-->材料管理-->查询所有材料信息
export const apimaterialSeries = data => get("materialSeries", data);

//成本中心-->材料管理-->保存材料系列信息
export const apisaveSeries = data => post("saveSeries", data);

//成本中心-->材料管理-->查询指定材料系列的详细
export const apiselectData = data => get("selectData", data);

//成本中心-->材料管理-->新增材料
export const apimaterialset = data => post("materialset", data);

//成本中心-->材料管理-->查询指定材料的规格信息
export const apimaterialhome = data => get("materialhome", data);

//成本中心-->材料管理-->查询指定材料系列信息
export const apimaterialList = data => get("materialList", data);

//成本中心-->材料管理-->新增或修改材料规格信息
export const apieditMaterial = data => post("editMaterial", data);

//成本中心-->材料管理-->删除指定型号规格
export const apideleteMaterial = data => Delete("deleteMaterial", data);

//成本中心-->采购明细-->查询所有采购明细
export const apimatPurReports = data => get("matPurReports", data);

//汇总类-->供应商劳动力-->查询所有劳动力
export const apifirmLaborCost = data => get("firmLaborCost", data);

//汇总类-->供应商劳动力-->劳动力费用汇总表
export const apilaborCostMon = data => get("laborCostMon", data);

//汇总类-->供应商劳动力-->项目打卡信息
export const apifirmLaborCostPro = data => get("firmLaborCostPro", data);

//汇总类-->供应商劳动力-->获取班组列表
export const apifirmLaborCostTeam = data => get("firmLaborCostTeam", data);

//汇总类-->供应商劳动力-->获取班组中所有人打卡列表
export const apifirmLaborCostPerson = data => get("firmLaborCostPerson", data);

//汇总类-->供应商劳动力-->获取班组中个人详细列表
export const apidetailedCard = data => get("firmLaborCostPersonDetails", data);

//运营类-->甲方材料采购-->获取所有项目列表
export const apiaPartyConList = data => get("aPartyConList", data);

//运营类-->甲方材料采购-->获取材料列表信息
export const apiaPartyMaterialList = data => get("aPartyMaterialList", data);

//运营类-->甲方材料采购-->新增甲供材料
export const apisaveAParty = data => post("saveAPartyMaterial", data);

//运营类-->甲方材料采购-->修改甲供材料
export const apiupdateAParty = data => post("updateAPartyMaterial", data);

//运营类-->甲方材料采购-->删除甲供材料
export const apideleteAParty = data => post("deleteAPartyMaterial", data);

//运营类-->甲方材料采购-->办理甲供材料
export const apipass_aPartyPur = data => post("pass_aPartyPur", data);

//运营类-->甲方材料采购-->增加合同工程量获取材料
export const apiConMaterialList = data => get("getConMaterialList", data);

//乙供材料采购获取下一节点和审核人
export const apiPurchaseProcess = data => get("getPurchaseProcessList", data);

//成本中心选择供应商列表
export const apichooseSupplier = data => get("chooseSupplier", data);

//合同审批获取下一节点和审核人
export const apiContractapprovePro = data =>
    get("getContractapproveProcessList", data);

//开票申请获取下一节点和审核人
export const apiReqfundsProcess = data => get("getReqfundsProcessList", data);

//运营类-->甲方材料采购-->获取甲供材料
export const apiaPartyMaterialCheck = data => get("aPartyMaterialCheck", data);

//运营类-->甲方材料采购-->启动增量流程
export const apistart_record = data => post("start_record", data);

//获取流程线和下一节点名称和审核人
export const apigetProcessList = data => get("getProcessList", data);

//获取盖章的流程线和下一节点名称和审核人
export const apiSealProcessList = data => get("getSealProcessList", data);

//运营类-->甲方材料采购-->查询增量申请记录
export const apiQuantityRecord = data =>
    get("changeQuantityRecordRecord", data);

//运营类-->甲方材料采购-->获取甲供材料采购信息
export const apiaPartyPurList = data => get("aPartyPurList", data);

//运营类-->甲方材料采购-->获取采购信息详情
export const apigetAPartyPur = data => get("getAPartyPur", data);

//运营类-->甲方材料采购-->删除甲供材料单
export const apidel_apartyPur = data => post("del_apartyPur", data);

//运营类-->甲方材料采购-->新增甲供材料采购单
export const apisave_aPartyPur = data => post("save_aPartyPur", data);

//运营类-->甲方材料采购-->修改甲供材料采购单
export const apiupdateAPartyPur = data => post("updateAPartyPur", data);

//运营类-->项目运营-->获取所有项目列表
export const apiprojectDepList = data => get("projectDepList", data);

//运营类-->项目运营-->获取项目列表详细信息
export const apiprojectdetail = data => get("getProjectByDep", data);

//运营类-->项目运营-->修改项目部
export const apimodprojectDep = data => post("modprojectDep", data);

//运营类-->项目运营-->新增项目部
export const apisaveprojectDep = data => post("saveprojectDep", data);

//运营类-->项目运营-->获取项目下的班组列表
export const apigetTeamByProject = data => get("getTeamByProject", data);

//运营类-->项目运营-->保存项目和班组
export const apisaveProjectTeam = data => post("saveProjectTeam", data);

//运营类-->项目运营-->修改项目和班组
export const apimodProjectTeam = data => post("modProjectTeam", data);

//运营类-->项目运营-->获取合同项目
export const apigetContractItem = data => get("getContractItem", data);

//运营类-->项目运营-->獲取班组信息
export const apigetProjectManager = data => get("getProjectManager", data);

//运营类-->项目运营-->獲取項目部
export const apigetProjectDep = data => get("getProjectDep", data);

//运营类-->项目运营-->获取采购申请列表
export const apiPurchaseList = data => get("getPurchaseList", data);

//运营类-->项目运营-->获取指定材料采购单
export const apigetPurchase = data => get("getPurchase", data);

//运营类-->项目运营-->删除材料采购单
export const apidelPurchase = data => post("delPurchase", data);

//运营类-->项目运营-->材料类别选择列表
export const apiselMaterialSeries = data => get("selectMaterialSeries", data);

//运营类-->项目运营-->材料选择列表
export const apiselMaterial = data => get("selectMaterial", data);

//运营类-->项目运营-->保存材料采购申请单
export const apisavePurchase = data => post("savePurchase", data);

//运营类-->项目运营-->修改材料采购申请单
export const apimodPurchase = data => post("modPurchase", data);

//运营类-->项目运营-->办理材料采购申请单
export const apipassPurchase = data => post("passPurchase", data);

//运营类-->项目运营-->启动材料采购申请流程
export const apistartPurchase = data => post("startPurchase", data);

//运营类-->项目运营-->获取合同工程量
export const apiContractQuantity = data => get("getPurchaseMaterialList", data);

//运营类-->项目运营-->选择材料（保存合同工程量）
export const apichooseQuantities = data => get("chooseQuantities", data);

//运营类-->项目运营-->保存合同工程量
export const apisaveQuantities = data => post("saveQuantities", data);

//运营类-->项目运营-->查看指定增量流程
export const apiChangeQuantity = data => get("getChangeQuantityRecord", data);

//运营类-->项目运营-->办理增量流程
export const apipass_record = data => post("pass_record", data);

//运营类-->项目运营-->修改合同工程量
export const apimodQuantities = data => post("modQuantities", data);

//运营类-->项目运营-->获取请款进度信息
export const apiContractInvoice = data => get("getContractInvoice", data);

//运营类-->项目运营-->获取开票视图
export const apigetreqfundsView = data => get("getreqfundsView", data);

//运营类-->项目运营-->保存请款进度
export const apisavereqfunds = data => post("savereqfunds", data);

//运营类-->项目运营-->删除请款进度
export const apidelreqfunds = data => post("delreqfunds", data);

//运营类-->项目运营-->修改请款进度
export const apimodreqfunds = data => post("modreqfunds", data);

//运营类-->项目运营-->启动开票申请流程
export const apistartReqfunds = data => post("startReqfunds", data);

//运营类-->项目运营-->办理开票流程
export const apipassReqfunds = data => post("passReqfunds", data);

//汇总类 --> 科技采购明细
export const apidevePurReport = data => get("devePurReport", data);

//汇总类 --> 科技采购明细-->项目列表
export const apideveConCheck = data => get("deveConCheck", data);

//供应商中心 --> 材料部信息-->树菜单
export const apiworkerUserTreeList = data => get("workerUserTreeList", data);

//供应商中心 --> 材料部信息-->查询所有工人信息
export const apiworkerUserList = data => get("workerUserList", data);

//供应商中心 --> 材料部信息-->获取工人职位信息列表
export const apiworkerUserNew = data => get("workerUserNew", data);

//供应商中心 --> 材料部信息-->查询出所有中心信息
export const apiorgChecks = data => get("orgChecks", data);

//供应商中心 --> 材料调价-->查询出所有材料调价信息
export const apisupplier_price = data => post("supplier_price", data);

//供应商中心 --> 材料调价-->查询出当前登录用户所负责的项目班组信息
export const apiworkerConList = data => get("workerConList", data);

//供应商中心 -->劳动力分配-->根据某个班组中的员工信息
export const apiworkerList = data => get("workerList", data);

//供应商中心 -->劳动力分配-->查询可调动人员信息
export const apiworkerCheck = data => get("workerCheck", data);

//供应商中心 -->劳动力分配-->查询指定人员调动记录
export const apiworkerApplyList = data => get("workerApplyList", data);

//获取调动申请信息
export const apiworkerApplyView = data => get("workerApplyView", data);

//办理调动
export const apiworkerApplyPass = data => post("workerApplyPass", data);

//供应商中心 -->劳动力分配-->添加人员到指定班组
export const apisave_Worker = data => post("save_Worker", data);

//供应商中心 -->劳动力分配-->人员批量调动
export const apimultiplayerApply = data => post("multiplayerApply", data);

//供应商中心 -->劳动力分配-->单个调动
export const apiworkerApply = data => post("workerApply", data);

//系统设置-->流程管理-->获取所有流程信息
export const apiprocessList = data => get("processList", data);

//系统设置-->流程管理-->更新流程信息
export const apisaveTaskRole = () => post("saveTaskRole");

//系统设置-->流程管理-->获取指定流程信息
export const apiprocessDetail = data => get("processDetail", data);

//系统设置-->流程管理-->更新流程关联角色中间表角色绑定信息
export const apiupdateTaskRoleId = data => post("updateTaskRoleId", data);

//系统设置-->流程管理-->部署流程文件
export const apiuploadProcess = data =>
    post("deploymentProcessDefinition_zip", data);

//系统设置-->流程管理-->支付流程
export const apipayApplyProcessInfo = data => get("payApplyProcessInfo", data);

//办理支付
export const apipassPayApply = data => post("passPayApply", data);

//打印费用申请
export const apicostappPrint = data => get("costappPrint", data);

//打印采购单
export const apipurchaseExcelprint = data => get("purchaseExcelprint", data);

//导出打卡记录
export const apihrattendExcel = data => get("hrattendExcel", data);