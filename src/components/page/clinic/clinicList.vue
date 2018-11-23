<template>
  <div>
    <d-search @on-search="getData" placeholder="诊所名称"></d-search>
    <section class="clinic_content">
      <ul>

        <li class="f5_border" v-for="(clinic,index) in clinicList">
          <div class="order_infor">
            <router-link class="order_infor_left" :to="`/clinic/clinicDetail/${clinic.id}`" :key="index">
              <div class="order_infor_top">
                <div>{{clinic.name}}</div>
                <div :class="clinic.type==1?'bg_4D':'bg_EB'">{{clinic.type|clinicType}}</div>
              </div>
              <div class="order_infor_bottom">
                联系人：{{clinic.contact}}
              </div>
            </router-link>
            <div class="order_infor_right">
              <a :href="'tel:'+clinic.phone_num">
                <button class="order_infor_rightBtn">打电话</button>
              </a>
            </div>
          </div>
          <hr class="full-screen-hr">
          <div class="clinic_order">
            <router-link class="clinic_order_item"
                         :to="{path:`/cloudListPage/clinicCloudOrderPage/${clinic.id}`, query:{name:`${clinic.name}`}}">
              处方订单
            </router-link>
            <div class="clinic_order_item">
              药房订单
            </div>
            <router-link class="clinic_order_item"
                         :to="{path:`/checkListPage/clinicCheckOrderPage/${clinic.id}`, query:{name:`${clinic.name}`}}">
              检验订单
            </router-link>
          </div>
        </li>


      </ul>
      <div class="add_more mb50" @click.stop="addMore()" v-if="isCanAdd">查看更多...</div>
    </section>
    <d-footer :activeItem="2"></d-footer>
  </div>
</template>

<script>
  import dSearch from '@/components/common/dSearch.vue'
  import dFooter from '@/components/common/dFooter.vue'

  export default {
    name: "clinicList",
    data: function () {
      return {
        clinicList: [],
        page: 1,
        pageSize: 10,
        queryName: "",
        isCanAdd: false
      }
    },
    components: {
      'd-search': dSearch,
      'd-footer': dFooter
    },
    filters: {
      clinicType: function (val) {
        var list = [{code: 1, name: "普通诊所"}, {code: 2, name: "淳道诊所"}];
        for (var i = 0; i < list.length; i++) {
          if (list[i].code == val) {
            return list[i].name;
          }
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData: function (name, isAdd) {
        this.queryName = name;
        this.axios.post("/weixin/sales/clinic/list", {
          "page": this.page,
          "page_size": this.pageSize,
          "query": name
        }).then((respone) => {
          var res = respone.data, self = this;
          if (res.code == 1000) {
            self.isCanAdd = res.data.length >= this.pageSize ? true : false;
            if (isAdd) {
              res.data.forEach(function (item) {
                self.clinicList.push(item);
              })
            } else {
              self.clinicList = res.data;
            }
          } else {
            self.$Message.infor(res.msg)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      addMore() {
        this.page++;
        this.getData(this.queryName, true);
      }
    }
  }
</script>

<style scoped>
  .clinic_content {
    background: #ffffff;
    margin-top: 3.25rem;
    margin-bottom: 3.125rem;
  }

  .order_infor {
    padding: 0.625rem 1rem;
    display: flex;
  }

  .order_infor_top {
    display: flex;

  }

  .order_infor_top div:first-child {

    color: #3F3F3F;
    font-size: 1rem;
    font-weight: bolder;
  }

  .order_infor_left {
    flex: 1;
  }

  .order_infor_right {
    align-self: center;
  }

  .order_infor_rightBtn {
    background: #EBF8F9;
    border: 0.0625rem solid #08BAC6;
    border-radius: 0.25rem;
    color: #3F3F3F;
    font-size: 0.75rem;
    padding: 0.47rem 0.875rem;
  }

  .order_infor_top div:last-child {
    font-size: 0.625rem;
    color: #FFFFFF;
    border-radius: 4px;
    align-self: center;
    padding: 0.125rem 0.25rem;
    margin-left: 0.5rem;
  }

  .bg_EB {
    background: #EB6262;
  }

  .bg_ED {
    background: #EDAB15;
  }

  .bg_4D {
    background: #4DBC89;
  }

  .order_infor_bottom {
    margin-top: 0.5rem;
    color: #7C7C7C;
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .clinic_order {
    display: flex;
  }

  .clinic_order_item {
    flex: 1;
    color: #3F3F3F;
    font-size: 1rem;
    padding: 0.815rem 0 0.78rem 0;
    text-align: center;
  }

  .f5_border {
    border-bottom: 0.75rem solid #f5f5f5;
  }
</style>
