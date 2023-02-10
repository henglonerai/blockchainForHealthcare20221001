// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21;

import "./Roles.sol";

contract Contract {
    using Roles for Roles.Role;

    Roles.Role private admin;
    Roles.Role private doctor;
    Roles.Role private patient;
    Roles.Role private medRecord;

    struct Doctor {
        string drHash;
    }

    struct Patient {
        string patHash;
    }
	
	struct MedRecord {
        string mrHash;
    }

    mapping(address => Doctor) Doctors;
    mapping(address => Patient) Patients;
    mapping(address => MedRecord) MedRecords;

    address[] public Dr_ids;
    address[] public Patient_ids;
    address[] public MedRecord_ids;

    address accountId;
    address admin_id;
    address get_patient_id;
    address get_dr_id;
    address get_mr_id;

	address msgsender = 0x4c0e13C6F4fB72c97c954f76902d0bE2A2E9b36C;

    constructor() {
        admin_id = msg.sender;		

		admin_id = msgsender;

        admin.add(admin_id);
    }

    //get Admin

    function getAdmin() public view returns (address) {
        return admin_id;
    }

    function isAdmin() public view returns (bool) {
        return admin.has(msg.sender);
    }

    //Add Doctor

    function addDoctor(address _newdr) public {
        require(admin.has(msg.sender), "Only For Admin");
        doctor.add(_newdr);
    }

    function addPatient(address _newps) public {
        require(admin.has(msg.sender), "Only For Admin");
        patient.add(_newps);
    }
	
	function addMedRecord(address _newmr) public {
        require(admin.has(msg.sender), "Only For Admin");
        medRecord.add(_newmr);
    }

    // dr_id is not needed here and should not be required during creation
    // dr_id is an address that should be automatically generated when the dr is first saved
    function addDrInfo(address dr_id, string memory _drInfo_hash) public {
        require(admin.has(msg.sender), "Only For Admin");

        Doctor storage drInfo = Doctors[dr_id];
        drInfo.drHash = _drInfo_hash;

        // The new address (dr_id) should be pushed into Dr_ids storage to retrieve the doctors back
        Dr_ids.push(dr_id);
        doctor.add(dr_id);
    }

    function addPatientInfo(address pat_id, string memory _patInfo_hash) public {
        require(admin.has(msg.sender), "Only For Admin");

        Patient storage patInfo = Patients[pat_id];
        patInfo.patHash = _patInfo_hash;

        // The new address (dr_id) should be pushed into Dr_ids storage to retrieve the doctors back
        Patient_ids.push(pat_id);
        patient.add(pat_id);
    }
	
	function addMedRecordInfo(address mr_id, string memory _mrInfo_hash) public {
        require(admin.has(msg.sender), "Only For Admin");

        MedRecord storage mrInfo = MedRecords[mr_id];
        mrInfo.mrHash = _mrInfo_hash;

        // The new address (dr_id) should be pushed into Dr_ids storage to retrieve the doctors back
        MedRecord_ids.push(mr_id);
        medRecord.add(mr_id);
    }

    function getAllDrs() public view returns (address[] memory) {
        // This will return the addresses pointing to the doctors
        return Dr_ids;
    }

    function getAllPatientIds() public view returns (address[] memory) {
        // This will return the addresses pointing to the patients
        return Patient_ids;
    }

	function getAllMedRecordIds() public view returns (address[] memory) {
        // This will return the addresses pointing to the medical records
        return MedRecord_ids;
    }

    function getDr(address _id) public view returns (string memory) {
        return (Doctors[_id].drHash);
    }

    function getPatient(address _id) public view returns (string memory) {
        return (Patients[_id].patHash);
    }
	
	function getMedRecord(address _id) public view returns (string memory) {
        return (MedRecords[_id].mrHash);
    }

    // check is Doctor

    function isDr(address id) public view returns (string memory) {
        require(doctor.has(id), "Only for Doctors");
        return "1";
    }

    // Check is Patient

    function isPat(address id) public view returns (string memory) {
        require(patient.has(id), "Only for Doctors");
        return "1";
    }

    /*
        Modifiers
    */

    modifier onlyAdmin() {
        require(admin.has(msg.sender) == true, "Only Admin Can Do That");
        _;
    }
    modifier onlyDoctor() {
        require(doctor.has(msg.sender) == true, "Only Doctor Can Do That");
        _;
    }
    modifier onlyPatient() {
        require(patient.has(msg.sender) == true, "Only Admin Can Do That");
        _;
    }
}
