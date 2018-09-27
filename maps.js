/*
** Create by Hoffy on 2018/8/19
*/
(function (win) {
    var goal=[4,3,4,4,3,5,5,6,5,4];  //需要达成的目标
    var origin=[54,15,39,29,17,21,45,94,39,56];//每关初始玩家的位置（相对于全部div）
    var builder=[
        //二维数组 ，一行十二个，代表html对应的每一行div
        //0代表不可抵达区域，1代表目标（要被推到的地方），2代表普通路径（可以走的），3代表墙，4代表箱子
        [
            0,0,0,0,3,3,3,0,0,0,0,0,
            0,0,0,0,3,1,3,0,0,0,0,0,
            0,0,0,0,3,2,3,3,3,3,0,0,
            0,0,3,3,3,4,2,4,1,3,0,0,
            0,0,3,1,2,4,2,3,3,3,0,0,
            0,0,3,3,3,3,4,3,0,0,0,0,
            0,0,0,0,0,3,1,3,0,0,0,0,
            0,0,0,0,0,3,3,3,0,0,0,0
        ],
        [
            0,0,3,3,3,3,3,0,0,0,0,0,
            0,0,3,2,2,2,3,0,0,0,0,0,
            0,0,3,2,4,4,3,0,3,3,3,0,
            0,0,3,2,4,2,3,0,3,1,3,0,
            0,0,3,3,3,2,3,3,3,1,3,0,
            0,0,0,3,3,2,2,2,2,1,3,0,
            0,0,0,3,2,2,2,3,2,2,3,0,
            0,0,0,3,2,2,2,3,3,3,3,0,
            0,0,0,3,3,3,3,3,0,0,0,0
        ],
        [
            0,0,3,3,3,3,3,3,3,0,0,0,
            0,0,3,2,2,2,2,2,3,3,3,0,
            0,3,3,4,3,3,3,2,2,2,3,0,
            0,3,2,2,2,4,2,2,4,2,3,0,
            0,3,2,1,1,3,2,4,2,3,3,0,
            0,3,3,1,1,3,2,2,2,3,0,0,
            0,0,3,3,3,3,3,3,3,3,0,0
        ],
        [
            0,0,0,0,3,3,3,3,0,0,0,0,
            0,0,0,3,3,2,2,3,0,0,0,0,
            0,0,0,3,2,2,4,3,0,0,0,0,
            0,0,0,3,3,2,2,3,3,0,0,0,
            0,0,0,3,3,4,4,2,3,0,0,0,
            0,0,0,3,1,4,2,2,3,0,0,0,
            0,0,0,3,1,1,2,1,3,0,0,0,
            0,0,0,3,3,3,3,3,3,0,0,0
        ],
        [
            0,0,0,3,3,3,3,3,0,0,0,0,
            0,0,0,3,2,2,3,3,3,0,0,0,
            0,0,0,3,2,4,2,2,3,0,0,0,
            0,0,3,3,3,2,3,2,3,3,0,0,
            0,0,3,1,3,2,3,2,2,3,0,0,
            0,0,3,1,4,2,2,3,2,3,0,0,
            0,0,3,1,2,2,2,4,2,3,0,0,
            0,0,3,3,3,3,3,3,3,3,0,0
        ],
        [
            0,0,0,0,3,3,3,3,3,3,3,0,
            0,0,0,3,3,2,2,3,2,2,3,0,
            0,0,0,3,2,2,2,3,2,2,3,0,
            0,0,0,3,4,2,4,2,4,2,3,0,
            0,0,0,3,2,4,3,3,2,2,3,0,
            0,3,3,3,2,4,2,3,2,3,3,0,
            0,3,1,1,1,1,1,2,2,3,0,0,
            0,3,3,3,3,3,3,3,3,3,0,0
        ],
        [
            0,0,0,0,3,3,3,3,3,3,0,0,
            0,0,3,3,3,2,2,2,2,3,0,0,
            0,3,3,1,2,4,3,3,2,3,3,0,
            0,3,1,1,4,2,4,2,2,2,3,0,
            0,3,1,1,2,4,2,4,2,3,3,0,
            0,3,3,3,3,3,3,2,2,3,0,0,
            0,0,0,0,0,0,3,3,3,3,0,0
        ],
        [
            0,0,3,3,3,3,3,3,3,3,3,0,
            0,0,3,2,2,3,3,2,2,2,3,0,
            0,0,3,2,2,2,4,2,2,2,3,0,
            0,0,3,4,2,3,3,3,2,4,3,0,
            0,0,3,2,3,1,1,1,3,2,3,0,
            0,3,3,2,3,1,1,1,3,2,3,3,
            0,3,2,4,2,2,4,2,2,4,2,3,
            0,3,2,2,2,2,2,3,2,2,2,3,
            0,3,3,3,3,3,3,3,3,3,3,3
        ],
        [
            0,0,0,0,3,3,3,3,3,3,0,0,
            0,0,0,0,3,2,2,2,2,3,0,0,
            0,0,3,3,3,4,4,4,2,3,0,0,
            0,0,3,2,2,4,1,1,2,3,0,0,
            0,0,3,2,4,1,1,1,3,3,0,0,
            0,0,3,3,3,3,2,2,3,0,0,0,
            0,0,0,0,0,3,3,3,3,0,0,0
        ],
        [
            0,0,3,3,3,3,0,0,3,3,3,3,
            3,3,3,2,2,3,0,0,3,2,2,2,
            3,3,2,4,2,3,3,3,3,4,2,2,
            3,3,2,2,4,1,1,1,1,2,4,2,
            3,3,3,2,2,2,2,3,2,2,2,3,
            3,0,3,3,3,3,3,3,3,3,3,3
        ]
    ];

    function Map ( level ) {
        this.level=level;
        this.position=origin[level];  //把玩家位置放入
        this.goal=goal[level]; //目标箱子数放入
    }
    Map.prototype.inite=function () {
        this.position=origin[this.level];  //把玩家位置放入
        this.goal=goal[this.level]; //目标箱子数放入

        var $box=$('.box');
        //清空大盒子
        $box.empty();
        //创建DIV
        for(var i = 0;i<builder[this.level].length;i++){
            $box.append($('<div></div>'));
        }
        //给不同的div加上颜色
        var miniBox=$('.box div');
        var that=this;
        miniBox.each(function(index){ //循环整个div的数量 二维数组里数量不够的 默认为空白
            if(builder[this.level][index]){ //过滤0
                miniBox.eq(index).addClass('type'+builder[this.level][index]);
            }
        }.bind(that));  //需要改变下this的指向
        //初始化玩家的位置
        $(miniBox[origin[this.level]]).addClass('pusher');
    }
    win.Map=Map;
}(window));