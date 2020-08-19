<template>
  <div class="IE-flex-fix">
    <div class="sign">
      <div class="logo-c">
        <div class="logo">
          <img src="https://mixswap.oss-cn-hangzhou.aliyuncs.com/mixswap_logo_white.png" alt="logo">
        </div>
        <div class="close-c">
          <i class="el-icon-close close-i"></i>
        </div>
        <div class="logo">
          <img src="https://mixswap.oss-cn-hangzhou.aliyuncs.com/okex_logo.png" alt="">
        </div>
      </div>
      <n-link
        :to="{ path: 'exchange' }"
      >
        <p class="title">👉 go to app</p>
      </n-link>
    </div>
  </div>
  </div>
</template>

<style scoped lang="scss" >
.IE-flex-fix {
  background-color: rgb(44, 47, 54);
}
.sign {
  text-align: center;
  font-size: 14px;
  background-color: rgb(44, 47, 54);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  .logo-c {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title {
    font-size: 30px;
    margin-top: 100px;
  }
  a {
    text-decoration: none;
  }
  .logo {
    img {
      width: 320px;
    }
  }
  .close-c {
    margin:  0 30px;
  }
  .close-i {
    font-size: 50px;
    color: #fff
  }
}
.auth-card {
  width: 300px;
  margin: 10vh auto 0;
  padding: 50px 50px 30px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 8px rgba(0,0,0,.1);
  vertical-align: middle;
  display: inline-block;
}
@media screen and (max-width: 800px) {
  .logo-c {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
