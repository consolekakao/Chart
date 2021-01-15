//const { default: axios } = require("axios");
let IP = `34.64.145.224`
totalApiCount();
serverrank();
botLog();
botInfo()
async function totalApiCount() {
let labelDate = [];
let totalApiCount = [];
let data = await axios.get(`http://${IP}:3000/totalapicount`);

for(let i=0;i<7;i++) {
    labelDate[i] = (data.data[i].date);
    totalApiCount[i] = (data.data[i].cnt)
}


let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelDate,
            datasets: [{
                label: '일자별 API 요청량',
                data: totalApiCount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 0,
                order:1
            }]
        }
    })
}



async function serverrank() {
    let labelDate = [];
    let totalApiCount = [];
    let data = await axios.get(`http://${IP}:3000/serverrank`);
    
    for(let i=0;i<5;i++) {
        labelDate[i] = decodeURI(data.data[i].servername);
        totalApiCount[i] = (data.data[i].cnt)
    }
    
    
    let ctx = document.getElementById('serverRank').getContext('2d');
        let serverRank = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labelDate,
                datasets: [{
                    label: '서버별 API 요청 현황',
                    data: totalApiCount,
                    backgroundColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                        
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 0
                }]
            }
        });
    }


    async function botLog(){
        let ele = document.getElementById("botLog");
        let data = await axios.get(`http://${IP}:3000/botlog`);
        ele.innerHTML += 
        `
        <center>최근 요청</center>
        <tr class="warning">
        <td >Time</td><td>Server</td><td>Channel</td><td>User</td><td>Command</td><td>Status</td>
        </tr>`
        for(let i=0;i<data.data.length;i++) {
            ele.innerHTML += 
            `<tr>
            <td id="botLogtime">${decodeURI(data.data[i].time)}</td><td>${decodeURI(data.data[i].servername)}</td><td>${decodeURI(data.data[i].channelname)}</td>
            <td>${decodeURI(data.data[i].usernick)}</td><td>${decodeURI(data.data[i].usecommand)}</td><td>${decodeURI(data.data[i].status)}</td>
            </tr>`

        }

    }



    async function botInfo(){
        let ele = document.getElementById("botLog");
        let data = await axios.get(`http://${IP}:3000/botinfo`);
        let info = document.getElementById("info")
        info.innerHTML += `
        <li class="list-group-item">서비스중인 서버<span class="badge">${data.data.servercount} 개</span></li>
        <li class="list-group-item">서비스중인 채널<span class="badge">${data.data.channelcount} 개</span></li>
        <li class="list-group-item">핵쟁이 신고 수<span class="badge">${data.data.hackcount} 건</span></li>
        <li class="list-group-item">저장된 닉네임<span class="badge">${data.data.servercount} 개</span></li>
        <li class="list-group-item">서버 로그<span class="badge">${data.data.servercount} 건</span></li>
        `

    }