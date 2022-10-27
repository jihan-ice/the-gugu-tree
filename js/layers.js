addLayer("ice", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "极寒", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() { return {
        unlocked: true, //是否开始就解锁
		points: new ExpantaNum(1),
		ck11: new ExpantaNum(0),
		ck12: new ExpantaNum(0), 
		ck13: new ExpantaNum(0),
    }},
    color: "#87CEFA",
    resource: "极寒", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires:new ExpantaNum(10),
    exponent:0.775,
    baseAmount(){return player.points},//基础资源数量
    baseResource:"咕咕点",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
        if(hasUpgrade('ice', 14)) mult = mult.mul((upgradeEffect('ice', 14)))
        if(hasUpgrade('ice', 15)) mult = mult.mul((upgradeEffect('ice', 15)))
        mult = mult.mul(layers.fall.clickables[11].gain())
        if(mult>1e10) mult = ((mult.sub(1e10)).pow(0.8)).add(1e10)
        if(mult>1e11) mult = ((mult.sub(1e11)).pow(0.8)).add(1e11)
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        exp = exp.mul(layers.ice.clickables[11].gain())
        return exp
    }, 
    upgrades: {
        11: {
            description: "让极寒开始工作<br>每秒生产1咕咕点",
            cost: new OmegaNum(1),
          },
        12: {
            description: "让极寒开始合作<br>极寒加成咕咕点",
            unlocked(){return hasUpgrade(this.layer,11)},
			effect() {
                return player[this.layer].points.add(2).pow(0.4)
            },
            effectDisplay(){ return format(upgradeEffect(this.layer,this.id))+"×" },
            cost: new OmegaNum(1),
          },
        13: {
            description: "事实证明，咕咕只有1次和无数次<br>咕咕点加成咕咕点",
            unlocked(){return hasUpgrade(this.layer,12)},
			effect() {
                return player.points.add(2).pow(0.3)
            },
            effectDisplay(){ return format(upgradeEffect(this.layer,this.id))+"×" },
            cost: new OmegaNum(10),
          },
        14: {
            description: "生物之源<br>咕咕点加成极寒",
            unlocked(){return hasUpgrade(this.layer,13)},
			effect() {
                return player.points.add(2).pow(0.2)
            },
            effectDisplay(){ return format(upgradeEffect(this.layer,this.id))+"×" },
            cost: new OmegaNum(50),
          },
        15: {
            description: "自我增殖<br>极寒加成极寒",
            unlocked(){return hasUpgrade(this.layer,14)},
			effect() {
                return player[this.layer].points.add(2).pow(0.2)
            },
            effectDisplay(){ return format(upgradeEffect(this.layer,this.id))+"×" },
            cost: new OmegaNum(1000),
          },
        21: {
            description: "爆炸增殖<br>极寒加成咕咕点获取",
            unlocked(){return hasUpgrade(this.layer,15)},
			effect() {
				var a = new ExpantaNum(0)
				a = a.add(player.ice.points.add(1).log(50).pow(0.2))
                if(a>2) a = a.sub(2).pow(0.2).add(2)
                if(a>5) a = a.sub(5).pow(0.2).add(5)
                if(a>10) return 10
                else return a
            },
            effectDisplay(){ return "^"+format(upgradeEffect(this.layer,this.id))},
            cost: new OmegaNum(1e30),
          },
        22: {
            description: "下一人<br>解锁只秋层级",
            unlocked(){return hasUpgrade(this.layer,21)},
            cost: new OmegaNum(1e100),
           },
        23: {
            description: "合作地图<br>极寒加成只秋获取",
            unlocked(){return hasUpgrade(this.layer,22)},
			effect() {
                return player[this.layer].points.add(2).log(50).add(1).pow(0.1)
            },
            effectDisplay(){ return format(upgradeEffect(this.layer,this.id))+"×" },
            cost: new OmegaNum(1e205),
          },
    },
    clickables:{
		11:{
			title(){return "<h2>普通的冰块</h2><br>等级:"+format(player[this.layer].ck11,0)+"/15<br>将你的极寒获取^"+format(this.gain(),2)+"<br>消耗:"+format(this.cost(),2)+"极寒"},
			canClick(){return player[this.layer].ck11.lt(15)&&player[this.layer].points.gte(this.cost())},
			unlocked(){return hasUpgrade("ice",15)},
			style(){
                if(layers[this.layer].clickables["11"].canClick())
               return {"border-radius":"0px","width":"150px","height":"125px","min-height":"150px","transition-duration":"0.5s","background-color":"#6495ED",}
               return {"border-radius":"0px","width":"150px","height":"125px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
			gain(){
                var gain = new OmegaNum(1)
                gain=gain.add(player[this.layer].ck11.mul(0.05))
                return gain
            },
            cost(){
                var cost = new OmegaNum(3000)
                cost=cost.mul(new OmegaNum(15).pow(player[this.layer].ck11))
                return cost
			},
			onClick(){
            player[this.layer].points=player[this.layer].points.sub(this.cost())
            player[this.layer].ck11=player[this.layer].ck11.add(1)
           },
		},
		12:{
			title(){return "<h2>稀有的冰块</h2><br>等级:"+format(player[this.layer].ck12,0)+"/5<br>每秒获取重置时"+format(this.gain(),2)+"%的极寒<br>消耗:"+format(this.cost(),2)+"极寒"},
			canClick(){return player[this.layer].ck12.lt(5)&&player[this.layer].points.gte(this.cost())},
			unlocked(){return hasUpgrade("ice",15)},
			style(){
                if(layers[this.layer].clickables["12"].canClick())
               return {"border-radius":"0px","width":"150px","height":"125px","min-height":"150px","transition-duration":"0.5s","background-color":"#6495ED",}
               return {"border-radius":"0px","width":"150px","height":"125px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
			gain(){
                var gain = new OmegaNum(0)
                gain=gain.add(player[this.layer].ck12.mul(1))
                return gain
            },
            cost(){
                var cost = new OmegaNum(100000)
                cost=cost.mul(new OmegaNum(400).pow(player[this.layer].ck12))
                return cost
			},
			onClick(){
            player[this.layer].points=player[this.layer].points.sub(this.cost())
            player[this.layer].ck12=player[this.layer].ck12.add(1)
            },
	    },
	    13:{
			title(){return "<h2>知秋的冰块</h2><br>等级:"+format(player[this.layer].ck13,0)+"/99<br>只秋收益*"+format(this.gain(),2)+"<br>消耗:"+format(this.cost(),2)+"极寒"},
			canClick(){return player[this.layer].ck13.lt(99)&&player[this.layer].points.gte(this.cost())},
			unlocked(){return hasUpgrade("ice",23)},
			style(){
                if(layers[this.layer].clickables["13"].canClick())
               return {"border-radius":"0px","width":"150px","height":"125px","min-height":"150px","transition-duration":"0.5s","background-color":"#6495ED",}
               return {"border-radius":"0px","width":"150px","height":"125px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
			gain(){
                var gain = new OmegaNum(1)
                gain=gain.add(player[this.layer].ck13.mul(0.5))
                return gain
            },
            cost(){
                var cost = new OmegaNum(1e200)
                cost=cost.mul(new OmegaNum(1e10).pow(player[this.layer].ck13))
                return cost
			},
			onClick(){
            player[this.layer].points=player[this.layer].points.sub(this.cost())
            player[this.layer].ck13=player[this.layer].ck13.add(1)
            },
	    },
	},
	tabFormat: {
	主页面: {
            buttonStyle() {return  {'color': 'write'}},
            content:[
			"main-display","prestige-button","resource-display",
			["row", [ ["upgrade", 11],["upgrade",12],["upgrade",13],["upgrade",14],["upgrade",15] ] ] ,
			["row", [ ["upgrade", 21],["upgrade",22],["upgrade",23] ] ] ,
			],
		},
 	冰块: {
 			unlocked(){return hasUpgrade("ice",15)},
            buttonStyle() {return  {'color': 'write'}},
            content:[
            "main-display",
			["row", [ ["clickable", 11],["clickable", 12],["clickable", 13] ] ] ,
			],
		},
	},	
	row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown(){return true},
    passiveGeneration(){
		var a = new ExpantaNum(0)
	        if(hasUpgrade('ice', 15)) a = a.add((layers.ice.clickables[12].gain()).div(100))
		return a
	}			
})

addLayer("fall", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "只秋", // 这是节点上显示的字母
    position: 1, // 节点顺序
    unlocked(){return hasUpgrade("ice",22)},
    startData() { return {
        unlocked: false, //是否开始就解锁
		points: new ExpantaNum(0),
		ck11: new ExpantaNum(0),
		ck12: new ExpantaNum(0),
		ck21: new ExpantaNum(0),
    }},
    color: "orange",
    resource: "只秋", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires:new ExpantaNum(1e200),
    exponent:0.1,
    baseAmount(){return player.ice.points},//基础资源数量
    baseResource:"极寒",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
        if(hasUpgrade('fall', 12)) mult = mult.mul((upgradeEffect('fall', 12)))
        if(hasUpgrade('ice', 23)) mult = mult.mul((upgradeEffect('ice', 23)))
        mult = mult.mul(layers.ice.clickables[13].gain())
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown(){return true},
    upgrades:{
    	11: {
    		description: "让只秋帮助极寒<br>只秋加成咕咕点",
			effect() {
            	return player[this.layer].points.add(2).pow(0.4)
           	},
            effectDisplay(){ return format(upgradeEffect(this.layer,this.id))+"×" },
            cost: new OmegaNum(1),
          	},
        12: {
    		description: "咕咕秋<br>咕咕点加成只秋",
			effect() {
            	return player.points.add(1).log(10).add(1).pow(0.25)
           	},
            effectDisplay(){ return format(upgradeEffect(this.layer,this.id))+"×" },
            cost: new OmegaNum(5),
          	},
        13: {
    		description: "网易封禁只秋<br>只秋开始催促极寒咕咕",
			effect() {
            	return player.fall.points.add(1).log(5).add(1).pow(0.8)
           	},
            effectDisplay(){ return format(upgradeEffect(this.layer,this.id))+"×" },
            cost: new OmegaNum(25),
          	},
    },
    clickables:{
		11:{
			title(){return "<h2>砖家1</h2><br>更新次数:"+format(player[this.layer].ck11,0)+"<br>将你的极寒获取*"+format(this.gain(),2)+"<br>消耗:"+format(this.cost(),2)+"只秋"},
			canClick(){return player[this.layer].points.gte(this.cost())},
			unlocked(){return hasUpgrade("fall",11)},
			style(){
                if(layers[this.layer].clickables["11"].canClick())
               return {"border-radius":"0px","width":"225px","height":"125px","min-height":"150px","transition-duration":"0.5s","background-color":"orange",}
               return {"border-radius":"0px","width":"225px","height":"125px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
			gain(){
                var gain = new OmegaNum(1)
                gain=gain.add(player[this.layer].ck11.mul(0.5))
                return gain
            },
            cost(){
                var cost = new OmegaNum(1)
                return cost
			},
			onClick(){
            player[this.layer].points=player[this.layer].points.sub(this.cost())
            player[this.layer].ck11=player[this.layer].ck11.add(1)
           },
		},
		12:{
			title(){return "<h2>砖家2</h2><br>更新次数:"+format(player[this.layer].ck12,0)+"<br>将你的咕咕点获取*"+format(this.gain(),2)+"<br>消耗:"+format(this.cost(),2)+"只秋"},
			canClick(){return player[this.layer].points.gte(this.cost())},
			unlocked(){return hasUpgrade("fall",11)},
			style(){
                if(layers[this.layer].clickables["12"].canClick())
               return {"border-radius":"0px","width":"225px","height":"125px","min-height":"150px","transition-duration":"0.5s","background-color":"orange",}
               return {"border-radius":"0px","width":"225px","height":"125px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
			gain(){
                var gain = new OmegaNum(1)
                gain=gain.add(player[this.layer].ck12.mul(2))
                return gain
            },
            cost(){
                var cost = new OmegaNum(1)
                return cost
			},
			onClick(){
            player[this.layer].points=player[this.layer].points.sub(this.cost())
            player[this.layer].ck12=player[this.layer].ck12.add(1)
           },
		},
		21:{
			title(){return "<h2>宇宙重启</h2><br>更新次数:"+format(player[this.layer].ck21,0)+"<br>将你的咕咕点获取*"+format(this.gain(),2)+"<br>消耗:"+format(this.cost(),2)+"只秋"},
			canClick(){return player[this.layer].points.gte(this.cost())},
			unlocked(){return hasUpgrade("fall",13)},
			style(){
                if(layers[this.layer].clickables["21"].canClick())
               return {"border-radius":"0px","width":"225px","height":"125px","min-height":"150px","transition-duration":"0.5s","background-color":"orange",}
               return {"border-radius":"0px","width":"225px","height":"125px","min-height":"150px","transition-duration":"0.5s","background-color":"grey",}},
			gain(){
                var gain = new OmegaNum(1)
                gain=gain.add(player[this.layer].ck21.mul(4))
                return gain
            },
            cost(){
                var cost = new OmegaNum(5)
                return cost
			},
			onClick(){
            player[this.layer].points=player[this.layer].points.sub(this.cost())
            player[this.layer].ck21=player[this.layer].ck21.add(1)
           },
		},
	},
    tabFormat: {
 	主界面: {
            buttonStyle() {return  {'color': 'write'}},
            content:[
			"main-display","prestige-button","resource-display",
			["row", [ ["upgrade", 11],["upgrade", 12],,["upgrade", 13] ] ] ,
			],
		},
	作图: {
            buttonStyle() {return  {'color': 'write'}},
            content:[
			["row", [ ["clickable", 11],["clickable",12] ] ] ,
			["row", [ ["clickable", 21] ] ] ,
			],
		},
	},				
})

addLayer("hua", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "华", // 这是节点上显示的字母
    position: 1, // 节点顺序
    unlocked(){return hasUpgrade("ice",22)},
    startData() { return {
        unlocked: false, //是否开始就解锁
		points: new ExpantaNum(0),
    }},
    color: "#F2F2F2",
    resource: "华", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires:new ExpantaNum(1e10000),
    exponent:0.01,
    baseAmount(){return player.ice.points},//基础资源数量
    baseResource:"极寒",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown(){return true},
})