<template>
  <div class="grade-chart-container">
    <div ref="totalChart" style="width: 800px; height: 400px"></div>
  </div>
</template>

<script>
// EChart按需引入
import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

var gradeChart;
export default {
  props: {
    gradeList: "",
  },
  data() {
    return {
      userId: this.$store.getters["login/user"],
      userGrade: [],
      tasks: [],
      taskTitle: [],
      chartSeries: [],
    };
  },
  watch: {
    gradeList: function (list) {
      this.userGrade = list.filter((item) => {
        return item[0] === this.userId;
      });
      // 获得所有任务
      this.userGrade = this.userGrade[0][1].tasks;
      // 获取相关数据
      this.fetchData();
    },
  },
  methods: {
    myEchart() {
      var totalChart = this.$refs.totalChart;
      //先销毁再创建
      if (gradeChart != null && gradeChart != "" && gradeChart != undefined) {
        gradeChart.dispose();
      }
      gradeChart = echarts.init(totalChart);
      var option;
      option = {
        title: {
          text: "成绩分布图",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: this.taskTitle,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "评论",
              "回复",
              "点赞",
              "获赞",
              "弹幕",
              "评分（学生）",
              "评分（老师）",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: this.chartSeries,
      };
      option && gradeChart.setOption(option);
    },
    fetchData() {
      for (const key in this.userGrade) {
        if (Object.hasOwnProperty.call(this.userGrade, key)) {
          this.tasks.push(this.userGrade[key]);
        }
      }
      // 拿到任务标题
      this.taskTitle = this.tasks.map((item) => item.task_title);
      // console.log(this.tasks, "chart");
      const datas = [];
      for (let i = 0; i < this.tasks.length; i++) {
        const data = [];
        data.push(this.tasks[i].commentCountSingleTask);
        data.push(this.tasks[i].replyCountSingleTask);
        data.push(this.tasks[i].giveLikeCountSingleTask);
        data.push(this.tasks[i].beLikeCountSingleTask);
        data.push(this.tasks[i].danmuCountSingleTask);
        data.push(this.tasks[i].studentStarSingleTask);
        data.push(this.tasks[i].teacherStarSingleTask);
        const task = {};
        task.task_title = this.tasks[i].task_title;
        task.data = data;
        datas.push(task);
      }
      for (let k = 0; k < datas.length; k++) {
        this.chartSeries.push({
          name: datas[k].task_title,
          type: "line",
          stack: "Total",
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: datas[k].data,
        });
      }
      console.log(this.chartSeries, "result");
      this.myEchart();
    },
  },
  mounted() {
    this.myEchart();
  },
};
</script>

<style lang="scss" scoped>
.grade-chart-container {
  display: flex;
  justify-content: center;
}
</style>