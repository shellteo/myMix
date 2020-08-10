<template>
  <div>
    <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" class="hKmATm">
      <button class="cgFqxP">
        <div class="gGlLBd">
          <div color="#E8831D" class="cLGwtf"> Install Metamask</div>
        </div>
        <div class="ivbihN">
          <img src="@/assets/images/metamask.png" alt="Icon">
        </div>
      </button>
    </a>
    <div class="kQIqHf">
      <span>New to Ethereum? &nbsp;</span>
      <a href="https://ethereum.org/use/#3-what-is-a-wallet-and-which-one-should-i-use" target="_blank" rel="noopener noreferrer" class="hKmATm">Learn more about wallets</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WrongNetwork'
}
</script>
<style lang="scss">
.my-dialog {
  .error-tip {
    font-size: 1.5rem;
    color: #231f20;
  }
}
.hKmATm {
  cursor: pointer;
  color: rgb(47, 128, 237);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cgFqxP {
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 0px;
  opacity: 1;
  width: 50% !important;
  outline: none;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-radius: 12px;
  border-color: rgb(225, 225, 225);
  padding: 1rem;
  &:hover {
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(92, 162, 255);
    border-image: initial;
  }
}
.ivbihN {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  img {
    height: 24px;
    width: 24px;
  }
}
.gGlLBd {
  display: flex;
  justify-content: center;
  height: 100%;
  flex-flow: column nowrap;
}
.cLGwtf {
  display: flex;
  color: rgb(1, 1, 1);
  font-size: 1.2rem;
  font-weight: 500;
  flex-flow: row nowrap;
}
.kQIqHf {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    margin-top: 2rem;
    flex-flow: row nowrap;
}
.hKmATm {
    cursor: pointer;
    color: rgb(47, 128, 237);
    text-decoration: none;
}
</style>
