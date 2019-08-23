<template>
  <div>
    <el-form ref="emailform" :model="emailform" label-width="80px">
      <el-form-item
        label="收件地址"
        prop="address"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          }
        ]"
        ><el-input v-model="emailform.address" style="width:50%;" clearable>
        </el-input
      ></el-form-item>
      <el-form-item
        label="主题"
        prop="title"
        :rules="[{ required: true, message: '请输入主题', trigger: 'blur' }]"
        ><el-input
          v-model="emailform.title"
          style="width:50%;"
          clearable
        ></el-input
      ></el-form-item>
      <el-form-item label="正文"
        ><el-input
          type="textarea"
          :rows="30"
          v-model="emailform.content"
        ></el-input
      ></el-form-item>

      <el-form-item>
        <el-button type="success" plain @click="sendemail('emailform')"
          >发送</el-button
        >
        <el-button type="danger" plain @click="resetform('emailform')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apiemail } from "@/request/api.js";
export default {
  name: "Sendinvitations",
  data() {
    return {
      emailform: {
        address: "",
        title: "",
        content: `尊敬的阁下：<br>\
                \n\t非常荣幸地通知您，您已经顺利通过我司的面试环节，即将正式入职我司。您的入职状态、岗位职级以及薪金标准构成等由我司资源中心亲自通知。<br>\
                \n\t如仍有任何疑问，请您致电公司资源中心，联系电话：89660456，联系人：谢经理。<br>\
\n<br>\
\n一、入职体检：<br>\
	\n\t请于您接到该通知后次日前往广州市二级医院进行体检。逾期未去体检，又未能向我司致电说明特殊情况的，视为放弃入职。<br>\
	\n\t注意事项如下：<br>\
	\n\t（1）请于上午8：30-11：00之间前去体检，请与体检中心强调：一定要体检乙肝对两对半（需空腹抽血）。体检报告自取。<br>\
	\n\t（2）取得体检后，请致电89660456资源中心谢经理，我司届时会和您联系，确认入职办理的具体时间。争取一周内办理入职。<br>\
\n<br>\
	\n\t1.如果您有不超过一年的近期体检报告（有乙肝两对半项体检结果的），请您致电我司资源中心谢小姐说明，则无须再做体检，请于通知办理入职时自带体检报告。<br>\
\n<br>\
\n一、入职资料准备：<br>\
	\n\t1.您在正式办理入职时须提交的资料包括：<br>\
	\n\t1）小一寸红底彩色证件照片2张；<br>\
	\n\t2）请携带体检报告；<br>\
	\n\t3）身份证、学历证、相关资格证书原件及复印件，原件审核，复印件等证明文件存档备案；<br>\
	\n\t4）中国银行的存折或者借记卡的帐号复印件一份；<br>\
	\n\t5）原单位开具的离职证明。<br>\
	\n\t2.如果您无法提交原单位的离职证明，可以入职办理时填写个人申明，证明与其它单位无任何劳动关系。<br>\
\n二、办理入职须签署的文书<br>\
	\n\t资源中心向新员工介绍公司的规章制度以及福利待遇等，让员工清晰了解公司的制度执行及员工的岗位职责，并逐一签名确认。<br>\
	\n\t您在办理入职手续时，须签订以下劳动合同及相关附件：<br>\
	\n\t1）劳动合同；<br>\
	\n\t2）岗位说明书；<br>\
	\n\t3）企业规章制度签认书；<br>\
	\n\t4）劳动合同签收表。<br>\
\n<br>\
\n<br>\
	\n\t以上内容如有疑问请及时联络，欢迎您的加入！愿与您共创广东诚安美好的明天！<br>\
\n<br>\
\n<br>\
\n<br>\
                                											 \n\t\t\t\t\t\t\t\t\t广东诚安时代互联网科技有限公司<br>\
                                            										  \n\t\t\t\t\t\t\t\t\t资源中心<br>\
\n<br>\
\n<br>\
															\n\t\t\t\t\t\t\t\t\t公司地址：广州市海珠区新港东路2440号409室<br>\
															\n\t\t\t\t\t\t\t\t\t(地铁4号线万胜围站B出口转乘137.262等到黄埔村下)<br>`
      }
    };
  },
  mounted() {},
  methods: {
    sendemail(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认发送？").then(() => {
            let data = {
              receive: this.emailform.address,
              theme: this.emailform.title,
              content: this.emailform.content
            };
            apiemail(data).then(res => {
              (this.emailform.address = ""),
                (this.emailform.title = ""),
                this.$message.success(res.msg);
            });
          });
        } else {
          this.$message.warning("请完善内容再提交");
          return false;
        }
      });
    },
    resetform(formName) {
      this.$refs[formName].resetFields();
      this.emailform.address = "";
      this.emailform.title = "";
    }
  }
};
</script>

<style lang="scss" scoped></style>
