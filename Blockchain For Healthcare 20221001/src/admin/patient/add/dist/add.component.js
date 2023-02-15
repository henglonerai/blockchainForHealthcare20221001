"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var PatientAddComponent = /** @class */ (function () {
    function PatientAddComponent(ps) {
        this.ps = ps;
        this.model = {
            patID: '',
            fName: 'first_name',
            lName: 'last_name',
            Doj: '',
            emailID: 'test_name@gmail.com',
            phone: '0107674088',
            city: 'Eg: Butterworth',
            state: 'Eg: Penang',
            speciality: 'Eg: Cardiologist',
            imageHash: ''
        };
        this.imageCompressedUrl = '';
        this.show = false;
        this.msg_text = '';
        this.warn = false;
        this.success = false;
        this.IPFShash = '';
        this.ipfs = ps.ipfs;
    }
    PatientAddComponent.prototype.ngOnInit = function () {
        this.ipfs = this.ps.ipfs;
    };
    PatientAddComponent.prototype.onAddPatientSubmit = function () {
        var _this = this;
        this.show = true;
        this.msg_text = 'Adding Patient to the Network....';
        this.warn = false;
        this.model.imageHash = this.image_url;
        var data = this.model;
        this.ps.addPatient(this.model.patID, data).then(function (r) {
            _this.success = true;
            _this.msg_text = 'Data added to IPFS...';
            _this.msg_text += '<br>User Added to the Blockchain';
            console.log('User added Successfully');
            _this.model = {};
        })["catch"](function (er) {
            _this.warn = true;
            _this.msg_text =
                'Adding Patient Failed<br> <small class="fw-light text-danger"><b>"</b>' +
                    _this.model.patID +
                    '<b>"</b></small><br>1.not a valid address or <br>2.Already have a role';
            console.log(er);
        });
    };
    PatientAddComponent.prototype.PreviewImage = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.image_url = event.target.result;
                // this.compressImage();
                console.log(_this.image_url);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    PatientAddComponent.prototype.onClose = function () {
        this.show = false;
        this.warn = false;
    };
    PatientAddComponent = __decorate([
        core_1.Component({
            selector: 'patient-add',
            templateUrl: './add.component.html',
            styleUrls: ['./add.component.sass']
        })
    ], PatientAddComponent);
    return PatientAddComponent;
}());
exports.PatientAddComponent = PatientAddComponent;

//# sourceMappingURL=add.component.js.map
