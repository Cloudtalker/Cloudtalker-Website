class Cloudtalker {
    constructor (runtime, extensionId) {
		this.date = null;
    }
    getInfo () {
        return {
            "id": 'cloudtalker',
            "name": 'Cloudtalker',
            "blocks": [
				{
                	"opcode": 'convertEpoch',
                    "blockType": Scratch.BlockType.REPORTER,
                    "text": 'Convert epoch to local time [epoch]',
					"arguments": {
						"epoch": {
							"type": Scratch.ArgumentType.NUMBER,
							"defaultValue": 0,
						},
					}
                },
                {
                	"opcode": 'getTrust',
                    "blockType": Scratch.BlockType.REPORTER,
                    "text": 'Get trust key',
					"arguments": {}
                },
                {
                	"opcode": 'getUsernameByID',
                    "blockType": Scratch.BlockType.REPORTER,
                    "text": 'Get username by ID [uid]',
					"arguments": {
						"uid": {
							"type": Scratch.ArgumentType.STRING,
							"defaultValue": "abc-123",
						},
					}
                }
			]
        };
    };
	
	convertEpoch({epoch}) {
        this.date = new Date(epoch*1000);
        return JSON.stringify({y: this.date.getFullYear(), m: (this.date.getMonth()+1), d: this.date.getDate(), h: this.date.getHours(), mn: this.date.getMinutes(), s: this.date.getSeconds()});
	};
    getTrust() {
        return fetch("https://api.cloudtalker.net/trust").then(response => response.text())
    };
    getUsernameByID({uid}) {
        return fetch(`https://api.cloudtalker.net/username/${uid}`).then(response => response.text())
    };
};

(function() {
    var extensionClass = Cloudtalker;
    if (typeof window === "undefined" || !window.vm) {
        Scratch.extensions.register(new extensionClass());
    } else {
        var extensionInstance = new extensionClass(window.vm.extensionManager.runtime);
        var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance);
        window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName);
    };
})()
