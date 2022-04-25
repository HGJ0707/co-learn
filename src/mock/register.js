import Mock from "mockjs";

Mock.mock("/api/register", "post", {
    code: 0,
    msg: "",
    data: null
})