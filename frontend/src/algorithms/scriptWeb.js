import solver from "@uandi/javascript-lp-solver/src/solver";


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
    
    console.log("Hello World",W, H, A, a, b, c, d, e, gender, inputData, X, X_, BMI)

    
    // By day => meal
    var targetNL = getNL(X_, BMI);
    
    
    var targetPro = (0.2*X_)/4;
    var targetProtv = targetPro*0.35;
    var targetLip = (0.25*X_)/9;
    var targetLiptv = 0.5*targetLip;
    var targetCell = 30; //min= 19
    var targetCho = 150;
    
    var THRESHHOLD = 100, count = 0;

    const ratio = [1,30,70,20,35,180,8] // hệ số từng chỉ tiêu
    
    // Xét 1 bữa: NL: 90-110%
    async function solve_meal(data, meal, target, range){
        console.log("Solve meal");
        
        var final_result = null;
        count = 0;
        while(final_result == null){
            var chinh = {}, kem = {}, tm = {}, rau = {};
            count++;
            if(count > THRESHHOLD){
                return null;
            }
            // ['Sang', 'Giuasang', 'Trua', 'Chieu', 'Toi', 'Dem']
            if (['Sang','Trua','Toi'].includes(meal)){
                // Bữa sáng, trưa, tối
                var arr_chinh = data.filter(function(value, index, arr){ 
                    return value[meal][0] === "C";
                });
                chinh = arr_chinh[Math.floor(Math.random() * arr_chinh.length)];

                let item = chinh[meal];
                let item_slice = item.slice(2,chinh[meal].length)

                //rand: kèm
                if(item[1] === "1"){
                    var arr_kem = data.filter(function(value, index, arr){ 
                        return value[meal] === "K" + item_slice;
                    });
                    kem = arr_kem[Math.floor(Math.random() * arr_kem.length)];
                }

                // rand: Rau
                if(item[2] === "1"){
                    var arr_rau = data.filter(function(value, index, arr){ 
                        return value[meal] === "R";
                    });
                    rau = arr_rau[Math.floor(Math.random() * arr_rau.length)];
                }

                // rand: Tráng miệng
                if(item[3] === "1"){
                    var arr_tm = data.filter(function(value, index, arr){ 
                        return value[meal] === "T";
                    });
                    tm = arr_tm[Math.floor(Math.random() * arr_tm.length)]; 
                } 
            }else{
                // Bữa phụ: Giuasang, Chieu, Dem
                arr_chinh = data.filter(function(value, index, arr){ 
                    return value[meal] === "P";
                });
                chinh = arr_chinh[Math.floor(Math.random() * arr_chinh.length)];
            }

            // console.log(chinh, kem, rau, tm);
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
    
                for(let j = 0; j < attr.length; j++){
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
                if(results.feasible === false || results['1'] === undefined) continue;
                // console.log(results)
    
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
    const type_1_range = [[1.147,0.853],[1.112,0.888],[1.091,0.909],[1.073,0.927],[1.061,0.939],[1.05,0.95]]

    const type_2_range = [[1.682,0.318],[1.472,0.528],[1.346,0.654],[1.238,0.762],[1.166,0.834],[1.1,0.9]]

    const type_3_range = [[[1.891,0.109], [1.818,0.182], [1.774, 0.226], [1.737, 0.263], [1,713, 0.287], [1,691, 0.309]],
                        [[1.636,0.364], [1.60,0.4], [1.578,0.422], [1.56,0.44], [1.548,0.452], [1.537,0.463]],
                        [[1.50,0.5], [1.476,0.524], [1.462,0.538], [1.449,0.551], [1.441,0.559], [1.434,0.566]],
                        [[1.407,0.593], [1.389,0.611], [1.378,0.622], [1.369,0.631], [1.362,0.638], [1.357,0.643]],
                        [[1.335,0.665], [1.32,0.68], [1.312,0.688], [1.304,0.696], [1.299,0.701], [1.295,0.705]],
                        [[1.277,0.723], [1.265,0.735], [1.258,0.742], [1.251,0.749], [1.248,0.752], [1.244,0.756]],
                        [[1.228,0.772], [1.218,0.782], [1.212,0.788], [1.207,0.793], [1.203,0.797], [1.2,0.8]]]

    async function solve_day(data, day){
        console.log("Solve day");
        // NL xiết theo buổi xài min, max

        //set Init of a day with type 1, 2: Start the new day. Type 3: Continue until a week
        let arr = [];
        cumsum.NL = 0;
        cumsum.Pro = 0;
        cumsum.Lip = 0;
        
        curr.NL = 0;
        curr.Pro = 0;
        curr.Lip = 0;



        for(let i = 0; i<6; i++){
            // Add meals
            cumsum.NL += targetNL*ratio_meal[i];
            cumsum.Pro += targetPro*ratio_meal[i];
            cumsum.Lip += targetLip*ratio_meal[i];

            cumsum.Protv += targetProtv*ratio_meal[i];
            cumsum.Liptv += targetLiptv*ratio_meal[i];
            cumsum.Cell += targetCell*ratio_meal[i];
            cumsum.Cho += targetCho*ratio_meal[i];

            // Version 1: Xiết chặt theo từng ngày của type 1,2. Lặp vô hạn => threshold
            // arr[i] = await solve_meal(data, meal_arr[i], [cumsum.NL-curr.NL, cumsum.Pro-curr.Pro, null, cumsum.Lip-curr.Lip, null, null, null], [[cumsum.NL*type_1_range[i][0]-curr.NL, cumsum.NL*type_1_range[i][1]-curr.NL], [cumsum.Pro*type_2_range[i][0]-curr.Pro, cumsum.Pro*type_2_range[i][1]-curr.Pro], null, [cumsum.Lip*type_2_range[i][0]-curr.Lip, cumsum.Lip*type_2_range[i][1]-curr.Lip], null, null, null]);


            //Version 2:  Xiết chặt NL 80-120/1 bữa (Best Version)
            arr[i] = await solve_meal(data, meal_arr[i], [cumsum.NL-curr.NL, cumsum.Pro-curr.Pro, null, cumsum.Lip-curr.Lip, null, null, null], [[Math.min(cumsum.NL*type_1_range[i][0]-curr.NL, targetNL*ratio_meal[i] * 1.2), Math.max(cumsum.NL*type_1_range[i][1]-curr.NL, targetNL*ratio_meal[i] * 0.8)], [cumsum.Pro*type_2_range[i][0]-curr.Pro, cumsum.Pro*type_2_range[i][1]-curr.Pro], null, [cumsum.Lip*type_2_range[i][0]-curr.Lip, cumsum.Lip*type_2_range[i][1]-curr.Lip], null, null, null]);


            // Version 2: (Update Partition)
            // if(i%2 === 0){
            //     //Chính
            //     arr[i] = await solve_meal(data, meal_arr[i], [cumsum.NL-curr.NL, cumsum.Pro-curr.Pro, cumsum.Protv-curr.Protv, cumsum.Lip-curr.Lip, cumsum.Liptv-curr.Liptv, null, null], [[cumsum.NL*type_1_range[i][0]-curr.NL, cumsum.NL*type_1_range[i][1]-curr.NL], [cumsum.Pro*type_2_range[i][0]-curr.Pro, cumsum.Pro*type_2_range[i][1]-curr.Pro], [cumsum.Protv*type_3_range[day][i][0]-curr.Protv, cumsum.Protv*type_3_range[day][i][1]-curr.Protv], [cumsum.Lip*type_2_range[i][0]-curr.Lip, cumsum.Lip*type_2_range[i][1]-curr.Lip], [cumsum.Liptv*type_3_range[day][i][0]-curr.Liptv, cumsum.Liptv*type_3_range[day][i][1]-curr.Liptv], null, null]);
            // }else{
            //     //Phụ
            //     arr[i] = await solve_meal(data, meal_arr[i], [cumsum.NL-curr.NL, cumsum.Pro-curr.Pro, null, cumsum.Lip-curr.Lip, null, null, null], [[Math.min(cumsum.NL*type_1_range[i][0]-curr.NL, targetNL*ratio_meal[i] * 1.2), Math.max(cumsum.NL*type_1_range[i][1]-curr.NL, targetNL*ratio_meal[i] * 0.8)], [cumsum.Pro*type_2_range[i][0]-curr.Pro, cumsum.Pro*type_2_range[i][1]-curr.Pro], null, [cumsum.Lip*type_2_range[i][0]-curr.Lip, cumsum.Lip*type_2_range[i][1]-curr.Lip], null, null, null]);
            // }

            // Version 3: Theo tuần của type 3 (Fully)
            // arr[i] = await solve_meal(data, meal_arr[i], [cumsum.NL-curr.NL, cumsum.Pro-curr.Pro, cumsum.Protv-curr.Protv, cumsum.Lip-curr.Lip, cumsum.Liptv-curr.Liptv, cumsum.Cell-curr.Cell, cumsum.Cho-curr.Cho], [[cumsum.NL*type_1_range[i][0]-curr.NL, cumsum.NL*type_1_range[i][1]-curr.NL], [cumsum.Pro*type_2_range[i][0]-curr.Pro, cumsum.Pro*type_2_range[i][1]-curr.Pro], [cumsum.Protv*type_3_range[day][i][0]-curr.Protv, cumsum.Protv*type_3_range[day][i][1]-curr.Protv], [cumsum.Lip*type_2_range[i][0]-curr.Lip, cumsum.Lip*type_2_range[i][1]-curr.Lip], [cumsum.Liptv*type_3_range[day][i][0]-curr.Liptv, cumsum.Liptv*type_3_range[day][i][1]-curr.Liptv], [cumsum.Cell*type_3_range[day][i][0]-curr.Cell, cumsum.Cell*type_3_range[day][i][1]-curr.Cell], [cumsum.Cho*type_3_range[day][i][0]-curr.Cho, cumsum.Cho*type_3_range[day][i][1]-curr.Cho]]);

            // Version 4: Theo tuần của lấy Protv + Liptv
            // arr[i] = await solve_meal(data, meal_arr[i], [cumsum.NL-curr.NL, cumsum.Pro-curr.Pro, cumsum.Protv-curr.Protv, cumsum.Lip-curr.Lip, cumsum.Liptv-curr.Liptv, null, null], [[cumsum.NL*type_1_range[i][0]-curr.NL, cumsum.NL*type_1_range[i][1]-curr.NL], [cumsum.Pro*type_2_range[i][0]-curr.Pro, cumsum.Pro*type_2_range[i][1]-curr.Pro], [cumsum.Protv*type_3_range[day][i][0]-curr.Protv, cumsum.Protv*type_3_range[day][i][1]-curr.Protv], [cumsum.Lip*type_2_range[i][0]-curr.Lip, cumsum.Lip*type_2_range[i][1]-curr.Lip], [cumsum.Liptv*type_3_range[day][i][0]-curr.Liptv, cumsum.Liptv*type_3_range[day][i][1]-curr.Liptv], null, null]);

            if(arr[i] === null){
                return null;
            }

            //Update current
            curr.NL += arr[i].value.NL;
            curr.Pro += arr[i].value.Pro;
            curr.Lip += arr[i].value.Lip;
            curr.Protv += arr[i].value.Protv;
            curr.Liptv += arr[i].value.Liptv;
            curr.Cell += arr[i].value.Cell;
            curr.Cho += arr[i].value.Cho;
        }


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
            target:{
                NL: targetNL,
                Pro: targetPro,
                Protv: targetProtv,
                Lip: targetLip,
                Liptv: targetLiptv,
                Cell: targetCell,
                Cho: targetCho
            }
        }
    
        for(let i of attr){
            for(let j = 0; j<6; j++){
                final_data.value[i] += arr[j].value[i];
            }
        }
    
        return final_data;
    }
    
    /// theo tuần
    var cumsum = {
        'NL': 0,
        'Pro': 0,
        'Protv': 0, //*7 + percentage
        'Lip': 0,
        'Liptv': 0, //*7 + percentage
        'Cell': 0,
        'Cho': 0
    };//target
    var curr = {
        'NL': 0,
        'Pro': 0,
        'Protv': 0,
        'Lip': 0,
        'Liptv': 0,
        'Cell': 0,
        'Cho': 0
    }; //current

    // Năng lượng là theo ngày
    async function solve_week(data, target, range){
        while(true){
            curr = {
                'NL': 0,
                'Pro': 0,
                'Protv': 0,
                'Lip': 0,
                'Liptv': 0,
                'Cell': 0,
                'Cho': 0
            };
            cumsum = {
                'NL': 0,
                'Pro': 0,
                'Protv': 0, //*7 + percentage
                'Lip': 0,
                'Liptv': 0, //*7 + percentage
                'Cell': 0,
                'Cho': 0
            };
            var data_day = [], tmp, ok = true;
            for(let i = 0; i<7; i++){
                tmp = await solve_day(data, i);
                if(tmp === null){
                    ok = false;
                    break;
                }
                data_day.push(tmp);
                console.log(`Day ${i+1} done!!!`);
            }
            if(!ok){
                continue;
            }
            // var day_1 =  await solve_day(data, 0);
            // console.log("Day 1 !!!")
        
            // var day_2 =  await solve_day(data, 1);
            // console.log("Day 2 !!!")
            
            // var day_3 =  await solve_day(data,2);
            // console.log("Day 3 !!!")
        
        
            // var day_4 =  await solve_day(data, 3);
            // console.log("Day 4 !!!")
            
            // var day_5 =  await solve_day(data, 4);
            // console.log("Day 5 !!!")
        
            // var day_6 =  await solve_day(data, 5);
            // console.log("Day 6 !!!")
        
            // var day_7 =  await solve_day(data, 6);
            // console.log("Day 7 !!!")
        
            var data_final = {
                'Ngay_1': data_day[0],
                'Ngay_2': data_day[1],
                'Ngay_3': data_day[2],
                'Ngay_4': data_day[3],
                'Ngay_5': data_day[4],
                'Ngay_6': data_day[5],
                'Ngay_7': data_day[6],
            };
            return data_final;
        }

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



