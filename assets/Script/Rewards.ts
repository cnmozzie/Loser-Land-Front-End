const {ccclass, property} = cc._decorator;

@ccclass
export default class Rewards extends cc.Component {
	
	currentSeason: number = 1;
	
	@property(cc.Label)
    rewardLabel: cc.Label = null;
	
	@property(cc.Button)
    claimButton: cc.Button = null;
	
	@property(cc.Button)
    rewardButton: cc.Button = null;
	
	claimAP (e, msg) {
	  cc.sys.localStorage.setItem('gift-package', 1);
	  this.welcome.okt += 100
	  this.welcome.setBalanceLabel()
	  this.claimButton.interactable = false
	  let xhr = new XMLHttpRequest();
	  let url = "https://losernft.org/register?address=" + this.welcome.address
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
          var response = xhr.responseText;
          console.log(response);
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    },
	
	claimLowb (e, msg) {
		this.welcome.claimRewards()
		this.rewardButton.interactable = false
    },
	
	setLabel (lowb, umg) {
		const lang = cc.sys.localStorage.getItem('lang')
		if (lang === 'zh') {
			this.rewardLabel.string = `${lowb} lowb \n${umg} UMG`
		}
		else {
			this.rewardLabel.string = `${lowb} lowb \n${umg} UMG`
		}
		if (lowb > 0) {
			this.rewardButton.interactable = true
		}
    },
	
	cancle (e, msg) {
        //cc.log('skip');
		this.node.destroy()
    },

	onLoad () {
		this.rewardButton.interactable = false
		const gift = cc.sys.localStorage.getItem('gift-package')
		if (gift == this.currentSeason) {
			this.claimButton.interactable = false
		}
    },

    start () {

    }
}
