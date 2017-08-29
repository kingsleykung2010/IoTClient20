<!DOCTYPE html>
<html>
<head>
	<title>物聯網專案</title>
	<meta charset="utf-8">
	<link rel="stylesheet" href="styles/style.css">
	<script src="scripts/config.js"></script>
	<script src="scripts/utils.js"></script>
	<script src="scripts/plot-graph.js"></script>
	<script src="scripts/audio.js"></script>
	<script src="scripts/hist.js"></script>
	<script src="scripts/callbacks.js"></script>
	<script src="scripts/main.js"></script>
</head>
<body>

<?php

	if (isset($_GET['data'])) {
		// If the parameter data is set true:
		// Display the streaming data content
		?>
		<nav id="sidebar">
		<h1>智域國際</h1>

		<div id="devList">
			<a href="./index.php" title="classrooms" onclick="hideSidebar();">教室列表</a>
			<a href="#metaTypeDescriptions" title="meta type descriptions" onclick="hideSidebar();">數據類別</a>
			<a href="#streamingData" title="streaming data" onclick="hideSidebar();">接收資料</a>
			<a href="#simpleStats" title="histogram" onclick="hideSidebar();">基本統計</a>
			<a href="#metaData" title="meta data" onclick="hideSidebar();">元數據</a>
		</div>
		</nav>

		<div id="header">
			<a id="headerButton" href="javascript:void(0)" onclick="revealSidebar()">☰</a>
			<span id="headerText">智域國際</span>
		</div>

		<div id="content" onclick="hideSidebar()">
			<h1 class="title">
				<img src="images/header.png" alt="物聯網專案">
			</h1>
			
			<h2 class="title" id="metaTypeDescriptions">數據類別</h2>
			<hr align="left">
			
			<div id="metaType">
			</div>

			<h2 id="streamingData" class="title">接收資料</h2>
			<hr align="left">

			<div class="backFrame">
				<canvas id="myCanvas" width="640" height="320"></canvas>
			</div>

			<h2 id="simpleStats" class="title">基本統計</h2>
			<hr align="left">

			<div class="table">
			<div class="row">
				<div id="statLeftFrame" class="col">
					<div id="histTitle">直方圖</div>
					<canvas id="histCanvas" width="640" height="320"></canvas>
				</div>
				<div id="statRightFrame" class="col">
					<div id="minimum">
						<div id="minValue"></div>
						<div>最小值</div>
					</div>
					<div id="maximum">
						<div id="maxValue"></div>
						<div>最大值</div>
					</div>
					<div id="average">
						<div id="meanValue"></div>
						<div>平均值</div>
					</div>
				</div>
			</div>
			</div>

			<h2 id="metaData" class="title">元數據</h2>
			<hr align="left">

			<div class="table">
				<div class="row">
					<div id="currentTime" class="col">
						<div id="clockFrame">
							<canvas id="clockCanvas" width="300" height="300">
							</canvas>
						</div>
					</div>
					<div id="others" class="col">
						<div class="console">
							<div>
								目前接收值:
								<span id="currentRxValue"></span>
							</div>
							<div>
								傳送儀器:
								<span id="sendingDevId"></span>
							</div>
							<div>
								封包編號:
								<span id="sendingDevSeq"></span>
							</div>
							<div>
								遺失封包:
								<span id="lostPackets"></span>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div id="timeStampsCollection" class="col">

						<h3 id="timeStampTitle">時間戳</h3>
						<div id="timeStampBoard">
							<div class="timeStamps">
								封包發送時間: 
								<span id="timeSent">
									西元 <span id="sentYear"></span> 年
									<span id="sentMonth"></span> 月
									<span id="sentDay"></span> 日
									<span id="sentHour"></span> 時
									<span id="sentMinute"></span> 分
									<span id="sentSecond"></span> 秒
								</span>
							</div>
							<div class="timeStamps">
								封包接收時間: 
								<span id="timeReceived">
									西元 <span id="receivedYear"></span> 年
									<span id="receivedMonth"></span> 月
									<span id="receivedDay"></span> 日
									<span id="receivedHour"></span> 時
									<span id="receivedMinute"></span> 分
									<span id="receivedSecond"></span> 秒
								</span>
							</div>
							<div class="timeStamps">
								封包顯示時間: 
								<span id="timeDisplayed">
									西元 <span id="displayedYear"></span> 年
									<span id="displayedMonth"></span> 月
									<span id="displayedDay"></span> 日
									<span id="displayedHour"></span> 時
									<span id="displayedMinute"></span> 分
									<span id="displayedSecond"></span> 秒
								</span>
							</div>
						</div>
					</div>

					<div id="totDelayCol" class="col">
						<h3 id="totDelayTitle">封包延遲</h3>
						<div id="delay">
							<div id="delayInnerBoard">
								<div id="delayNo">
									<div id="delayMS"></div> 
									<div id="delayUnit">毫秒</div>
								</div>
								<div id="smallDelayTitle">總延遲</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="myMeta">
			<img id="myClock" src="images/clock.png" alt="clock">
		</div>
		
		<?php
	} else if (isset($_GET["reg"])) {
		?>
		<link rel="stylesheet" href="styles/reg-style.css">
		<nav id="sidebar">
			<h1>智域國際</h1>
			<div id="devList">
				<a href="./index.php" title="home" onclick="hideSidebar();">首頁</a>
			</div>
		</nav>
	
		<div id="header">
			<a id="headerButton" href="javascript:void(0)" onclick="revealSidebar()">☰</a>
			<span id="headerText">智域國際</span>
		</div>
	
		<div id="content" onclick="hideSidebar()">
			<h1 class="title">
				<img src="images/header.png" alt="物聯網專案">
			</h1>

			<h2 class="title">註冊儀器</h2>
			<hr align="left">
			
			<form id="registrationForm" action="https://iotlabfunction.azurewebsites.net/api/RegisterDevice" onsubmit="return DoSubmit()">
			
			<table>
				<!--A List of Hidden Fields-->
				<input type="hidden" id="hiddenFields" name="code" value="alstTPLnHnu1ZgBGiABbuUA6WDYlZemgtns9r2dI25aRDqMZMVb2lA==">
				<input type="hidden" id="registeredName" name="name">
						
				<tr>
					<td>
						<label for="formclassname">Class Name: </label>
					</td>
					<td>
						<input type="text" id="formclassname" name="classname">
						<span id="formclassnamelog"></span>
					</td>
				</tr>
				<tr>
					<td>
						<label for="formdevname">Device Name: </label>
					</td>
					<td>
						<input type="text" id="formdevname" name="devname">
						<span id="formdevnamelog"></span>
					</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td></td>
					<td>
						<input type="submit" value="Submit">
					</td>
				</tr>
			
			</table>	
			
			</form>

			<div id="footer">
				powered by Kung Chu King.
			</div>
		</div>
		
		<?php
	} else {
		// If the parameter data is not set:
		// Display a list of classrooms
		?>
		<nav id="sidebar">
			<h1>智域國際</h1>

			<div id="devList"></div>
		</nav>
		<!--script src="https://iotlabstorageblob.blob.core.windows.net/fp-container/device-list.json"></script	-->
	
		<div id="header">
			<a id="headerButton" href="javascript:void(0)" onclick="revealSidebar()">☰</a>
			<span id="headerText">智域國際</span>
		</div>
	
		<div id="content" onclick="hideSidebar()">
			<h1 class="title">
				<img src="images/header.png" alt="物聯網專案">
			</h1>

			<h2 class="title">基本介紹</h2>
			<hr align="left">

			<div class="ordinaryTexts">
				該頁面為此次物聯網專案的首頁。從該頁面，可以將使用者導覽到各自班級底下，各自的儀器顯示頁面。
				左邊的欄位顯示的是所有註冊儀器所對應的班級名稱。點選班級名稱之後，在底下的
				<a href="#devicesOnline" title="Devices Online">上線儀器列表</a>
				欄位之中，可以看見所有註冊在同樣班級底下的儀器名稱。點擊所顯示的儀器或儀器名稱，便可以將頁面導入到被
				點擊儀器的呈現頁面。
			</div>
			
			<div class="ordinaryTexts">
				該網頁的預設班級為一個叫做 Sample Class 的班級。該班級底下有數個本機模擬出來的儀器。
				這些儀器， 包括 Sample Class 本身都是內建在網頁的一部分， 無法被移除。 這些儀器的存在
				僅僅是供示範使用， 並不代表任何的實體裝置。 
			</div>

			<div class="ordinaryTexts">
				底下顯示，目前<a href="#devicesOnline" title="Devices Online">上線儀器列表</a>中所顯示的儀器所屬的班級
				代碼，該班級的上線儀器數量，以及目前註冊的班級數目:
			</div>

			<div class="table">
				<div id="summaryOfDevices" class="row">
					<div id="currentClassInfo" class="col">
						<div>班級:</div>
						<div id="className"></div>
					</div>

					<div id="currentDevicesCount" class="col">
						<div>儀器數:</div>
						<div id="devicesValue"></div>
					</div>

					<div id="currentClassesCount" class="col">
						<div>班級數:</div>
						<div id="classesValue"></div>
					</div>
				</div>
			</div>
	
			<h2 id="devicesOnline" class="title">上線儀器列表</h2>
			<hr align="left">

			<div id="classDevices">
				<ul id="devNameList"></ul>
			</div>
			
			<h2 class="title">註冊</h2>
			<hr align="left">
			
			<div id="registerDevice">
				<ul>
					<li><a href="./index.php?reg=true">點擊這裡註冊</a></li>
				<ul>
			</div>

			<div id="footer">
				powered by Kung Chu King.
			</div>
		</div>
		<?php
	}
?>
 
</body>
</html>
