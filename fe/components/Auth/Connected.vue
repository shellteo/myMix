<template>
  <div class="fsTRoj">
    <div class="ggguJo">
      <div class="dtxTaa">
        <div size="16" class="jqgaNv">
          <div class="yeTAN" />
          <div class="gEEqRv">MetaMask</div>
        </div>
        <div><div class="sc-eNQAEJ czqvHC"><div class="sc-jKJlTe kfDsrF"><div /></div></div></div>
      </div>
      <div class="dtxTaa">
        <div class="LIgaG">
          <a :href="url" target="_blank" rel="noopener noreferrer" class="cRtgxP">
            {{ metamask.account }} ↗
          </a>
        </div>
      </div>
    </div>
    <p class="text-center">
      <a href="/mytoken/" class="cRtgxP">→ 查看我发行的token</a>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import consts from '@/utils/consts'
export default {
  name: 'Connected',
  computed: {
    ...mapState(['metamask']),
    url() {
      return consts.etherscanURL + this.metamask.account
    }
  }
}
</script>
<style lang="scss">
.ggguJo {
    padding: 1rem;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(225, 225, 225);
    border-image: initial;
    border-radius: 20px;
}
.dtxTaa:first-of-type {
    margin-bottom: 20px;
}
.dtxTaa {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    color: rgb(1, 1, 1);
    flex-flow: row nowrap;
    div {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex-flow: row nowrap;
}
}
.jqgaNv {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
}
.gEEqRv {
    // padding-left: 0.5rem;
    width: initial;
    font-size: 1.2rem
}
.LIgaG {
    display: flex;
    align-items: center;
    min-width: 0px;
    font-weight: 500;
    font-size: 1rem;
    flex-flow: row nowrap;
    a {
    min-width: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &:hover {
    text-decoration: underline;
}
}
}
.cRtgxP {
    cursor: pointer;
    color: rgb(47, 128, 237);
    text-decoration: none;
}
.czqvHC {
    color: rgb(39, 174, 96);
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
}
.kfDsrF:first-child {
    height: 8px;
    width: 8px;
    margin-left: 12px;
    margin-right: 2px;
    background-color: rgb(39, 174, 96);
    border-radius: 50%;
}
</style>
