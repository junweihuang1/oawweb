export default {
  navList: [
    {
      id: "1",
      title: "系统设置",
      route: "",
      icon: "icon-shezhi1",
      children: [
        {
          id: "3",
          title: "用户管理",
          route: "/User-manage",
          children: []
        },
        {
          id: "10",
          title: "职位管理",
          route: "/Position-manage",
          children: []
        },
        {
          id: "181",
          title: "流程管理",
          route: "/process-manage",
          children: []
        }
      ]
    },
    {
      id: "11",
      title: "诚安人中心",
      route: "",
      icon: "icon-earth",
      children: [
        {
          id: "147",
          title: "行政类",
          route: "",
          children: [
            {
              id: "109",
              title: "诚安标准",
              route: "/chengAn-standard"
            },
            {
              id: "83",
              title: "通讯录",
              route: "/Mail-list"
            },
            {
              id: "106",
              title: "通知/公告",
              route: "/admin-notice-record"
            },
            {
              id: "126",
              title: "外勤申请",
              route: "/Go-out"
            },
            {
              id: "16",
              title: "请假条",
              route: "/leave-list"
            }
          ]
        },
        {
          id: "148",
          title: "费用类",
          route: "",
          children: [
            {
              id: "103",
              title: "盖章申请",
              route: "Seal-application"
            },
            {
              id: "114",
              title: "费用申请",
              route: "cost-application"
            },
            {
              id: "129",
              title: "物品采购",
              route: "Goods-purchase"
            }
          ]
        },
        {
          id: "149",
          title: "任务类",
          route: "",
          children: [
            {
              id: "51",
              title: "待办事项",
              route: "to-do"
            },
            {
              id: "182",
              title: "已办事项",
              route: "already-do"
            },
            {
              id: "130",
              title: "任务管理",
              route: "task-manage"
            },
            {
              id: "134",
              title: "任务报表",
              route: "task-report"
            },
            {
              id: "171",
              title: "诚安梦",
              route: "chengan-dream"
            }
          ]
        },
        {
          id: "173",
          title: "个人信息",
          route: "",
          children: [
            {
              id: "174",
              title: "个人工资条",
              route: "wage-slip"
            }
          ]
        }
      ]
    },
    {
      id: "73",
      title: "诚安总部",
      route: "",
      icon: "icon-chengshi",
      children: [
        {
          id: "142",
          title: "总裁办",
          route: "/Ceo-office",
          children: []
        },
        {
          id: "4",
          title: "人力资源中心",
          route: "",
          children: [
            {
              id: "41",
              title: "发送邀请函",
              route: "/Send-invitations"
            },
            {
              id: "42",
              title: "请假记录",
              route: "/leave-records"
            },
            {
              id: "45",
              title: "职员信息",
              route: "/staff-information"
            },
            {
              id: "46",
              title: "公司记录",
              route: "/company-record"
            },
            {
              id: "47",
              title: "部门记录",
              route: "/department-record"
            },
            {
              id: "105",
              title: "通知/公告",
              route: "/notice-record"
            },
            {
              id: "172",
              title: "目标管理",
              route: "/target-manage"
            },
            {
              id: "48",
              title: "中心记录",
              route: "/center-record"
            },
            {
              id: "124",
              title: "打卡地址管理",
              route: "/card-address-manage"
            }
          ]
        },
        // {
        //   id: "85",
        //   title: "监察中心",
        //   route: "",
        //   children: [
        //     {
        //       id: "74",
        //       title: "管理考评",
        //       route: "/manage-evaluate"
        //     },
        //     {
        //       id: "75",
        //       title: "绩效考评",
        //       route: "/merits-evaluate"
        //     },
        //     {
        //       id: "104",
        //       title: "劳动力供应商对比表",
        //       route: "/supplier-contrast"
        //     }
        //   ]
        // },
        {
          id: "19",
          title: "财务中心",
          route: "",
          children: [
            {
              id: "23",
              title: "人员成本汇总",
              route: "/Labor-costs"
            },
            {
              id: "39",
              title: "建设材料结算",
              route: "/build-Material-settlement"
            },
            {
              id: "70",
              title: "科技材料结算",
              route: "/science-Material-settlement"
            },
            {
              id: "98",
              title: "教育材料结算",
              route: "/education-Material-settlement"
            },
            {
              id: "141",
              title: "支出合同管理",
              route: "/pay-contract-manage"
            },
            {
              id: "87",
              title: "合同管理",
              route: "/contract-manage"
            },
            {
              id: "107",
              title: "合同审批",
              route: "/contract-approve"
            }
          ]
        },
        {
          id: "88",
          title: "成本中心",
          route: "",
          children: [
            {
              id: "40",
              title: "分供方台账",
              route: "/supplier-account"
            },
            {
              id: "33",
              title: "材料管理",
              route: "/material-manage"
            },
            {
              id: "117",
              title: "采购明细",
              route: "/Purchase-details"
            }
          ]
        },
        {
          id: "119",
          title: "供应商中心",
          route: "",
          children: [
            {
              id: "122",
              title: "材料部信息",
              route: "/material-depa-infor"
            },
            {
              id: "52",
              title: "材料(调价)",
              route: "/material-modify"
            },
            {
              id: "121",
              title: "技术部信息",
              route: "/technical-depa-infor"
            },
            {
              id: "123",
              title: "劳动力分配",
              route: "/labor-distribution"
            },
            {
              id: "76",
              title: "劳动力(投标)",
              route: "/labor-bidding"
            }
          ]
        },
        {
          id: "125",
          title: "外联中心",
          route: "/outreach-centre",
          children: []
        }
      ]
    },
    {
      id: "89",
      title: "诚安教育",
      route: "",
      icon: "icon-tushu",
      children: [
        {
          id: "95",
          title: "运营类",
          route: "",
          children: [
            {
              id: "178",
              title: "项目运营(教育)",
              route: "/project-operation-education"
            }
          ]
        },
        {
          id: "179",
          title: "汇总类",
          route: "",
          children: [
            {
              id: "177",
              title: "供应商劳动力汇总(教育)",
              route: "/Supplier-labor-summary-education"
            },
            {
              id: "176",
              title: "劳动力费用汇总(教育)",
              route: "/Labor-costs-summary-education"
            }
          ]
        }
      ]
    },
    {
      id: "60",
      title: "诚安科技",
      route: "",
      icon: "icon-baobiao",
      children: [
        {
          id: "162",
          title: "运营类",
          route: "",
          children: [
            {
              id: "61",
              title: "项目运营(科技)",
              route: "/project-operation-science"
            }
          ]
        },
        {
          id: "163",
          title: "汇总类",
          route: "",
          children: [
            {
              id: "180",
              title: "供应商劳动力汇总(科技)",
              route: "/Supplier-labor-summary-science"
            },
            {
              id: "102",
              title: "劳动力费用汇总(科技)",
              route: "/Labor-costs-summary-science"
            },
            {
              id: "118",
              title: "科技采购明细",
              route: "/Technical-purchase-details"
            }
          ]
        }
      ]
    },
    {
      id: "20",
      title: "诚安建设",
      route: "",
      icon: "icon-anzhuangshigong",
      children: [
        {
          id: "165",
          title: "运营类",
          route: "",
          children: [
            {
              id: "22",
              title: "项目运营(建设)",
              route: "/project-operation-build"
            },
            {
              id: "113",
              title: "甲方材料采购",
              route: "/Party-Material-Purchase"
            }
          ]
        },
        {
          id: "166",
          title: "汇总类",
          children: [
            {
              id: "101",
              title: "供应商劳动力汇总(建设)",
              route: "/Labor-costs-summary-build"
            },
            {
              id: "175",
              title: "劳动力费用汇总(建设)",
              route: "/Supplier-labor-summary-build"
            }
          ]
        }
      ]
    }
  ]
};
