import request from '@/utils/request'
export default {
        //分页查询用户
        getUserListPage(conditionVo) {
            console.log(conditionVo)
            return request({
              url: `/laundry/user/selectAllUser`,
              method: 'get',
              params:{
                page :conditionVo.pageNum,
                limit:conditionVo.limitNum,
                username:conditionVo.username,
                realName:conditionVo.realName,
                gender:conditionVo.gender
            }
            })
          },

}
