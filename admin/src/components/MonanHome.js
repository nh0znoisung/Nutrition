import React, {useState, useEffect} from 'react'
import './style.css'
import {Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';



export default function NguyenlieuHome() {
    const [data, setData] = useState([])

    function handleUpdate(id){
        window.location.href = `/nguyenlieu/${id}`
        // console.log(id);
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

    // 'http://localhost:5000/api/nguyenlieu'
    const URL = 'https://enter-nutrition.herokuapp.com'

    useEffect(() => {
        axios.get(`${URL}/api/nguyenlieu`)
        .then(res => {setData(res.data); console.log(res.data)})
        .catch(err => console.log(err))


    }, [])


  return (
    <>
        <h1 style={{marginLeft: '50px'}}>Tổng hợp nguyên liệu</h1>
        <br></br>

        <div style={{margin: '0px 2%'}}>
            {/* <div style={{display:'flex', flexDirection:'row-reverse'}}>   

            </div> */}
            <h5> Có tất cả <span style={{color: 'red'}}>{data.length}</span> nguyên liệu </h5>

            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>ID</th>                
                        <th>Tên</th>
                        <th>Thải bỏ</th>
                        <th>Năng lượng</th>
                        <th>Protein tv</th>
                        <th>Protein tổng</th>
                        <th>Lipid tv</th>
                        <th>Lipid tổng</th>
                        <th>Cellulose</th>
                        <th>Cholesterol</th>
                        <th>Canxi</th>
                        <th>Phospho</th>
                        <th>Sắt</th>
                        <th>Natri</th>
                        <th>Kali</th>
                        <th>Beta-caroten</th>
                        <th>VitA</th>
                        <th>VitB</th>
                        <th>VitC</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => 
                        <tr key={item._id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.Thaibo}</td>
                            <td>{item.Nangluong}</td>
                            <td>{item.Proteintv}</td>
                            <td>{item.Protein}</td>
                            <td>{item.Lipidtv}</td>
                            <td>{item.Lipid}</td>
                            <td>{item.Cellulose}</td>
                            <td>{item.Cholesterol}</td>
                            <td>{item.Canxi}</td>
                            <td>{item.Phospho}</td>
                            <td>{item.Sat}</td>
                            <td>{item.Natri}</td>
                            <td>{item.Kali}</td>
                            <td>{item.Beta_caroten}</td>
                            <td>{item.vitA}</td>
                            <td>{item.vitB}</td>
                            <td>{item.vitC}</td>
                            <td > 
                                <FontAwesomeIcon className='icon' onClick={() => handleUpdate(item._id)} style={{marginRight: '5px', marginBottom: '5px', color: 'blue'}} icon={faPen}  />
                                
                                <FontAwesomeIcon className='icon' onClick={() => handleDelete(item._id)} icon={faTrash} style={{marginRight: '5px', marginBottom: '5px', color: 'red'}}/>
                            </td>
                            {/* ICon */}
                            {/* <td>{item.name}</td>  */}
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    </>

    
  )
}
