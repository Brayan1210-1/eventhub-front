import type { MessageResponse } from "@/utils/message.type";
import { useMutation } from "@tanstack/react-query";
import { createUserByAdmin } from "../service/admin.service";
import type { AdminUserRegisterType } from "../schema/adminUser.schema";
import type { ApiErrorResponse } from "@/core/api/apiErrorResponse";

export const useCreateUser = () => {
    return useMutation<MessageResponse, ApiErrorResponse, AdminUserRegisterType>({
        mutationFn: (data) => createUserByAdmin(data),
    });
};