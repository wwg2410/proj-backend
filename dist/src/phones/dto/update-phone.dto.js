"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePhoneDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_phone_dto_1 = require("./create-phone.dto");
class UpdatePhoneDto extends (0, swagger_1.PartialType)(create_phone_dto_1.CreatePhoneDto) {
}
exports.UpdatePhoneDto = UpdatePhoneDto;
//# sourceMappingURL=update-phone.dto.js.map