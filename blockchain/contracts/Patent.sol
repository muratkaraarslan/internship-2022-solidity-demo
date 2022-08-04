// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Patent {

    enum Status {
        Received,
        Accepted,
        Rejected
    }
    
    struct Application {
        address applicant;
        string name;
        string description;
        uint applicationDate;
        Status status;
    }

    Application[] applications;
    address owner;

    event NewApplication(address applicant, uint id);
    event Evaluated(uint id, Status status);

    constructor() {
        owner = msg.sender;
    }

    function createApplication(string memory name, string memory description) public payable {
        require(msg.value == .01 ether);
        
        applications.push(Application(msg.sender, name, description, block.timestamp, Status.Received));

        emit NewApplication(msg.sender, applications.length - 1);
    }


    function evaluate(uint id, Status status) public {
        require(msg.sender == owner);

        Application storage application = applications[id];

        require(application.status == Status.Received);
        require(status != Status.Received);

        application.status = status;

        emit Evaluated(id, status); 
    }

}