"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhonesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_phone_dto_1 = require("./dto/create-phone.dto");
const update_phone_dto_1 = require("./dto/update-phone.dto");
const phones_service_1 = require("./phones.service");
let PhonesController = class PhonesController {
    phonesService;
    constructor(phonesService) {
        this.phonesService = phonesService;
    }
    findAll() {
        return this.phonesService.findAll();
    }
    findOne(id) {
        return this.phonesService.findOne(id);
    }
    create(createPhoneDto) {
        return this.phonesService.create(createPhoneDto);
    }
    update(id, updatePhoneDto) {
        return this.phonesService.update(id, updatePhoneDto);
    }
    remove(id) {
        return this.phonesService.remove(id);
    }
};
exports.PhonesController = PhonesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить список всех телефонов' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Успешный ответ со списком телефонов',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhonesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить один телефон по ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID телефона' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhonesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новый телефон' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Телефон успешно создан' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_phone_dto_1.CreatePhoneDto]),
    __metadata("design:returntype", void 0)
], PhonesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить описание телефона' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_phone_dto_1.UpdatePhoneDto]),
    __metadata("design:returntype", void 0)
], PhonesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить телефон из каталога' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhonesController.prototype, "remove", null);
exports.PhonesController = PhonesController = __decorate([
    (0, swagger_1.ApiTags)('Phones'),
    (0, common_1.Controller)('phones'),
    __metadata("design:paramtypes", [phones_service_1.PhonesService])
], PhonesController);
//# sourceMappingURL=phones.controller.js.map