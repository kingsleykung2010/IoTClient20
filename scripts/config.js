var blob_storage_url = "https://iotlabstorageblob.blob.core.windows.net";
var register_device_url = "https://iotlabfunction.azurewebsites.net/api/RegisterDevice?code=alstTPLnHnu1ZgBGiABbuUA6WDYlZemgtns9r2dI25aRDqMZMVb2lA==";
var dangerous_level= -300; // Default value

var definedMetaType = {
	"luminance": {
		"acceptableRange": 300,
		"descriptions": `
				<div class="ordinaryTexts">
					目前所接收的的傳輸資料類別為亮度。程式操作在亮度模式中。 
				</div>
				<div class="ordinaryTexts">
					亮度（luminance）是表示人眼对发光体或被照射物体表面的发光或反射光强度实际感受的物理量， 
					亮度和光强这两个量在一般的日常用语中往往被混淆使用。簡而言之，	
					當任兩個物體表面在照相時被拍攝出的最終結果是一樣亮、或被眼睛看起來兩個表面一樣亮，				   
					它們就是亮度相同。
				</div>
				<div class="ordinaryTexts">
					亮度模式當中， 一旦傳輸資料高於300 （連續5 次）便會響起警鈴發出警告。  
				</div>
			`
	},
	"demo": {
		"acceptableRange": -300,
		"descriptions": `
				<div class="ordinaryTexts">
					所傳送資料類別為模擬資料或類別未定義。 因此， 程式進入模擬資料模式。
				</div> 
				<div class="ordinaryTexts">
					該模式中， 傳輸值小於-300時會響起警鈴發出警告。 
				</div>
			`
	}
};
