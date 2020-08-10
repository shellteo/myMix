<template>
  <div class="IE-flex-fix">
    <div id="site-wrapper" style="opacity: 1; transform: translate(0px, 0px);">
      <g-header />
      <div id="site-inner" data-page-container="true">
        <div class="xhr-page-contents" style="">
          <div data-widget="page-draw#pageDrawer, url-reloader">
            <span style="display: none;" data-widget="homepage-anim" />
            <div class="component row">
              <div
                href=""
                class=" col-12 col-sm-8 article--card card article--large article-preview component"
                data-widget="article-number"
              >
                <div class="component-header">
                  <h3 class="title title--ad">
                    What is Social Money?
                  </h3>
                  <!-- <p class="title-description">
                    From sea to plate
                  </p> -->
                </div>
                <div class="component-body">
                  <!-- <img
                    class="image"
                    src="./Sea Harvest _ Fresh Seafood Market _ Canberra_files/salmon-blue3.png"
                  /> -->
                  <p>
                    <!-- class="copy copy--card" -->
                    web2.0大多企业都在做平台，但是web3.0想将社区的价值与它们所存在的平台脱钩，
                    从封闭平台到开放社区，实现跨平台的网络价值。
                    用户可以通过网络社区的social money来加入、订阅、关注，增长和交换独立于平台的网络的价值。
                  </p>
                  <div class="human-coin">
                    <span class="icon">👨🏻‍💼</span>
                    <span class="fh"> + </span>
                    <img src="@/assets/coin.png" alt="" class="p2">
                    <span class="fh"> = </span>
                    <div class="coin">
                      <span class="icon2">👨🏻</span>
                    </div>
                  </div>
                  <div class="font-center">
                    @jack + social money = $jack
                  </div>
                  <p>
                    网络世界有自己的文化（包括模因、gif、内在笑话、沟通渠道以及共享的希望和恐惧），这些网络社区所拥有的是一种共享的社会语言和一种共享的社会文化，但是他们缺乏的是共享的social money。
                  </p>
                </div>
                <!-- <div class="component-footer">
                  <div class="text-right">
                    <span class="article-number">Full report on page 2</span>
                  </div>
                </div> -->
              </div>
              <div
                class="card ad find-us find-us--large col-12 col-sm-4"
              >
                <div class="card-special-border">
                  <div class="component-header">
                    <h3 class="title title--ad">
                      Start!
                    </h3>
                    <div class="title-description text-center">发行属于你自己的social money仅需2步！</div>
                  </div>
                  <div class="section-heading">
                    <ol class="issue-section">
                      <li>填写symbol 和 name</li>
                      <li>点击发布按钮，就可以发布你的social money了！</li>
                    </ol>
                  </div>
                  <div class="component-body">
                    <a v-if="noToken" class="a-issue" target="" href="/issue/">
                      → 去发行social money
                    </a>
                    <a v-else class="a-issue" target="" href="/mytoken/">
                      → 去查看我发行的social money
                    </a>
                  </div>
                  <!-- <img
                    class="image"
                    src="./Sea Harvest _ Fresh Seafood Market _ Canberra_files/compass-blue.png"
                    srcset="
                      https://www.seaharvest.net.au/wp-content/themes/seaharvest/img/assets/built/compass-blue-sml.png 526w,
                      https://www.seaharvest.net.au/wp-content/themes/seaharvest/img/assets/built/compass-blue-med.png 842w
                    "
                    sizes="(max-width: 700px) 90vw,
                                400px"
                  /> -->
                  <!-- <div class="locations">
                    <div class="location section section-not-last">
                      <h4 class="location-name section-heading uppercase">
                        Belconnen Markets
                      </h4>
                      <p class="section-text">
                        10 Lathlain St, Belconnen ACT 2617, Australia
                      </p>
                      <p class="section-text">Open Wed-Sun 8:00am-6:00pm</p>
                    </div>
                    <div class="location section section-not-last">
                      <h4 class="location-name section-heading uppercase">
                        Fyshwick Markets
                      </h4>
                      <p class="section-text">
                        12 Dalby St, Fyshwick ACT 2609, Australia
                      </p>
                      <p class="section-text">Open Thu-Sun 7:00am-5:30pm</p>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
            <div class="page-heading border">
              <div class="component card-padding row">
                <h3 class="title title--ad">The economics of social money</h3>
              </div>
              <div class="component row">
                <div class="card-padding-sides col-12 col-sm-4 copy">
                  <h5 class="section-heading"># Monetary Policy </h5>
                  <ul>
                    <li>The minting and monetary policy of social money is set by Roll smart contracts and cannot be changed arbitrarily by us, you, or any other third-party.</li>
                    <li>There will be exactly 10,000,000 units of your social money in existence. You can’t mint more and we can’t create more. We’re all bound by the smart contract code on the Ethereum blockchain</li>
                  </ul>
                </div>
                <div class="card-padding-sides col-12 col-sm-4 copy">
                  <h5 class="section-heading"># Minting </h5>
                  <ul>
                    <li>After you sign up, our smart contracts will issue the first 2,000,000 units of your social money to your Roll wallet.</li>
                    <li>This initial pool of social money allows you to create an initial distribution to your existing community, likely starting with your closest supporters.</li>
                  </ul>
                </div>
                <div class="card-padding-sides col-12 col-sm-4 copy">
                  <h5 class="section-heading"># Vesting </h5>
                  <ul>
                    <li>After minting the first 2M, your social money will vest over a period of three years until the max supply of 10M units is reached.</li>
                    <li>This means every month for the next three years, you will receive a lump sum of social money in your Roll wallet. Vesting allows your incentives as an issuer to be aligned with those of the community that hold your social money, over the long-term. With these parameters, we believe social money should be able to store value for the intermediate to long-term.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="page-heading border">
              <div class="component card-padding row">
                <div class="col-12 col-sm-12">
                  <h3 class="title title--ad">The architecture diagram</h3>
                </div>
                <div class="hero-image col-12 col-sm-12">
                  <!-- todo: use d3.js -->
                  <img class="image" src="@/assets/architecture.png">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <g-footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isEmptyAddress } from '@/utils/index'
// import socialMoneyContractInstace from '@/api/eth/contract.js'
export default {
  computed: {
    ...mapState(['token']),
    noToken() {
      return isEmptyAddress(this.token.tokenAddress)
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss" >
.font-center {
  text-align: center;
  color: #26498d;
}
.issue-section {
  text-align: left;
  li {
    margin: 1rem 0;
  }
}
.a-issue {
  color:#26498d;
  text-decoration: underline;
}
.site-title {
  .site-logo {
    font-size: 4rem;
  }
}
.human-coin {
  display: flex;
  align-items: center;
  justify-content: center;
  .coin {
    width: 5rem;
    height: 5rem;
    background: url(../assets/coin.png);
    background-repeat: no-repeat;
    background-size: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fh {
      font-size: 4rem;
      margin: 0 10px;
  }
  .p1 {
      width: 5rem;
  }
  .p2 {
      width: 5rem;
  }
  .icon {
      font-size: 4rem;
  }
  .icon2 {
      font-size: 3rem;
  }
}
.card-special-border {
  border: 2px #231f20 dashed;
}
</style>
