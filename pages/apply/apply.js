var app = getApp()

page({
    data:{
        json:{
            num:'1'
        }
    },
    onload:function(){
        
    },
    bindMinus: function(e) {
        var index = parseInt(e.currentTarget.dataset.index);
        var num = this.data.carts[index].num;
        // 如果只有1件了，就不允许再减了
        if (num > 1) {
        num --;
        }
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 购物车数据
        var carts = this.data.carts;
        carts[index].num = num;
        // 按钮可用状态
        var minusStatuses = this.data.minusStatuses;
        minusStatuses[index] = minusStatus;
        // 将数值与状态写回
        this.setData({
        carts: carts,
        minusStatuses: minusStatuses
        });
    },
    bindPlus: function(e) {
        var index = parseInt(e.currentTarget.dataset.index);
        var num = this.data.carts[index].num;
        // 自增
        num ++;
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 购物车数据
        var carts = this.data.carts;
        carts[index].num = num;
        // 按钮可用状态
        var minusStatuses = this.data.minusStatuses;
        minusStatuses[index] = minusStatus;
        // 将数值与状态写回
        this.setData({
        carts: carts,
        minusStatuses: minusStatuses
        });
    },
})