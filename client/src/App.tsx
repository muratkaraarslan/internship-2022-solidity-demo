import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Breadcrumb, Button, Col, Input, Layout, Menu, notification, Row } from 'antd';
import { ethers } from "ethers";
import { PATENT_ABI, PATENT_ADDRESS } from './constants/Patent';


function App() {



  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [applicationId, setApplicationId] = useState<any>(null);

  const createApplication = async () => {

    if (name === "" || description === "") {
      notification['error']({
        message: 'Name and description required'
      });
      return;
    }

    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(PATENT_ADDRESS, PATENT_ABI, signer);

    const tx =  await contract.createApplication(name, description, { value: ethers.utils.parseUnits(".01", "ether")});
    const res = await tx.wait();

    console.log(tx);
    console.log(res);

    notification['info']({
      message: ethers.utils.formatEther(res.events[0].args[1]) + " numaralı başvurunuz alınmıştır"
    });




  }

  return (
    <>
      <Row style={{ margin: "10px" }}>
        <Col md={12}>
          <Input placeholder="Name" onChange={(e: any) => setName(e.target.value)} />
        </Col>
      </Row>
      <Row style={{ margin: "10px" }}>
        <Col md={24}>
          <Input placeholder="Description" onChange={(e: any) => setDescription(e.target.value)} />
        </Col>
      </Row>
      <Row style={{ margin: "10px" }}>
        <Button type="primary" onClick={createApplication}>Apply</Button>
      </Row>

    </>
  );
}

export default App;
