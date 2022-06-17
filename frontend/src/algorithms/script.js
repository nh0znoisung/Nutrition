import solver from "@uandi/javascript-lp-solver/src/solver";
// import * as fs from 'fs';

// W = 70; //weight
// H = 180; //height
// A = 22; //age
// // sigma = 24h
// a = 12; // nghỉ
// b = 8;  // rất nhẹ
// c = 4;  // nhẹ
// d = 0;  //vừa
// e = 0;  //nặng
// gender = 0; 


function getNL(X_, BMI){
    let a = Math.floor(X_/300);
    let b = X_%300;
    if (b === 0) return X_;
    if(BMI >= 18.5 && BMI <= 24.9){
        if(b >= 150){
            return a*300 + 300;
        }else{
            return a*300;
        }
    }else if(BMI < 18.5){
        return a*300;
    }else{
        return a*300 + 300;
    }
}

function genArray(n, arr){
    // arr: array dependency
    let res = [[]]
    for(let i = 0; i<n; i++){
        if(arr[i] != null){
            let arr1 = res.map(x => [...x,1])
            let arr2 = res.map(x => [...x,-1])
            res = [...arr1, ...arr2]
        }else{
            res = res.map(x => [...x,0])
        }
    }
    return res
}




export const solution = async (W, H, A, a, b, c, d, e, gender, inputData) => {
    var X = 0
    if(gender === 0){ // male
        X = 66.47 + 13.75*W + 5*H -6.75*A;
    }
    else{  // female
        X = 665.09 + 9.56*W + 1.85*H -4.67*A;
    }
    
    var X_ = 0.1*X + (a + 1.5*b + 2.5*c + 5*d + 7*e)*X/24;
    
    var BMI = W / (H*H/10000);
    
    console.log(W, H, A, a, b, c, d, e, gender, inputData, X, X_, BMI)

    
    // By day => meal
    var targetNL = getNL(X_, BMI);
    
    
    var targetPro = (0.2*X_)/4;
    var targetProtv = targetPro*0.35;
    var targetLip = (0.25*X_)/9;
    var targetLiptv = 0.5*targetLip;
    var targetCell = 30; //min= 19
    var targetCho = 150;
    
    
    const ratio = [1,30,70,20,35,180,8] // hệ số từng chỉ tiêu
    
    // Xét 1 bữa: NL: 90-110%
    async function solve_meal(data, meal, target, range){
        console.log("Solve meal");
        var chinh = {}, kem = {}, tm = {}, rau = {};
    
        var final_result = null;
        while(final_result == null){
    
            //rand: chính
            var arr_chinh = data.filter(function(value, index, arr){ 
                return value[meal] === "Chính";
            });
            chinh = arr_chinh[Math.floor(Math.random() * arr_chinh.length)];
    
            if (['Sang','Trua','Toi'].includes(meal)){
                //rand: kèm
                var arr_kem = data.filter(function(value, index, arr){ 
                    return value[meal] === "Kèm";
                });
                kem = arr_kem[Math.floor(Math.random() * arr_kem.length)];
            }
    
            if (['Sang','Trua','Toi'].includes(meal)){
                //rand: TM
                var arr_tm = data.filter(function(value, index, arr){ 
                    return value[meal] === "Tráng miệng";
                });
                tm = arr_tm[Math.floor(Math.random() * arr_tm.length)];    
            }
    
            if (['Trua','Toi'].includes(meal)){
                //rand: rau
                var arr_rau = data.filter(function(value, index, arr){ 
                    return value[meal] === "Rau";
                });
                rau = arr_rau[Math.floor(Math.random() * arr_rau.length)];
            }
    
            if(chinh.id !== undefined){
                chinh.one = 1;
            }
            if(kem.id !== undefined){
                kem.two = 1;
            }
            if(tm.id !== undefined){
                tm.three = 1;
            }
            if(rau.id !== undefined){
                rau.four = 1;
            }
    
            let ints = {
                "1": 1,
                "2": 1,
                "3": 1,
                "4": 1,
            }
    
            let coff = genArray(7,target)
            
            // Khai mở Abs
            for (let i = 0; i < coff.length; i++) {
                if(chinh.id !== undefined){
                    chinh.Profit = 0;
                    for(let j = 0; j< attr.length; j++){
                        if(target[j] != null){
                            chinh.Profit += chinh[attr[j]] * coff[i][j] * ratio[j];
                        }
                    }
                }
                if(kem.id !== undefined){
                    kem.Profit = 0;
                    for(let j = 0; j< attr.length; j++){
                        if(target[j] != null){
                            kem.Profit += kem[attr[j]] * coff[i][j] * ratio[j];
                        }
                    }
                }
                if(tm.id !== undefined){
                    tm.Profit = 0;
                    for(let j = 0; j< attr.length; j++){
                        if(target[j] != null){
                            tm.Profit += tm[attr[j]] * coff[i][j] * ratio[j];
                        }
                    }
                }
                if(rau.id !== undefined){
                    rau.Profit = 0;
                    for(let j = 0; j< attr.length; j++){
                        if(target[j] != null){
                            rau.Profit += rau[attr[j]] * coff[i][j] * ratio[j];
                        }
                    }
                }
    
            
                var constraints = {
                    'NL': {}, 
                    'Pro': {},
                    'Protv': {}, 
                    'Lip': {}, 
                    'Liptv': {}, 
                    'Cell': {}, 
                    'Cho': {}
                }
                if(chinh.id !== undefined){
                    constraints.one = {"max": chinh.Max, "min": chinh.Min}
                }
                if(kem.id !== undefined){
                    constraints.two = {"max": kem.Max, "min": kem.Min}
                }
                if(tm.id !== undefined){
                    constraints.three = {"max": tm.Max, "min": tm.Min}
                }
                if(rau.id !== undefined){
                    constraints.four = {"max": rau.Max, "min": rau.Min}
                }
    
                for(let j = 0; j < target.length; j++){
                    if(target[j] != null){
                        constraints[attr[j]] = {"max": range[j][0], "min": range[j][1]}
                        if(coff[i][j] === 1){
                            constraints[attr[j]].min = target[j];
                        }else{
                            constraints[attr[j]].max = target[j];
                        }
                    }
                }
                
                let variables =  {
                    "1": chinh,
                    "2": kem,
                    "3": tm,
                    "4": rau
                }
    
                let loss = 0;
                for(let j = 0; j< attr.length; j++){
                    if(target[j] != null){
                        loss -= target[j] * coff[i][j] * ratio[j];
                    }
                }
            
                let model = {
                    "optimize": "Profit",
                    "opType": "min",
                    "constraints": constraints,
                    "variables": variables,
                    "ints": ints
                };
                var results = solver.Solve(model);
                if(results.feasible === false) continue;
                console.log(results)
    
                results.result += loss;
    
                if(final_result === null){
                    final_result = results;
                }else{
                    if(final_result.result > results.result){
                        final_result = results;
                    }
                }
            }
        }
        console.log(final_result);
        
        let final_data = {
            monan: [chinh,kem,tm,rau],
            soluong: [],
            value: {
                loss: final_result.result,
                NL: 0,
                Pro: 0,
                Protv: 0,
                Lip: 0,
                Liptv: 0,
                Cell: 0,
                Cho: 0
            }
    
        }
        let n = final_data.monan.length;
    
        for(let i of ['1','2','3','4']){
            if(final_result[i] !== undefined){
                final_data.soluong.push(final_result[i]);
            }else{
                final_data.soluong.push(0);
            }
        }
        
        for(let j = 0; j < n; j++){
            if(final_data.monan[j].id !== undefined){
                for(let i of attr){
                    final_data.value[i] += final_data.monan[j][i] * final_data.soluong[j];
                }
            }
        }
        return final_data;
    }
    
    const ratio_meal = [0.2, 0.1, 0.2, 0.1, 0.3, 0.1]
    
    async function solve_day(data, target, range){
        console.log("Solve day");
        let arr = [];
        for(let i of [0,2,4]){
            arr[i] = await solve_meal(data, meal_arr[i], target.map((x) => x* ratio_meal[i]), range.map((x) => x.map((y) => y*ratio_meal[i])));
        }
        arr[1] = await solve_meal(data, 'Giuasang', [0.1*targetNL, null, null, null, null, null, null], [[1.1 * 0.1*targetNL, 0.9 * 0.1*targetNL], null, null, null, null, null, null]);
        arr[3] = await solve_meal(data, 'Chieu', [0.1*targetNL, null, null, null, null, null, null], [[1.1 * 0.1*targetNL, 0.9 * 0.1*targetNL], null, null, null, null, null, null]);
        arr[5] = await solve_meal(data, 'Dem', [0.1*targetNL, null, null, null, null, null, null], [[1.1 * 0.1*targetNL, 0.9 * 0.1*targetNL], null, null, null, null, null, null]);
    
        let final_data = {
            'Sang': arr[0], 
            'Giuasang': arr[1], 
            'Trua': arr[2], 
            'Chieu': arr[3], 
            'Toi': arr[4], 
            'Dem': arr[5],
            value: {
                NL: 0,
                Pro: 0,
                Protv: 0,
                Lip: 0,
                Liptv: 0,
                Cell: 0,
                Cho: 0
            },
            target: target
        }
    
        for(let i of attr){
            for(let j = 0; j<6; j++){
                final_data.value[i] += arr[j].value[i];
            }
        }
    
        return final_data;
    }
    
    /// ?????
    var aa = 1.1;
    var ba = 0.9;
    async function solve_week(data, target, range){
        var day_1 =  await solve_day(data, 
            [targetNL, targetPro, targetProtv, targetLip, targetLiptv, targetCell, targetCho], 
            [[aa * targetNL, ba * targetNL], [1.1 * targetPro, 0.9 * targetPro],[1.3 * targetProtv, 0.7 * targetProtv],[1.1 * targetLip, 0.9 * targetLip], [1.3 * targetLiptv, 0.7 * targetLiptv]   ,[9999,19],  [1.6 * targetCho, 0* targetCho ]  ]);
    
        console.log("Day 1 !!!")
    
        var day_2 =  await solve_day(data, 
            [targetNL, targetPro, targetProtv, targetLip, targetLiptv, targetCell, targetCho], 
            [[aa * targetNL, ba * targetNL], [1.1 * targetPro, 0.9 * targetPro],[1.3 * targetProtv, 0.7 * targetProtv],[1.1 * targetLip, 0.9 * targetLip], [1.3 * targetLiptv, 0.7 * targetLiptv]   ,[9999,19],  [1.6 * targetCho, 0* targetCho ]  ]);
        console.log("Day 2 !!!")
        
        var day_3 =  await solve_day(data, 
            [targetNL, targetPro, targetProtv, targetLip, targetLiptv, targetCell, targetCho], 
            [[aa * targetNL, ba * targetNL], [1.1 * targetPro, 0.9 * targetPro],[1.3 * targetProtv, 0.7 * targetProtv],[1.1 * targetLip, 0.9 * targetLip], [1.3 * targetLiptv, 0.7 * targetLiptv]   ,[9999,19],  [1.6 * targetCho, 0* targetCho ]  ]);
        console.log("Day 3 !!!")
    
    
        var day_4 =  await solve_day(data, 
            [targetNL, targetPro, targetProtv, targetLip, targetLiptv, targetCell, targetCho], 
            [[aa * targetNL, ba * targetNL], [1.1 * targetPro, 0.9 * targetPro],[1.3 * targetProtv, 0.7 * targetProtv],[1.1 * targetLip, 0.9 * targetLip], [1.3 * targetLiptv, 0.7 * targetLiptv]   ,[9999,19],  [1.6 * targetCho, 0* targetCho ]  ]);
        console.log("Day 4 !!!")
        
        var day_5 =  await solve_day(data, 
            [targetNL, targetPro, targetProtv, targetLip, targetLiptv, targetCell, targetCho], 
            [[aa * targetNL, ba * targetNL], [1.1 * targetPro, 0.9 * targetPro],[1.3 * targetProtv, 0.7 * targetProtv],[1.1 * targetLip, 0.9 * targetLip], [1.3 * targetLiptv, 0.7 * targetLiptv]   ,[9999,19],  [1.6 * targetCho, 0* targetCho ]  ]);
        console.log("Day 5 !!!")
    
        var day_6 =  await solve_day(data, 
            [targetNL, targetPro, targetProtv, targetLip, targetLiptv, targetCell, targetCho], 
            [[aa * targetNL, ba * targetNL], [1.1 * targetPro, 0.9 * targetPro],[1.3 * targetProtv, 0.7 * targetProtv],[1.1 * targetLip, 0.9 * targetLip], [1.3 * targetLiptv, 0.7 * targetLiptv]   ,[9999,19],  [1.6 * targetCho, 0* targetCho ]  ]);
        console.log("Day 6 !!!")
    
        var day_7 =  await solve_day(data, 
            [targetNL, targetPro, targetProtv, targetLip, targetLiptv, targetCell, targetCho], 
            [[aa * targetNL, ba * targetNL], [1.1 * targetPro, 0.9 * targetPro],[1.3 * targetProtv, 0.7 * targetProtv],[1.1 * targetLip, 0.9 * targetLip], [1.3 * targetLiptv, 0.7 * targetLiptv]   ,[9999,19],  [1.6 * targetCho, 0* targetCho ]  ]);
        console.log("Day 7 !!!")
    
        var data_final = {
            'Ngay_1': day_1,
            'Ngay_2': day_2,
            'Ngay_3': day_3,
            'Ngay_4': day_4,
            'Ngay_5': day_5,
            'Ngay_6': day_6,
            'Ngay_7': day_7,
        };
        return data_final;
    }
    

    
    const attr = ['NL', 'Pro', 'Protv', 'Lip', 'Liptv', 'Cell', 'Cho'];
    const meal_arr = ['Sang', 'Giuasang', 'Trua', 'Chieu', 'Toi', 'Dem'];
    

    console.log("Main")
    var start = new Date().getTime();
    
    var final_data = await solve_week(inputData,[], []);
    
    console.log(final_data);
    var end = new Date().getTime();
    var time = end - start;
    console.log(`Completed in ${time/1000} s`);

    return final_data;
}



