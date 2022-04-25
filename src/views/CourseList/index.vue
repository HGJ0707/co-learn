<template>
  <div
    :style="{
      padding: '50px 0 0 50px',
      minHeight: minHeight + 'px',
    }"
  >
    <div v-if="isTeacher || data.length" class="courseList-container">
      <div
        :span="8"
        v-for="item in data"
        :key="item.course_id"
        class="course-item"
      >
        <router-link
          :to="{
            name: 'CourseInfo',
            params: {
              course_id: item.course_id,
              class_ids: item.choose_courses,
            },
          }"
        >
          <a-card hoverable>
            <img
              slot="cover"
              alt="暂无图片"
              :src="item.course_img_url"
              onerror="this.src='http://co-learn.cc/api/get_resource?file_id=files/imgs/abc.jpg';this.onerror=null"
            />
            <a-card-meta :title="item.course_name">
              <template slot="description">
                <a-popover>
                  <template slot="content">
                    <span>课程描述：{{ item.course_desc }}</span>
                  </template>
                  课程描述：{{ item.course_desc }}
                </a-popover>
              </template>
            </a-card-meta>
            <a-card-meta :style="{ marginTop: '10px' }">
              <template slot="description">
                <a-popover>
                  <template slot="content">
                    <span
                      >班级：{{
                        item.choose_courses
                          .map((item) => item.class_name)
                          .join(",")
                      }}</span
                    >
                  </template>
                  班级：{{
                    item.choose_courses.map((item) => item.class_name).join(",")
                  }}
                </a-popover>
              </template>
            </a-card-meta>
          </a-card>
        </router-link>
        <div class="delete-class-btn" v-if="isTeacher">
          <!-- 删除任务 -->
          <a-popover>
            <template slot="content">
              <span>删除课程</span>
            </template>
            <div>
              <a-popconfirm
                title="确定删除此课程吗？"
                ok-text="确认"
                cancel-text="取消"
                @confirm="confirm(item.course_id)"
              >
                <a href="#">
                  <a-icon
                    type="delete"
                    theme="twoTone"
                    two-tone-color="#ff1818"
                /></a>
              </a-popconfirm>
            </div>
          </a-popover>
        </div>
      </div>
      <div class="newCourse-box" v-if="isTeacher" @click="showModal">
        <div
          :style="{
            textAlign: 'center',
          }"
        >
          <a-icon
            type="plus"
            :style="{
              fontSize: '60px',
              color: 'rgb(215 215 215)',
            }"
          />
          <div
            :style="{
              fontSize: '22px',
              color: 'rgb(153 153 153)',
              marginTop: '15px',
            }"
          >
            新建课程
          </div>
        </div>
      </div>
    </div>
    <a-empty v-else description="暂无课程" class="empty" />
    <a-modal
      width="600px"
      title="新建课程"
      :visible="visible"
      :confirm-loading="confirmLoading"
      centered
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <NewCourse ref="newcourse" @newCreateCourse="newCreateCourse" />
    </a-modal>
  </div>
</template>

<script>
import { get_course_list, deleteCourse, createCourse } from "@/api/course";
import NewCourse from "./NewCourse";
export default {
  components: {
    NewCourse,
  },
  data() {
    return {
      minHeight: 400,
      data: [],
      // model
      visible: false,
      confirmLoading: false,
      modelData: null,
    };
  },
  computed: {
    isTeacher() {
      return this.$store.getters["login/status"];
    },
  },
  methods: {
    MHeight() {
      this.minHeight = window.innerHeight - 64;
    },

    newCreateCourse(courseInfo, callback) {
      this.confirmLoading = true;
      createCourse(courseInfo).then((res) => {
        this.visible = false;
        this.confirmLoading = false;
        this.fetchData();
        this.$message.success("课程新建成功");
        callback();
      });
    },
    // 删除课程的回调函数
    confirm(course_id) {
      let info = {};
      info.course_id = course_id;
      deleteCourse(info).then(async (res) => {
        if (!res) {
          // 删除后重新获取课程列表
          await this.fetchData();
          this.$message.success("课程删除成功");
        } else {
          return;
        }
      });
    },
    async fetchData() {
      const userInfo = {};
      if (this.$store.getters["login/status"]) {
        userInfo.teacher_id = this.$store.getters["login/user"];
      } else {
        userInfo.student_id = this.$store.getters["login/user"];
      }
      await get_course_list(userInfo).then((res) => {
        this.data = res;
        if (this.data) {
          this.data.reverse().map((item) => {
            item.course_img_url =
              "/api/get_resource?file_id=" + item.course_img_url;
          });
        }
        console.log(this.data, "课程列表");
      });
    },
    // 显示model框，以及传值给modelData
    showModal() {
      this.visible = true;
    },
    async handleOk(e) {
      // 点击model的确定按钮，执行子组件的handleEdit方法
      this.$refs.newcourse.handleSubmit();
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
  async created() {
    this.MHeight();
    await this.fetchData();
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

<style lang="scss">
@import "@/styles/global.scss";
.courseList-container {
  display: flex;
  flex-wrap: wrap;
  .course-item {
    position: relative;
    width: 400px;
    margin: 0 50px 50px 0;
    .ant-card {
      transition: all 0.2s linear;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      &:hover {
        transition: all 0.2s linear;
        transform: scale(1.01);
      }
      img {
        height: 150px;
        object-fit: cover;
      }
      .ant-card-meta-description {
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .delete-class-btn {
      position: absolute;
      bottom: 80px;
      right: 30px;
    }
  }
  .newCourse-box {
    width: 400px;
    height: 272px;
    border: 1px solid #e8e8e8;
    background: rgb(250 250 250);
    border-radius: 2px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
      transition: all 0.2s linear;
      transform: scale(1.01);
    }
  }
}
</style>