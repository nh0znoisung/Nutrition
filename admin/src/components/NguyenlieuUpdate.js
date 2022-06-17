import { useParams } from "react-router-dom";
import React, {useState, useEffect} from 'react'
import { Form, Button} from 'react-bootstrap';
import './NguyenlieuUpdate.css'
const axios = require('axios').default;

function Error(props){
	if(props.error){
		return <div className="error">{props.error}</div>
	}
	return null
}

export default function NguyenlieuUpdate() {
    let params = useParams();
    const id = params.id;
	const URL = `https://enter-nutrition.herokuapp.com`
	const [error, setError] = useState(null);
	const [data, setData] = useState({
		id: '',
		name: '',
		Thaibo: 0,
		Nangluong: 0,
		Proteintv: 0,
		Protein: 0,
		Lipidtv: 0,
		Lipid: 0,
		Cellulose: 0,
		Cholesterol: 0,
		Canxi: 0,
		Phospho: 0,
		Sat: 0,
		Natri: 0,
		Kali: 0,
		Beta_caroten: 0,
		vitA: 0,
		vitB: 0,
		vitC: 0
	});

    useEffect(() => {
        axios.get(`${URL}/api/nguyenlieu/${id}`)
        .then(res => {
            console.log(res.data)
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [id,URL])


    function handleUpdate(id){
		let nguyenlieuData = {
			_id: id,
			id: data.id,
			name: data.name,
			Thaibo: data.Thaibo,
			Nangluong: data.Nangluong,
			Proteintv: data.Proteintv,
			Protein: data.Protein,
			Lipidtv: data.Lipidtv,
			Lipid: data.Lipid,
			Cellulose: data.Cellulose,
			Cholesterol: data.Cholesterol,
			Canxi: data.Canxi,
			Phospho: data.Phospho,
			Sat: data.Sat,
			Natri: data.Natri,
			Kali: data.Kali,
			Beta_caroten: data.Beta_caroten,
			vitA: data.vitA,
			vitB: data.vitB,
			vitC: data.vitC 
		}
        console.log(`${URL}/api/nguyenlieu/update/${id}`)
		axios.post(`${URL}/api/nguyenlieu/update/${id}`, nguyenlieuData)
			.then(res => {
				console.log(res);
				window.location.reload();
			})
			.catch(err => console.log(err));
    }

    function handleDelete(id){
        // axios.delete(`/api/nguyenlieu/${id}`)
        axios.post(`${URL}/api/nguyenlieu/delete/${id}`)
        .then(res => {
            console.log(res.data);
            window.location.reload();
        })
        .catch(err => console.log(err))
    }

    function handleBack(){
        window.location.href = `/nguyenlieu`
    }

	return (
		
		<>
		    <h1 style={{ marginLeft: '50px'}}>Chỉnh sửa nguyên liệu</h1>
        	<br></br>

			<div className="body">
				<div className="box1">
					<Form className="input">
						<div className="grid-container">
							<Form.Group className="mb-3">
								<Form.Label>ID nguyên liệu <span style={{color: 'red'}}>*</span></Form.Label>
								<Form.Control type="text"  value={data.id} 
                                disabled
									onChange={e => setData({...data,  id: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3" >
								<Form.Label>Tên nguyên liệu </Form.Label>
								<Form.Control type="text"  value={data.name} 
                                // disabled
								onChange={e => setData({...data,  name: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Thải bỏ</Form.Label>
								<Form.Control type="number"  value={data.Thaibo}
								onChange={e => setData({...data,  Thaibo: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Năng lượng</Form.Label>
								<Form.Control type="number"  value={data.Nangluong}
								onChange={e => setData({...data,  Nangluong: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Protein thực vật</Form.Label>
								<Form.Control type="number"  value={data.Proteintv}
								onChange={e => setData({...data,  Proteintv: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Protein tổng</Form.Label>
								<Form.Control type="number"  value={data.Protein}
								onChange={e => setData({...data,  Protein: e.target.value }) }
								/>
							</Form.Group>
							
							<Form.Group className="mb-3">
								<Form.Label>Lipid thực vật</Form.Label>
								<Form.Control type="number"  value={data.Lipidtv}
								onChange={e => setData({...data,  Lipidtv: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Lipid tổng</Form.Label>
								<Form.Control type="number"  value={data.Lipid}
								onChange={e => setData({...data,  Lipid: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Cellulose</Form.Label>
								<Form.Control type="number"  value={data.Cellulose}
								onChange={e => setData({...data,  Cellulose: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Cholesterol</Form.Label>
								<Form.Control type="number"  value={data.Cholesterol}
								onChange={e => setData({...data,  Cholesterol: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Canxi</Form.Label>
								<Form.Control type="number"  value={data.Canxi}
								onChange={e => setData({...data,  Canxi: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Phospho</Form.Label>
								<Form.Control type="number"  value={data.Phospho}
								onChange={e => setData({...data,  Phospho: e.target.value }) }
								/>
							</Form.Group>


							<Form.Group className="mb-3">
								<Form.Label>Sắt</Form.Label>
								<Form.Control type="number"  value={data.Sat}
								onChange={e => setData({...data,  Sat: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Natri</Form.Label>
								<Form.Control type="number"  value={data.Natri}
								onChange={e => setData({...data,  Natri: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Kali</Form.Label>
								<Form.Control type="number"  value={data.Kali}
								onChange={e => setData({...data,  Kali: e.target.value }) }
								/>
							</Form.Group>


							<Form.Group className="mb-3">
								<Form.Label>Beta-caroten</Form.Label>
								<Form.Control type="number"  value={data.Beta_caroten}
								onChange={e => setData({...data,  Beta_caroten: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Vitamin A</Form.Label>
								<Form.Control type="number"  value={data.vitA}
								onChange={e => setData({...data,  vitA: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Vitamin B</Form.Label>
								<Form.Control type="number"  value={data.vitB}
								onChange={e => setData({...data,  vitB: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Vitamin C</Form.Label>
								<Form.Control type="number"  value={data.vitC}
								onChange={e => setData({...data,  vitC: e.target.value }) }
								/>
							</Form.Group>

						</div>
						
						<p> <span style={{color: 'red', margin: '10px'}}>(*)</span>: <b>Số thứ tự </b> không được trùng đã có.</p>
						<div className="center">
							<Button className="btn"
								variant="warning"
								onClick={() => handleBack()}
								>
								Trở về
							</Button>

                            <Button className="btn"
								variant="primary"
								onClick={() => handleUpdate(id)}
								>
								Lưu thay đổi
							</Button>

                            <Button className="btn"
								variant="danger"
								onClick={() => handleDelete(id)}
								>
								Xóa nguyên liệu
							</Button>
						</div>

					</Form>

				</div>

				<Error error={error} />
			</div>
			
		</>
	)
}
