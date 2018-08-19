<template>
    <div class="pos">
        <div>
            <el-row>
                <el-col :span='7' class="order-list" id="order-list">
                    <el-tabs>
                        <el-tab-pane label="点餐">
                            <el-table :data="tableData" border show-summary style="width: 100%">
                                <el-table-column prop="goodsName" label="商品"></el-table-column>
                                <el-table-column prop="count" label="量" width="50"></el-table-column>
                                <el-table-column prop="price" label="金额" width="70"></el-table-column>
                                <el-table-column label="操作" width="100" fixed="right">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="deleteTableData(scope.row)">删除</el-button>
                                        <el-button type="text" size="small" @click="addTableData(scope.row)">增加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="div-btn">
                                <el-button type="warning">挂单</el-button>
                                <el-button type="danger" @click="deleteAll">删除</el-button>
                                <el-button type="success" @click="pay">结账</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="挂单"></el-tab-pane>
                        <el-tab-pane label="外卖"></el-tab-pane>

                    </el-tabs>
                </el-col>
                <!--商品展示-->
                <el-col :span='15'>
                    <div class="often-goods">
                        <div class="title">常用商品</div>
                        <div class="often-goods-list">
                            <ul class="clearfix">
                                <li v-for="goods in oftenGoods" :key="goods.goodsId" @click="addTableData(goods)">
                                    <span>{{goods.goodsName}}</span>
                                    <span class="o-price">￥{{goods.price}}元</span>
                                </li>

                            </ul>
                        </div>
                        <div class="goods-type">
                            <el-tabs>
                                <el-tab-pane label="汉堡">
                                    <ul class='cookList'>
                                        <li v-for="goods in type0Goods" :key="goods.goodsId" @click="addTableData(goods)">
                                            <span class="foodImg">
                                                <img :src="goods.goodsImg" width="100%">
                                            </span>
                                            <span class="foodName">{{goods.goodsName}}</span>
                                            <span class="foodPrice">￥{{goods.price}}元</span>
                                        </li>
                                    </ul>
                                </el-tab-pane>
                                <el-tab-pane label="小食">
                                    <ul class='cookList'>
                                        <li v-for="goods in type1Goods" :key="goods.goodsId" @click="addTableData(goods)">
                                            <span class="foodImg">
                                                <img :src="goods.goodsImg" width="100%">
                                            </span>
                                            <span class="foodName">{{goods.goodsName}}</span>
                                            <span class="foodPrice">￥{{goods.price}}元</span>
                                        </li>
                                    </ul>
                                </el-tab-pane>
                                <el-tab-pane label="饮料">
                                    <ul class='cookList'>
                                        <li v-for="goods in type2Goods" :key="goods.goodsId" @click="addTableData(goods)">
                                            <span class="foodImg">
                                                <img :src="goods.goodsImg" width="100%">
                                            </span>
                                            <span class="foodName">{{goods.goodsName}}</span>
                                            <span class="foodPrice">￥{{goods.price}}元</span>
                                        </li>
                                    </ul>
                                </el-tab-pane>
                                <el-tab-pane label="套餐">
                                    <ul class='cookList'>
                                        <li v-for="goods in type3Goods" :key="goods.goodsId" @click="addTableData(goods)">
                                            <span class="foodImg">
                                                <img :src="goods.goodsImg" width="100%">
                                            </span>
                                            <span class="foodName">{{goods.goodsName}}</span>
                                            <span class="foodPrice">￥{{goods.price}}元</span>
                                        </li>
                                    </ul>
                                </el-tab-pane>

                            </el-tabs>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "pos",
  data() {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: []
    };
  },
  methods: {
    addTableData: function(item) {
      let isHave = false;
      this.tableData.forEach(element => {
        if (element.goodsId === item.goodsId) {
          isHave = true;
          element.count++;
        }
      });
      if (!isHave) {
        let newGoods = {
          goodsId: item.goodsId,
          goodsName: item.goodsName,
          price: item.price,
          count: 1
        };
        this.tableData.push(newGoods);
      }
    },
    deleteTableData: function(item) {
      this.tableData = this.tableData.filter(o => o.goodsId !== item.goodsId);
    },
    deleteAll: function() {
      this.tableData = [];
    },
    pay: function() {
      if (this.tableData.length === 0) {
        this.$message({
          showClose: true,
          message: "您还未选择好吃的哟，请选择后再结账哈！",
          type: "succese"
        });
      } else {
        this.$confirm("是否结账?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              showClose: true,
              type: "success",
              message: "结账成功!"
            });
            this.tableData = [];
          })
          .catch(() => {
            this.$message({
              showClose: true,
              type: "info",
              message: "已取消结账"
            });
          });
      }
    }
  },
  mounted: function() {
    var orderHeight = document.body.clientHeight;
    document.getElementById("order-list").style.height = orderHeight + "px";
  },
  created: function() {
    axios
      .get("http://jspang.com/DemoApi/oftenGoods.php")
      .then(response => {
        this.oftenGoods = response.data;
      })
      .catch(error => {
        alert("error");
      });
    axios
      .get("http://jspang.com/DemoApi/typeGoods.php")
      .then(response => {
        //this.oftenGoods=response.data;
        this.type0Goods = response.data[0];
        this.type1Goods = response.data[1];
        this.type2Goods = response.data[2];
        this.type3Goods = response.data[3];
      })
      .catch(error => {
        alert("网络错误，不能访问");
      });
  }
};
</script>

<style>
.clearfix::after {
  content: "";
  height: 0;
  display: block;
  clear: both;
}

.order-list {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
  height: 100%;
}

.div-btn {
  margin-top: 10px;
}

.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
}

.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  cursor: pointer;
}

.o-price {
  color: #58b7ff;
}

.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #e5e9f2;
  height: auot;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}

.cookList li span {
  display: block;
  float: left;
}

.foodImg {
  width: 40%;
}

.foodName {
  font-size: 18px;
  padding-left: 10px;
  color: brown;
}

.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
.el-tabs__nav {
  margin-left: 25px;
}
</style>