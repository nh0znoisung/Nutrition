const readXlsxFile = require('read-excel-file/node');

export async function crawlData(file, sheet) {
    try{
        const data = await readXlsxFile(file, { sheet: sheet })
        let arr = []
        for (let i = 1; i < data.length; i++) {
            let ele = {
                "id": data[i][0],
                "name": data[i][1],
                "Dv": data[i][2], //đơn vị
                "DCNN": data[i][3],
                "Min": data[i][4],
                "Max": data[i][5],
                "Sang": data[i][6],
                "Giuasang": data[i][7],
                "Trua": data[i][8],
                "Chieu": data[i][9],
                "Toi": data[i][10],
                "Dem": data[i][11],
                "NL": data[i][12],
                "Pro": data[i][13],
                "Protv": data[i][14],
                "Lip": data[i][15],
                "Liptv": data[i][16],
                "Cell": data[i][17],
                "Cho": data[i][18]
            }
            arr.push(ele);
        }
        return arr;    
    }catch(err){
        console.log(err)
    }
}