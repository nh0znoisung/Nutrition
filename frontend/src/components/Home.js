import React, {useState, useEffect} from 'react'
import './style.css';
import { Form, Button, Alert} from 'react-bootstrap';
// import ResultData from '../algorithms/result.json';
import InputData from '../algorithms/inputWeb.json';
import {solution} from '../algorithms/scriptWeb'
// import loadingGif from './loading.gif';


function Meal(props){
    const data = props.data;
    const soluong = props.soluong;
    if(props.data.id === undefined){
        return <></>
    }
    return(
        <div className="order-food">
            <div  className="box">
            {/* <img src=
            "https://drive.google.com/thumbnail?id=14hz3ySPn-zBd4Tu3NtY1F05LSGdFfWvp" className="box" /> */}
            </div>
            <div  className="food-container" style={{   fontFamily: 'Roboto,sans-serif'}}>
            {/* " */}
                <p style={{ fontWeight: "bold", marginBottom: "40px", fontSize: "30px",textTransform: "uppercase"}}>{data.name}</p>
                <div className="attr">
                    <div> <b>Số lượng: </b>{soluong} </div>
                    <div><b>Độ chia nhỏ nhất: </b>{data.DCNN} g</div>
                    <div><b>Đơn vị: </b>{data.Dv} </div>
                    <div><b>Năng lượng: </b>{data.NL.toFixed(2)} kcal</div>
                    <div><b>Protein: </b>{data.Pro.toFixed(2)} g</div>
                    <div><b>Lipid: </b>{data.Lip.toFixed(2)} g</div>
                </div>
            </div>
        </div>
    )
}

function DayMeal(props){
    const monan = props.data.monan;
    const soluong = props.data.soluong;

    var indents = [];
    for (let i = 0; i < 4; i++) {
        indents.push(<Meal key={i} soluong={soluong[i]} data={monan[i]} />);
    }

    return (
        <>
            <div className="order">
                <div className="order-header" style={{ margin: "0", fontSize: "22px", fontWeight: "bold", textTransform: "uppercase"}}>
                    {props.bua}
                </div>
                {indents}



            </div>
        </>
    )
}


function Result(props){
    const day = props.day+1;
    if(props.result[`Ngay_${day}`] === undefined){
        return <></>
    }
    const data_day = props.result[`Ngay_${day}`];
    
    return (
        <>
            <div className='title-result'>
                <h6>Tổng năng lượng của ngày: &emsp; <b style={{ color: "red"}}>{data_day.value.NL.toFixed(2)} kcal</b></h6> 
            </div>
            <DayMeal data={data_day.Sang} bua="Bữa sáng"/>
            <DayMeal data={data_day.Giuasang} bua="Giữa sáng"/>
            <DayMeal data={data_day.Trua} bua="Bữa trưa"/>
            <DayMeal data={data_day.Chieu} bua="Giữa trưa"/>
            <DayMeal data={data_day.Toi} bua="Bữa tối"/>
            <DayMeal data={data_day.Dem} bua="Bữa đêm"/>
        </>
    )
}


export default function Home() {
    const genders = ['Nam', 'Nữ']
    const genderItems = genders.map((number) =>
        <option value={number} key={number}>
        {number}
        </option>
    );
    const [resultData, setResultData] = useState({})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        height: 180,
        weight: 70,
        age: 22,
        gender: genders[0],
        nghi: 12,
        ratnhe: 8,
        nhe: 4,
        vua: 0,
        nang: 0,

    })

    const [dayArray, setDayArray] = useState([true, false, false, false, false, false, false]);
    const [day, setDay] = useState(0);

    useEffect(() => {
        var arr = [false, false, false, false, false, false, false];
        arr[day] = true;
        setDayArray(arr);
    }, [day]);
    

    async function onSubmit(e){
        e.preventDefault()
        if(data.height === '' || data.weight === '' || data.age === '' || data.gender === '' || data.nghi === '' || data.ratnhe === '' || data.nhe === '' || data.vua === '' || data.nang === ''){
            setError("Dữ liệu truyền vào không được rỗng")
        }else if(data.height < 0 || data.weight < 0 || data.age < 0 || data.nghi < 0 || data.ratnhe < 0 || data.nhe < 0 || data.vua < 0 || data.nang < 0){
            setError("Dữ liệu truyền vào không được âm")
        }else{
            try {
                setError("")
                setLoading(true)
                let gen;
                if(data.gender === 'Nam'){
                    gen = 0
                }else{
                    gen = 1
                }

                let tmp_data = await solution(data.weight, data.height, data.age, data.nghi, data.ratnhe, data.nhe, data.vua, data.nang, gen, InputData)

                setResultData(tmp_data)
                setLoading(false)
            } catch(err) {
                console.log(err)
                setError("Xử lý dữ liệu thất bại")
                // setError(err)
            }
            
        }
    }

    return (
        <>
            <div className="container1">
                <div className="box1">
                    <Form className="input">
                        <div className="title">
                            NHẬP THÔNG TIN
                        </div>
                        <div className="block">
                            <Form.Group >
                                <Form.Label>Chiều cao (cm)</Form.Label>
                                <Form.Control type="number" placeholder="Nhập chiều cao" defaultValue={data.height}
                                    onChange={e => setData({...data,  height: e.target.value }) }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Cân nặng (kg)</Form.Label>
                                <Form.Control type="number" placeholder="Nhập cân nặng" defaultValue={data.weight}
                                onChange={e => setData({...data,  weight: e.target.value }) }
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Độ tuổi</Form.Label>
                                <Form.Control type="number" placeholder="Nhập độ tuổi" defaultValue={data.age}
                                onChange={e => setData({...data,  age: e.target.value }) }/>
                            </Form.Group>



                            <Form.Group >
                                <Form.Label>Số giờ nghỉ ngơi (h)</Form.Label>
                                <Form.Control type="number" placeholder="Nhập số giờ nghỉ ngơi" defaultValue={data.nghi}
                                onChange={e => setData({...data,  nghi: parseInt(e.target.value) , nang: 24-e.target.value-data.ratnhe-data.nhe-data.vua}) }/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Làm việc rất nhẹ (h)</Form.Label>
                                <Form.Control type="number" placeholder="Nhập số giờ làm việc rất nhẹ" defaultValue={data.ratnhe}
                                onChange={e => setData({...data,  ratnhe: parseInt(e.target.value) , nang: 24-data.nghi-e.target.value-data.nhe-data.vua}) }/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Làm việc nhẹ (h)</Form.Label>
                                <Form.Control type="number" placeholder="Nhập số giờ làm việc nhẹ" defaultValue={data.nhe}
                                onChange={e => setData({...data,  nhe: parseInt(e.target.value) , nang: 24-data.nghi-data.ratnhe-e.target.value-data.vua}) }/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Làm việc vừa (h)</Form.Label>
                                <Form.Control type="number" placeholder="Nhập số giờ làm việc vừa" defaultValue={data.vua}
                                onChange={e => setData({...data,  vua: parseInt(e.target.value) , nang: 24-data.nghi-data.ratnhe-data.nhe-e.target.value})   }/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Làm việc nặng (h)</Form.Label>
                                <Form.Control type="number" value={data.nang} disabled/>
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label>Giới tính</Form.Label>
                                <Form.Select aria-label="Default select example"
                                onChange={e => setData({...data,  gender: e.target.value }) } >
                                    {genderItems}
                                </Form.Select>
                            </Form.Group>
                        </div>



                        <div className="center">
                            <Button 
                                variant="danger"
                                onClick={onSubmit}
                                disabled={loading}
                             >
                                Đề xuất món ăn
                            </Button>
                        </div>

                    </Form>
                    {error && <Alert variant="danger" className="d-flex justify-content-center">{error}</Alert>}
                </div>
                <hr/>
                <div className="box2">
                    <div className="title center">
                        KẾT QUẢ ĐỀ XUẤT MÓN ĂN DINH DƯỠNG
                    </div>
                    <div className="date">
                        <Button variant={dayArray[0]? 'danger' : 'primary'} onClick={() => setDay(0)}> Ngày 1 </Button>
                        <Button variant={dayArray[1]? 'danger' : 'primary'} onClick={() => setDay(1)}> Ngày 2 </Button>
                        <Button variant={dayArray[2]? 'danger' : 'primary'} onClick={() => setDay(2)}> Ngày 3 </Button>
                        <Button variant={dayArray[3]? 'danger' : 'primary'} onClick={() => setDay(3)}> Ngày 4 </Button>
                        <Button variant={dayArray[4]? 'danger' : 'primary'} onClick={() => setDay(4)}> Ngày 5 </Button>
                        <Button variant={dayArray[5]? 'danger' : 'primary'} onClick={() => setDay(5)}> Ngày 6 </Button>
                        <Button variant={dayArray[6]? 'danger' : 'primary'} onClick={() => setDay(6)}> Ngày 7 </Button>
                    </div>         

                    {/* Re-render after change the accessed day. Day: 0-6 */}
                    <Result result={resultData} day={day} />
                </div>
            </div>
        </>
    )
}
