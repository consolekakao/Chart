totalApiCount();
serverrank();
async function totalApiCount() {
let labelDate = [];
let totalApiCount = [];
let data = await axios.get("http://127.0.0.1:3000/totalapicount");

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
                label: '총 API 요청량',
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
    let data = await axios.get("http://127.0.0.1:3000/serverrank");
    
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