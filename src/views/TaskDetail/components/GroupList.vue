<template>
  <div class="groupList-container">
    <!-- <div class="group-title">分组列表</div> -->
    <div class="group-list">
      <div class="group-item" v-for="item in allGroup" :key="item.group_leader">
        <div class="group-complete" v-if="item.cover_url">
          <a-popover placement="top">
            <template slot="content">
              <span :style="{ width: '240px' }">作业已提交</span>
            </template>
            <a-icon
              type="check-circle"
              theme="twoTone"
              two-tone-color="#52c41a"
              :style="{ fontSize: '40px' }"
            />
          </a-popover>
        </div>
        <div class="group-up-area">
          <div class="group-name-title">
            <!-- 默认显示组长名 -->
            {{ item.group_name ? item.group_name : item.group_leader_name }}
          </div>
          <!-- 按钮区域 -->
          <div class="btn-area">
            <!-- 修改组名 -->
            <div v-if="leaderID === item.group_leader">
              <ModifyName
                :group_name="item.group_name"
                @handleGroupNameBtn="handleGroupNameBtn"
              />
            </div>
            <!-- 选择组员 -->
            <div v-if="leaderID === item.group_leader" class="look-btn">
              <ChooseMembers
                ref="choose"
                :task_id="task_id"
                @handleChooseMembersBtn="handleChooseMembersBtn"
              />
            </div>
            <!-- 删除组员 -->
            <div v-if="leaderID === item.group_leader" class="look-btn">
              <DeleteMembers
                :task_id="task_id"
                :deleteStuList="
                  item.group_members.filter(
                    (member) => member.student_id != item.group_leader
                  )
                "
                @handleDeleteMembersBtn="handleDeleteMembersBtn"
              />
            </div>
            <!-- 查看详情 -->
            <div class="look-btn">
              <router-link
                target="_blank"
                :to="{
                  name: 'TaskResult',
                  query: {
                    group_name: item.group_name,
                    task_id: task_id,
                    task_type: task_type,
                    leader_id: item.group_leader,
                    work_id: item.work_id,
                  },
                }"
                ><a-button class="detail-btn"> 作业详情 </a-button>
              </router-link>
            </div>
          </div>
        </div>
        <!-- 显示小组成员 -->
        <div class="group-members">
          组长：{{ item.group_leader_name }} ，组员：{{
            item.group_members.length > 1
              ? item.group_members
                  .filter(
                    (member) => member.student_name != item.group_leader_name
                  )
                  .map((member) => member.student_name)
                  .join("、")
              : "未选择组员"
          }}
        </div>
        <div class="group-cover" v-if="item.cover_url">
          <a-popover title="标题" placement="top">
            <template slot="content">
              <p :style="{ width: '240px' }">{{ item.work_title }}</p>
            </template>
            <router-link
              target="_blank"
              :to="{
                name: 'TaskResult',
                params: {
                  group_name: item.group_name,
                },
                query: {
                  task_id: task_id,
                  task_type: task_type,
                  leader_id: item.group_leader,
                  work_id: item.work_id,
                },
              }"
              ><img
                :src="['/api/get_resource?file_id=' + item.cover_url]"
                alt=""
                onerror="this.src='http://co-learn.cc/api/get_resource?file_id=files/imgs/abc.jpg';this.onerror=null"
              />
            </router-link>
          </a-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModifyName from "./ModifyName";
import ChooseMembers from "./ChooseMembers";
import DeleteMembers from "./DeleteMembers";
import {
  chooseGuys,
  deleteGuys,
  modifyGroupName,
  getGroupListByTaskId,
} from "@/api/group";
export default {
  components: {
    ModifyName,
    ChooseMembers,
    DeleteMembers,
  },
  props: {
    task_id: {
      type: String,
      required: true,
    },
    task_type: "",
  },
  data() {
    return {
      leaders: [],
      allGroup: [],
      leaderID: null,
      student_List: [],
    };
  },

  methods: {
    //获取分组列表
    async fetchLeaders() {
      let taskId = {};
      taskId.task_id = this.task_id;
      return await getGroupListByTaskId(taskId).then((res) => {
        return res.group_list;
      });
    },
    //修改组名方法
    handleGroupNameBtn(groupName, callback) {
      let groupInfo = {};
      groupInfo.group_leader = this.leaders[0].group_leader;
      groupInfo.task_id = this.task_id;
      groupInfo.group_name = groupName;
      modifyGroupName(groupInfo).then(async (res) => {
        //修改组名后重新获取数据
        callback(res);
        this.allGroup = await this.fetchLeaders();
        // console.log(this.allGroup, "修改组名后重新获取数据");
      });
    },
    //选择组员方法
    handleChooseMembersBtn(group_members, callback) {
      let memberInfo = {};
      memberInfo.task_id = this.task_id;
      memberInfo.group_leader = this.leaders[0].group_leader;
      memberInfo.member_ids = JSON.stringify(group_members);
      chooseGuys(memberInfo).then(async (res) => {
        //选择组员后重新获取数据
        callback(res);
        this.allGroup = await this.fetchLeaders();
        // console.log(this.allGroup, "选择组员后重新获取数据");
      });
    },
    //删除组员的方法
    handleDeleteMembersBtn(delete_members, callback) {
      let memberInfo = {};
      memberInfo.task_id = this.task_id;
      memberInfo.group_leader = this.leaders[0].group_leader;
      memberInfo.member_ids = JSON.stringify(delete_members);
      deleteGuys(memberInfo).then(async (res) => {
        //删除组员后重新获取数据
        callback(res);
        this.$refs.choose[0].fetchStudentList();
        this.allGroup = await this.fetchLeaders();
        // console.log(this.allGroup, "删除组员后重新获取数据");
      });
    },
  },
  async created() {
    //判断当前登录用户是否是组长
    this.leaders = await this.fetchLeaders();
    this.allGroup = this.leaders;
    console.log(this.allGroup, "所有组");
    this.leaders = this.leaders.filter(
      (item) => item.group_leader === this.$store.getters["login/user"]
    );
    if (this.leaders.length) {
      this.leaderID = this.leaders[0].group_leader;
    }
    // console.log(this.leaders, "leaders");
  },
};
</script>

<style lang="scss" scoped>
.groupList-container {
  margin-bottom: 100px;
  .group-title {
    font-size: 18px;
    color: black;
    font-weight: 600;
    margin-top: 30px;
  }
  .group-list {
    margin-top: 50px;
    .group-item {
      color: black;
      font-size: 16px;
      width: 100%;
      margin: 30px 0;
      padding: 10px 24px;
      border-radius: 10px;
      transition: all 0.2s linear;
      position: relative;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      &:hover {
        transition: all 0.2s linear;
        transform: scale(1.02);
      }
      .group-up-area {
        height: 70px;
        line-height: 50px;
        a {
          color: black;
        }
        display: flex;
        justify-content: space-between;
        .group-name-title {
          font-size: 20px;
          color: #1890ff;
        }
        .btn-area {
          display: flex;
          align-items: center;
          align-content: center;
          .btn,
          .look-btn {
            margin-left: 20px;
            .detail-btn {
              color: #1890ff;
              transition: all 0.3s linear;
              &:hover {
                transition: all 0.3s linear;
                border-color: #1890ff;
                box-shadow: 0 0px 28px rgb(0 0 0 / 9%);
              }
            }
          }
        }
      }
      .group-members {
        height: 50px;
        line-height: 50px;
      }
      .group-cover {
        position: absolute;
        right: -210px;
        top: 0;
        cursor: pointer;
        img {
          height: 140px;
          width: 200px;
          object-fit: cover;
          border-radius: 10px;
        }
      }
      .group-complete {
        position: absolute;
        left: -80px;
        top: 50px;
        cursor: pointer;
      }
    }
  }
}
</style>