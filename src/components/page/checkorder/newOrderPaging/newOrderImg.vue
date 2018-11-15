<template>
  <div>
    <info-header>上传图片</info-header>
    <div class="bg-fff p15 mb12 upload_img_block">
      <div class="add_img" v-for="(imgData,index) in imgDataList">
        <div v-if="imgData!=''" style="position: relative;">
          <img :src="imgData" @click="showImg(imgData)">
          <div v-if="canChange" class="img_delete_btn" @click.stop="deleteImg(index)">删除</div>
        </div>
        <div v-if="imgData=='' && canChange" @click.stop.prevent="fileClick(index)">+</div>
        <input accept="image/*" style="display: none;" type="file" :id="'img-'+index" @change="fileChange($event,index)"/>
      </div>
      <div class="add_img_title">最多可上传3张照片</div>
    </div>
  </div>
</template>

<script>
  import infoHeader from "@/components/common/infoHeader"
  import getWXSign from '@/assets/js/wx'

  export default {
    name: "newOrderImg",
    props: {
      imgList: {
        type: String,
        default() {
          return '["","",""]'
        }
      },
      canChange: {
        type: Boolean,
        default: true
      }
    },
    components: {
      infoHeader
    },
    data() {
      return {
        currIndex: -1,
        imgDataList: JSON.parse(this.imgList)
      }
    },
    watch: {
      imgList(newVal) {
        this.imgDataList = JSON.parse(newVal);
      }
    },
    methods: {
      fileClick(index) {
        this.currIndex = index;
        document.getElementById('img-' + index).click();
      },
      deleteImg(index) {
        this.imgDataList.splice(index, 1, '');
        this.$emit("datachange", JSON.stringify(this.imgDataList))
      },
      fileChange(el, index) {
        if (!el.target.files[0].size) return;
        var formData = new FormData();
        formData.append("file", el.target.files[0]);
        this.axios.post("/weixin/sales/dyCheckOrder/imgUpload", formData).then(respone => {
          const res = respone.data;
          document.querySelector('#img-' + index).value = null
          if (res.code == 1000) {
            this.imgDataList.splice(this.currIndex, 1, res.data);
            this.$emit("datachange", JSON.stringify(this.imgDataList))
          } else {
            this.$Message.infor(res.msg)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      showImg(imgData) {
        var imgList = this.imgDataList;
        getWXSign.apply(this).then(wx => {
          wx.previewImage({
            current: imgData,
            urls: imgList
          })
        })
      }

    }
  }
</script>

<style scoped>
  .upload_img_block {
    display: flex;
    padding: 0.75rem 0.94rem;
  }

  .upload_img_block .add_img {
    background: #EDEDED;
    border-radius: 0.25rem;
    width: calc(20vw - 0.676rem);
    height: calc(20vw - 0.676rem);
    line-height: calc(20vw - 0.876rem);
    margin-right: 0.5rem;
    color: #CCCCCC;
    font-size: 1.75rem;
    text-align: center;
    align-self: center;
  }

  .upload_img_block .add_img img {
    height: calc(20vw - 0.676rem);
    width: calc(20vw - 0.676rem);
    border-radius: 0.25rem;
  }

  .upload_img_block .add_img_title {
    width: calc(40vw - 1.352rem);
    align-self: center;
    text-align: center;
    color: #7C7C7C;
    font-size: 0.9375rem;
  }

  .upload_img_block .img_delete_btn {
    position: absolute;
    bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
</style>
