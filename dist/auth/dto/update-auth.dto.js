"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const auth_user_dto_1 = require("./auth-user-dto");
class UpdateAuthDto extends (0, swagger_1.PartialType)(auth_user_dto_1.AuthUserDto) {
}
exports.UpdateAuthDto = UpdateAuthDto;
//# sourceMappingURL=update-auth.dto.js.map