import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home/Home";
import Main from "@/views/main/Main";
import Login from "@/views/login/Login";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect: "main",
      children: [
        {
          path: "main",
          name: "main",
          component: Main
        },
        {
          path: "User-manage",
          name: "User-manage",
          component: () =>
            import("@/views/System-setting/User-manage/User-manage.vue")
        },
        {
          path: "Position-manage",
          name: "Position-manage",
          component: () =>
            import("@/views/System-setting/Position-manage/Position-manage.vue")
        },
        {
          path: "Mail-list",
          name: "Mail-list",
          component: () =>
            import("@/views/ChengAn-centre/Administration/Mail-list/Mail-list.vue")
        },
        {
          path: "Go-out",
          name: "Go-out",
          component: () =>
            import("@/views/ChengAn-centre/Administration/Go-out/go-out.vue")
        },
        {
          path: "leave-list",
          name: "leave-list",
          component: () =>
            import("@/views/ChengAn-centre/Administration/leave-list/leave-list.vue")
        },
        {
          path: "chengAn-standard",
          name: "chengAn-standard",
          component: () =>
            import("@/views/ChengAn-centre/Administration/chengAn-standard/chengAn-standard.vue")
        },
        {
          path: "wage-slip",
          name: "wage-slip",
          component: () =>
            import("@/views/ChengAn-centre/personal-information/wage-slip/wage-slip.vue")
        },
        {
          path: "Seal-application",
          name: "Seal-application",
          component: () =>
            import("@/views/ChengAn-centre/cost/Seal-application/Seal-application.vue")
        },
        {
          path: "Ceo-office",
          name: "Ceo-office",
          component: () =>
            import("@/views/ChengAn-headquarters/Ceo-office/Ceo-office.vue")
        },
        {
          path: "Send-invitations",
          name: "Send-invitations",
          component: () =>
            import("@/views/ChengAn-headquarters/HRC/Send-invitations/Send-invitations.vue")
        },
        {
          path: "staff-information",
          name: "staff-information",
          component: () =>
            import("@/views/ChengAn-headquarters/HRC/staff-information/staff-information.vue")
        },
        {
          path: "leave-records",
          name: "leave-records",
          component: () =>
            import("@/views/ChengAn-headquarters/HRC/leave-records/leave-records.vue")
        },
        {
          path: "company-record",
          name: "company-record",
          component: () =>
            import("@/views/ChengAn-headquarters/HRC/company-record/company-record.vue")
        },
        {
          path: "department-record",
          name: "department-record",
          component: () =>
            import("@/views/ChengAn-headquarters/HRC/department-record/department-record.vue")
        },
        {
          path: "notice-record",
          name: "notice-record",
          component: () =>
            import("@/views/ChengAn-headquarters/HRC/notice-record/notice-record.vue")
        },
        {
          path: "center-record",
          name: "center-record",
          component: () =>
            import("@/views/ChengAn-headquarters/HRC/center-record/center-record.vue")
        },
        {
          path: "card-address-manage",
          name: "card-address-manage",
          component: () =>
            import("@/views/ChengAn-headquarters/HRC/card-address-manage/card-address-manage.vue")
        },
        {
          path: "target-manage",
          name: "target-manage",
          component: () =>
            import("@/views/ChengAn-headquarters/HRC/target-manage/target-manage.vue")
        },
        {
          path: "manage-evaluate",
          name: "manage-evaluate",
          component: () =>
            import("@/views/ChengAn-headquarters/monitoring-center/manage-evaluate/manage-evaluate.vue")
        },
        {
          path: "merits-evaluate",
          name: "merits-evaluate",
          component: () =>
            import("@/views/ChengAn-headquarters/monitoring-center/merits-evaluate/merits-evaluate.vue")
        },
        {
          path: "supplier-contrast",
          name: "supplier-contrast",
          component: () =>
            import("@/views/ChengAn-headquarters/monitoring-center/supplier-contrast/supplier-contrast.vue")
        },
        {
          path: "to-do",
          name: "to-do",
          component: () => import("@/views/ChengAn-centre/task/to-do/to-do.vue")
        },
        {
          path: "task-manage",
          name: "task-manage",
          component: () =>
            import("@/views/ChengAn-centre/task/task-manage/task-manage.vue")
        },
        {
          path: "task-report",
          name: "task-report",
          component: () =>
            import("@/views/ChengAn-centre/task/task-report/task-report.vue")
        },
        {
          path: "chengan-dream",
          name: "chengan-dream",
          component: () =>
            import("@/views/ChengAn-centre/task/chengan-dream/chengan-dream.vue")
        },
        //诚安总部-->财务中心
        {
          path: "build-Material-settlement",
          name: "build-Material-settlement",
          component: () =>
            import("@/views/ChengAn-headquarters/Financial-center/build-Material-settlement/build-Material-settlement.vue")
        },
        {
          path: "education-Material-settlement",
          name: "education-Material-settlement",
          component: () =>
            import("@/views/ChengAn-headquarters/Financial-center/education-Material-settlement/education-Material-settlement.vue")
        },
        {
          path: "science-Material-settlement",
          name: "science-Material-settlement",
          component: () =>
            import("@/views/ChengAn-headquarters/Financial-center/science-Material-settlement/science-Material-settlement.vue")
        },
        {
          path: "contract-approve",
          name: "contract-approvet",
          component: () =>
            import("@/views/ChengAn-headquarters/Financial-center/contract-approve/contract-approve.vue")
        },
        {
          path: "contract-manage",
          name: "contract-manage",
          component: () =>
            import("@/views/ChengAn-headquarters/Financial-center/contract-manage/contract-manage.vue")
        },
        {
          path: "pay-contract-manage",
          name: "pay-contract-manage",
          component: () =>
            import("@/views/ChengAn-headquarters/Financial-center/pay-contract-manage/pay-contract-manage.vue")
        },
        {
          path: "Labor-costs",
          name: "Labor-costs",
          component: () =>
            import("@/views/ChengAn-headquarters/Financial-center/Labor-costs/Labor-costs.vue")
        },
        {
          path: "History",
          name: "History",
          component: () =>
            import("@/views/ChengAn-headquarters/Financial-center/Labor-costs/components/History.vue")
        },
        //诚安总部-->成本中心
        {
          path: "supplier-account",
          name: "supplier-account",
          component: () =>
            import("@/views/ChengAn-headquarters/const-center/supplier-account/supplier-account.vue")
        },
        {
          path: "Purchase-details",
          name: "Purchase-details",
          component: () =>
            import("@/views/ChengAn-headquarters/const-center/Purchase-details/Purchase-details.vue")
        },
        {
          path: "material-manage",
          name: "material-manage",
          component: () =>
            import("@/views/ChengAn-headquarters/const-center/material-manage/material-manage.vue")
        },
        //诚安教育-->汇总类
        {
          path: "Labor-costs-summary-education",
          name: "Labor-costs-summary-education",
          component: () =>
            import("@/views/ChengAn-education/summary-category/Labor-costs-summary/Labor-costs-summary.vue")
        },
        {
          path: "Supplier-labor-summary-education",
          name: "Supplier-labor-summary-education",
          component: () =>
            import("@/views/ChengAn-education/summary-category/Supplier-labor-summary/Supplier-labor-summary.vue")
        },
        //诚安建设-->汇总类
        {
          path: "Labor-costs-summary-build",
          name: "Labor-costs-summary-build",
          component: () =>
            import("@/views/ChengAn-build/summary-category/Labor-costs-summary/Labor-costs-summary.vue")
        },
        {
          path: "Supplier-labor-summary-build",
          name: "Supplier-labor-summary-build",
          component: () =>
            import("@/views/ChengAn-build/summary-category/Supplier-labor-summary/Supplier-labor-summary.vue")
        },
        //诚安科技-->汇总类
        {
          path: "Labor-costs-summary-science",
          name: "Labor-costs-summary-science",
          component: () =>
            import("@/views/ChengAn-science/summary-category/Labor-costs-summary/Labor-costs-summary.vue")
        },
        {
          path: "Supplier-labor-summary-science",
          name: "Supplier-labor-summary-science",
          component: () =>
            import("@/views/ChengAn-science/summary-category/Supplier-labor-summary/Supplier-labor-summary.vue")
        },
        //诚安科技-->运营类
        {
          path: "project-operation-science",
          name: "project-operation-science",
          component: () =>
            import("@/views/ChengAn-science/Operate-category/project-operation/project-operation.vue")
        },
        //诚安教育-->运营类
        {
          path: "project-operation-education",
          name: "project-operation-education",
          component: () =>
            import("@/views/ChengAn-education/Operate-category/project-operation/project-operation.vue")
        },
        //诚安建设-->运营类
        {
          path: "project-operation-build",
          name: "project-operation-build",
          component: () =>
            import("@/views/ChengAn-build/Operate-category/project-operation/project-operation.vue")
        },
        {
          path: "Party-Material-Purchase",
          name: "Party-Material-Purchase",
          component: () =>
            import("@/views/ChengAn-build/Operate-category/Party-Material-Purchase/Party-Material-Purchase.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/error/404",
      component: () => import("@/views/error/404"),
      name: "Page404",
      meta: { title: "page404" }
    },
    {
      path: "*",
      redirect: "/error/404"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    next();
  } else {
    if (to.name === "login") {
      next();
    } else {
      next({
        path: "/login"
      });
    }
  }
});

export default router;
