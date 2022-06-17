import React, {useState, useEffect} from 'react'
import { Form, Button} from 'react-bootstrap';
import './style.css'
const axios = require('axios').default;

function Tag(props){
	return(
		<div>
			{/* <div className="tag">
				<div className="tag-name">{props.name}</div>
				 */}
			asdfasdfasdfasdfasdfa
		</div>
		
	)
}

function TagSelected(props){
	return(
		<div>
			{/* <div className="tag">
				<div className="tag-name">{props.name}</div>
				 */}
			asdfasdfasdfasdfasdfa
		</div>
		
	)
}

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
		stt: '',
	});

	const [dataNguyenlieu, setDataNguyenlieu] = useState([]);
	const [selectedNguyenlieu, setSelectedNguyenlieu] = useState([]);

	useEffect(() =>{
		axios.get(`${URL}/api/nguyenlieu`)
			.then(res => {
				setDataNguyenlieu(res.data);
			})
	}, [])

	function onSelected(){
		// Delete or 
		// use reduce
	}

	function onUnselected(id){
		// make a prompt
		// add to selected
		let person = prompt("Điền vào lượng nguyên liệu", "0");
		if (person != null) {
		  document.getElementById("demo").innerHTML =
		  "Hello " + person + "! How are you today?";
		//   push
		}
	}

	function onSubmit(){
		// Update nguyenlieu
		let nguyenlieuData = {
			stt: data.stt,
			name: data.name,
		}
		axios.post(`${URL}/api/nguyenlieu`, nguyenlieuData)
			.then(res => {
				if(res.data.message){
					//Already have the ID
					setError(res.data.message);
				}
				// console.log(res.data);
				// window.location.reload();
			})
			.catch(function (error) {
				console.log(error);
			});
    }
	return (
		
		<>
		    <h1 style={{ marginLeft: '50px'}}>Thêm món ăn</h1>
        	<br></br>

			<div className="body">
				<div className="box1">
					<Form className="input">
						<div className="grid-container-1">
							<Form.Group className="mb-3">
								<Form.Label>ID món ăn <span style={{color: 'red'}}>*</span><span style={{color: 'purple'}}>*</span></Form.Label>
								<Form.Control type="text" placeholder="Nhập ID món ăn" 
									onChange={e => setData({...data,  stt: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3" >
								<Form.Label>Tên món ăn <span style={{color: 'purple'}}>*</span></Form.Label>
								<Form.Control type="text" placeholder="Nhập tên món ăn" 
								onChange={e => setData({...data,  name: e.target.value }) }
								/>
							</Form.Group>

              				{/* Input type file with image */}
							<Form.Group className="mb-3">
								<Form.Label>Hình ảnh món ăn</Form.Label>
								<Form.Control type="number" placeholder="Nhập độ tuổi" defaultValue="0"
								onChange={e => setData({...data,  Thaibo: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Đơn vị tính</Form.Label>
								<Form.Control type="text" placeholder="Chén" 
								onChange={e => setData({...data,  Nangluong: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Lượng tối thiểu</Form.Label>
								<Form.Control type="number" placeholder="Nhập độ tuổi" defaultValue="0"
								onChange={e => setData({...data,  Proteintv: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Lượng tối đa</Form.Label>
								<Form.Control type="number" placeholder="Nhập độ tuổi" defaultValue="0"
								onChange={e => setData({...data,  Protein: e.target.value }) }
								/>
							</Form.Group>

							{/* <Form.Group className="mb-3">
								<Form.Label>Lượng tối thiểu</Form.Label>
								<Form.Control type="number" placeholder="Nhập độ tuổi" defaultValue="0"
								onChange={e => setData({...data,  Proteintv: e.target.value }) }
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Lượng tối đa</Form.Label>
								<Form.Control type="number" placeholder="Nhập độ tuổi" defaultValue="0"
								onChange={e => setData({...data,  Protein: e.target.value }) }
								/>
							</Form.Group> */}
              {/* Maybe 2 more input field */}
							
							<Form.Group className="mb-3">
								<Form.Label>Độ chia nhỏ nhất</Form.Label>
								<Form.Control type="number" placeholder="Nhập độ tuổi" defaultValue="0"
								onChange={e => setData({...data,  Lipidtv: e.target.value }) }
								/>
							</Form.Group>

							

              				{/* Multiple choice selected */}
							<Form.Group className="mb-3">
								<Form.Label>Thời điểm ăn</Form.Label> 
									<div key={`inline-checkbox`} className="mb-3">
									<Form.Check
										inline
										label="Sáng"
										name="group1"
										type="checkbox"
										id={`inline-checkbox-1`}
									/>
									<Form.Check
										inline
										label="Giữa sáng"
										name="group1"
										type="checkbox"
										id={`inline-checkbox-2`}
									/>
									<Form.Check
										inline
										// disabled
										label="Trưa"
										type="checkbox"
										id={`inline-checkbox-3`}
									/>
									<Form.Check
										inline
										// disabled
										label="Giữa trưa"
										type="checkbox"
										id={`inline-checkbox-3`}
									/>
									<Form.Check
										inline
										label="Tối"
										type="checkbox"
										id={`inline-checkbox-3`}
									/>
									<Form.Check
										inline
										label="Đêm"
										type="checkbox"
										id={`inline-checkbox-3`}
									/>
									</div>
							</Form.Group>

              				{/* Only one choice: radio */}
							<Form.Group className="mb-3">
								<Form.Label>Loại món ăn</Form.Label>
								<div key={`inline-radio`} className="mb-3">
								<Form.Check
									inline
									label="Chính"
									name="group1"
									type="radio"
									id={`inline-radio-1`}
								/>
								<Form.Check
									inline
									label="Phụ"
									name="group1"
									type="radio"
									id={`inline-radio-2`}
								/>
								<Form.Check
									inline
									label="Rau"
									type="radio"
									name="group1"
									id={`inline-radio-3`}
								/>
								<Form.Check
									inline
									label="Tráng miệng"
									type="radio"
									name="group1"
									id={`inline-radio-3`}
								/>
								</div>
							</Form.Group>
						</div>


						{/* Big form */}
						<Form.Group className="mb-3">
							<Form.Label>Các nguyên liệu tạo thành</Form.Label>
							<div className="split">
								<div className="split1">
								{/* selectedNguyenlieu */}
									{[["5. Bánh tráng mỏng",60]].map(item => {
										return (
											<div key={item._id} className="tag-selected"
											onClick={() => onSelected()}
											
											>
												<span className="selected-1">5. Hello World</span>
												<span className="selected-2">60</span>
												{/* {item.stt}. {item.name} */}
											
											</div>
										)
									})}
								</div>
								<div className="split2">
									{dataNguyenlieu.map(item => {
										return (
											<span key={item._id} 
											className="tag"
											onClick={() => onUnselected(item.id, item.name)}
											
											>{item.id}. {item.name}</span>
										)
									})}
								</div>
							</div>

						</Form.Group>


						{/* Big form if chính render or not . Visiable = true, overflow:*/}
						<Form.Group className="mb-3">
						<Form.Label>Các món phụ đi kèm</Form.Label>
						
						</Form.Group>

						<Form.Group className="mb-3">
						<Form.Label>Các món rau đi kèm</Form.Label>
						<Form.Control type="number" placeholder="Nhập độ tuổi" defaultValue="0"
						onChange={e => setData({...data,  Cellulose: e.target.value }) }
						/>
						</Form.Group>

						<Form.Group className="mb-3">
						<Form.Label>Các món tráng miệng đi kèm</Form.Label>
						<Form.Control type="number" placeholder="Nhập độ tuổi" defaultValue="0"
						onChange={e => setData({...data,  Cellulose: e.target.value }) }
						/>
						</Form.Group>						

						<h7> <span style={{color: 'red', margin: '10px'}}>(*)</span>: Định danh và duy nhất. <b>ID nguyên liệu </b> không thể thay đổi và không được trùng đã có trước.</h7>

						<p> <span style={{color: 'purple', margin: '10px'}}>(*)</span>: Không được bỏ trống ô <b>ID và Tên nguyên liệu</b> .</p>
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
