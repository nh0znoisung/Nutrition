import React, {useState} from 'react'
import { Form, Button} from 'react-bootstrap';
import './style.css'
const axios = require('axios').default;

function Error(props){
	if(props.error){
		return <div className="error">{props.error}</div>
	}
	return null
}

export default function NguyenlieuAdd() {
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

	function onSubmit(){
		// Update nguyenlieu
		let nguyenlieuData = {
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
		axios.post(`${URL}/api/nguyenlieu`, nguyenlieuData)
			.then(res => {
				if(res.data.message){
					//Already have the ID
					setError(res.data.message);
				}else{
					window.location.reload();
				}
				// console.log(res.data);
			})
			.catch(function (error) {
				console.log(error);
			});
    }
	return (
		
		<>
		    <h1 style={{ marginLeft: '50px'}}>Thêm nguyên liệu</h1>
        	<br></br>

			<div className="body">
				<div className="box1">
					<Form className="input">
						<div className="grid-container">
							<Form.Group className="mb-3">
								<Form.Label>ID nguyên liệu <span style={{color: 'red'}}>*</span> 
									{/* <span style={{color: 'purple'}}>*</span> */}
								</Form.Label>
								<Form.Control type="text" placeholder="Nhập ID nguyên liệu" 
									onChange={e => setData({...data,  id: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3" >
								<Form.Label>Tên nguyên liệu </Form.Label>
								<Form.Control type="text" placeholder="Nhập tên nguyên liệu" 
								onChange={e => setData({...data,  name: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Thải bỏ</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Thaibo: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Năng lượng</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Nangluong: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Protein thực vật</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Proteintv: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Protein tổng</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Protein: e.target.value }) }
								/>
							</Form.Group>
							
							<Form.Group className="mb-3">
								<Form.Label>Lipid thực vật</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Lipidtv: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Lipid tổng</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Lipid: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Cellulose</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Cellulose: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Cholesterol</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Cholesterol: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Canxi</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Canxi: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Phospho</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Phospho: e.target.value }) }
								/>
							</Form.Group>


							<Form.Group className="mb-3">
								<Form.Label>Sắt</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Sat: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Natri</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Natri: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Kali</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  Kali: e.target.value }) }
								/>
							</Form.Group>


							<Form.Group className="mb-3">
								<Form.Label>Beta-caroten</Form.Label>
								<Form.Control type="number" defaultValue="0"
								onChange={e => setData({...data,  Beta_caroten: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Vitamin A</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  vitA: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Vitamin B</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  vitB: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Vitamin C</Form.Label>
								<Form.Control type="number"   defaultValue="0"
								onChange={e => setData({...data,  vitC: e.target.value }) }
								/>
							</Form.Group>

						</div>
						
						<h7> <span style={{color: 'red', margin: '10px'}}>(*)</span>: Định danh và duy nhất. <b>ID nguyên liệu </b> không thể thay đổi và không được trùng đã có trước.</h7>

						{/* <p> <span style={{color: 'purple', margin: '10px'}}>(*)</span>: Không được bỏ trống ô <b>ID và Tên nguyên liệu</b> .</p> */}
						<div className="center">
							<Button 
								variant="danger"
								onClick={() => onSubmit()}
								>
								Tạo nguyên liệu mới
							</Button>
						</div>

					</Form>

				</div>

				<Error error={error} />
			</div>
			
		</>
	)
}
