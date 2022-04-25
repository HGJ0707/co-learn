<template>
  <div
    class="upload-container"
    :style="{
      minHeight: minHeight + 'px',
    }"
  >
    <div class="upload-content">
      <div class="import-container">
        <p class="title">导入学生信息步骤：</p>
        <p class="step">
          1.
          请下载"学生信息.xlsx"模板，按模板格式填写学生数据，平台会根据模板解析数据；
          <!-- 学生信息模板文件 -->
          <a href="/public/stuInfo.xlsx" download="stuInfo.xlsx" class="change-btn"
            >点击下载</a
          >
        </p>
        <p class="inputBox">
          2. 导入填写好的"学生信息.xlsx"模板文件；
          <a-button type="primary" class="chooseFile globalBtn">
            选择文件
          </a-button>
          <input
            class="inputFile"
            type="file"
            accept=".xls,.xlsx"
            @change="readExcel($event)"
          />
        </p>
        <p>3. 预览解析好的数据，可在预览中进行编辑修改；</p>
        <p>
          4. 确认数据无误后，可对学生信息数据进行上传；
          <a-button
            type="primary"
            @click="handleSubmit"
            class="globalBtn"
            :loading="loading"
          >
            确认提交
          </a-button>
        </p>
      </div>
      <!-- 显示excel表格的区域 -->
      <div class="table-container">
        <a-table
          bordered
          :data-source="dataSource"
          :columns="columns"
          :pagination="false"
        >
          <template slot="student_name" slot-scope="text, record">
            <editable-cell
              :text="text"
              @change="onCellChange(record.key, 'student_name', $event)"
            />
          </template>
          <template slot="student_id" slot-scope="text, record">
            <editable-cell
              :text="text"
              @change="onCellChange(record.key, 'student_id', $event)"
            />
          </template>
          <template slot="class_name" slot-scope="text, record">
            <a-tooltip>
              <template slot="title"> 年级[数字] + 专业 + 班级[数字]</template>
              <editable-cell
                :text="text"
                @change="onCellChange(record.key, 'class_name', $event)"
              />
            </a-tooltip>
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              v-if="dataSource.length"
              title="确定删除这行数据吗?"
              @confirm="() => onDelete(record.key)"
              ok-text="确认"
              cancel-text="取消"
            >
              <a href="javascript:;" class="deleteBtn">删除</a>
            </a-popconfirm>
          </template>
        </a-table>
        <a-button class="editable-add-btn globalBtn" @click="handleAdd">
          表格添加一行
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
// 使用xlsx库
import * as XLSX from "xlsx";
import { importStuData } from "@/api/student";
import EditableCell from "./EditableCell";
export default {
  components: {
    EditableCell,
  },
  data() {
    return {
      loading: false,
      minHeight: 400,
      upload_file: "",
      wb: null,
      student_list: [],
      current: 0,
      dataSource: [
        {
          key: "0",
          student_name: "xxx",
          student_id: "示例",
          class_name: "18教育技术学1班",
        },
      ],

      count: 1,
      columns: [
        {
          title: "学号",
          dataIndex: "student_id",
          width: "25%",
          scopedSlots: { customRender: "student_id" },
          align: "center",
        },
        {
          title: "姓名",
          dataIndex: "student_name",
          width: "25%",
          scopedSlots: { customRender: "student_name" },
          align: "center",
        },

        {
          title: "班级",
          dataIndex: "class_name",
          width: "25%",
          scopedSlots: { customRender: "class_name" },
          align: "center",
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
          width: "25%",
          align: "center",
        },
      ],
    };
  },
  methods: {
    MHeight() {
      this.minHeight = window.innerHeight - 64;
    },
    // 表格组件方法
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find((item) => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter((item) => item.key !== key);
    },
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        student_name: "",
        student_id: "",
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
    },
    // 提交数据方法
    handleSubmit() {
      if (this.dataSource[0].student_id == "示例") {
        this.$message.warning("请添加数据并且删除第一行示例数据后进行提交");
        return;
      }
      this.loading = true;
      this.student_list = [];
      for (let i = 0; i < this.dataSource.length; i++) {
        this.student_list.push({
          student_id: this.dataSource[i].student_id,
          student_name: this.dataSource[i].student_name,
          grade: this.dataSource[i].class_name.match(/(\d+)/g)[0],
          major: this.dataSource[i].class_name.match(/(\D+)/)[0],
          class: this.dataSource[i].class_name.match(/(\d+)/g)[1] + "班",
          class_name: this.dataSource[i].class_name,
        });
      }
      const stuInfo = {};
      stuInfo.teacher_id = this.$store.getters["login/user"];
      stuInfo.student_list = JSON.stringify(this.student_list);
      importStuData(stuInfo).then((res) => {
        if (!res) {
          this.loading = false;
          this.$router.push({
            name: "NewCourse",
          });
          this.$message.success("上传成功");
        }
      });
    },
    // 读取表格文件
    readExcel(e) {
      let that = this;
      const files = e.target.files;
      that.dataSource = [];
      that.upload_file = files[0].name;
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const data = event.target.result;
        //XLSX.read(data, read_opts) attempts to parse data
        this.wb = XLSX.read(data, { type: "array" });
        //取第一张表
        const wsname = this.wb.SheetNames[0];
        //生成json表格内容
        const ws = XLSX.utils.sheet_to_json(this.wb.Sheets[wsname]);
        // console.log(ws);
        let res = JSON.stringify(ws)
          .replace(/学号/g, "student_id")
          .replace(/姓名/g, "student_name")
          .replace(/班级/g, "class_name");
        var arr = JSON.parse(res);
        arr.map((item, index) => {
          item.student_id = item.student_id + "";
          item.key = index + "";
        });
        that.dataSource = arr;
      };
      fileReader.readAsArrayBuffer(files[0]);
    },
  },
  async created() {
    this.MHeight();
  },
  mounted() {
    let that = this;
    window.onresize = function () {
      that.MHeight();
    };
  },
  destroyed() {
    window.onresize = null;
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.upload-container {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 50px 0;
  .upload-content {
    color: black;
    width: 1000px;
    .import-container {
      margin: 0px 0px 20px 0px;
      p {
        font-size: 16px;
      }
      .inputBox {
        position: relative;
        .inputFile {
          opacity: 0;
          z-index: 999;
        }
        .chooseFile {
          position: absolute;
          left: 300px;
          z-index: 0;
        }
      }
      .title {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .change-btn {
      color: #1890ff;
      font-size: 14px;
      background-color: rgba(30, 128, 255, 0.05);
      border: 1px solid rgba(30, 128, 255, 0.3);
      padding: 6px 15px;
      border-radius: 4px;
      text-shadow: none;
      transition: all 0.3s linear;
    }
  }
}
</style>

<style lang="scss">
.ant-table-thead > tr > th {
  padding: 10px;
}
.ant-table-tbody > tr > td {
  padding: 5px;
}

.editable-add-btn {
  margin-top: 20px;
}
</style>